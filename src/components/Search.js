import { SearchButton } from '../common/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import SearchInput from '../common/Searchinput';
import useInput from '../hooks/useInput';

function Search() {
  const [input, onChange] = useInput('');
  const [filterType, setFilterType] = useState([]);
  const { place } = useParams();

  const navigate = useNavigate();

  const serachRegion = () => {
    navigate(`/search/${input}?type=${filterType}`);
  };

  const addFilterType = (event) => {
    let query = decodeURI(window.location.search).split('=')[1];

    if (window.location.href.includes('search')) {
      if (query.includes(event.target.innerText)) {
        const newQuery = query.replace(event.target.innerText, '');
        navigate(`/search/${place}?type=${newQuery}`);
      } else {
        const newFilterType = [...query];
        newFilterType.push(event.target.innerText);
        navigate(`/search/${place}?type=${newFilterType.join('')}`);
      }
    } else {
      if (filterType.includes(event.target.innerText)) {
        const newFilterType = [...filterType];
        for (let i = 0; i < newFilterType.length; i++) {
          if (newFilterType[i] === event.target.innerText) {
            newFilterType.splice(i, 1);
            i--;
          }
        }

        setFilterType([...newFilterType]);
      } else {
        const newFilterType = [...filterType];
        newFilterType.push(event.target.innerText);

        setFilterType([...newFilterType]);
      }
    }
  };

  return (
    <div className=''>
      <SearchInput onChange={onChange}></SearchInput>
      <SearchButton onClick={serachRegion}></SearchButton>
      <button onClick={addFilterType}>아파트</button>
      <button onClick={addFilterType}>주택</button>
      <button onClick={addFilterType}>오피스텔/원룸</button>
      <button onClick={addFilterType}>다세대/다가구</button>
    </div>
  );
}

export default Search;
