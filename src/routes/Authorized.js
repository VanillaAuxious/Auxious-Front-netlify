import { Routes, Route, Navigate } from 'react-router-dom';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import SearchPlace from '../pages/SearchPlace';
import Alarm from '../pages/Alarm';
import MyPage from '../pages/MyPage';
import MyFavoriteRegion from '../pages/FavoriteRegion';

export default function Authorized() {
  return (
    <Routes>
      <Route path='/login' element={<Navigate replace to='/' />} />
      <Route path='/' element={<Main />} />
      <Route path='/detail/:buildingId' element={<Detail />} />
      <Route path='/search' element={<SearchPlace />} />
      <Route path='/search/:place' element={<SearchPlace />} />
      <Route path='/alarm' element={<Alarm />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/favoriteregion' element={<MyFavoriteRegion />} />
    </Routes>
  );
}
