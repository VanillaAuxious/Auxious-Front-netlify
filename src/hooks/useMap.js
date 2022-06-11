import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useAxios from './useAxios';

export default function useMap(position, type, mapElement) {
  const { place } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentCenter, setCurrentCenter] = useState([37.5, 127.0]);
  const infoWindowArray = [];
  const auctionMarkers = [];
  const forSalesArray = [];
  const forSalesMarkersArray = [];
  const kakao = window.kakao;
  const navigate = useNavigate();

  useEffect(() => {
    const mapContainer = mapElement.current;
    const mapOptions = {
      center: new kakao.maps.LatLng(currentCenter[0], currentCenter[1]),
      level: 2,
      draggable: true,
      scrollwheel: true,
    };

    const map = new kakao.maps.Map(mapContainer, mapOptions);
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();

    if (position) {
      const coord = new kakao.maps.LatLng(position);

      geocoder.coord2Address(
        coord.getLng(),
        coord.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const newCenter = result[0].address_name;
            map.setCenter(newCenter);

            getMaxDistance(map);
          }
        },
      );
    } else {
      ps.keywordSearch(decodeURI(place), (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
        }
      });
    }

    if (showAll) {
      ShowForSaleMarkers(map);
    } else {
      deleteForSaleMarkers(map);
    }

    kakao.maps.event.addListener(
      map,
      'bounds_changed',
      getMaxDistance(map, geocoder),
    );
  }, [place, type, place, showAll]);

  const getMaxDistance = (map, geocoder) => {
    return async function () {
      const polyLine = new kakao.maps.Polyline({
        map: map,
        path: [map.getBounds().getSouthWest(), map.getBounds().getNorthEast()],
        strokeOpacity: 0,
      });

      geocoder.coord2RegionCode(
        map.getCenter().getLng(),
        map.getCenter().getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setCurrentAddress(result[0].address_name);
          }
        },
      );

      const length = polyLine.getLength();
      const center = map.getCenter();
      const centerPoint = [center.Ma, center.La];
      const buildings = await useAxios(
        `/buildings/?coords=${centerPoint}&max-distance=${length}`,
        'get',
      );

      setCurrentCenter(centerPoint);
      setAuctionsMarker(map, buildings.auctions);
      forSalesArray.push(...buildings.forSales);

      if (showAll) {
        ShowForSaleMarkers(map);
      } else {
        deleteForSaleMarkers(map);
      }
    };
  };

  const setAuctionsMarker = (map, buildings) => {
    if (!buildings) return;
    if (type) buildings = auctionsFilter(buildings);

    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
    const imageSize = new kakao.maps.Size(64, 69);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    for (let i = 0; i < auctionMarkers.length; i++) {
      auctionMarkers[i].setMap(null);
    }

    auctionMarkers.splice(0, auctionMarkers.length);

    for (let i = 0; i < buildings.length; i++) {
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      const markerPosition = new kakao.maps.LatLng(
        buildings[i].coords.coordinates[1],
        buildings[i].coords.coordinates[0],
      );

      const auctionMarker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      auctionMarkers.push(auctionMarker);
      auctionMarker.setMap(map);

      kakao.maps.event.addListener(
        auctionMarker,
        'click',
        showDetailPage(buildings[i]._id),
      );
    }
  };

  const ShowForSaleMarkers = (map) => {
    for (let i = 0; i < forSalesArray.length; i++) {
      const markerPosition = new kakao.maps.LatLng(
        forSalesArray[i].coords.coordinates[1],
        forSalesArray[i].coords.coordinates[0],
      );

      const infoWindow = new kakao.maps.InfoWindow({
        position: markerPosition,
        content:
          forSalesArray[i].name +
          forSalesArray[i].squareMeters +
          forSalesArray[i].Price,
        removable: true,
      });

      const forSalesMarker = new kakao.maps.Marker({
        position: markerPosition,
      });

      infoWindowArray.push(infoWindow);
      forSalesMarkersArray.push(forSalesMarker);
      forSalesMarker.setMap(map);

      kakao.maps.event.addListener(forSalesMarker, 'click', () => {
        closeInfoWindow();
        infoWindow.open(map, forSalesMarker);
      });
    }

    forSalesArray.splice(0, forSalesArray.length);
  };

  const deleteForSaleMarkers = (map) => {
    for (let i = 0; i < forSalesMarkersArray.length; i++) {
      forSalesMarkersArray[i].setMap(null);
    }

    forSalesMarkersArray.splice(0, forSalesMarkersArray.length);
    infoWindowArray.splice(0, infoWindowArray.length);
  };

  const closeInfoWindow = () => {
    for (let i = 0; i < infoWindowArray.length; i++) {
      infoWindowArray[i].close();
    }
  };

  const showDetailPage = (buildingId) => {
    return function () {
      navigate(`/detail/${buildingId}`);
    };
  };

  const auctionsFilter = (buildings) => {
    if (!buildings) return buildings;

    if (type) {
      const newAuctionsArray = [];

      for (let i = 0; i < buildings.length; ) {
        if (type.includes(buildings[i].buildingType)) {
          newAuctionsArray.push(buildings[i]);
        }

        return newAuctionsArray;
      }

      return buildings;
    }
  };

  return [showAll, setShowAll, currentAddress];
}
