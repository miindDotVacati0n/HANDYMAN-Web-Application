import React, { useState } from 'react'
import './../../styles/Signup.css'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../config/config'

import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    injectStyle();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault();
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
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
    }


    return (
        <>
        {loading && <Loader />}
        <div className='form'>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input type={'text'} placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type={'password'} placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type={'password'} placeholder='Confirm Password' required value={cPassword} onChange={(e) => setCPassword(e.target.value)}/>
                <button type='submit' className='--btn --btn-primary --btn-block'>Register</button>
                
            </form>
        </div>
        </>
    );
}

export default Signup