import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useInput from '../hooks/useInput';
import NavBar from './NavBar';

import './Search.scss';

function Search() {
  const [isChecked, setIsChecked] = useState({
    apartment: false,
    house: false,
    studio: false,
    multiUnit: false,
  });
  const [isHid, setIsHid] = useState(false);
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
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, apartment: !prevState.apartment }),
      );
    }

    if (targetDivText === '주택') {
      setIsChecked(
        (prevState) => (prevState = { ...prevState, house: !prevState.house }),
      );
    }

    if (targetDivText.includes('오피스텔')) {
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, studio: !prevState.studio }),
      );
    }

    if (targetDivText.includes('다세대')) {
      setIsChecked(
        (prevState) =>
          (prevState = { ...prevState, multiUnit: !prevState.multiUnit }),
      );
    }
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
        <div className='main-search-types' onClick={handleAddFilterType}>
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
            오피스텔 원룸
          </div>
          <div
            style={{
              backgroundColor: isChecked.multiUnit && '#345ee7',
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
      {!isHid && <NavBar />}
    </>
  );
}

export default Search;
