import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';

function Notification() {
  const [notification, setNotification] = useState({ title: '', body: '', buildingId: '' });
  const notify = () => toast(<ToastDisplay />);

  const ToastDisplay = () => {
    return (
      <div onClick={() => toast.remove()}>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);

  const getMessageListener = async () => {
    try {
      const payload = await onMessageListener();

      setNotification({
        title: payload?.data?.title,
        body: payload?.data?.body,
        buildingId: payload?.data?.buildingId,
      });
    } catch (error) {
      console.log('failed: ', error);
    }
  };

  getMessageListener();

  return <Toaster />;
}

export default Notification;
