import { Outlet } from 'react-router-dom';
import GithubLogin from '../components/GithubLogin';

export default function Login() {
  return (
    <div>
      <GithubLogin />
      <Outlet />
    </div>
  );
}
