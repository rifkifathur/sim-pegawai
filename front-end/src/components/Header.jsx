import React from 'react';

const Header = ({children}) => {
    return (
        <header className='font-bold text-xl my-4 p-2 border-b border-gray-400'>
            {children}
        </header>
    );
};

export default Header;