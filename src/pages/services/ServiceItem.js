import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from '../../component/Card'
import { ADD_TO_CART, CALCULATE_TOTAL_QTY } from '../../redux/slice/cartSlice'
import './../../styles/Pages/Services/ServiceItem.css'


const ServiceItem = ({service, grid, id, name, price, desc, imageURL}) => {
  
  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if(text.lenght > n){
      const shortenedText = text.substring(0, 15).concat('...')
      return shortenedText;
    }
    return text;
  }

  const addToCart = (service) => {
    dispatch(ADD_TO_CART(service))
    dispatch(CALCULATE_TOTAL_QTY())
  }
  
  return (
    <Card cardClass={'grid'}>
      <Link to={`/service-details/${id}`}>
      <div className='img'>
        <img src={imageURL} alt={name} />
      </div>
      </Link>
      <div className='content'>
        <div className='details'>
          <p>{`${price}THB`}</p>
          <h4>{shortenText(name, 18)}</h4>
        </div>
        {!grid && <p className='desc'>{shortenText(desc, 200)}</p>}

        <button className='btn' onClick={() => addToCart(service)}>Add to cart</button>
      </div>
    </Card>
  )
}

export default ServiceItem