import React from 'react';

const Main = (props) => {
    const { side } = props
    return (
        <div className={side ? 'w-3/4 mx-52' : 'w-auto mx-12'}>
            {props.children}
        </div>
    );
};

export default Main;