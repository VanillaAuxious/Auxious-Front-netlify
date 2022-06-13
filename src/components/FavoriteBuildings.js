import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';

import useAxios from '../hooks/useAxios';
import './FavoriteBuildings.scss';

export default function FavoriteBuildings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInformation);

  const showBuildingDetailPage = (event) => {
    navigate(`detail/${event.target.id}`);
  };

  const deleteFavoriteBuilding = async (event) => {
    const id = event.target.id;
    const newBuildingsArray = [];

    for (let i = 0; i < user.favoriteBuildings.length; i++) {
      if (user.favoriteBuildings[i]._id !== id) {
        newBuildingsArray.push(user.favoriteBuildings[i]);
      }
    }

    await useAxios(`/users/user/favorites/building/${id}`, 'delete');

    const fieldName = 'favoriteBuildings';
    const data = newBuildingsArray;

    dispatch(patchUserData({ fieldName, data }));
  };

  return (
    <div className='select-real-estate-container'>
      <div className='select-real-estate'>찜한 매물</div>
      {user.favoriteBuildings.map((building, index) => {
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
      {/* 예시로 띄우는 것을 배치 해봤습니다. */}
      {/* <div className="concon">dd</div>
      <div className="concon">dd</div>
      <div className="concon">dd</div>
      <div className="concon">dd</div>
      <div className="concon">dd</div> */}
    </div>
  );
}
