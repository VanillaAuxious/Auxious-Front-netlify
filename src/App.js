import 'normalize.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from 'firebase/compat/app';

import useAxios from './hooks/useAxios';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';

import { saveUserInfo } from './store/userSlice';
import { getTokenFromFCM } from './firebaseInit';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInformation = useSelector((state) => state.user.userInformation);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
    getTokenFromFCM();
  }, []);

  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_API_APP_ID,
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }

  return (
    <>
      {isLoggedIn && userInformation && <Authorized />}
      {!isLoggedIn && <Unauthorized />}
    </>
  );
}

export default App;
