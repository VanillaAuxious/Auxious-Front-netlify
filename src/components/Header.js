import Logo from '/img/logo.png';

function Header() {
  return (
    <header className='gnb'>
      <div className='gnb-wrap'>
        <h1 className='logo'>
          <div>
            <img src={Logo} alt='Logo' />
          </div>
        </h1>
      </div>
    </header>
  );
}

export default Header;
