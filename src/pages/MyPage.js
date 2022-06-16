import FavoriteBuildings from '../components/FavoriteBuildings';
import UserProfile from '../components/UserProfile';
import NavBar from '../components/NavBar';
import ContractList from '../components/ContractList';

export default function MyPage() {
  return (
    <>
      <UserProfile />
      <FavoriteBuildings />
      <ContractList />
      <NavBar />
    </>
  );
}
