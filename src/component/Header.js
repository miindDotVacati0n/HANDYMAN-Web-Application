import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './../styles/Header.css'

import { FaCartArrowDown, FaUserCircle } from "react-icons/fa";

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/config';

import { toast } from "react-toastify";

import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER, REMOCE_ACTIVE_USER } from '../redux/slice/authSlice';

import ShowOnLogin, { AdminDoNotShow, OwnerDoNotShow, ShowOnLogout } from './hiddenLink';
import AdminRoute, { AdminLink } from './AdminRoute';
import OwnerRoute from './OwnerRoute';
import { CALCULATE_TOTAL_QTY, selectCartTotalQuantity } from '../redux/slice/cartSlice';


const Header = () => {

    const [isMobile, setIsMobile] = useState(false);

    const [displayName, setdisplayName] = useState("");

    const [showMenu, setShowMenu] = useState(false);

    const [scrollPage, setScrollPage] = useState(false)

    const cartTotalQuantity = useSelector(selectCartTotalQuantity)
    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QTY())
    }, [])

    const dispatch = useDispatch();

    const fixHeader = () => {
        if (window.scrollY > 50) {
            setScrollPage(true)
        } else {
            setScrollPage(false)
        }
    }
    window.addEventListener("scroll", fixHeader)

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
            if (user) {
                console.log(user);
                // const uid = user.uid;
                // console.log(user.displayName);

                if (user.displayName == null) {
                    const u1 = user.email.substring(0, user.email.indexOf("@"));
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    // console.log(uName);
                    setdisplayName(uName);
                } else {
                    setdisplayName(user.displayName);
                }

                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }));
            } else {
                setdisplayName("");
                dispatch(REMOCE_ACTIVE_USER());
            }
        });
    }, [dispatch, displayName]);

    {/* <nav className='header'></nav> */ }
    return (
        <nav className='header'>
            <h3 className='logo'><Link to={'/'} className='home'>HANDYMAN</Link>
                {/* <Link to={'/'} className='home'>logo</Link> */}
            </h3>
            {/* <Link to={'/services'} className='services'>
                    <li>Services</li>
                </Link> */}
            <ul className={isMobile ? 'nav-links-mobile' : 'nav-links'}
                onClick={() => setIsMobile(false)}
            >

                <AdminDoNotShow>
                    <OwnerDoNotShow>
                        {/* <Link to={'/'} className='home'>
                            <li>Home</li>
                        </Link> */}
                        {/* <Link to={'/about'} className='about'>
                <li>About</li>
            </Link> */}
                        {/* services อันนี้จะเป็นหน้าที่ user เห็น */}
                        {/* <Link to={'/services'} className='services'>
                <li>Services</li>
            </Link> */}
                    </OwnerDoNotShow>

                </AdminDoNotShow>
                {/* ใช้เสร็จแล้วลบทิ้ง แล้วไปใช้ด้านใน protected route */}
                <Link to={'/services'} className='services'>
                    <li>Services</li>
                </Link>

                <AdminLink>
                    {/* <Link to={'/admin'} className='admin'>
                    <li>Admin</li>
                </Link> */}
                    {/* <Link to={'/admin/home'}>
                    <button className='btn'>
                        Admin
                    </button>
                </Link> */}
                    {/* <Link to={'/adminhome'} className='adminhome'>
                    <li>Home</li>
                </Link> */}
                    
                    <Link to={'/addservices/ADD'} className='addservices'>
                        <li>Add Services</li>
                    </Link>
                    {/* <Link to={'/allservices'} className='allservices'>
                    <li>All Services</li>
                </Link> */}
                    <Link to={'/allservices'} className='viewservices'>
                        <li>View Services</li>
                    </Link>
                    {/* <Link to={'/adminhome'} className='adminhome'>
                    <li>Home</li>
                </Link> */}
                    <Link to={'/adminorders'} className='adminorders'>
                        <li>Orders</li>
                    </Link>
                    <Link to={'/dashboard'} className='dashboard'>
                        <li>Dashboard</li>
                    </Link>

                </AdminLink>

                {/* <OwnerRoute>
            <Link to={'/ownerhome'} className='ownerhome'>
                    <li>Home</li>
                </Link>
            </OwnerRoute> */}




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

                        <FaCartArrowDown size={20} />
                        <p>{cartTotalQuantity}</p>
                    </Link>
                </span>
                <ShowOnLogin>
                    <Link to={'/order-history'} className='history'>
                        <li>My Orders</li>
                    </Link>
                </ShowOnLogin>
                <ShowOnLogin>
                    <a href='#home' style={{ color: '#ff7722' }}>
                        <FaUserCircle size={16} />
                        Hi, {displayName}
                    </a>
                </ShowOnLogin>
                <ShowOnLogin>
                    <Link to={'/'} className='logout' onClick={logoutUser}>
                        <li>Logout</li>
                    </Link>
                </ShowOnLogin>
                <ShowOnLogout>
                    <Link to={'/signin'} className='signin'>
                        <li>Sign In</li>
                    </Link>
                </ShowOnLogout>


                {/* <Link to={'/signup'} className='signup'>
                <li>Sign Up</li>
            </Link> */}
            </ul>
            <button className='mobile-menu-icon'
                onClick={() => setIsMobile(!isMobile)}
            >
                {isMobile ? <i className='fas fa-times'></i> : <i className='fas fa-bars'></i>}
            </button>
        </nav>
    )
}

export default Header