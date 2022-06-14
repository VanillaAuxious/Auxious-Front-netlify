import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import {
  addUserFavoriteBuilding,
  deleteUserFavoriteBuilding,
} from '../store/userSlice';

import useAxios from '../hooks/useAxios';

export default function DetailHeader() {
  const dispatch = useDispatch();
  const { buildingId } = useParams();
  const [detail, setDetail] = useState({ buildingInfo: {} });

  const { favoriteBuildings } = useSelector(
    (state) => state.user.userInformation,
  );

  const [userFavorite, setUserFavorite] = useState(
    favoriteBuildings.includes(buildingId),
  );

  const { buildingType, auctionNumber } = detail.buildingInfo;

  useEffect(() => {
    const getBuildingDetail = async () => {
      const buildings = await useAxios(`buildings/${buildingId}`, 'get');
      setDetail(buildings);
    };

    getBuildingDetail();
  }, []);

  const handleUserFavoriteRegion = async () => {
    if (userFavorite) {
      await useAxios(`users/user/favorites/buildings/${buildingId}`, 'delete');

      setUserFavorite(false);
      dispatch(deleteUserFavoriteBuilding(buildingId));
    } else {
      await useAxios(`users/user/favorites/buildings`, 'post', {
        buildingId: buildingId,
      });

      setUserFavorite(true);
      dispatch(addUserFavoriteBuilding(buildingId));
    }
  };

  return (
    <>
      <div className='detail-container'>
        <div className='detail-img-logo'>
          <img src='/img/logo.png' alt='logo' />
        </div>
        <div className='detail-heading'>
          {userFavorite ? (
            <button onClick={handleUserFavoriteRegion}>
              <BsHeartFill></BsHeartFill>
            </button>
          ) : (
            <button onClick={handleUserFavoriteRegion}>
              <BsHeart></BsHeart>
            </button>
          )}
          <div className='detail-icon'>
            {detail && <span>{buildingType}</span>}
          </div>
          <div className='detail-auction-number'>
            {detail && <span>{auctionNumber}</span>}
          </div>
        </div>
      </div>
    </>
  );
}