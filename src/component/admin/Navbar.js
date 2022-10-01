import React from 'react'
import './../../styles/Admin/Navbar.css'
import { FaUserCircle } from 'react-icons/fa'
import { selectUserName } from '../../redux/slice/authSlice'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const userName = useSelector(selectUserName)
  return (
    <div className='navbar'>
      <div className='user'>
        <FaUserCircle size={40} color='#fff' />
        <h4>{userName}</h4>
        

      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-services">
              All services
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-services">
              Add service
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders">
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar