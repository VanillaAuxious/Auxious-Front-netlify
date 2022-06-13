import useAxios from '../hooks/useAxios';
import { useSelector, useDispatch } from 'react-redux';
import { patchUserData } from '../store/userSlice';

import './FavoriteRegionsList.scss';

export default function FavoriteRegionList() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const deleteFavoriteRegion = async (event) => {
    const region = event.target.id;
    const newRegionArray = [];

    for (let i = 0; i < user.userInformation.favoriteRegions.length; i++) {
      if (user.userInformation.favoriteRegions[i] !== region) {
        newRegionArray.push(user.userInformation.favoriteRegions[i]);
      }
    }

    await useAxios(`/users/user/favorites/regions/${region}`, 'delete');

    const fieldName = 'favoriteRegions';
    const data = newRegionArray;

    dispatch(patchUserData({ fieldName, data }));
  };

  return (
    <div className='favorite-regions'>
      {user.userInformation.favoriteRegions.map((region, index) => {
        return (
          <div key={index} onClick={deleteFavoriteRegion} id={region}>
            {region}
          </div>
        );
      })}
    </div>
  );
}
