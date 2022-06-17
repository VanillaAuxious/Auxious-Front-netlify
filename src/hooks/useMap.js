import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGraphData } from '../utils/graph';

import useAxios from './useAxios';

export default function useMap(type, mapElement) {
  const { place } = useParams();
  const [showAll, setShowAll] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentCenter, setCurrentCenter] = useState([37.5, 127.0]);
  const [graphData, setGraphData] = useState({});
  const [isMap, setIsMap] = useState(false);
  const [newType, setNewType] = useState();
  const [buildings, setBuildings] = useState(false);
  const infoWindowArray = [];
  const auctionMarkers = [];
  const forSalesArray = [];
  const forSalesMarkersArray = [];
  const kakao = window.kakao;
  const navigate = useNavigate();
  let cluster;
  let commonCluster;

  useEffect(() => {
    const mapContainer = mapElement.current;

    const mapOptions = {
      center: new kakao.maps.LatLng(currentCenter[0], currentCenter[1]),
      level: 2,
      draggable: true,
      scrollwheel: true,
    };

    const map = !isMap ? new kakao.maps.Map(mapContainer, mapOptions) : isMap;
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();
    map.setMinLevel(4);
    map.setMaxLevel(7);
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 7,
    });

    const commonClusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 7,
    });

    cluster = clusterer;
    commonCluster = commonClusterer;

    ps.keywordSearch(decodeURI(place), (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        if (newType !== type) {
          map.setBounds(bounds);
          setNewType(type);
        }
      }
    });

    if (showAll) {
      ShowForSaleMarkers(map);
    } else {
      deleteForSaleMarkers(map);
    }

    setIsMap(map);
    mapContainer.ontouchend = getMaxDistance(map, geocoder);
  }, [place, showAll]);

  const getMaxDistance = (map, geocoder) => {
    kakao.maps.event.preventMap();
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
            setCurrentAddress(result[0].address_name.split(' ')[2]);
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

      setGraphData(getGraphData(buildings));
      setBuildings(buildings);
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

  const setAuctionsMarker = (map, allBuildings) => {
    if (!allBuildings) return;

    const buildings = auctionsFilter(allBuildings);
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
    const imageSize = new kakao.maps.Size(64, 69);
    const imageOption = { offset: new kakao.maps.Point(27, 69) };

    for (let i = 0; i < auctionMarkers.length; i++) {
      cluster.removeMarker(auctionMarkers[i]);
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
      cluster.addMarker(auctionMarker);

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
          forSalesArray[i].price,
        removable: true,
      });

      const forSalesMarker = new kakao.maps.Marker({
        position: markerPosition,
      });

      infoWindowArray.push(infoWindow);
      forSalesMarkersArray.push(forSalesMarker);
      forSalesMarker.setMap(map);
      commonCluster.addMarker(forSalesMarker);

      kakao.maps.event.addListener(forSalesMarker, 'click', () => {
        closeInfoWindow();
        infoWindow.open(map, forSalesMarker);
      });
    }

    forSalesArray.splice(0, forSalesArray.length);
  };

  const deleteForSaleMarkers = () => {
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

      for (let i = 0; i < buildings.length; i++) {
        if (type.includes(buildings[i].buildingType)) {
          newAuctionsArray.push(buildings[i]);
        }
      }
      return newAuctionsArray;
    }
    return buildings;
  };

  return { showAll, setShowAll, currentAddress, graphData, buildings };
}
