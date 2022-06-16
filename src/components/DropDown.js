import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DropDown(props) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleDropDown = () => {
    setShowMenu(true);
  };

  const getSignPage = (event) => {
    navigate(`/sign/${event.target.innerText}`);
  };

  return (
    <>
      <div onClick={handleDropDown}>{props.title}</div>
      <br></br>
      <ul>
        {showMenu &&
          props.option.map((option, index) => {
            return (
              <li key={index} onClick={getSignPage}>
                {option}
              </li>
            );
          })}
      </ul>
    </>
  );
}
