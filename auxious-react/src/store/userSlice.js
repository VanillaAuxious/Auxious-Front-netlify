import { createSlice } from '@reduxjs/toolkit';

const initialState = { userInformation: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.userInformation = action.payload;
    },
  },
});

export const { saveUserInfo } = userSlice.actions;
export default userSlice.reducer;
