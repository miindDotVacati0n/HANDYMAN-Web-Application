import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import serviceReducer from './slice/serviceSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    service: serviceReducer,
});

const store = configureStore({
    reducer: rootReducer
    
})

export default store;