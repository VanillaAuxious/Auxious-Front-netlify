import FavoriteBuildings from '../components/FavoriteBuildings';
import UserProfile from '../components/UserProfile';
import ProfileImage from '../components/ProfileImage';

export default function MyPage() {
  return (
    <div>
      <ProfileImage />
      <UserProfile />
      <FavoriteBuildings />
    </div>
  );
}
