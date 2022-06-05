import { createSlice } from '@reduxjs/toolkit';

const initialState = { userInformation: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
      delete state.userInformation.iat;
    },
  },
});

export const { saveUserInfo } = userSlice.actions;
export default userSlice.reducer;
