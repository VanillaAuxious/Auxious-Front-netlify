import FavoriteBuildings from '../components/FavoriteBuildings';
import UserProfile from '../components/UserProfile';
import NavBar from '../components/NavBar';

export default function MyPage() {
  return (
    <>
      <UserProfile />
      <FavoriteBuildings />
      <NavBar />
    </>
  );
}
