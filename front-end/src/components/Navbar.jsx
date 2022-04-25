import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const { side, header } = props;
    const ref = useRef()
    const user = JSON.parse(localStorage.getItem('user-info'));
    const [drop, setDrop] = useState(false);

    useEffect(() => {
        const outside = (e) => {
            if (drop && ref.current && !ref.current.contains(e.target)) {
                setDrop(false);
            }
        }
        document.addEventListener("click", outside);

        return () => {
            document.removeEventListener("click", outside);
        }
    }, [drop])

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <nav className='h-auto flex justify-end sticky'>
            <div className={side ? 'flex justify-between items-center h-16 w-full ml-52 shadow-md' : 'flex justify-between items-center h-16 w-full shadow-md px-16'}>
                <span className='text-2xl px-8'>{header}</span>
                <div className='flex basis-1/2 justify-end items-center box-content px-8'>
                    <input type="search" className='mx-3' />
                    <p>{user?.name}</p>
                    <img src="/assets/drop-icon.svg" alt="" className='mx-3 cursor-pointer' onClick={() => setDrop(!drop)} ref={ref} />
                    {drop &&
                        <button className="absolute -bottom-5 text-white bg-[#081A51] rounded-sm p-2" onClick={logout}>Logout</button>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;