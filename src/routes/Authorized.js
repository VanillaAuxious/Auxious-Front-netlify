import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import SearchPlace from '../pages/SearchPlace';
import Alarm from '../pages/Alarm';
import MyPage from '../pages/MyPage';
import MyFavoriteRegion from '../pages/FavoriteRegion';

export default function Authorized() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Navigate replace to='/' />} />
        <Route path='/detail' element={<Detail />} />
        <Route path='/detail/:buildingId' element={<Detail />} />
        <Route path='/' element={<Main />} />
        <Route path='/search/:place' element={<SearchPlace />} />
        <Route path='/search' element={<SearchPlace />} />
        <Route path='/alarm' element={<Alarm />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/favoriteregion' element={<MyFavoriteRegion />} />
        <Route path='/setregion' element={<MyFavoriteRegion />} />
      </Routes>
      <NavBar />
    </div>
  );
}
