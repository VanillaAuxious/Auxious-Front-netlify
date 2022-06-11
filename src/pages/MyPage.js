import FavoriteBuildings from '../components/FavoriteBuildings';
import UserBasicInfo from '../components/UserProfile';

export default function MyPage() {
  return (
    <div>
      <UserBasicInfo />
      <FavoriteBuildings />
    </div>
  );
}
