import { createSlice } from '@reduxjs/toolkit';

const userSliceMock = createSlice({
  name: 'user',

  initialState: {},

  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
    },
    patchUserData(state, action) {
      const { fieldName, data } = action.payload;
      state.userInformation[fieldName] = data;
    },
    addUserFavoriteBuilding(state, action) {
      state.userInformation.favoriteBuildings.push(action.payload);
    },
    deleteUserFavoriteBuilding(state, action) {
      const newFavorites = state.userInformation.favoriteBuildings.filter(
        (element) => element !== action.payload,
      );
      state.userInformation.favoriteBuildings = newFavorites;
    },
    addUserFavoriteRegion(state, action) {
      state.userInformation.favoriteRegions.push(action.payload);
    },
    deleteUserFavoriteRegion(state, action) {
      state.userInformation.favoriteRegions =
        state.userInformation.favoriteRegions.filter(
          (region) => region !== action.payload,
        );
    },
    deleteUserInfo(state) {
      state.userInformation = null;
    },
  },
});

export const {
  addUserFavoriteBuilding,
  deleteUserFavoriteBuilding,
  saveUserInfo,
  deleteUserInfo,
  patchUserData,
  addUserFavoriteRegion,
  deleteUserFavoriteRegion,
} = userSliceMock.actions;
export default userSliceMock.reducer;
