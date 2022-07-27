import { useState, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';

import sendAPI from '../utils/sendAPI';
import './FavoriteBuildings.scss';

export default function FavoriteBuildings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteBuildings, setFavoriteBuildings] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      const result = await sendAPI('/users/user/favorites/buildings', 'get');
      const buildingArray = result.favoriteBuildingsInfoArray;
      setFavoriteBuildings(buildingArray);
    })();
  }, []);

  const showBuildingDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  const deleteFavoriteBuilding = async (id) => {
    const newBuildingsArray = favoriteBuildings.filter(
      (building) => building._id !== id,
    );

    await sendAPI(`/users/user/favorites/buildings/${id}`, 'delete');

    const fieldName = 'favoriteBuildings';
    const data = newBuildingsArray;

    dispatch(patchUserData({ fieldName, data }));
    setFavoriteBuildings(newBuildingsArray);
  };

  return (
    <div className='favorite-buildings-container'>
      <div className='favorite-buildings-heading'>찜한 매물</div>
      {favoriteBuildings &&
        favoriteBuildings.map((building, index) => {
          return (
            <ul key={index} className='favorite-buildings-list'>
              <li onClick={showBuildingDetailPage.bind(null, building._id)}>
                <span>{`경매번호: ${building.auctionNumber}`}</span>
                <span>{`주소: ${building.address}`}</span>
                <span>{`현재 감정가: ${building.connoisseur}`}</span>
              </li>
              <button onClick={() => deleteFavoriteBuilding(building._id)}>
                &#10005;
              </button>
            </ul>
          );
        })}
    </div>
  );
}
