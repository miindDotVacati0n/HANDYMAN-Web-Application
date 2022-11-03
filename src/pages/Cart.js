import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ADD_TO_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QTY, CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../redux/slice/cartSlice'
import './../styles/Pages/Cart.css'
import { FaTrashAlt } from 'react-icons/fa'
// import Card from '../component/Card'
import { selectIsLoggedIn } from '../redux/slice/authSlice'


const Cart = () => {

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()

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
    dispatch(SAVE_URL(""))
  }, [dispatch, cartItems])

  const url = window.location.href;
  console.log(url)

  const checkout = () => {
    if (isLoggedIn) {
      navigate('/checkout-details')
    } else {
      dispatch(SAVE_URL(url))
      navigate('/signin')
    }
  }

  return (
    <section>
      <div className={'table'}>
        <h2 className='carthead'>Shopping Cart</h2>
        <br />
        {cartItems.lenght === 0 ? (
          <>
            <p>Your cart is currently empty</p>
            <br />
            <div>
              <Link to={'/'}>&larr; Continue Shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Service</th>
                  <th className='th-right'>Price</th>
                  <th>Quantity</th>
                  <th className='th-right'>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, cartQuantity } = cart;

                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img src={imageURL} alt={name} style={{ width: '100px' }} />
                      </td>
                      <td className='td-right'>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                      <td>
                        <div className='count'>
                          <button className='--btn' style={{ width: "20px", height: "20px" }} onClick={() => decreaseCart(cart)}> - </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button className='--btn' style={{ width: "20px", height: "20px" }} onClick={() => increaseCart(cart)}> + </button>
                        </div>
                      </td>
                      <td className='td-right'>{(price * cartQuantity).toFixed(2)}</td>
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
              <div className='checkout-cart'>
                <div>
                  <Link to={'/services'}>&larr; Continue Shopping</Link>
                </div>
                <br />

                {/* <Card cardClass={'card'}> */}
                <div className='total'>
                  <p><b>
                    {`Cart item(s): ${cartTotalQuantity}`}
                  </b></p>
                  <br />
                  <div className='text'>

                    <h4>Subtotal: </h4>
                    <h3>&nbsp;{`${cartTotalAmount.toFixed(2)}THB`}</h3>
                  </div>
                  <br />
                  <button class='btn btn-primary btn-block' onClick={checkout}>Checkout</button>
                </div>
                {/* </Card> */}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Cart