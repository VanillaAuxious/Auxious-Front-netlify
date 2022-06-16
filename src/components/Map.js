import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import useInput from '../hooks/useInput';
import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import PriceGraph from '../components/PriceGraph';

import './Map.scss';

export default function Map() {
  const location = useLocation();
  const newQuery = new URLSearchParams(location.search);
  const type = newQuery.get('type');
  const [input, onChange] = useInput();
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const mapElement = useRef(null);
  const user = useSelector((state) => state.user.userInformation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showAll, setShowAll, currentAddress, graphData] = useMap(
    position,
    type,
    mapElement,
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleUserFavorites = async () => {
    if (user.favoriteRegions.length > 2) {
      setMessage('이미 선택된 관심지역입니다.');
      return;
    } else if (user.favoriteRegions.includes(currentAddress)) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    }

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
        {message && <span className='favorite-region-message'>{message}</span>}
        <input placeholder='지역을 입력하세요' onChange={onChange}></input>
        <button id='search' onClick={handleSearchInput}>
          <BsSearch />
        </button>
        <div className='search-addregion' onClick={handleUserFavorites}>
          관심 지역+
        </div>
      </div>
      <div className='search-types'>
        <div className='map-search-types' onClick={handleFilter}>
          아파트
        </div>
        <div className='map-search-types' onClick={handleFilter}>
          주택
        </div>
        <div className='map-search-types' onClick={handleFilter}>
          다세대/다가구
        </div>
        <div className='map-search-types' onClick={handleFilter}>
          오피스텔/원룸
        </div>
        <div className='map-search-types' onClick={toggleShowAll}>
          일반매물
        </div>
      </div>
      <div className='map-container'>
        <div id='map' className='map' ref={mapElement} />
      </div>
      <div className='background-container'>
        <div className='graph-container'>
          <div>Graph(백만)</div>
          <PriceGraph data={graphData}></PriceGraph>
        </div>
      </div>
    </>
  );
}
