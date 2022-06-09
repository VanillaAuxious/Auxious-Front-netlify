import { Routes, Route, Navigate } from 'react-router-dom';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import SearchPlace from '../pages/SearchPlace';

export default function Authorized() {
  return (
    <Routes>
      <Route path='/login' element={<Navigate replace to='/' />} />
      <Route path='/detail/:buildingId' element={<Detail />} />
      <Route path='/' element={<Main />} />
      <Route path='/search/:place' element={<SearchPlace />} />
      <Route path='/search' element={<SearchPlace />} />
    </Routes>
  );
}
