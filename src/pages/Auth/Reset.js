import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { auth } from '../../config/config';
import './../../styles/Reset.css';

import { toast } from "react-toastify";

import { sendPasswordResetEmail } from "firebase/auth";

import Loader from '../../component/Loader';


const Reset = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    
    setLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        toast.success("Check your email for a reset password");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  }

  return (
    <>
    {loading && <Loader />}

    <div className='form'>
      <h2>Reset Password</h2>
      <form onSubmit={resetPassword}>
        <input type={'text'} placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button type="submit" className="--btn --btn-primary --btn-block">
          Reset Password
        </button>
        <p><Link to={'/signin'}>Login</Link></p>
        <p><Link to={'/signup'}>Register</Link></p>
      </form>
    </div>
    </>
  )
}

export default Reset