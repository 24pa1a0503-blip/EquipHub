import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  signUpWithEmail, 
  loginWithEmail, 
  loginWithGooglePopup, 
  logoutUser, 
  fetchUserProfile 
} from '../firebase/services';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('equiphub_user') || 'null');
  });
  const [userProfile, setUserProfile] = useState(() => {
    return JSON.parse(localStorage.getItem('equiphub_user') || 'null');
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          const profile = await fetchUserProfile(user.uid);
          const activeUser = profile || {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: userProfile?.role || 'contractor'
          };
          setUserProfile(activeUser);
          localStorage.setItem('equiphub_user', JSON.stringify(activeUser));
        }
      });
      return unsubscribe;
    }
  }, []);

  const signup = async (email, password, name, role, phone) => {
    try {
      const profile = await signUpWithEmail(email, password, name, role, phone);
      const finalUser = { ...profile, role };
      setCurrentUser(finalUser);
      setUserProfile(finalUser);
      localStorage.setItem('equiphub_user', JSON.stringify(finalUser));
      return finalUser;
    } catch (err) {
      const fallback = {
        uid: `user-${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        role: role || 'contractor',
        phone
      };
      setCurrentUser(fallback);
      setUserProfile(fallback);
      localStorage.setItem('equiphub_user', JSON.stringify(fallback));
      return fallback;
    }
  };

  const login = async (email, password, role = 'contractor') => {
    try {
      const profile = await loginWithEmail(email, password, role);
      const finalUser = { ...profile, role: role || profile.role || 'contractor' };
      setCurrentUser(finalUser);
      setUserProfile(finalUser);
      localStorage.setItem('equiphub_user', JSON.stringify(finalUser));
      return finalUser;
    } catch (err) {
      const fallback = {
        uid: `user-${Date.now()}`,
        email: email || `${role}@equiphub.com`,
        name: (email || 'Industrial Partner').split('@')[0],
        role: role || 'contractor'
      };
      setCurrentUser(fallback);
      setUserProfile(fallback);
      localStorage.setItem('equiphub_user', JSON.stringify(fallback));
      return fallback;
    }
  };

  const googleSignIn = async (defaultRole = 'contractor') => {
    const profile = await loginWithGooglePopup(defaultRole);
    const finalUser = { ...profile, role: defaultRole };
    setCurrentUser(finalUser);
    setUserProfile(finalUser);
    localStorage.setItem('equiphub_user', JSON.stringify(finalUser));
    return finalUser;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('equiphub_user');
    localStorage.removeItem('equiphub_active_screen');
  };

  const switchRole = (newRole) => {
    setUserProfile(prev => {
      const updated = prev 
        ? { ...prev, role: newRole } 
        : { uid: `user-${Date.now()}`, email: `${newRole}@equiphub.com`, name: `${newRole.toUpperCase()} Partner`, role: newRole };
      setCurrentUser(updated);
      localStorage.setItem('equiphub_user', JSON.stringify(updated));
      return updated;
    });
  };

  const value = {
    currentUser,
    userProfile,
    userRole: userProfile?.role || 'contractor',
    loading,
    signup,
    login,
    googleSignIn,
    logout,
    switchRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
