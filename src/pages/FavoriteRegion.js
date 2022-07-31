import NavBar from '../components/NavBar';
import FavoriteRegions from '../components/FavoriteRegions';

import './FavoriteRegion.scss';

export default function FavoriteRegion() {
  return (
    <>
      <img className='logo' src='/img/logo.png' alt='logo' />
      <div className='favorite-region-container'>
        <h2 className='favorite-region-header'>관심지역 설정</h2>
        <span>🏠 서울지역의 동명만 검색이 가능합니다.</span>
        <span>❤️ 관심지역은 최대 3개까지 선택 가능합니다.</span>
        <span>👋 설정한 동명을 클릭하면 관심지역이 삭제됩니다.</span>
        <FavoriteRegions />
      </div>
      <NavBar />
    </>
  );
}
