import React, { useState } from 'react';
import { Header } from './components/Header';
import { LongButton, ShortButton } from './common/Button';
import { Loading } from './common/LoadingSpinner';
import { SearchInput } from './common/Searchinput';
import { Card } from './common/Card';
import { Accordion } from './common/Accordion';
import data from './common/data';
import { Navbar } from './components/NavBar';
import './common/style.css';

function App() {
  const [auction, setAuction] = useState(data);

  return (
    <div className='App'>
      <Header />
      <Loading />
      <LongButton className='real-blue-colored'>찐한 파랑 버튼</LongButton>
      <LongButton className='middle-blue-colored'>중간 파랑 버튼</LongButton>
      <ShortButton className='real-gray-colored'>중간 회색 버튼</ShortButton>
      <ShortButton className='middle-gray-colored'>연한 회색 버튼</ShortButton>
      <SearchInput />
      <Card className='cardBox'>아파트</Card>
      <section className='info'>
        {auction.map((accordion) => {
          return <Accordion key={accordion.id} {...accordion} />;
        })}
      </section>
      <Navbar />
    </div>
  );
}

export default App;
