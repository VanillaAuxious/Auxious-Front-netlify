import 'normalize.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import sendAPI from './utils/sendAPI';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';
import Notification from './components/Notification';

import { saveUserInfo } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInformation = useSelector((state) => state.user.userInformation);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const setUserInformation = async () => {
      const response = await sendAPI(`users/user`);
      if (!response.ok) {
        localStorage.removeItem('isLoggedIn');
        //에러 모달로 처리 예정
        navigate('/login');
      }

      dispatch(saveUserInfo(response.userInfo));
    };

    if (!userInformation && isLoggedIn) {
      setUserInformation();
    }
  }, [userInformation]);

  return (
    <>
      {isLoggedIn && userInformation && <Authorized />}
      {!isLoggedIn && <Unauthorized />}
      <Notification />
    </>
  );
}

export default App;
