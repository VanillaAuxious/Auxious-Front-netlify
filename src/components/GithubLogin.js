import { useState, useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';

import {
  GITHUB_OAUTH_API_URL_TEMPLATE,
  DEV,
  PROD,
  TEST,
} from '../utils/constants';

import './GithubLogin.scss';

function Login() {
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    if (!clientId) {
      if (process.env.REACT_APP_ENV === DEV) {
        setClientId(process.env.REACT_APP_OAUTH_CLIENT_ID_LOCAL);
      }

      if (process.env.REACT_APP_ENV === PROD) {
        setClientId(process.env.REACT_APP_OAUTH_CLIENT_ID_PROD);
      }

      if (process.env.REACT_APP_ENV === TEST) {
        setClientId(process.env.REACT_APP_OAUTH_CLIENT_ID_TEST);
      }
    }
  }, []);

  return (
    <div className='login-contianer'>
      <div className='login-image-container'>
        <img src='/img/logo.png' />
      </div>
      <a href={`${GITHUB_OAUTH_API_URL_TEMPLATE}${clientId}`}>
        <AiFillGithub style={{ width: '30px', height: '30px' }} />
        <span>Sign in with GitHub</span>
      </a>
      <div className='login-footer'>
        <span>&copy; 2022 Reserved by D.Bugger Brothers</span>
      </div>
    </div>
  );
}

export default Login;
