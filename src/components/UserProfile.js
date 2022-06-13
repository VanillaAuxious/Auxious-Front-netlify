import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';

import useAxios from '../hooks/useAxios';
import InputModal from './InputModal';

import { patchUserData } from '../store/userSlice';

import './UserProfile.scss';

export default function UserProfile() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { username, description, profileImage } = useSelector(
    (state) => state.user.userInformation,
  );

  const updateUserDescription = async (newFieldData) => {
    const response = await useAxios('/users/user', 'patch', {
      fieldName: 'description',
      newFieldData,
    });

    if (!response.ok) return false;

    dispatch(patchUserData({ fieldName: 'description', data: newFieldData }));

    return true;
  };

  return (
    <>
      <img className='img-logo' src='/img/logo.png' alt='logo' />
      <div className='user-profile-container'>
        <div className='user-profile'>
          <div className='user-profile-img'>
            {profileImage && <img src={profileImage} />}
            {!profileImage && <BsPerson className='basic-profile-img' />}
          </div>
          <div className='user-profile-info'>
            <span>{username}</span>
            <span>{description}</span>
            <div onClick={() => setShowModal(true)}>자기소개 변경하기</div>
          </div>
        </div>
        <Link className='favorite-region-link' to='/favoriteregion'>
          관심지역 설정
        </Link>
      </div>
      {showModal && (
        <InputModal
          onCancelModal={() => setShowModal(false)}
          onUpdateData={updateUserDescription}
        />
      )}
    </>
  );
}
