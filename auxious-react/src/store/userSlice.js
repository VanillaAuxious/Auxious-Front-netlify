import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: {} };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      state.user = action.payload;
    },
  },
});

export const { saveUserInfo } = userSlice.actions;
export default userSlice.reducer;
