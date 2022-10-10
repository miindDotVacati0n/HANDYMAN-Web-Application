import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filterServices: []
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action){
        const {services, search} = action.payload
        const tempServices = services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase()) || service.category.toLowerCase().includes(search.toLowerCase()) )

        state.filterServices = tempServices;
    },
  }
});

export const {FILTER_BY_SEARCH} = filterSlice.actions

export const selectFilterServices = (state) => state.filter.filterServices

export default filterSlice.reducer