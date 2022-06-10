import 'normalize.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAxios from './hooks/useAxios';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';

import { saveUserInfo } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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
    <div
      style={{
        width: '360px',
        height: '740px',
      }}>
      {<Authorized />}
      {<Unauthorized />}
    </div>
  );
}

export default App;
