import { useEffect } from 'react';

import './Map.css';

function Map() {
  function newScript(src) {
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
  }

  useEffect(() => {
    const scripting = async () => {
      await newScript(
        `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.REACT_APP_KAKAO_API_JAVASCRIPT_KEY}`,
      );

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
    };

    scripting();
  }, []);

  return (
    <div>
      <div id='map' className='map' />
    </div>
  );
}

export default Map;
