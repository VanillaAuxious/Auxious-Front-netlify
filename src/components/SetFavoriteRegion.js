import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAxios from '../hooks/useAxios';
import useInput from '../hooks/useInput';

import { Regions } from '../utils/constants';
import { addUserFavoriteRegion } from '../store/userSlice';

export default function SetFavoriteRegion() {
  const [message, setMessage] = useState(null);
  const [inputValue, onChange] = useInput('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInformation);

  const addRegionHandler = async () => {
    const enteredRegion = inputValue;

    if (!Regions.includes(enteredRegion)) {
      setMessage(
        '서울시의 행정동이 아닙니다. 동명으로 검색해주세요. Ex. 삼성동',
      );
      return;
    } else if (user.favoriteRegions.includes(enteredRegion)) {
      setMessage('이미 선택된 관심지역입니다.');
      return;
    }

    await useAxios('/users/user/favorites/regions', 'post', {
      region: enteredRegion,
    });

    dispatch(addUserFavoriteRegion(data));
  };

  const autoInputValueHandler = async (event) => {
    await useAxios('/users/user/favorites/regions', 'post', {
      region: event.target.innerText,
    });

    dispatch(addUserFavoriteRegion(event.target.innerText));
  };

  return (
    <div>
      <input placeholder='동명으로 검색' onChange={onChange}></input>
      {inputValue &&
        Regions.filter((region, index) => {
          return region.includes(inputValue) ? (
            <div key={index} onClick={autoInputValueHandler}>
              {region}
            </div>
          ) : null;
        })}
      {message && <div>{message}</div>}
      <button onClick={addRegionHandler}>+</button>
    </div>
  );
}
