import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { askServerToken } from '../utils/api';
import { saveUserInfo } from '../store/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallbackResponse = async (googleResponse) => {
      const isLoggedIn = await askServerToken(googleResponse.credential);

      if (isLoggedIn.ok) {
        const userInfo = decode(document.cookie.split('server_cookie=')[1]);
        dispatch(saveUserInfo(userInfo));
        navigate('/');
      }
    };

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
    });
  }, []);

  return <div id='signInDiv'></div>;
}

export default Login;
