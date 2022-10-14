import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  previousURL: "",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      // console.log(action.payload)
      const serviceIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (serviceIndex >= 0) {
        // item already exists in cart or increase the cart quantity
        state.cartItems[serviceIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} increased by one`, { position: 'top-left' })
      } else {
        // item doesnt exists in cart and add item into cart
        const tempService = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempService)
        toast.success(`${action.payload.name} added to cart`, { position: 'top-left' })
      }
      // save cart to local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action) {
      console.log(action.payload)
      const serviceIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if (state.cartItems[serviceIndex].cartQuantity > 1) {
        state.cartItems[serviceIndex].cartQuantity -= 1
        toast.info(`${action.payload.name} decreased by one`, { position: 'top-left' })
      } else if (state.cartItems[serviceIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
        state.cartItems = newCartItem
        toast.success(`${action.payload.name} removed from cart`, { position: 'top-left' })
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action) {
      console.log(action.payload)
      const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
      state.cartItems = newCartItem
      toast.success(`${action.payload.name} removed from cart`, { position: 'top-left' })

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action) {
      state.cartItems = []
      toast.info(`Cart cleared`, { position: 'top-left' })

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CALCULATE_SUBTOTAL(state, action) {
      const array = []
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item
        const cartItemAmount = price * cartQuantity
        console.log(cartItemAmount)
        return array.push(cartItemAmount)
      });
      // console.log(array)
      const totalAmount = array.reduce((a,b) => {
        return a + b
      }, 0)
      // console.log(totalAmount)
      state.cartTotalAmount = totalAmount
    },
    CALCULATE_TOTAL_QTY(state, action){
      const array = []
      state.cartItems.map((item) => {
        const { cartQuantity } = item
        const quantity =  cartQuantity
        console.log(quantity)
        return array.push(quantity)
      });
      // console.log(array)
      const totalQuantity = array.reduce((a,b) => {
        return a + b
      }, 0)
      // console.log(totalAmount)
      state.cartTotalQuantity = totalQuantity
    },
    SAVE_URL(state, action){
      console.log(action.payload)
      state.previousURL = action.payload
    }
  }
});

export const {
  ADD_TO_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QTY,
  SAVE_URL
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems

export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity

export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount

export const selectPreviousURL = (state) => state.cart.previousURL

export default cartSlice.reducer