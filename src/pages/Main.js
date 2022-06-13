import { useState } from 'react';

import Search from '../components/Search';
import NavBar from '../components/NavBar';

export default function Main() {
  const [isHid, setIsHid] = useState(false);

  return (
    <>
      <Search onHideNavBar={setIsHid} />
      {!isHid && <NavBar />}
    </>
  );
}
