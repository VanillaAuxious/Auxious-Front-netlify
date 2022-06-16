import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';

function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '' });
  const notify = () => toast(<ToastDisplay />);

  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  const getMessageListener = async () => {
    try {
      const payload = await onMessageListener();

      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    } catch (error) {
      console.log('failed: ', error);
    }
  };

  getMessageListener();

  return <Toaster />;
}

export default Notification;
