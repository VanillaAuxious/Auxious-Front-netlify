import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { askServerToken } from '../utils/api';
import useAxios from '../hooks/useAxios';
import { saveUserInfo } from '../store/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallbackResponse = async (googleResponse) => {
      const { clientId, credential } = googleResponse;

      const hasServerToken = await useAxios(
        'users/login',
        'post',
        { clientId, token: `Bearer ${credential}` },
        {
          withCredentials: true,
        },
      );

      if (hasServerToken.ok) {
        const tokenCookie = document.cookie.split('server_token=')[1];
        const decodedInformation = decode(tokenCookie);
        dispatch(saveUserInfo(decodedInformation));
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

  return (
    <div>
      <div>Auxios</div>
      <div id='signInDiv'></div>
    </div>
  );
}

export default Login;
