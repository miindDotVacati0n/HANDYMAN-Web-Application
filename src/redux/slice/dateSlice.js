import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    serviceDate: {},
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    STORE_DATE(state, action){
        state.serviceDate = action.payload
    }
  }
});

export const {STORE_DATE} = dateSlice.actions

export const selectDate = (state) => state.date.serviceDate

export default dateSlice.reducer