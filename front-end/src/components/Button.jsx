import React from 'react';

const Button = ({children}) => {
    return (
        <button className='text-white bg-[#081A51] m-2 p-2 rounded-sm'>{children}</button>
    );
};

export default Button;