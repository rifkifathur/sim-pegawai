import React from 'react';
import { useSelector } from 'react-redux';

const Main = ({children}) => {
    const side = useSelector(state => state.showSideNav.showSideNav);
    return (
        <div className={side ? 'w-5/6 mx-12 md:mx-52 my-20' : 'w-auto mx-12 my-20'}>
            {children}
        </div>
    );
};

export default Main;