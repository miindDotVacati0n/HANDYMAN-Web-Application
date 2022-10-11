import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action){
        console.log(action.payload)
        const serviceIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

        if(serviceIndex >= 0){
            // item already exists in cart or increase the cart quantity
            state.cartItems[serviceIndex].cartQuantity += 1;
            toast.info(`${action.payload.name} increased by one`, {position: 'top-left'})
        }else{
            // item doesnt exists in cart and add item into cart
            const tempService = {...action.payload, cartQuantity: 1}
            state.cartItems.push(tempService)
            toast.success(`${action.payload.name} added to cart`, {position: 'top-left'})
        }
        // save cart to local storage
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  }
});

export const {ADD_TO_CART} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems

export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity

export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export default cartSlice.reducer