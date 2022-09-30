import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../redux/slice/authSlice'

const OwnerRoute = ({children}) => {

    const userEmail = useSelector(selectEmail)
    
    if(userEmail === "owner@test.dev"){
        return children
    }
    return null
}

export default OwnerRoute