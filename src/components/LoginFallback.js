import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAxios from '../hooks/useAxios';

import { saveUserInfo } from '../store/userSlice';

export default function LoginFallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    const getUserInformation = async () => {
      const userData = await useAxios(`users/login`, 'post', { code });

      dispatch(saveUserInfo(userData.userInfo));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/', { replace: true });
    };

    getUserInformation();
  }, []);

  return <div></div>;
}
