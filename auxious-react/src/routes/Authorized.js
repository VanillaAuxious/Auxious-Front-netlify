import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../pages/Main';

function Authorized() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Navigate replace to='/' />} />
    </Routes>
  );
}

export default Authorized;
