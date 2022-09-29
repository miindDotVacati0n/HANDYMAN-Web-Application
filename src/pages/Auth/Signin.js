import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './../../styles/Signin.css';
import { FcGoogle } from "react-icons/fc";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../../config/config'

import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';


export const Signin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    //login with firebase
    const loginUser = (e) => {
        e.preventDefault();
        setLoading(true);
    
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            setLoading(false);
            toast.success("Login Successful...");
            setLoading();
            navigate('/');
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      };

    return (
        <>
        {/* <ToastContainer /> */}
        {loading && <Loader />}
        <div className="form">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type={'text'} placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type={'password'} placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                <div className="links">
                    <Link to={'/reset'}>Reset Password</Link>
                </div>
                <p>-- หรือ --</p>
            </form>
            <button className="--btn --btn-danger --btn-block">
                <FcGoogle />
                Login With Google
            </button>
            <span className="register">
                <p>Don't have an account?</p>
                <Link to={'/signup'}>Register</Link>
            </span>
        </div>
        </>
    )
}