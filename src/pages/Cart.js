import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../redux/slice/cartSlice'
import './../styles/Pages/Cart.css'
import {FaTrashAlt} from 'react-icons/fa'
import Card from '../component/Card'


const Cart = () => {

  const cartItems = useSelector(selectCartItems)
  const cartTotalAmount = useSelector(selectCartTotalAmount)
  const cartTotalQuantity = useSelector(selectCartTotalQuantity)

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
                        <button className='--btn'> - </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button className='--btn'> + </button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                    <td className='icons'>
                      <FaTrashAlt size={20} color='red' />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='summary'>
              <button className='--btn --btn-danger'>Clear Cart</button>
              <div className='checkout'>
                <div>
                  <Link to={'/services'}>&larr; Continue Shopping</Link>
                </div>
                <br/>

                <Card cardClass={'card'}>
                  <p>
                    {`Cart item(s): ${cartTotalQuantity}`}
                  </p>
                  <div className='text'>
                    <h4>Subtotal: </h4>
                    <h3>{`${cartTotalAmount.toFixed(2)}THB`}</h3>
                  </div>
                  <button className='--btn --btn-primary --btn-block'>Checkout</button>
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