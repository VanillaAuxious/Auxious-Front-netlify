import { useParams } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';

import { getLocation } from '../utils/location';

import useMap from '../hooks/useMap';

import './Map.scss';

export default function Map() {
  const { place } = useParams();
  const [position, setPosition] = useState(place);
  const newQuery = decodeURI(window.location.search).split('=')[1];
  const mapElement = useRef(null);
  const dispatch = useDispatch();
  const [showAll, setShowAll, currentAddress] = useMap(
    position,
    newQuery,
    mapElement,
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleCurrentPositions = () => {
    setPosition(getLocation());
  };

  const handleUserFavorites = async () => {
    await useAxios('/users/user/favorites/regions', 'post', {
      region: currentAddress,
    });

    dispatch(addUserFavoriteRegion(currentAddress));
  };

  return (
    <div>
      <div className='search-types'>
        <button onClick={handleUserFavorites}>
          마커 위치 관심 지역으로 추가하기
        </button>
        <button onClick={handleCurrentPositions}>현재 위치로 가기</button>
        <button onClick={toggleShowAll}>asd</button>
      </div>
      <div id='map' className='map' ref={mapElement} />
    </div>
  );
}
