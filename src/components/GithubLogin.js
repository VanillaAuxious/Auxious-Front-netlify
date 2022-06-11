import { AiFillGithub } from 'react-icons/ai';
import { GITHUB_OAUTH_API_URL } from '../utils/constants';

import './GithubLogin.scss';

function Login() {
  return (
    <div className='login-contianer'>
      <div className='login-image-container'>
        <img src='/img/logo.png' />
      </div>
      <a href={GITHUB_OAUTH_API_URL}>
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
