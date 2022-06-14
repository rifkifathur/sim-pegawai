import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthRouter = (props) => {
    let navigate = useNavigate();
    const userr = JSON.parse(localStorage.getItem('user-info'));
    const user = useSelector(state => state.user)
    console.log(user)

    useEffect(() => {
        if (userr.error) {
            return navigate("/");
        }
    },[navigate, userr])
    // if (user.user === null) {
    //     <Navigate to="/"/>;
    // }

    return props.children
};

export default AuthRouter;