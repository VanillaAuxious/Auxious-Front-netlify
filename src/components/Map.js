import { useParams } from 'react-router-dom';

import useMap from '../hooks/useMap';

import './Map.css';

export default function Map(data) {
  const { place } = useParams();
  const [setShowAll, showAll] = useMap(data, place);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <button onClick={toggleShowAll}>asd</button>
      <div id='map' className='map' />
    </div>
  );
}
