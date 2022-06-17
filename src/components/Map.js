import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import useInput from '../hooks/useInput';
import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import PriceGraph from '../components/PriceGraph';
import BottomSheet from '../components/BottomSheet';

import useSearchTypeFilter from '../hooks/useSearchTypeFilter';

import './Map.scss';

export default function Map() {
  const location = useLocation();
  const newQuery = new URLSearchParams(location.search);
  const type = newQuery.get('type');
  const [input, onChange] = useInput();
  const [message, setMessage] = useState('');
  const mapElement = useRef(null);
  const user = useSelector((state) => state.user.userInformation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { filterType, isChecked, handleFilterType } = useSearchTypeFilter();

  const { showAll, setShowAll, currentAddress, graphData, buildings } = useMap(
    type,
    mapElement,
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleUserFavorites = async () => {
    if (user.favoriteRegions.length > 2) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    } else if (user.favoriteRegions.includes(currentAddress)) {
      setMessage('이미 선택된 관심지역입니다.');
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
    navigate(`/search/${input}?type=${filterType.join('&')}`);
  };

  return (
    <>
      <img src='/img/logo.png' alt='logo' sizes='small' />
      <div className='map-search-container'>
        {message && <span className='favorite-region-message'>{message}</span>}
        <div className='map-search-input'>
          <input placeholder='지역을 입력하세요' onChange={onChange} />
          <button id='search' onClick={handleSearchInput}>
            <BsSearch />
          </button>
        </div>
        <div className='search-addregion' onClick={handleUserFavorites}>
          관심 지역+
        </div>
      </div>
      <div className='search-types' onClick={handleFilterType}>
        <div
          className='map-search-types'
          style={{
            backgroundColor: isChecked.apartment && '#345ee7',
          }}>
          아파트
        </div>
        <div
          className='map-search-types'
          style={{
            backgroundColor: isChecked.house && '#345ee7',
          }}>
          주택
        </div>
        <div
          className='map-search-types'
          style={{
            backgroundColor: isChecked.studio && '#345ee7',
          }}>
          다세대/다가구
        </div>
        <div
          className='map-search-types'
          style={{
            backgroundColor: isChecked.multiUnit && '#345ee7',
          }}>
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
          <div>단위(백만)</div>
          <PriceGraph data={graphData}></PriceGraph>
        </div>
      </div>
      {/* <BottomSheet data={buildings} /> */}
    </>
  );
}
