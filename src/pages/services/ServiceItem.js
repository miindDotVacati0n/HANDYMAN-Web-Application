import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../component/Card'
import './../../styles/Pages/Services/ServiceItem.css'


const ServiceItem = ({service, grid, id, name, price, desc, imageURL}) => {
  
  const shortenText = (text, n) => {
    if(text.lenght > n){
      const shortenedText = text.substring(0, 15).concat('...')
      return shortenedText;
    }
    return text;
  }
  
  return (
    <Card cardClass={grid ? `${'grid'}` : `{'list'}`}>
      <Link to={`/service-details`}>
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

        <button className='--btn --btn-danger'>Add to cart</button>
      </div>
    </Card>
  )
}

export default ServiceItem