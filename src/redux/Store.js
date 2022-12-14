import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import serviceReducer from './slice/serviceSlice';
import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice';
import checkoutReducer from './slice/checkoutSlice';
import orderReducer from './slice/orderSlice';
import addressReducer from './slice/addressSlice';
import dateReducer from './slice/dateSlice';



const rootReducer = combineReducers({
    auth: authReducer,
    service: serviceReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    address: addressReducer,
    date: dateReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})

export default store;