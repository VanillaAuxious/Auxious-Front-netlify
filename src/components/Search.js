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

    if (filterType.includes(targetDiv.innerText)) {
      const newFilterType = [...filterType];
      const targetTypeIndex = filterType.findIndex(
        (type) => type === targetDiv.innerText,
      );

      newFilterType.splice(targetTypeIndex, 1);

      setFilterType(newFilterType);
    } else {
      setFilterType((prevState) => [...prevState, targetDiv.innerText]);
    }

    if (targetDiv.innerText === '아파트') {
      setCheckApartment((prevState) => !prevState);
    }

    if (targetDiv.innerText === '주택') {
      setCheckHouse((prevState) => !prevState);
    }

    if (targetDiv.innerText.includes('오피스텔')) {
      setCheckStudio((prevState) => !prevState);
    }

    if (targetDiv.innerText.includes('다세대')) {
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
            className='apartment'
            style={{
              backgroundColor: checkApartment && '#345ee7',
            }}>
            아파트
          </div>
          <div
            className='house'
            style={{
              backgroundColor: checkHouse && '#345ee7',
            }}>
            주택
          </div>
          <div
            className='studio'
            style={{
              backgroundColor: checkStudio && '#345ee7',
            }}>
            오피스텔 원룸
          </div>
          <div
            className='multi-unit'
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
