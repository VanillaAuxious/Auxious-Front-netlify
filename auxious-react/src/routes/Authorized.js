import { Routes, Route, Navigate } from 'react-router-dom';
import Main from '../pages/Main';
import SearchPlace from '../pages/SearchPlace';

function Authorized() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/login' element={<Navigate replace to='/' />} />
      <Route path='/search' element={<SearchPlace />} />
    </Routes>
  );
}

export default Authorized;
