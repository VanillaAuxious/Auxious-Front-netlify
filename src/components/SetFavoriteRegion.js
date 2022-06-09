import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';

import useAxios from '../hooks/useAxios';

export default function SetFavoriteRegion() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const deleteFavoriteBuilding = async (event) => {
    const id = event.target.id;
    await useAxios(`/users/user/favorites/building/${id}`, 'delete');

    const fieldName = 'favoriteBuildings';
    const data = newBuildingsArray;

    dispatch(patchUserData({ fieldName, data }));
  };

  return (
    <div>
      <input placeholder='동명으로 검색'></input>
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
