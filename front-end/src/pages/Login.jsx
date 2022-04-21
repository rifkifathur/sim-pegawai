import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User } from '../redux/user/UserAction';

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState({});
    const dispatch = useDispatch(); 

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/dashboard");
        }
    },[navigate])

    const handleLogin = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const request = await fetch('http://127.0.0.1:8000/api/user', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(login)
        })

        const response = await request.json();
        if (response.error) {
            localStorage.setItem('user-info', JSON.stringify(response))
            navigate('/');
        } else if (response.name) {
            localStorage.setItem('user-info', JSON.stringify(response))
            navigate('/dashboard');
            dispatch(User(response));
        }
    }

    return (
        <div className='container mx-auto w-1/4 my-52'>
            <div className='border border-gray-300 shadow-lg'>
                <header className='text-center text-2xl my-5'>Manajemen pegawai</header>
                <form className='flex flex-col items-center' onSubmit={handleSubmitLogin}>
                    <input type='text' placeholder='Nama' name='username' className='p-2 m-2 w-80 rounded-sm border border-gray-300' onChange={handleLogin} />
                    <input type='password' placeholder='Password' name='password' className='p-2 m-2 w-80 rounded-sm border border-gray-300' onChange={handleLogin} />
                    <button type="submit" className='bg-[#1B2B65] text-white px-2 py-1 m-2 rounded-md'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;