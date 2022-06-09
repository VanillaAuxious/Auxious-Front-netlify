import 'normalize.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserInfo } from './store/userSlice';
import useAxios from './hooks/useAxios';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';

function App() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);
  const hasCookie = document.cookie.includes('server_token=');

  useEffect(() => {
    const setUserInformation = async () => {
      const response = await useAxios(`users/user`);
      dispatch(saveUserInfo(response.userInfo));
    };

    if (!userInformation && hasCookie) {
      setUserInformation();
    }
  }, [userInformation]);

  return (
    <div
      style={{
        width: '360px',
        height: '740px',
      }}>
      {userInformation && hasCookie && <Authorized />}
      {!hasCookie && <Unauthorized />}
    </div>
  );
}

export default App;
