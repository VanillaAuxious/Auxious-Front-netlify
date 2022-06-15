import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

import { getLocation } from '../utils/location';

import useInput from '../hooks/useInput';
import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import PriceGraph from '../components/PriceGraph';

import './Map.scss';

export default function Map() {
  const location = useLocation();
  const newQuery = new URLSearchParams(location.search);
  const type = newQuery.get('type');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, onChange] = useInput();
  const mapElement = useRef(null);
  const [position, setPosition] = useState('');

  const [showAll, setShowAll, currentAddress, graphData] = useMap(
    position,
    type,
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
    if (type.includes(event.target.innerText)) {
      const query = type.replace(event.target.innerText, '');
      navigate(`/search/${currentAddress}?type=${query}`);
    } else {
      const newFilterType = [...type];
      newFilterType.push(event.target.innerText);
      navigate(`/search/${currentAddress}?type=${newFilterType.join('')}`);
    }
  };

  const handleSearchInput = () => {
    navigate(`/search/${input}?type=${type}`);
  };

  return (
    <>
      <img src='/img/logo.png' alt='logo' sizes='small' />
      <div className='map-search-container'>
        <input placeholder='지역을 입력하세요' onChange={onChange}></input>
        <button id='search' onClick={handleSearchInput}>
          검색
        </button>
      </div>
      <div className='search-types'>
        <div onClick={handleFilter}>아파트</div>
        <div onClick={handleFilter}>주택</div>
        <div onClick={handleFilter}>다세대/다가구</div>
        <div onClick={handleFilter}>오피스텔/원룸</div>
        <div onClick={toggleShowAll}>일반매물</div>
        <div className='search-addregion' onClick={handleUserFavorites}>
          관심 지역+
        </div>
      </div>
      <div className='map-container'>
        <div id='map' className='map' ref={mapElement} />
      </div>
      <div className='background-container'>
        <div className='graph-container'>
          <div>VP avg graph(1,000,000Won)</div>
          <PriceGraph data={graphData}></PriceGraph>
        </div>
      </div>
    </>
  );
}
