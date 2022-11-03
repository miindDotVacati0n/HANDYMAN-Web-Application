import React, { useState } from 'react'
import './../../styles/Pages/Auth/Signup.css'
// import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

import { db } from './../../config/config'

import Loader from '../../component/Loader';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { STORE_ADDRESS } from '../../redux/slice/addressSlice';
import { useDispatch } from 'react-redux';


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

const Address = () => {

    const [address, setAddress] = useState({ ...initailAddressState })

    const dispatch = useDispatch()

    const handleBilling = (e) => {
        const { name, value } = e.target;
        setAddress({
            ...address, [name]: value,
        })
    }

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const registerAddress = (e) => {

        e.preventDefault();
        dispatch(STORE_ADDRESS(address))

        try {
            const docRef = addDoc(collection(db, "address"), {
                name: address.name,
                email: address.email,
                line1: address.line1,
                line2: address.line2,
                city: address.city,
                state: address.state,
                postal_code: Number(address.postal_code),
                phone: Number(address.phone),
            });
            toast.success("Registration Successful...")

            navigate("/");
        } catch (error) {
            toast.error(error.message)

            setLoading(false)
        }
    }

    return (
        <>
        {loading && <Loader />}
            <div className='address-form'>
                <div className='card'>
                <form onSubmit={registerAddress}>
                    <h3>Address</h3>
                    <label>Name:</label>
                    <input type="text" placeholder="Name" required name='name' value={address.name} onChange={(e) => handleBilling(e)} />
                    <label>Email:</label>
                    <input type="text" placeholder="Email" required name='email' value={address.email} onChange={(e) => handleBilling(e)} />
                    <label>Line1:</label>
                    <input type="text" placeholder="Address line 1" required name='line1' value={address.line1} onChange={(e) => handleBilling(e)} />
                    <label>Line2:</label>
                    <input type="text" placeholder="Address line 2" required name='line2' value={address.line2} onChange={(e) => handleBilling(e)} />
                    <label>City:</label>
                    <input type="text" placeholder="City" required name='city' value={address.city} onChange={(e) => handleBilling(e)} />
                    <label>State:</label>
                    <input type="text" placeholder="State" required name='state' value={address.state} onChange={(e) => handleBilling(e)} />
                    <label>Postal code:</label>
                    <input type="number" placeholder="Postal code" required name='postal_code' value={address.postal_code} onChange={(e) => handleBilling(e)} />
                    <label>Phone:</label>
                    <input type="number" placeholder="Phone" required name='phone' value={address.phone} onChange={(e) => handleBilling(e)} />
                    <br /><br />
                    <button type='submit' className='btn btn-primary btn-block'>Register</button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Address