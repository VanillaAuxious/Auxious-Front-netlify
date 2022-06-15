import 'normalize.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';

import useAxios from './hooks/useAxios';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';

import { saveUserInfo } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInformation = useSelector((state) => state.user.userInformation);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
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
    const setUserInformation = async () => {
      const response = await useAxios(`users/user`);
      if (!response.ok) {
        localStorage.removeItem('isLoggedIn');
        //에러 모달로 처리 예정
        navigate('/login');
      }

      dispatch(saveUserInfo(response.userInfo));
    };

    if (!userInformation && isLoggedIn) {
      setUserInformation();
    }
  }, [userInformation]);

  useEffect(() => {
    // const Notification = () => {
    requestForToken();
    // };
  }, []);

  return (
    <>
      {isLoggedIn && userInformation && <Authorized />}
      {!isLoggedIn && <Unauthorized />}
    </>
  );
}

export default App;
