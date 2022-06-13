import { useState } from 'react';

export default function useSearchTypeFilter() {
  const [filterType, setFilterType] = useState([]);
  const [isChecked, setIsChecked] = useState({
    apartment: false,
    house: false,
    studio: false,
    multiUnit: false,
  });

  const handleFilterType = (event) => {
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

  return {
    filterType,
    isChecked,
    handleFilterType,
  };
}
