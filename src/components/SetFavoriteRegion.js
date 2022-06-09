import { useSelector, useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useState } from 'react';

import useAxios from '../hooks/useAxios';
import useInput from '../hooks/useInput';

const regionArray = [
  '신사동',
  '압구정동',
  '논현동',
  '청담동',
  '삼성동',
  '대치동',
  '역삼동',
  '도곡동',
  '개포동',
  '일원동',
  '수서동',
  '세곡동',
  '자곡동',
  '율현동',
];

export default function SetFavoriteRegion() {
  const [message, setMessage] = useState(null);
  const [inputValue, onChange] = useInput('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInformation);

  const addRegionHandler = async () => {
    if (!regionArray.includes(inputValue)) {
      setMessage('서울의 동이 아닙니다. 동명으로 검색해주세요');

      return;
    } else if (user.favoriteRegions.includes(inputValue)) {
      setMessage('이미 관심지역입니다.');

      return;
    }

    await useAxios('/users/user/favorites/regions', 'post', {
      region: inputValue,
    });

    const data = inputValue;

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
        regionArray.filter((region, index) => {
          return region.includes(inputValue) ? (
            <div key={index} onClick={autoInputValueHandler}>
              {region}
            </div>
          ) : null;
        })}
      {message && <div>{message}</div>}
      <button onClick={addRegionHandler}>검색</button>
    </div>
  );
}
