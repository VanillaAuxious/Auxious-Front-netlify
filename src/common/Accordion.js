import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import './Accordion.scss';

export default function Accordion({ title, children }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <article className='accordion'>
      <div>
        <h4>{title}</h4>
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showInfo && children}
    </article>
  );
}
