import React, { createContext, useContext, useState } from 'react';

interface NotificationContextProps {
    notification: boolean,
    notificationMessage: string,
    error: boolean,
    hideNotification: () => void,
    showNotification: (message: string) => void,
    showErrorNotification: (message: string) => void
}

const NotificationContext = createContext<NotificationContextProps>({
    notification: false,
    notificationMessage: "",
    error: false,
    hideNotification: () => {},
    showNotification: () => {},
    showErrorNotification: () => {}
})

export function useNotification() {
    return useContext(NotificationContext)
}

export function NotificationProvider({ children }: any) {
    const [notification, setNotification] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
  
    function showNotification(message: string) {
        setNotification(true)
        setNotificationMessage(message)
        setError(false);
    }

    function showErrorNotification(message: string) {
        setNotification(true)
        setNotificationMessage(message)
        setError(true);
    }

    function hideNotification() {
        setNotification(false)
        setNotificationMessage("")
        setError(false);
    }
  
    const value: NotificationContextProps = {
      notification,
      notificationMessage,
      error,
      hideNotification,
      showNotification,
      showErrorNotification
    };
  
    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  };