import { createSlice, current } from '@reduxjs/toolkit';

const initialState = { userInformation: null, isLoggedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
      console.log(state.userInformation, action.payload);
    },
    patchUserData(state, action) {
      const { fieldName, data } = action.payload;
      state.userInformation[fieldName] = [...data];
    },
    deleteUserInfo(state) {
      state.userInformation = null;
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const { saveUserInfo, deleteUserInfo, login, logout, patchUserData } =
  userSlice.actions;
export default userSlice.reducer;
