import { 
  db, 
  auth, 
  googleProvider, 
  isFirebaseConfigured 
} from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { INITIAL_EQUIPMENT, INITIAL_BOOKINGS } from '../data/equipmentData';

// --- AUTHENTICATION SERVICES ---

export async function signUpWithEmail(email, password, name, role = 'contractor', phone = '') {
  if (!isFirebaseConfigured || !auth) {
    const mockUser = {
      uid: `user-${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      role,
      phone,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('equiphub_user', JSON.stringify(mockUser));
    return mockUser;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      name: name || user.email.split('@')[0],
      role: role,
      phone: phone,
      createdAt: serverTimestamp()
    };

    await setDoc(userDocRef, userData);
    return userData;
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return await loginWithEmail(email, password, role);
    }
    throw err;
  }
}

export async function loginWithEmail(email, password, role = 'contractor') {
  if (!isFirebaseConfigured || !auth) {
    const mockUser = {
      uid: `user-${Date.now()}`,
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('equiphub_user', JSON.stringify(mockUser));
    return mockUser;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        role: role,
        createdAt: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    }
  } catch (error) {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
      // Auto register user for seamless onboarding
      return await signUpWithEmail(email, password, email.split('@')[0], role);
    }
    throw error;
  }
}

export async function loginWithGooglePopup(defaultRole = 'contractor') {
  if (!isFirebaseConfigured || !auth) {
    const mockUser = {
      uid: `google-user-${Date.now()}`,
      email: 'user@google.com',
      name: 'Google Partner',
      role: defaultRole,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('equiphub_user', JSON.stringify(mockUser));
    return mockUser;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'Google User',
        role: defaultRole,
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, userData);
      return userData;
    }
  } catch (err) {
    console.error("Google Auth error:", err);
    throw err;
  }
}

export async function logoutUser() {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn("Signout error:", e);
    }
  }
  localStorage.removeItem('equiphub_user');
}

export async function fetchUserProfile(uid) {
  if (!isFirebaseConfigured || !db) {
    return JSON.parse(localStorage.getItem('equiphub_user') || 'null');
  }
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  } catch (e) {
    return null;
  }
}

// --- EQUIPMENT SERVICES ---

export function subscribeToEquipment(callback) {
  if (!isFirebaseConfigured || !db) {
    const stored = localStorage.getItem('equiphub_equipment');
    const data = stored ? JSON.parse(stored) : INITIAL_EQUIPMENT;
    callback(data);
    return () => {};
  }

  const q = query(collection(db, 'equipment'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_EQUIPMENT);
    } else {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(items);
    }
  }, (error) => {
    console.warn("Firestore equipment snapshot notice:", error);
    callback(INITIAL_EQUIPMENT);
  });
}

export async function addEquipmentDoc(equipmentData) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_equipment') || JSON.stringify(INITIAL_EQUIPMENT));
    const newItem = { id: `eq-${Date.now()}`, ...equipmentData };
    const updated = [newItem, ...stored];
    localStorage.setItem('equiphub_equipment', JSON.stringify(updated));
    return newItem;
  }

  const docRef = await addDoc(collection(db, 'equipment'), {
    ...equipmentData,
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, ...equipmentData };
}

export async function updateEquipmentDoc(id, updateFields) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_equipment') || JSON.stringify(INITIAL_EQUIPMENT));
    const updated = stored.map(item => item.id === id ? { ...item, ...updateFields } : item);
    localStorage.setItem('equiphub_equipment', JSON.stringify(updated));
    return;
  }

  await updateDoc(doc(db, 'equipment', id), updateFields);
}

export async function deleteEquipmentDoc(id) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_equipment') || JSON.stringify(INITIAL_EQUIPMENT));
    const updated = stored.filter(item => item.id !== id);
    localStorage.setItem('equiphub_equipment', JSON.stringify(updated));
    return;
  }

  await deleteDoc(doc(db, 'equipment', id));
}

// --- BOOKINGS SERVICES ---

export function subscribeToBookings(userRole, userId, callback) {
  if (!isFirebaseConfigured || !db) {
    const stored = localStorage.getItem('equiphub_bookings');
    const data = stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    callback(data);
    return () => {};
  }

  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_BOOKINGS);
    } else {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(items);
    }
  }, (error) => {
    console.warn("Bookings snapshot notice:", error);
    callback(INITIAL_BOOKINGS);
  });
}

export async function createBookingDoc(bookingData) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_bookings') || JSON.stringify(INITIAL_BOOKINGS));
    const newBooking = {
      id: `EQ-${Math.floor(1000 + Math.random() * 9000)}-HUB`,
      ...bookingData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...stored];
    localStorage.setItem('equiphub_bookings', JSON.stringify(updated));
    return newBooking;
  }

  const newId = `EQ-${Math.floor(1000 + Math.random() * 9000)}-HUB`;
  const docRef = doc(db, 'bookings', newId);
  const payload = {
    id: newId,
    ...bookingData,
    status: 'pending',
    createdAt: serverTimestamp()
  };

  await setDoc(docRef, payload);
  return payload;
}

export async function updateBookingStatusDoc(bookingId, status) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_bookings') || JSON.stringify(INITIAL_BOOKINGS));
    const updated = stored.map(b => b.id === bookingId ? { ...b, status } : b);
    localStorage.setItem('equiphub_bookings', JSON.stringify(updated));
    return;
  }

  await updateDoc(doc(db, 'bookings', bookingId), { status });
}

// --- REVIEWS SERVICES ---

export async function addReviewDoc(equipmentId, reviewData) {
  if (!isFirebaseConfigured || !db) {
    const stored = JSON.parse(localStorage.getItem('equiphub_equipment') || JSON.stringify(INITIAL_EQUIPMENT));
    const updated = stored.map(item => {
      if (item.id === equipmentId) {
        const reviews = item.reviews || [];
        const newRev = { id: `rev-${Date.now()}`, ...reviewData };
        return {
          ...item,
          reviewsCount: reviews.length + 1,
          reviews: [newRev, ...reviews]
        };
      }
      return item;
    });
    localStorage.setItem('equiphub_equipment', JSON.stringify(updated));
    return;
  }

  await addDoc(collection(db, 'equipment', equipmentId, 'reviews'), {
    ...reviewData,
    createdAt: serverTimestamp()
  });
}
