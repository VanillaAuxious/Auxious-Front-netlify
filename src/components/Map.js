import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';

import { getLocation } from '../utils/location';

import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import PriceGraph from '../components/PriceGraph';

import './Map.css';

export default function Map() {
  const newQuery = decodeURI(window.location.search).split('=')[1];
  const dispatch = useDispatch();
  const mapElement = useRef(null);
  const [position, setPosition] = useState('');
  const [showAll, setShowAll, currentAddress, graphData] = useMap(
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
      <button onClick={handleUserFavorites}>
        지도 위치 관심 지역으로 추가하기
      </button>
      <button onClick={handleCurrentPositions}>현재 위치로 가기</button>
      <button onClick={toggleShowAll}>asd</button>
      <div id='map' className='map' ref={mapElement} />
      <div>지역 가격 그래프</div>
      <PriceGraph data={graphData}></PriceGraph>
    </div>
  );
}
