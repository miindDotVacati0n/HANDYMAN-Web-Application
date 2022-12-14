import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice'
import './../../styles/Pages/Checkout/CheckoutSummary.css'


const CheckoutSummary = () => {

    const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="btn">
              <Link to="/services">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className={'text'}>
              <h4>Subtotal:</h4>
              <h3>{`${cartTotalAmount.toFixed(2)}THB`}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <div key={id} className='service-sum'>
                  <h4>Service: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Subtotal price: {price * cartQuantity}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutSummary