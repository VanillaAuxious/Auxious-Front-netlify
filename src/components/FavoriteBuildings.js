import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';

import useAxios from '../hooks/useAxios';

export default function FavoriteBuildings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const showBuildingDetailPage = (event) => {
    navigate(`details/${event.target.id}`);
  };

  const deleteFavoriteBuilding = async (event) => {
    const id = event.target.id;
    const newBuildingsArray = [];

    for (let i = 0; i < user.userInformation.favoriteBuildings.length; i++) {
      if (user.userInformation.favoriteBuildings[i]._id !== id) {
        newBuildingsArray.push(user.userInformation.favoriteBuildings[i]);
      }
    }

    await useAxios(`/users/user/favorites/building/${id}`, 'delete');

    const fieldName = 'favoriteBuildings';
    const data = newBuildingsArray;

    dispatch(patchUserData({ fieldName, data }));
  };

  return (
    <div>
      <div>찜한매물</div>
      {user.userInformation.favoriteBuildings.map((building, index) => {
        return (
          <>
            <div key={index} onClick={showBuildingDetailPage} id={building._id}>
              {building.name}
            </div>
            <button id={building._id} onClick={deleteFavoriteBuilding}>
              X
            </button>
          </>
        );
      })}
    </div>
  );
}
