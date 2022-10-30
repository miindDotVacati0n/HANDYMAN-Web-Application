import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SAVE_BILLING_ADDRESS } from '../../redux/slice/checkoutSlice';
import './../../styles/Pages/Checkout/CheckoutDetails.css'
import CheckoutSummary from './CheckoutSummary';



// const initailAddressState = {
//   name: "",
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   postal_code: "",
//   phone: "",
// };

const CheckoutDetails = () => {

  // const [billingAddress, setBillingAddress] = useState({ ...initailAddressState })

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // const handleBilling = (e) => {
  //   const { name, value } = e.target;
  //   setBillingAddress({
  //     ...billingAddress, [name]: value,
  //   })
  // }

  // const handleBilling = () => {

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(billingAddress)
    // dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    navigate('/checkout')
  }

  return (
    <section>
      <div className={'checkout'}>
        <h2 className='texthead-check'>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          {/* <div className='check-details'> */}
          {/* <div className='address'> */}
          {/* <h3>Billing Address</h3>
              <label>Name:</label>
              <input type="text" placeholder="Name" required name='name' value={billingAddress.name} onChange={(e) => handleBilling(e)} />
              <label>Address line 1:</label>
              <input type="text" placeholder="Address line 1" required name='line1' value={billingAddress.line1} onChange={(e) => handleBilling(e)} />
              <label>Address line 2:</label>
              <input type="text" placeholder="Address line 2" required name='line2' value={billingAddress.line2} onChange={(e) => handleBilling(e)} />
              <label>City:</label>
              <input type="text" placeholder="City" required name='city'  value={billingAddress.city} onChange={(e) => handleBilling(e)} />
              <label>State:</label>
              <input type="text" placeholder="State" required name='state' value={billingAddress.state} onChange={(e) => handleBilling(e)} />
              <label>Postal code:</label>
              <input type="text" placeholder="Postal code" required name='postal_code' value={billingAddress.postal_code} onChange={(e) => handleBilling(e)} />
              <label>Phone:</label>
              <input type="text" placeholder="Phone" required name='phone' value={billingAddress.phone} onChange={(e) => handleBilling(e)} />
              
               
              
              <button type='submit' className='btn btn-primary'>Proceed To Checkout</button>
            </div> */}


          {/* </div> */}

          <div>
            <div className='summary'>
              <CheckoutSummary />
            </div>
            <div className='submit'>
              <br />
              <button type='submit' className='btn btn-primary'>Proceed To Checkout</button>
            </div>
          </div>

        </form>
      </div>
    </section>
  )
}

export default CheckoutDetails