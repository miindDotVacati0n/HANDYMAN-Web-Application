import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

const initialState = {
    address: {},
}

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_ADDRESS(state, action){
        console.log(action.payload)
        state.address = action.payload
    }
  }
});

export const {SAVE_ADDRESS} = checkoutSlice.actions

export const selectAddress = (state) => state.checkout.address

export default checkoutSlice.reducer