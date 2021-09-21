import { useContext, createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storage = getStorage();

export const AuthContext = createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [currentUser, setCurrentUser] = useState();
   const [loading, setLoading] = useState(true);

   const signup = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
   };

   const login = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
   };

   const logout = () => {
      return signOut(auth);
   };

   const reset = (email) => {
      return sendPasswordResetEmail(auth, email);
   };

   const uploadImage = (path, file) => {
      const ProfileImageRef = ref(storage, path);
      return uploadBytes(ProfileImageRef, file);
   };

   const downloadImage = (pathAndFilename) => {
      return getDownloadURL(ref(storage, pathAndFilename));
   };

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
         setCurrentUser(user);
         setLoading(false);
      });

      return unsubscribe;
   }, []);

   const value = {
      currentUser,
      signup,
      login,
      logout,
      reset,
      uploadImage,
      downloadImage,
   };
   return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
