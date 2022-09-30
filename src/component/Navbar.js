import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './../styles/Navbar.css'
import { FaCartArrowDown, FaUserCircle } from "react-icons/fa";

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './../config/config';

import { toast } from "react-toastify";

import { useDispatch } from 'react-redux';
import { SET_ACTIVE_USER, REMOCE_ACTIVE_USER } from '../redux/slice/authSlice';

const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false);

    const [displayName, setdisplayName] = useState("");

    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();

    const hideMenu = () => {
        setShowMenu(false);
    };

    const navigate = useNavigate();

    const logoutUser = () => {
        signOut(auth).then(() => {
            toast.success("Logout successfully.");
            navigate('/');
          }).catch((error) => {
            toast.error(error.message);
          });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                console.log(user);
                // const uid = user.uid;
                // console.log(user.displayName);

                if(user.displayName == null){
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    // console.log(uName);
                    setdisplayName(uName);
                }else{
                    setdisplayName(user.displayName);
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }));
            }else{
                setdisplayName("");
                dispatch(REMOCE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);


  return (
    <nav className='navbar'>
        <h3 className='logo'>HANDYMAN
            {/* <Link to={'/'} className='home'>logo</Link> */}
        </h3>
        <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}
        onClick={() => setIsMobile(false)}
        > 
            <Link to={'/'} className='home'>
                <li>Home</li>
            </Link>
            <Link to={'/about'} className='about'>
                <li>About</li>
            </Link>
            <Link to={'/services'} className='services'>
                <li>Services</li>
            </Link>
            <Link to={'/admin'} className='admin'>
                <li>Admin</li>
            </Link>
            

            {/* <div className='navbar-right'>
            <Link to={'/cart'} className='cart'>
                <li>Cart
                <FaCartArrowDown size={20}/>
                <p>0</p>
                </li>
            </Link>
            <Link to={'/history'} className='history'>
                <li>My Orders</li>
            </Link>
            <Link to={'/signin'} className='signin'>
                <li>Sign In</li>
            </Link>
            <Link to={'/signup'} className='signup'>
                <li>Sign Up</li>
            </Link>
            </div> */}

            <span className='cart'>
                <Link to={'/cart'}>
                    
                    <FaCartArrowDown size={20}/>
                    <p>0</p>
                </Link>
             </span>
            <Link to={'/history'} className='history'>
                <li>My Orders</li>
            </Link>
            <Link to={'/'} className='logout' onClick={logoutUser}>
                <li>Logout</li>
            </Link>
            <Link to={'/signin'} className='signin'>
                <li>Sign In</li>
            </Link>
            <a href='#home'>
                <FaUserCircle size={16} />
                Hi, {displayName}
            </a>
            <Link to={'/signup'} className='signup'>
                <li>Sign Up</li>
            </Link>
        </ul>
        <button className='mobile-menu-icon'
        onClick={() => setIsMobile(!isMobile)}
        >
            {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
        </button>
    </nav>
  )
}

export default Navbar