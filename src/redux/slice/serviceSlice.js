import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    services: [],
}

const serviceSlice = createSlice({
  name: "service",
  
  initialState,
  reducers: {
    STORE_SERVICES(state, action){
        console.log(action.payload);
        state.services = action.payload.services;
    }
  }
});

export const { STORE_SERVICES } = serviceSlice.actions

export const selectServices = (state) => state.service.services;

export default serviceSlice.reducer