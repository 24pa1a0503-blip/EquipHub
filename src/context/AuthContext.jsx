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
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setCurrentUser(user);
          const profile = await fetchUserProfile(user.uid);
          setUserProfile(profile || {
            uid: user.uid,
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: 'contractor'
          });
        } else {
          setCurrentUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      });
      return unsubscribe;
    } else {
      // Local fallback auth check
      const savedUser = JSON.parse(localStorage.getItem('equiphub_user') || 'null');
      if (savedUser) {
        setCurrentUser(savedUser);
        setUserProfile(savedUser);
      }
      setLoading(false);
    }
  }, []);

  const signup = async (email, password, name, role, phone) => {
    setLoading(true);
    try {
      const profile = await signUpWithEmail(email, password, name, role, phone);
      setCurrentUser(profile);
      setUserProfile(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const profile = await loginWithEmail(email, password);
      setCurrentUser(profile);
      setUserProfile(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async (defaultRole) => {
    setLoading(true);
    try {
      const profile = await loginWithGooglePopup(defaultRole);
      setCurrentUser(profile);
      setUserProfile(profile);
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const switchRole = (newRole) => {
    if (userProfile) {
      const updated = { ...userProfile, role: newRole };
      setUserProfile(updated);
      localStorage.setItem('equiphub_user', JSON.stringify(updated));
    }
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
      {!loading && children}
    </AuthContext.Provider>
  );
}
