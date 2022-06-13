import FavoriteBuildings from '../components/FavoriteBuildings';
import UserProfile from '../components/UserProfile';
import ProfileImage from '../components/ProfileImage';
import NavBar from '../components/NavBar';

export default function MyPage() {
  return (
    <>
      <ProfileImage />
      <UserProfile />
      <FavoriteBuildings />
      <NavBar />
    </>
  );
}
