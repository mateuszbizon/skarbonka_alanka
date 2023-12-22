import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from "../config/firebase";
import { useNotification } from './NotificationContext';
import * as messages from "../constants/messages";

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
  const { showNotification, showErrorNotification } = useNotification()

  function logOut() {
    auth.signOut()
      .then(() => {
        setUser(null)
        showNotification(messages.logOutSuccess)
      })
      .catch(error => {
        showErrorNotification(messages.logOutFail)
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