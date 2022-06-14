import React from 'react';

const Card = ({children}) => {
    return (
        <div className='bg-white w-80 h-auto p-4 rounded-sm shadow-sm shadow-gray-600'>
            {children}
        </div>
    );
};

export default Card;