import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../redux/slice/authSlice'

const AdminRoute = ({children}) => {

    const userEmail = useSelector(selectEmail)
    
    if(userEmail === "admin@test.dev"){
        return children
    }
    return null
}

export default AdminRoute