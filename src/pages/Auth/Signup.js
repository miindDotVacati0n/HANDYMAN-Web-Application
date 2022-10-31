import React, { useState } from 'react'
import './../../styles/Pages/Auth/Signup.css'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './../../config/config'

import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { configureStore } from '@reduxjs/toolkit';

const initailAddressState = {
  name: "",
  email: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
};


const Signup = () => {

  injectStyle();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  // const [emailAdd, setEmailAdd] = useState('');
  // const [name, setName] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')
  // const [] = useState('')

  const [address, setAddress] = useState({ ...initailAddressState })

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address, [name]: value,
    })
  }

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const registerUser = (e) => {
    e.preventDefault();
    console.log(registerUser)

    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setLoading(true);


    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setLoading(false);
        toast.success("Registration Successful...");
        navigate("/address");
      })

      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });

  }

 

  return (
    <>
      {loading && <Loader />}
      <br></br>
      <br></br>
      <div className='form'>

        <h2>Register</h2>
        <form onSubmit={(registerUser)}>
          <input type={'text'} placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type={'password'} placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type={'password'} placeholder='Confirm Password' required value={cPassword} onChange={(e) => setCPassword(e.target.value)} />
          <button type='submit' className='btn btn-primary btn-block'>Next</button>
        </form>
      </div>

     

    </>
  );
}


export default Signup