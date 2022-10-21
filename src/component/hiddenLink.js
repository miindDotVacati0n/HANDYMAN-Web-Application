import { useSelector } from 'react-redux'
import { selectEmail, selectIsLoggedIn } from '../redux/slice/authSlice'


const ShowOnLogin = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (isLoggedIn) {
        return children
    }
    return null;
}

export const AdminDoNotShow = ({ children }) => {

    const userEmail = useSelector(selectEmail)

    if (userEmail !== "admin@test.dev") {
        return children
    }
    return null;
}

export const OwnerDoNotShow = ({ children }) => {

    const userEmail = useSelector(selectEmail)

    if (userEmail !== "owner@test.dev") {
        return children
    }
    return null;
}

export const ShowOnLogout = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    if (!isLoggedIn) {
        return children
    }
    return null;
}

export default ShowOnLogin;
