import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import sendAPI from '../utils/sendAPI';
import useInput from '../hooks/useInput';

import { REGIONS } from '../utils/constants';
import { addUserFavoriteRegion } from '../store/userSlice';
import './FavoriteRegions.scss';
import FavoriteRegionList from './FavoriteRegionsList';

export default function SetFavoriteRegion() {
  const [message, setMessage] = useState(null);
  const [inputValue, onChange] = useInput('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInformation);
  const searchedRegions = REGIONS.filter((region) =>
    region.includes(inputValue),
  );

  const handleAddRegion = async () => {
    const enteredRegion = inputValue;

    if (!REGIONS.includes(enteredRegion)) {
      setMessage(
        '서울시의 행정동이 아닙니다. 동명으로 검색해주세요. Ex. 삼성동',
      );
      return;
    }

    if (user.favoriteRegions.includes(enteredRegion)) {
      setMessage('이미 선택된 관심지역입니다.');
      return;
    }

    if (user.favoriteRegions.length === 3) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    }

    await sendAPI('/users/user/favorites/regions', 'post', {
      region: enteredRegion,
    });

    dispatch(addUserFavoriteRegion(enteredRegion));
  };

  const handleAutoInputValue = async (event) => {
    if (user.favoriteRegions.includes(event.target.innerText)) {
      setMessage('이미 선택된 관심지역입니다.');
      return;
    }

    if (user.favoriteRegions.length === 3) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    }

    if (user.favoriteRegions.length === 3) {
      setMessage('관심지역의 갯수를 초과하였습니다.');
      return;
    }

    await sendAPI('/users/user/favorites/regions', 'post', {
      region: event.target.innerText,
    });

    dispatch(addUserFavoriteRegion(event.target.innerText));
  };

  return (
    <div className='favorite-region-container'>
      <div className='favorite-region-search'>
        <input
          placeholder='동명으로 검색'
          onChange={onChange}
          onFocus={() => setMessage('')}
          onBlur={() => setMessage('')}
        />
        <button onClick={handleAddRegion}>추가</button>
      </div>
      {message && <span className='favorite-region-message'>{message}</span>}
      {inputValue && (
        <ul>
          {searchedRegions.map((region, index) => {
            return (
              <li key={index} onClick={handleAutoInputValue}>
                {region}
              </li>
            );
          })}
        </ul>
      )}
      <FavoriteRegionList />
    </div>
  );
}
