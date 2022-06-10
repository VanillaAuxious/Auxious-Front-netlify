import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useAxios from '../hooks/useAxios';

import { saveUserInfo, login } from '../store/userSlice';

function Login() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleCallbackResponse = async (googleResponse) => {
  //     const { clientId, credential } = googleResponse;
  //     const userInformation = await useAxios('users/login', 'post', {
  //       clientId,
  //       token: `Bearer ${credential}`,
  //     });

  //     if (userInformation.ok) {
  //       dispatch(saveUserInfo(userInformation.userInfo));
  //       dispatch(login());
  //       navigate('/');
  //     }
  //   };

  //   const google = window.google;

  //   google.accounts.id.initialize({
  //     client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(document.getElementById('signInDiv'), {
  //     theme: 'outline',
  //   });
  // }, []);

  return (
    <>
      <div>Auxios</div>
      <div id='signInDiv'></div>
    </>
  );
}

export default Login;
