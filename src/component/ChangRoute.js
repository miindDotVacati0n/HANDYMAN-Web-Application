import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../redux/slice/authSlice'

const ChangRoute = ({ children }) => {

    const userEmail = useSelector(selectEmail)

    if (userEmail === "chang@test.dev") {
        return children
    }
    return null

}

export default ChangRoute