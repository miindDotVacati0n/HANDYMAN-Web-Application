import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../component/Loader';
import { db, storage } from '../../config/config';
import { AiFillEdit } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'
import './../../styles/Admin/ViewServices.css'
import { async } from '@firebase/util';
import { deleteObject, ref } from 'firebase/storage';

import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux';
import { selectServices, STORE_SERVICES } from '../../redux/slice/serviceSlice';
import useFetchCollection from '../../component/customHooks/useFetchCollection';


const ViewServices = () => {

  const { data, loading } = useFetchCollection("services")

  const services = useSelector(selectServices)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
              STORE_SERVICES({
              services: data,
              })
            );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, data]);

  // const getServices = () => {
  //   setLoading(true)

  //   try {
  //     const servicesRef = (collection(db, "services"));

  //     const q = query(servicesRef, orderBy("createdAt", "desc"));


  //     onSnapshot(q, (snapshot) => {
  //       console.log(snapshot.docs);
  //       const allServices = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
          
  //       }));
  //       // console.log(allServices);
  //       setServices(allServices);
  //       setLoading(false);

        
  //       dispatch(
  //         STORE_SERVICES({
  //         services: allServices,
  //         })
  //       );
  //     });

  //   } catch (error) {
  //     setLoading(false)
  //     toast.error(error.message)
  //   }
  // }

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      'Delete Service?',
      'You want to delete this "Services"',
      'Delete',
      'Cancel',
      function okCb() {
        deleteService(id, imageURL)
      },
      function cancelCb() {
        console.log("Delete Canceled")
      },
      {
        width: '320px',
        borderRadius: '8px',
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
      },
    );
  }

  const deleteService = async(id, imageURL) => {
    try{
      await deleteDoc(doc(db, "services", id))

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef)

      toast.success("Service deleted successfully.")

    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <>
    {loading && <Loader />}
    <div className='table'>
      <br></br>
      <h2 className='headertext'>All Services</h2>
      <br></br>

      {services.length === 0 ? (
        
        <p className='text'>No service found.</p>
        
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
                  {`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}THB`}
                </td>
                <td>
                  <Link to={`/addservices/${id}`}>
                    <AiFillEdit size={23} color="green" />
                    
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FaTrashAlt size={18} color="red" onClick={() => confirmDelete(id, imageURL)} />
                </td>
              </tr>
              </tbody>
            )
          })}
        </table>
      )}
    </div>
    </>
  )
}

export default ViewServices