import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AiFillStepBackward } from 'react-icons/ai';

import useAixos from '../hooks/useAxios';
import { deleteUserInfo } from '../store/userSlice';

import './NavBar.scss';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await useAixos('users/user/device-token', 'delete');

    if (response.ok) {
      document.cookie = `server_token=''; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      dispatch(deleteUserInfo());
      localStorage.removeItem('isLoggedIn');
    }

    navigate('/login');
  };

  return (
    <div className='nav-bar-container'>
      <ul>
        <li onClick={() => navigate('/')}>
          <img src='/img/icons/home.svg' alt='home' />
          <span>Home</span>
        </li>
        <li onClick={() => navigate('/mypage')}>
          <img src='/img/icons/mypage.svg' alt='mypage' />
          <span>My Page</span>
        </li>
        <li onClick={() => navigate(-1)}>
          <img src='/img/icons/back.svg' alt='mypage' />
          <span>Back</span>
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
