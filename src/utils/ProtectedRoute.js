import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children}) =>{
    const user = JSON.parse(localStorage.getItem('user') || "{}");
    const userIsLogged = Object.keys(user).length > 0;
    const componentName = children.type.name;

    console.log(componentName);
    if(componentName==="Dashboard"){
        if(!userIsLogged) {
            return <Navigate to={'/signin'} />
        }
    }else if (componentName==="LogInForm" || componentName==="SignUpForm"){
        if(userIsLogged) {
            return <Navigate to={'/'} />
        }
    }

    
    
    return children;
}

export default PrivateRoute;