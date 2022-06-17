import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserFavoriteRegion,
  deleteUserFavoriteRegion,
} from '../store/userSlice';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

import useInput from '../hooks/useInput';
import useMap from '../hooks/useMap';
import useAxios from '../hooks/useAxios';
import BottomSheet from '../components/BottomSheet';

import './Map.scss';

export default function Map() {
  const location = useLocation();
  const { place } = useParams();
  const newQuery = new URLSearchParams(location.search);
  const type = newQuery.get('type');
  const [input, onChange] = useInput();
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState({
    apartment: false,
    studio: false,
    multiUnit: false,
    house: false,
    forSale: false,
  });
  const mapElement = useRef(null);
  const user = useSelector((state) => state.user.userInformation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showAll, graphData, buildings, setShowAll, setSearchPlace } = useMap(
    place,
    type,
    mapElement,
  );

  useEffect(() => {
    if (type) {
      const typeArray = type.split(',');

      if (typeArray.includes('아파트')) {
        setIsChecked(
          (prevState) =>
            (prevState = { ...prevState, apartment: !prevState.apartment }),
        );
      }

      if (typeArray.includes('주택')) {
        setIsChecked(
          (prevState) =>
            (prevState = { ...prevState, house: !prevState.house }),
        );
      }

      if (typeArray.includes('오피스텔/원룸')) {
        setIsChecked(
          (prevState) =>
            (prevState = { ...prevState, studio: !prevState.studio }),
        );
      }

      if (typeArray.includes('다세대/다가구')) {
        setIsChecked(
          (prevState) =>
            (prevState = { ...prevState, multiUnit: !prevState.multiUnit }),
        );
      }
    }
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setIsChecked(
      (prevState) =>
        (prevState = { ...prevState, forSale: !prevState.forSale }),
    );
  };

  const handleUserFavorites = async () => {
    if (user.favoriteRegions.length > 2) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    }

    if (!user.favoriteRegions.includes(place)) {
      await useAxios('/users/user/favorites/regions', 'post', {
        region: place,
      });

      dispatch(addUserFavoriteRegion(place));
    } else {
      await useAxios(`/users/user/favorites/regions/${place}`, 'delete');

      dispatch(deleteUserFavoriteRegion(place));
    }
  };

  const handleFilter = (event) => {
    const targetDivText = event.target.innerText;

    if (type.includes(targetDivText)) {
      const query = type.replace(targetDivText, '');
      navigate(`/search/${place}?type=${query}`);
    } else {
      const newFilterType = [...type];
      newFilterType.push(targetDivText);
      navigate(`/search/${place}?type=${newFilterType.join('')}`);
    }

    if (targetDivText === '아파트') {
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, apartment: !prevState.apartment }),
      );
    }

    if (targetDivText === '주택') {
      setIsChecked(
        (prevState) => (prevState = { ...prevState, house: !prevState.house }),
      );
    }

    if (targetDivText.includes('오피스텔')) {
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, studio: !prevState.studio }),
      );
    }

    if (targetDivText.includes('다세대')) {
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, multiUnit: !prevState.multiUnit }),
      );
    }
  };

  const handleSearchInput = () => {
    setSearchPlace(input);
    navigate(`/search/${input}?type=${type}`);
  };

  return (
    <div className='search-container'>
      <img src='/img/logo.png' alt='logo' sizes='small' />
      <div className='map-search-container'>
        {message && <span className='favorite-region-message'>{message}</span>}
        <div className='map-search-input'>
          <input placeholder='지역을 입력하세요' onChange={onChange}></input>
          <button id='search' onClick={handleSearchInput}>
            <BsSearch />
          </button>
        </div>
        <div
          className='search-add-region'
          style={{
            color: user.favoriteRegions.includes(place) && '#fff',
            backgroundColor: user.favoriteRegions.includes(place) && '#2d3d72',
          }}
          onClick={handleUserFavorites}>
          관심 지역+
        </div>
      </div>
      <div className='search-types'>
        <div
          className='map-search-types'
          onClick={handleFilter}
          style={{
            backgroundColor: isChecked.apartment && '#345ee7',
          }}>
          아파트
        </div>
        <div
          className='map-search-types'
          onClick={handleFilter}
          style={{
            backgroundColor: isChecked.house && '#345ee7',
          }}>
          주택
        </div>
        <div
          className='map-search-types'
          onClick={handleFilter}
          style={{
            backgroundColor: isChecked.multiUnit && '#345ee7',
          }}>
          다세대/다가구
        </div>
        <div
          className='map-search-types'
          onClick={handleFilter}
          style={{
            backgroundColor: isChecked.studio && '#345ee7',
          }}>
          오피스텔/원룸
        </div>
      </div>
      <div className='map-container'>
        <div id='map' className='map' ref={mapElement} />
        <div
          className='map-search-types for-sale'
          style={{
            opacity: isChecked.forSale && 1,
          }}
          onClick={toggleShowAll}>
          일반매물
        </div>
      </div>

      <BottomSheet data={buildings} />
    </div>
  );
}
