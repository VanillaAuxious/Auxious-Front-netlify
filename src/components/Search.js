import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';
import useSearchTypeFilter from '../hooks/useSearchTypeFilter';

import NavBar from './NavBar';

import './Search.scss';

export default function Search() {
  const [isHid, setIsHid] = useState(false);
  const [input, onChange] = useInput('');
  const navigate = useNavigate();
  const { filterType, isChecked, handleFilterType } = useSearchTypeFilter();

  const handleSearchRegion = () => {
    navigate(`/search/${input}?type=${filterType}`);
  };

  const handleHideNavBar = () => {
    setIsHid(true);
  };

  const handleShowNavBar = () => {
    setIsHid(false);
  };

  return (
    <>
      <div className='main-search-container'>
        <img src='/img/logo.png' alt='logo' />
        <h4>Please select an auction area.</h4>
        <h4>Enter the administrative district of Seoul.</h4>
        <div className='main-search-types' onClick={handleFilterType}>
          <div
            style={{
              backgroundColor: isChecked.apartment && '#345ee7',
            }}>
            아파트
          </div>
          <div
            style={{
              backgroundColor: isChecked.house && '#345ee7',
            }}>
            주택
          </div>
          <div
            style={{
              backgroundColor: isChecked.studio && '#345ee7',
            }}>
            오피스텔/원룸
          </div>
          <div
            style={{
              backgroundColor: isChecked.multiUnit && '#345ee7',
            }}>
            다세대/다가구
          </div>
        </div>
        <div className='main-search-input'>
          <input
            placeholder=' 지역명을 입력하세요.'
            onChange={onChange}
            onFocus={handleHideNavBar}
            onBlur={handleShowNavBar}
            value={input}
          />
          <button
            onClick={handleSearchRegion}
            disabled={!input.trim().length}
            style={{
              backgroundColor: !input.trim().length && '#ccc',
              color: !input.trim().length && '#fff',
            }}>
            검색
          </button>
        </div>
      </div>
      {!isHid && <NavBar />}
    </>
  );
}
