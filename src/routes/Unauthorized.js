import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import LoginFallback from '../components/LoginFallback';

export default function Unauthorized() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />}>
          <Route path='github' element={<LoginFallback />} />
        </Route>
      </Routes>
    </>
  );
}
