import './style.css';
import { useEffect } from 'react';

function Map({ searchPlace }) {
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.addEventListener('load', () => {
        resolve();
      });
      script.addEventListener('error', (error) => {
        reject(error);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    const searchScript = new_script(
      'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30cc1c964fcfcdf1e9ed6ab223dc6995',
    );

    searchScript.then(() => {
      const kakao = window['kakao'];

      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOptions = {
          center: new kakao.maps.LatLng(37.508673975249614, 127.05974650150894),
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions);
        const markerPosition = new kakao.maps.LatLng(
          37.508673975249614,
          127.05974650150894,
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    });
  }, []);

  return (
    <div>
      <div id='map' className='map' />
    </div>
  );
}

export default Map;
