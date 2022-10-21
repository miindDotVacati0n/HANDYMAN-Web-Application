import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SAVE_ADDRESS } from '../../redux/slice/checkoutSlice';
import './../../styles/Pages/Checkout/CheckoutDetails.css'
import CheckoutSummary from './CheckoutSummary';


const initailAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
};

const CheckoutDetails = () => {

  const [address, setAddress] = useState({...initailAddressState})

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleAddress = (e) => {
    const {name, value} = e.target;
    setAddress({
      ...address,[name]: value,
    })
  }

  // const handleBilling = () => {

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address)
    dispatch(SAVE_ADDRESS(address))
    navigate('/checkout')
  }

  return (
    <section>
      <div className={'checkout'}>
        <h2 className='texthead-check'>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='check-details'>
            <div className='address'>
              <h3>Shipping Address</h3>
              <label>Name:</label>
              <input type="text" placeholder="Name" required name='name' value={address.name} onChange={(e) => handleAddress(e)} />
              <label>Address line 1:</label>
              <input type="text" placeholder="Address line 1" required name='line1' value={address.line1} onChange={(e) => handleAddress(e)} />
              <label>Address line 2:</label>
              <input type="text" placeholder="Address line 2" required name='line2' value={address.line2} onChange={(e) => handleAddress(e)} />
              <label>City:</label>
              <input type="text" placeholder="City" required name='city'  value={address.city} onChange={(e) => handleAddress(e)} />
              <label>State:</label>
              <input type="text" placeholder="State" required name='state' value={address.state} onChange={(e) => handleAddress(e)} />
              <label>Postal code:</label>
              <input type="text" placeholder="Postal code" required name='postal_code' value={address.postal_code} onChange={(e) => handleAddress(e)} />
              <label>Phone:</label>
              <input type="text" placeholder="Phone" required name='phone' value={address.phone} onChange={(e) => handleAddress(e)} />
              
               
              
              <button type='submit' className='btn btn-primary'>Proceed To Checkout</button>
            </div>
            
          </div>
          <div>
            <div className='summary'>
              <CheckoutSummary/>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CheckoutDetails