import './Details.css';

const MOCK_DATA = [
  {
    id: 0,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
  },
  {
    id: 1,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
  },
  {
    id: 4,
    title: 'Lorem ipsum',
    subTitle: 'Lorem',
  },
];

export default function Details() {
  return (
    <section>
      <div className='img-logo'>
        <img src='/img/logo.png' alt='logo' />
      </div>
      <div className='details-heading'>
        <div className='details-icon'>
          <span>아이콘</span>
        </div>
        <div className='details-auction-number'>
          <span>경매번호</span>
        </div>
      </div>
      <div className='details-slides'>
        <button className='details-slide-btn'>&lt;</button>
        {MOCK_DATA.map((obj, index) => {
          return (
            <div key={obj.id} className='detail-slide'>
              <img src='/img/logo.png' alt='logo' />
            </div>
          );
        })}
        <button className='details-slide-btn'>&gt;</button>
      </div>
    </section>
  );
}
