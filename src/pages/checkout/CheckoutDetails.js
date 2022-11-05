import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './../../styles/Pages/Checkout/CheckoutDetails.css'
import CheckoutSummary from './CheckoutSummary';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify';
import { selectDate, STORE_DATE } from '../../redux/slice/dateSlice';

const CheckoutDetails = () => {

  const [selectedDate, setSelectedDate] = useState()
  const [checkdate, setCheckDate] = useState()

  const check = useSelector(selectDate)


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(STORE_DATE(selectedDate));
  }, [dispatch, selectedDate]);


  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout')
  }


  var today = new Date().toISOString().slice(0,10)

  // if (checkdate(check) === check) {
  //   toast.error("1")
  // }

  return (
    <section>
      <div className={'checkout'}>
        <h2 className='texthead-check'>Checkout Details</h2>
        <form onSubmit={handleSubmit}>

          <div>
            <div className='summary'>
              <CheckoutSummary />
            </div>
            <br/>
            <div className='date'>
              <h1>Selected appointment date: {selectedDate}</h1>
              <input type={'date'} onChange={(e) => setSelectedDate(e.target.value)} required min={today}/>



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