import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import SearchPlace from '../pages/SearchPlace';

export default function Unauthorized() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/login' />} />
      <Route path='/login' element={<Login />} />
      <Route path='/search/:place' element={<SearchPlace />} />
      <Route path='/search' element={<SearchPlace />} />
    </Routes>
  );
}
