import { collection, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { db } from '../../config/config';
import { AiFillEdit } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import './../../styles/Admin/ViewServices.css'

const ViewServices = () => {

  const [services, setServices] = useState([])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices()
  },[])

  const getServices = () => {
    setLoading(true)

    try {
      const servicesRef = (collection(db, "services"));

      const q = query(servicesRef, orderBy("createAt", "desc"));


      onSnapshot(q, (snapshot) => {
        console.log(snapshot.docs);
        const allServices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
          
        }));
        console.log(allServices);
        setServices(allServices);
        setLoading(false);
      });

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
    <div className='table'>
      <br></br>
      <h2 className='headertext'>All Services</h2>
      <br></br>

      {services.length === 0 ? (
        <p>No service found.</p>
      ) : (
        <table>
          <thead>
          <tr>
            <th>s/n</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          {services.map((service, index) => {
            const { id, name, price, imageURL, category} = service;
            return(
              <tbody>
              <tr key={id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <img src={imageURL} alt={name} style={{width: "100px"}}/>
                </td>
                <td>
                  {name}
                </td>
                <td>
                  {category}
                </td>
                <td>
                  {`$${price}`}
                </td>
                <td>
                  <Link to={'/addservices'}>
                    <AiFillEdit size={18} color="green" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <FaTrashAlt size={18} color="red" />
                  </Link>
                </td>
              </tr>
              </tbody>
            )
          })}
        </table>
      )}
    </div>
    </>
    // <h1>test</h1>
  )
}

export default ViewServices