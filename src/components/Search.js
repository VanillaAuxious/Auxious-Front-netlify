import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';

import './Search.scss';

function Search({ onHideNavBar }) {
  const [checkApartment, setCheckApartment] = useState(false);
  const [checkHouse, setCheckHouse] = useState(false);
  const [checkStudio, setCheckStudio] = useState(false);
  const [checkMultiUnit, setCheckMultiUnit] = useState(false);
  const [input, onChange] = useInput('');
  const [filterType, setFilterType] = useState([]);

  const navigate = useNavigate();

  const handleSearchRegion = () => {
    navigate(`/search/${input}?type=${filterType}`);
  };

  const handleAddFilterType = (event) => {
    const targetDiv = event.target.closest(`div`);
    const targetDivText = targetDiv.innerText;

    if (filterType.includes(targetDivText)) {
      const newFilterType = filterType.filter((type) => type !== targetDivText);
      setFilterType(newFilterType);
    } else {
      setFilterType((prevState) => [...prevState, targetDivText]);
    }

    if (targetDivText === '아파트') {
      setCheckApartment((prevState) => !prevState);
    }

    if (targetDivText === '주택') {
      setCheckHouse((prevState) => !prevState);
    }

    if (targetDivText.includes('오피스텔')) {
      setCheckStudio((prevState) => !prevState);
    }

    if (targetDivText.includes('다세대')) {
      setCheckMultiUnit((prevState) => !prevState);
    }
  };

  const handleHideNavBar = () => {
    onHideNavBar(true);
  };

  const handleShowNavBar = () => {
    onHideNavBar(false);
  };

  return (
    <>
      <div className='main-search-container'>
        <img src='/img/logo.png' alt='logo' />
        <h4>Please select an auction area.</h4>
        <h4>Enter the administrative district of Seoul.</h4>
        <div className='main-search-types' onClick={handleAddFilterType}>
          <div
            style={{
              backgroundColor: checkApartment && '#345ee7',
            }}>
            아파트
          </div>
          <div
            style={{
              backgroundColor: checkHouse && '#345ee7',
            }}>
            주택
          </div>
          <div
            style={{
              backgroundColor: checkStudio && '#345ee7',
            }}>
            오피스텔 원룸
          </div>
          <div
            style={{
              backgroundColor: checkMultiUnit && '#345ee7',
            }}>
            다세대 다가구
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
          <button onClick={handleSearchRegion}>검색</button>
        </div>
      </div>
    </>
  );
}

export default Search;
