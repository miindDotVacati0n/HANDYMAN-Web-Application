import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { db } from '../../config/config';
import './../../styles/Pages/Services/ServiceDetails.css'

const ServiceDetails = () => {

  const { id } = useParams();
  console.log(id)
  const [service, setService] = useState('');

  useEffect(() => {
    getService();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getService = async () => {
    console.log("Getting Service")
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

  return (
    
      <div className={`container ${'service-details'}`}>

        <h2>Service Detail</h2>
        <div className='back'>
          <Link to={'/services'}>&larr; Back to services</Link>
        </div>

        <div className='details'>
          <img src={service.imageURL} alt={service.name} width="600" height={'300'}/>
        </div>
        
        <div className='content'>
          <h3>{service.name}</h3>
          <p className='price'>{`${service.price}THB`}</p>
          <p className='desc'>{service.desc}</p>
        </div>

        <div className='count'>
          <button className='--btn'>-</button>
          &nbsp;&nbsp;&nbsp;
            <p><b>1</b></p>
            &nbsp;&nbsp;&nbsp;
          <button className='--btn'>+</button>
        </div>
        
        <button className='btn'>ADD TO CART</button>
        <br/>
      </div>
      
  )
}


export default ServiceDetails