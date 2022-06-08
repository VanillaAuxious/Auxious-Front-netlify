import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../pages/Main';
import Detail from '../pages/Detail';

export default function Authorized() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Navigate replace to='/' />} />
      <Route path='/detail/:buildingId' element={<Detail />} />
    </Routes>
  );
}
