import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import useFetchDocument from '../../component/customHooks/useFetchDocument';
import { db } from '../../config/config';
import { ADD_TO_CART, CALCULATE_TOTAL_QTY, DECREASE_CART, selectCartItems } from '../../redux/slice/cartSlice';
import './../../styles/Pages/Services/ServiceDetails.css'


const ServiceDetails = () => {

  const { id } = useParams();
  const [service, setService] = useState('');
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)

  // const { document } = useFetchDocument("services", id)

  const cart = cartItems.find((cart) => cart.id === id)

  const isCartAdded = cartItems.findIndex((cart) => {
    return cart.id === id
  })

  // useEffect(() => {
  //   setService(document)
  // }, [document])
  

  useEffect(() => {
    getService();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getService = async () => {
    // console.log("Getting Service")
    const docRef = doc(db, "services", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const obj = {
        id: id,
        ...docSnap.data()
      }
      setService(obj);
    } else {
      toast.error("Service not found");
    }
  }

  const addToCart = (service) => {
    dispatch(ADD_TO_CART(service))
    dispatch(CALCULATE_TOTAL_QTY())
  }

  const decreaseCart = (service) => {
    dispatch(DECREASE_CART(service))
    dispatch(CALCULATE_TOTAL_QTY())
  }

  return (

    <div className={`container ${'service-details'}`}>

      <h2>Service Detail</h2>
      <div className='back'>
        <Link to={'/services'}>&larr; Back to services</Link>
      </div>

      <div className='details'>
        <img src={service.imageURL} alt={service.name} width="600" height={'300'} />
      </div>

      <div className='content'>
        <h3>{service.name}</h3>
        <p className='price'>{`${service.price}THB`}</p>
        <p className='desc'>{service.desc}</p>
      </div>
      <br />
      <div className='count'>
        {isCartAdded < 0 ? null : (
          <>
            <button className='--btn' style={{ width: "20px", height: "20px" }} onClick={() => decreaseCart(service)}>-</button>
            &nbsp;&nbsp;
            <p><b>{cart.cartQuantity}</b></p>
            &nbsp;&nbsp;
            <button className='--btn' style={{ width: "20px", height: "20px" }} onClick={() => addToCart(service)}>+</button>
          </>
        )}

      </div>
      <button className='btn btn-success' onClick={() => addToCart(service)}>ADD TO CART</button>

    </div>

  )
}


export default ServiceDetails