import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import LoginFallback from '../components/LoginFallback';
import SigningDocument from '../pages/SigningDocument';

export default function Unauthorized() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login />}>
          <Route path='github' element={<LoginFallback />} />
        </Route>
        <Route path='/sign' element={<SigningDocument />} />
      </Routes>
    </>
  );
}
