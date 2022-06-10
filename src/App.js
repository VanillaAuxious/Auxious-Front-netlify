import 'normalize.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAxios from './hooks/useAxios';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';

import { saveUserInfo, login } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    const setUserInformation = async () => {
      const response = await useAxios(`users/user`);
      dispatch(saveUserInfo(response.userInfo));
    };

    if (!userInformation && isLoggedIn) {
      setUserInformation();
    }
  }, [userInformation]);

  return (
    <div>
      {isLoggedIn && userInformation && <Authorized />}
      {!isLoggedIn && <Unauthorized />}
    </div>
  );
}

export default App;
