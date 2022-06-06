import './style.css';
import { useEffect } from 'react';

function Map({ searchPlace }) {
  console.log('🔥 검색창에서 입력한거 나오고 있음', searchPlace);
  // 스크립트 파일 읽어오는 부분
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
    // 카카오맵 스크립트 읽어오는 부분
    const searchScript = new_script(
      'https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=30cc1c964fcfcdf1e9ed6ab223dc6995',
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    searchScript.then(() => {
      console.log('🥳 script loaded!!!');
      const kakao = window['kakao'];

      kakao.maps.load(() => {
        const mapContainer = document.getElementById('map'); // 지도를 표시할 div
        const mapOptions = {
          center: new kakao.maps.LatLng(37.508673975249614, 127.05974650150894), // 지도 중심좌표
          level: 3, // 지도 확대 레벨
          // title: position.longitude,
          // image: null,
          // clickable: true,
        };
        const map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성
        const markerPosition = new kakao.maps.LatLng( // 이동할 지도 중심좌표 설정
          37.508673975249614,
          127.05974650150894,
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map); // 지도 중심좌표 이동
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
