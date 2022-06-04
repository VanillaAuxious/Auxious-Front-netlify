import { LongButton, ShortButton } from './common/Button';

function App() {
  return (
    <div className='App'>
      <LongButton className='blue-colored'>긴 버튼입니다.</LongButton>
      <ShortButton className='gray-colored'>짧은 버튼입니다.</ShortButton>
    </div>
  );
}

export default App;
