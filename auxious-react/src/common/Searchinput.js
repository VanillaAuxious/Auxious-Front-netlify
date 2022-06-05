import React from 'react';
import { SearchButton } from './Button';
import './style.css';

export function SearchInput() {
  return (
    <div>
      <input className='searchBox' placeholder='검색어를 입력하세요.' />
      <SearchButton>검색</SearchButton>
    </div>
  );
}
