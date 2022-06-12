import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsPerson } from 'react-icons/bs';

import useInput from '../hooks/useInput';
import useAxios from '../hooks/useAxios';

import { patchUserData } from '../store/userSlice';

import './UserProfile.scss';

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, onChange] = useInput('');
  const { username, description, profileImage } = useSelector(
    (state) => state.user.userInformation,
  );

  const updateUserDescription = async () => {
    const newDescription = inputValue.join('');
    const fieldName = 'description';

    await useAxios('/users/user', 'patch', {
      fieldName: 'description',
      newFieldData: newDescription,
    });

    dispatch(patchUserData({ fieldName, data: newDescription }));
  };

  const navigateSetFavoriteRegionPage = () => {
    navigate('/favoriteregion');
  };

  return (
    <div className='user-profile-container'>
      <img className='img-logo' src='/img/logo.png' alt='logo' />
      <div className='user-profile'>
        <div className='user-profile-img'>
          {profileImage && <img src={profileImage} />}
          {!profileImage && <BsPerson className='basic-profile-img' />}
        </div>
        <div className='user-profile-info'>
          <span>{username}</span>
          <input
            type='text'
            onChange={onChange}
            value={inputValue}
            placeholder={description}
            onBlur={updateUserDescription}
          />
        </div>
      </div>
      <div
        className='forSale-Interest-Area'
        onClick={navigateSetFavoriteRegionPage}>
        관심지역 설정
      </div>
    </div>
  );
}
