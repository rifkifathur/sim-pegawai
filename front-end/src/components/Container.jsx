import React from 'react';

const Container = ({children}) => {
    return (
        <div className='w-11/12 mx-auto my-2'>
            {children}
        </div>
    );
};

export default Container;