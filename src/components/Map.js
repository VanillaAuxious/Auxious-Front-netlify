import { useParams } from 'react-router-dom';
import { useRef } from 'react';

import useMap from '../hooks/useMap';

import './Map.css';

export default function Map() {
  const { place } = useParams();
  const newQuery = decodeURI(window.location.search).split('=')[1];
  const mapElement = useRef(null);
  const [showAll, setShowAll] = useMap(place, newQuery, mapElement);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <button onClick={toggleShowAll}>asd</button>
      <div id='map' className='map' ref={mapElement} />
    </div>
  );
}
