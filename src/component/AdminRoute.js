import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectEmail } from '../redux/slice/authSlice'

const AdminRoute = ({children}) => {

    const userEmail = useSelector(selectEmail)
    
    if(userEmail === "admin@test.dev"){
        return children
    }
    return (
        <section style={{height: '80vh'}}>
            <div className='container'>
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin.</p>
                <br />
                <Link to={'/'}>
                    <button className='--btn'>&larr; Back to Home</button>
                </Link>
                
            </div>
        </section>
    )
}

export const AdminLink = ({children}) => {

    const userEmail = useSelector(selectEmail)
    
    if(userEmail === "admin@test.dev"){
        return children
    }
    return null
}

export default AdminRoute