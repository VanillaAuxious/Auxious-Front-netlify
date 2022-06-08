import { useState } from 'react';
import Map from '../components/Map';

export default function SearchPlace() {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  return (
    <div>
      <form className='inputForm' onSubmit={handleSubmit}>
        <input
          placeholder='Search Place...'
          onChange={onChange}
          value={inputText}
        />
        <button type='submit'>검색</button>
      </form>
      <Map />
    </div>
  );
}
