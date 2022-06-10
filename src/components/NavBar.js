import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { deleteUserInfo, logout } from '../store/userSlice';

import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const serverToken = document.cookie.split('server_token=')[1];
    document.cookie = `server_token=${serverToken};expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    dispatch(deleteUserInfo());
    localStorage.removeItem('isLoggedIn');

    navigate('/login');
  };

  return (
    <div className='nav-bar-container'>
      <ul className='nav-bars'>
        <li onClick={() => navigate('/')}>
          <img src='/img/icons/home.svg' alt='home' />
          <span>Home</span>
        </li>
        <li onClick={() => navigate('/alarm')}>
          <img src='/img/icons/notifications.svg' alt='notification' />
          <span>Alarm</span>
        </li>
        <li onClick={() => navigate('/mypage')}>
          <img src='/img/icons/mypage.svg' alt='mypage' />
          <span>My Page</span>
        </li>
        <li onClick={handleLogout}>
          <img src='/img/icons/logout.svg' alt='logout' />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
