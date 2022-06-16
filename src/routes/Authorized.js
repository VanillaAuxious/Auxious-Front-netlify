import { Routes, Route, Navigate } from 'react-router-dom';

import Detail from '../pages/Detail';
import Main from '../pages/Main';
import SearchPlace from '../pages/SearchPlace';
import MyPage from '../pages/MyPage';
import MyFavoriteRegion from '../pages/FavoriteRegion';
import SigningDocument from '../pages/SigningDocument';

export default function Authorized() {
  return (
    <Routes>
      <Route path='/login' element={<Navigate replace to='/' />} />
      <Route path='/' element={<Main />} />
      <Route path='/detail/:buildingId' element={<Detail />} />
      <Route path='/search' element={<SearchPlace />} />
      <Route path='/search/:place' element={<SearchPlace />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/favoriteregion' element={<MyFavoriteRegion />} />
      <Route path='/sign/' element={<SigningDocument />} />
      <Route path='/sign/:agent' element={<SigningDocument />} />
    </Routes>
  );
}
