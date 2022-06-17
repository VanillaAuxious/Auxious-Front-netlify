import { createPortal } from 'react-dom';
import Backdrop from '../common/Backdrop';

import useInput from '../hooks/useInput';

import './InputModal.scss';

export default function InputModal({ onCancelModal, onUpdateData }) {
  const [inputValue, onChange] = useInput('');

  const handleUpdateDescription = async (event) => {
    event.preventDefault();
    const updateData = await onUpdateData(inputValue);

    if (updateData.ok) {
      onCancelModal();
    }
  };

  return (
    <>
      {createPortal(
        <Backdrop onClick={onCancelModal} />,
        document.querySelector('#backdrop-root'),
      )}
      {createPortal(
        <form className='modal-container' onSubmit={handleUpdateDescription}>
          <span>변경할 정보를 입력해 주세요 (최대 15자)</span>
          <input
            type='text'
            maxLength='15'
            value={inputValue}
            onChange={onChange}
          />
          <button>제출하기</button>
          <div onClick={onCancelModal}>&#10005;</div>
        </form>,
        document.querySelector('#overlay-root'),
      )}
    </>
  );
}
