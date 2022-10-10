import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils';

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
    SORT_SERVICES(state, action){
        console.log(action.payload)
        const {services, sort} = action.payload;
        let tempServices = []
        if(sort === "latest"){
            tempServices = services;
        }

        if(sort === "lowest-price"){
            tempServices = services.slice().sort((a, b) => {
                return a.price - b.price;
            });
        }

        if(sort === "highest-price"){
            tempServices = services.slice().sort((a, b) => {
                return b.price - a.price;
            });
        }

        // if(sort === "a-z"){
        //     tempServices = services.slice().sort((a, b) => {
        //         return a.name.localeCompare(b.name);
        //     });
        // }

        // if(sort === "z-a"){
        //     tempServices = services.slice().sort((a, b) => {
        //         return b.name.localeCompare(a.name);
        //     });
        // }

        state.filterServices = tempServices

    },
  },
});

export const {FILTER_BY_SEARCH, SORT_SERVICES} = filterSlice.actions

export const selectFilterServices = (state) => state.filter.filterServices

export default filterSlice.reducer