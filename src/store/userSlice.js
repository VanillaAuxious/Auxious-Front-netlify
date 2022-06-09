import { createSlice } from '@reduxjs/toolkit';

const initialState = { userInformation: null, isLoggedIn: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
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

export const { saveUserInfo, deleteUserInfo, login, logout } =
  userSlice.actions;
export default userSlice.reducer;
