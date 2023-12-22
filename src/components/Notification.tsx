import React, { useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'

function Notification() {
    const { notification, hideNotification, notificationMessage, error } = useNotification();

    useEffect(() => {
        let timer: any;

        if (notification) {
            timer = setTimeout(() => {
                hideNotification();
            }, 2000)
        }

        return () => {
            clearTimeout(timer);
        }
    }, [notification, hideNotification])

  return (
    <>
        <div className={notification && !error ? "notification notification-show" : "notification"}>
            <p className='notification__text'>{notificationMessage}</p>
        </div>
        <div className={notification && error ? "notification-error notification-show" : "notification-error"}>
            <p className='notification-error__text'>{notificationMessage}</p>
        </div>
    </>
  )
}

export default Notification