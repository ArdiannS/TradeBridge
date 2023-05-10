import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children}) =>{
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    const userIsLogged = Object.keys(user).length > 0;

    if(!userIsLogged) {
        return <Navigate to={'/signin'} />
    }
    return children;
}

export default PrivateRoute;