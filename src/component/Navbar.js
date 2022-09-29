import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './../styles/Navbar.css'
import { FaCartArrowDown } from "react-icons/fa";

const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false);

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
            <Link to={'/signin'} className='signin'>
                <li>Sign In</li>
            </Link>
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