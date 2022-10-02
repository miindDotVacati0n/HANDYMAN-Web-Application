import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './../../styles/Pages/Auth/Signin.css';
import { FcGoogle } from "react-icons/fc";

import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from './../../config/config'

import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';


export const Signin = () => {

    injectStyle();

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

    // Login with Gooogle by Firebase
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            toast.success("Login Successfully");
            navigate('/');
        })
        .catch((error) => {
            toast.error(error.message);
        });
    };

    return (
        <>
        <ToastContainer />
        {loading && <Loader />}
        <br></br>
        <br></br>
        <div className="form">
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type={'text'} placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type={'password'} placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit" className="--btn --btn-primary --btn-block">Login</button>
                
                <div className="links">
                <br></br>
                    <Link to={'/reset'}>Reset Password</Link>
                </div>
                <br></br>
                <p>-- หรือ --</p>
            </form>
            <br></br>
            <button className="--btn --btn-danger --btn-block" onClick={signInWithGoogle}>
                <FcGoogle />
                Login With Google
                
            </button>
            <br></br>
            <span className="register">
            <br></br>
                <p>Don't have an account?</p>
                <br></br>
                <Link to={'/signup'}>Register here!</Link>
            </span>
        </div>
        </>
    )
}