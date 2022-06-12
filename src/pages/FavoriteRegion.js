import FavoriteRegionList from '../components/FavoriteRegionList';
import SetFavoriteRegion from '../components/SetFavoriteRegion';

import './FavoriteRegion.scss';

export default function FavoriteRegion() {
  return (
    <>
      <img className='logo' src='/img/logo.png' alt='logo' />
      <div className='favorite-region-container'>
        <div className='favorite-region-set'>관심지역 설정</div>
        <span>🏠 서울지역의 동명만 검색이 가능합니다.</span>
        <span>❤️ 관심지역은 최대 3개까지 선택 가능합니다.</span>
        <span>👋 설정한 동명을 클릭하면 관심지역이 삭제됩니다.</span>
        <SetFavoriteRegion></SetFavoriteRegion>
        <FavoriteRegionList></FavoriteRegionList>
      </div>
    </>
  );
}
