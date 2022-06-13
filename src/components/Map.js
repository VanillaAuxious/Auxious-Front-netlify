import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

import { getLocation } from '../utils/location';

import useInput from '../hooks/useInput';
import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import PriceGraph from '../components/PriceGraph';

import './Map.scss';

export default function Map() {
  const newQuery = decodeURI(window.location.search).split('=')[1];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, onChange] = useInput();
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

  const handleFilter = (event) => {
    if (newQuery.includes(event.target.innerText)) {
      const query = newQuery.replace(event.target.innerText, '');
      navigate(`/search/${currentAddress}?type=${query}`);
    } else {
      const newFilterType = [...newQuery];
      newFilterType.push(event.target.innerText);
      navigate(`/search/${currentAddress}?type=${newFilterType.join('')}`);
    }
  };

  const handleSearchInput = () => {
    navigate(`/search/${input}?type=${newQuery}`);
  };

  return (
    <>
      <input placeholder='지역을 입력하세요' onChange={onChange}></input>
      <button onClick={handleSearchInput}>검색하기</button>
      <div className='search-types'>
        <button onClick={handleUserFavorites}>
          지도 위치 관심 지역으로 추가하기
        </button>
        <button onClick={handleFilter}>아파트</button>
        <button onClick={handleFilter}>주택</button>
        <button onClick={handleFilter}>다세대/다가구</button>
        <button onClick={handleFilter}>오피스텔/원룸</button>
        <button onClick={handleCurrentPositions}>현재 위치로 가기</button>
        <button onClick={toggleShowAll}>일반매물 보이기</button>
        <div id='map' className='map' ref={mapElement} />
        <div>지역 가격 그래프</div>
        <PriceGraph data={graphData}></PriceGraph>
      </div>
    </>
  );
}
