import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';
import { useState, useLayoutEffect } from 'react';

import useAxios from '../hooks/useAxios';
import './FavoriteBuildings.scss';

export default function FavoriteBuildings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [favoriteBuildings, setFavoriteBuildings] = useState(false);

  useLayoutEffect(() => {
    (async () => {
      const result = await useAxios('/users/user/favorites/buildings', 'get');
      const buildingArray = result.favoriteBuildingsInfoArray;
      setFavoriteBuildings(buildingArray);
    })();
  }, []);

  const showBuildingDetailPage = (event) => {
    navigate(`/detail/${event.target.id}`);
  };

  const deleteFavoriteBuilding = async (event) => {
    const id = event.target.id;

    const newBuildingsArray = favoriteBuildings.filter(
      (building) => building._id !== id,
    );

    const newUser = await useAxios(
      `/users/user/favorites/buildings/${id}`,
      'delete',
    );

    const fieldName = 'favoriteBuildings';
    const data = newBuildingsArray;

    dispatch(patchUserData({ fieldName, data }));
    setFavoriteBuildings(newUser.user.favoriteBuildings);
  };

  return (
    <div className='select-real-estate-container'>
      <div className='select-real-estate'>찜한 매물</div>
      {favoriteBuildings &&
        favoriteBuildings.map((building, index) => {
          return (
            <div key={index}>
              <div
                className='concon'
                onClick={showBuildingDetailPage}
                id={building._id}>
                경매번호: {building.auctionNumber}
                <br />
                주소: {building.address}
                <br />
                현재 감정가: {building.connoisseur}
                <br />
              </div>
              <button id={building._id} onClick={deleteFavoriteBuilding}>
                X
              </button>
            </div>
          );
        })}
    </div>
  );
}
