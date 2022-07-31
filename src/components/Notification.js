import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { onMessageListener } from '../firebase';

function Notification() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    buildingId: '',
  });
  const notify = () => toast(<ToastDisplay />);

  const handleNotification = () => {
    toast.remove();
    navigate(`/detail/${notification?.buildingId}`);
  };

  const ToastDisplay = () => {
    return (
      <div onClick={handleNotification}>
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
