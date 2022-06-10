import { GITHUB_OAUTH_API_URL } from '../utils/constants';

import './GithubLogin.css';

function Login() {
  return (
    <div className=''>
      <div>Auxios</div>
      <a href={GITHUB_OAUTH_API_URL}>Login With GitHub</a>
    </div>
  );
}

export default Login;
