import { useEffect } from 'react';
import { SearchButton } from './Button';

function SearchInput() {
  useEffect(() => {}, []);

  return (
    <div>
      <input className='searchBox' placeholder='검색어를 입력하세요.' />
      <SearchButton>검색</SearchButton>
    </div>
  );
}

export default SearchInput;
