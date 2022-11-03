import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userAddress: {},
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    STORE_ADDRESS(state, action){
        state.userAddress = action.payload
    }}
});

export const {STORE_ADDRESS} = addressSlice.actions

export const selectAddress = (state) => state.address.userAddress

export default addressSlice.reducer