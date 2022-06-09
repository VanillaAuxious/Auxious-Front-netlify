import { useDispatch } from 'react-redux';
import { addUserFavoriteRegion } from '../store/userSlice';
import { useEffect, useRef, useState } from 'react';
import { getLocation } from '../utils/location';

import useAxios from '../hooks/useAxios';

export default function AddressByPoint() {
  const [currentAddress, setCurrentAddress] = useState();
  const dispatch = useDispatch();
  const position = getLocation();
  const mapElement = useRef();
  const kakao = window.kakao;

  useEffect(() => {
    const container = mapElement.current;

    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const hiddenMap = new kakao.maps.Map(container, options);
    const geocoder = new kakao.maps.services.Geocoder();

    if (position) {
      geocoder.coord2RegionCode(position[0], position[1], getAddress);
    }
  }, [position]);

  const getAddress = async (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setCurrentAddress(result[0].address_name);
    }
  };

  const addRegionHandler = async () => {
    await useAxios('/users/user/favorites/regions', 'post', {
      region: currentAddress,
    });

    dispatch(addUserFavoriteRegion(currentAddress));
  };

  return (
    <>
      <button onClick={addRegionHandler}>현재 위치로 검색하기</button>
      <div
        id='hidden_map'
        display='block'
        style={{ display: 'none', width: '500px', height: '500px' }}
        ref={mapElement}></div>
    </>
  );
}
