import React from 'react';

const Container = (props) => {
    return (
        <div className='w-11/12 mx-auto my-2'>
            {props.children}
        </div>
    );
};

export default Container;