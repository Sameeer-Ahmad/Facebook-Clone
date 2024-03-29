import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import firebase from "firebase/app";
import { getAuth } from "firebase/auth";


// Define the context
interface AuthContextType {
  currentUser: any | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// Define a custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component to wrap your application
export const FirebaseAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const auth = getAuth(); // Get the Firebase Auth instance
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // Update the currentUser state
      
    });
   
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);


  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};