import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  email: null,
  useName: null,
  userID: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload);
      const { email, userName, userID } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    REMOCE_ACTIVE_USER(state, action){
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      // console.log(state.isLoggedIn);
    },
  },
});

export const {SET_ACTIVE_USER, REMOCE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUseName = (state) => state.auth.useName;
export const selectUserID = (state) => state.auth.userID;

export default authSlice.reducer