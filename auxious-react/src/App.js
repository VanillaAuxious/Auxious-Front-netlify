import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import Login from './pages/Login';
import { saveUserInfo } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);
  const hasCookie = document.cookie.includes('server_token=') !== -1;

  useEffect(() => {
    if (!userInformation && hasCookie) {
      const tokenCookie = document.cookie.split('server_token=')[1];
      const decodedInformation = decode(tokenCookie);
      dispatch(saveUserInfo(decodedInformation));
    }
  }, [userInformation]);

  return <div></div>;
}

export default App;
