import { createSlice } from '@reduxjs/toolkit';

const initialState = { userInformation: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
    },
    patchUserData(state, action) {
      const { fieldName, data } = action.payload;
      state.userInformation[fieldName] = [...data];
    },
    addUserFavoriteRegion(state, action) {
      state.userInformation.favoriteRegions.push(action.payload);
    },
    deleteUserInfo(state) {
      state.userInformation = null;
    },
  },
});

export const {
  saveUserInfo,
  deleteUserInfo,
  patchUserData,
  addUserFavoriteRegion,
} = userSlice.actions;
export default userSlice.reducer;
