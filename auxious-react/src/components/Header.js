import React from 'react';
import Logo from '../img/logo.png';

export function Header() {
  return (
    <header className='gnb'>
      <div className='gnb-wrap'>
        <h1 className='logo'>
          <div>
          {/* <Link to='/'> */}
            <img src={Logo} alt="Logo" />
          {/* </Link> */}
          </div>
        </h1>
      </div>
    </header>
  );
}
