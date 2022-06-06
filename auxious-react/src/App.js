import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { saveUserInfo } from './store/userSlice';
import Authorized from './routes/Authorized';
import Unauthorized from './routes/Unauthorized';
import SearchPlace from './pages/SearchPlace';

function App() {
  const dispatch = useDispatch();
  const userInformation = useSelector((state) => state.user.userInformation);
  const hasCookie = document.cookie.includes('server_token=');

  useEffect(() => {
    if (!userInformation && hasCookie) {
      const tokenCookie = document.cookie.split('server_token=')[1];
      const decodedInformation = decode(tokenCookie);
      dispatch(saveUserInfo(decodedInformation));
    }
  }, [userInformation]);

  return (
    <div>
      {hasCookie && <Authorized />}
      {!hasCookie && <Unauthorized />}
      <SearchPlace />
    </div>
  );
}

export default App;
