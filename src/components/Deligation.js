import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import Backdrop from './Backdrop';

import { AGENTS } from '../utils/constants';

import './Deligation.scss';

export default function Deligation({ auctionNumber }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleDropDown = () => {
    setShowMenu(!showMenu);
  };

  const getSignPage = (event) => {
    navigate(`/sign/${event.target.innerText}?auctionNumber=${auctionNumber}`);
  };

  return (
    <>
      {!showMenu && (
        <div className='deligation-btn' onClick={handleDropDown}>
          <span>권한위임</span>
        </div>
      )}
      {showMenu && (
        <>
          {<Backdrop onClick={handleDropDown} />}
          {createPortal(
            <>
              <ul className='delegation-modal'>
                <h5>중개인을 선택하세요</h5>

                {AGENTS.map((agent, index) => {
                  return (
                    <li key={index} onClick={getSignPage}>
                      {agent}
                    </li>
                  );
                })}
                <div
                  className='delegation-modal-x-btn'
                  onClick={handleDropDown}>
                  <span>&#10005;</span>
                </div>
              </ul>
            </>,
            document.querySelector('#overlay-root'),
          )}
        </>
      )}
    </>
  );
}
