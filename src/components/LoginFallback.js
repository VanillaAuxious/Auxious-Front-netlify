import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAxios from '../hooks/useAxios';
import LoadingSpinner from '../common/LoadingSpinner';

import { saveUserInfo } from '../store/userSlice';
import { requestForToken } from '../firebase';

export default function LoginFallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');

  useEffect(() => {
    const getUserInformation = async () => {
      const deviceToken = await requestForToken();

      const userData = await useAxios(`users/login`, 'post', {
        code,
        deviceToken,
      });

      if (!userData.ok) {
        localStorage.removeItem('isLoggedIn');

        // 에러 핸들링시 모달 처리 예정)
        navigate('/login');
      }

      dispatch(saveUserInfo(userData.userInfo));
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/', { replace: true });
    };

    getUserInformation();
  }, []);

  return <LoadingSpinner />;
}
