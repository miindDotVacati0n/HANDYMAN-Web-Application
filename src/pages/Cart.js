import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QTY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../redux/slice/cartSlice'
import './../styles/Pages/Cart.css'
import {FaTrashAlt} from 'react-icons/fa'
import Card from '../component/Card'


const Cart = () => {

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch()

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  }

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart))
  }

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart))
  }

  const clearCart = (cart) => {
    dispatch(CLEAR_CART(cart))
  }

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL())
    dispatch(CALCULATE_TOTAL_QTY())
  }, [dispatch, cartItems])

  return (
    <section>
      <div className={`container ${'table'}`}>
        <h2>Shopping Cart</h2>
        {cartItems.lenght === 0 ? (
          <>
          <p>Your cart is currently empty</p>
          <br/>
          <div>
            <Link to={'/services'}>&larr; Continue Shopping</Link>
          </div>
          </>
        ) : (
          <>
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Service</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cart, index) => {
                const {id, name, price, imageURL, cartQuantity} = cart;

                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img src={imageURL} alt={name} style={{width: '100px'}}/>
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className='count'>
                        <button className='--btn' style={{width: "20px", height: "20px"}} onClick={() => decreaseCart(cart)}> - </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button className='--btn' style={{width: "20px", height: "20px"}} onClick={() => increaseCart(cart)}> + </button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                    <td className='icons'>
                      <FaTrashAlt size={20} color='red' onClick={() => removeFromCart(cart)} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='summary'>
              <button class='btn btn-danger' onClick={clearCart}>Clear Cart</button>
              <div className='checkout'>
                <div>
                  <Link to={'/services'}>&larr; Continue Shopping</Link>
                </div>
                <br/>

                <Card cardClass={'card'}>
                  <p><b>
                    {`Cart item(s): ${cartTotalQuantity}`}
                  </b></p>
                  <br/>
                  <div className='text'>
                    
                    <h4>Subtotal: </h4>
                    <h3>{`${cartTotalAmount.toFixed(2)}THB`}</h3>
                  </div>
                  <br/>
                  <button class='btn btn-primary btn-block'>Checkout</button>
                </Card>
              </div>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart