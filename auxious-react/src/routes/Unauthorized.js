import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

function Unauthorized() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default Unauthorized;