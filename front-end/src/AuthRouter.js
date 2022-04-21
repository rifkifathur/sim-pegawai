import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRouter = (props) => {
    let navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            return navigate("/");
        }
    })
    return props.children
};

export default AuthRouter;