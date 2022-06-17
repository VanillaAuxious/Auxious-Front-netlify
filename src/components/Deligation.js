import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Deligation({ title, option, className }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleDropDown = () => {
    setShowMenu(true);
  };

  const getSignPage = (event) => {
    navigate(
      `/sign/${event.target.innerText}?auctionNumber=${props.auctionNumber}`,
    );
  };

  return (
    <div className={className}>
      <div onClick={handleDropDown}>{title}</div>
      <ul>
        {showMenu &&
          option.map((option, index) => {
            return (
              <li key={index} onClick={getSignPage}>
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
