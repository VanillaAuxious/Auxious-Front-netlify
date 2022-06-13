import { useRef } from 'react';

import useAxios from '../hooks/useAxios';

export default function PrifileImage() {
  const inputRef = useRef(null);

  const onUploadImage = async (e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    const image = e.target.files[0];
    formData.append('img', image);

    await useAxios('/users/user/image', 'post', formData);
  };

  const uploadProfileImage = () => {
    if (inputRef.current) return;

    inputRef.current.click();
  };

  return (
    <>
      <input
        accept='image/*'
        type='file'
        ref={inputRef}
        display='none'
        onChange={onUploadImage}></input>
      <button onClick={uploadProfileImage}>제출하기</button>
    </>
  );
}
