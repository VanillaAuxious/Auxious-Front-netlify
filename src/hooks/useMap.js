import { useEffect, useState } from 'react';
import useAxios from './useAxios';
import { useNavigate } from 'react-router-dom';

export default function useMap(data, place) {
  const [map, setMap] = useState();
  const [auctions, setAuctions] = useState([]);
  const [forSales, setforSales] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const forSalesMarkers = [];
  const infoWindowArray = [];

  const navigate = useNavigate();
  const kakao = window.kakao;

  useEffect(() => {
    const mapContainer = document.getElementById('map');

    const mapOptions = {
      center: new kakao.maps.LatLng(37.51431716812058, 127.06282762463266),
      level: 3,
      draggable: true,
      scrollwheel: true,
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions);
    setMap(map);
    const geocoder = new kakao.maps.services.Geocoder();

    setAuctionsMarker(map);
    setForSalesMarker(map);

    geocoder.addressSearch(place, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const searchCoords = new kakao.maps.LatLng(result[0].y, result[0].x);

        map.setCenter(searchCoords);
        getMaxDistance(map);
      }
    });

    if (showAll) {
      ShowForSaleMarkers(map);
    } else {
      deleteForSaleMarkers(map);
    }

    kakao.maps.event.addListener(map, 'center_changed', getMaxDistance(map));
  }, [place, auctions, forSales, showAll]);

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

      const buildings = await useAxios(
        `/buildings/?coords=${centerPoint}&max-distance=${length}`,
        'get',
      );

      setAuctions(buildings.auction);
      setforSales(buildings.forSale);
    };
  };

  const showDetailPage = (buildingId) => {
    return function () {
      navigate(`/detail/${buildingId}`);
    };
  };

  const setAuctionsMarker = (map) => {
    if (auctions) {
      for (let i = 0; i < auctions.length; i++) {
        const markerPosition = new kakao.maps.LatLng(
          auctions[i].coords[0],
          auctions[i].coords[1],
        );

        const auctionMarker = new kakao.maps.Marker({
          position: markerPosition,
        });

        auctionMarker.setMap(map);

        kakao.maps.event.addListener(
          auctionMarker,
          'click',
          showDetailPage(auctions[i]._id),
        );
      }
    }
  };

  const setForSalesMarker = (map) => {
    if (forSales) {
      for (let i = 0; i < forSales.length; i++) {
        const markerPosition = new kakao.maps.LatLng(
          forSales[i].coords[0],
          forSales[i].coords[1],
        );

        const infoWindow = new kakao.maps.InfoWindow({
          position: markerPosition,
          content:
            forSales[i].name + forSales[i].squareMeters + forSales[i].Price,
          removable: true,
        });
        infoWindowArray.push(infoWindow);

        const forSalesMarker = new kakao.maps.Marker({
          position: markerPosition,
        });

        forSalesMarkers.push(forSalesMarker);

        kakao.maps.event.addListener(forSalesMarker, 'click', () => {
          closeInfoWindow();
          infoWindow.open(map, forSalesMarker);
        });
      }
    }
  };

  const ShowForSaleMarkers = (map) => {
    if (forSalesMarkers) {
      for (let i = 0; i < forSalesMarkers.length; i++) {
        forSalesMarkers[i].setMap(map);
      }
    }
  };

  const deleteForSaleMarkers = () => {
    if (forSalesMarkers) {
      for (let i = 0; i < forSalesMarkers.length; i++) {
        forSalesMarkers[i].setMap(null);
      }
    }
  };
  const closeInfoWindow = () => {
    for (let i = 0; i < infoWindowArray.length; i++) {
      infoWindowArray[i].close();
    }
  };

  return [setShowAll, showAll];
}
