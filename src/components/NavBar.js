import { useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

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
        <li onClick={() => navigate('/logout')}>
          <img src='/img/icons/logout.svg' alt='logout' />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
