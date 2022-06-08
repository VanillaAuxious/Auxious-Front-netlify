import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAxios from '../hooks/useAxios';

import './Map.css';

export default function Map(data) {
  const [point, setPoint] = useState({ x: '33.450936', y: '126.569477' });
  const [showAll, setShowAll] = useState('only-auctions');
  const navigate = useNavigate();
  const kakao = window.kakao;

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    const mapOptions = {
      center: new kakao.maps.LatLng(point.x, point.y),
      level: 3,
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions);
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(map, 'dragend', getMaxDistance(map));
    kakao.maps.event.addListener(map, 'zoom_changed', getMaxDistance(map));

    for (let i = 0; i < data.length; i++) {
      const markerPosition = new kakao.maps.LatLng(
        data[i].latlng[0],
        data[i].latlng[1],
      );

      const auctionMarker = new kakao.maps.Marker({
        position: markerPosition,
      });

      auctionMarker.setMap(map);

      kakao.maps.event.addListener(
        auctionMarker,
        'click',
        showDetailPage(data[i]._id),
      );
    }
  }, [point, showAll]);

  const showDetailPage = (buildingId) => {
    return function () {
      navigate(`/detail/${buildingId}`);
    };
  };

  const getMaxDistance = (map) => {
    return async function () {
      const polyLine = new kakao.maps.Polyline({
        map: map,
        path: [map.getBounds().getSouthWest(), map.getBounds().getNorthEast()],
        strokeOpacity: 0,
      });

      const length = polyLine.getLength();
      const center = map.getCenter();
      const centerPoint = [center.Ma, center.La];

      setPoint({ x: center.getLat(), y: center.getLng() });

      await useAxios(
        `/buildings/?coords=${centerPoint}&max-distance=${length}&show=${showAll}`,
        'get',
      );
    };
  };

  return (
    <div>
      <div id='map' className='map' />
    </div>
  );
}
