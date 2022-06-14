import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = ({ header }) => {
    const side = useSelector(state => state.showSideNav.showSideNav);
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
        <nav className='h-auto fixed bg-white top-0 left-0 right-0'>
            <div className={side ? 'flex justify-end md:justify-between items-center h-16 w-auto md:ml-52 p-8 shadow-md' : 'flex justify-end md:justify-between items-center h-16 w-auto shadow-md px-8'}>
                <span className='text-2xl px-8 hidden md:inline'>{header}</span>
                <div className='flex justify-end items-center box-content'>
                    <p>{user?.name}</p>
                    <img src="/assets/drop-icon.svg" alt="" className='mx-3 cursor-pointer' onClick={() => setDrop(!drop)} ref={ref} />
                    {drop &&
                        <>
                            <button className="absolute -bottom-5 text-white bg-[#081A51] rounded-sm p-2" onClick={logout}>Logout</button>
                        </>
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;