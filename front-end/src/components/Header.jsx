import React from 'react';

const Header = (props) => {
    return (
        <header className='font-bold text-xl my-4 p-2 border-b border-gray-400'>
            {props.children}
        </header>
    );
};

export default Header;