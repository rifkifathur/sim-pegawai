import React from 'react';

const Button = ({children, onClick}) => {
    return (
        <button className='text-[#017EFA] bg-[#F2F4FD] m-2 p-2 rounded-sm' onClick={onClick}>{children}</button>
    );
};

export default Button;