import { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {
  addUserFavoriteBuilding,
  deleteUserFavoriteBuilding,
} from '../store/userSlice';

import sendAPI from '../utils/sendAPI';
import Deligation from './Deligation';

import './DetailHeader.scss';

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

  useLayoutEffect(() => {
    const getBuildingDetail = async () => {
      const buildings = await sendAPI(`/buildings/${buildingId}`, 'get');
      setDetail(buildings);
    };

    getBuildingDetail();
  }, []);

  const handleUserFavoriteRegion = async () => {
    if (userFavorite) {
      await sendAPI(`users/user/favorites/buildings/${buildingId}`, 'delete');

      setUserFavorite(false);
      dispatch(deleteUserFavoriteBuilding(buildingId));
    } else {
      await sendAPI(`users/user/favorites/buildings`, 'post', {
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
          <div className='detail-icon'>
            {detail && <span>{buildingType}</span>}
          </div>
          <div className='detail-auction-number'>
            {detail && <span>{auctionNumber}</span>}
          </div>
          {userFavorite ? (
            <button onClick={handleUserFavoriteRegion}>
              <BsHeartFill />
            </button>
          ) : (
            <button onClick={handleUserFavoriteRegion}>
              <BsHeart />
            </button>
          )}
        </div>
        <Deligation auctionNumber={auctionNumber} />
      </div>
    </>
  );
}
