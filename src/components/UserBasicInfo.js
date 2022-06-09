import useInput from '../hooks/useInput';
import useAxios from '../hooks/useAxios';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { patchUserData } from '../store/userSlice';

export default function UserBasicInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [inputValue, onChange] = useInput('');

  const updateUserDescription = async () => {
    const data = inputValue;
    const fieldName = 'description';

    dispatch(patchUserData({ fieldName, data }));

    await useAxios('/users/user', 'patch', {
      fieldName: 'description',
      newFieldData: newDescription,
    });
  };

  const navigateSetFavoriteRegionPage = () => {
    navigate('/favoriteregion');
  };

  return (
    <div>
      <div onClick={navigateSetFavoriteRegionPage}>관심지역설정</div>
      <div>{user.userInformation.name}</div>
      <input onChange={onChange}></input>
      <button onClick={updateUserDescription}>제출</button>
    </div>
  );
}
