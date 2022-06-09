import FavoriteRegionList from '../components/FavoriteRegionList';

export default function FavoriteRegion() {
  return (
    <div>
      <h1>관심지역설정</h1>
      <h2>지역선택</h2>
      <h3>지역은 최대 3개까지 선택가능합니다</h3>
      <FavoriteRegionList></FavoriteRegionList>
    </div>
  );
}
