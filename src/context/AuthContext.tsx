import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../config/firebase";

type FirebaseUser = any;

interface AuthContextProps {
  user: FirebaseUser
  logOut: () => void
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  logOut: () => {}
});

export function useAuth(){
  return useContext(AuthContext);
};

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<FirebaseUser>(null);

  function logOut() {
    auth.signOut()
      .then(() => {
        setUser(null)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextProps = {
    user,
    logOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};