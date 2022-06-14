import React from 'react';

const Tabnav = ({handleTab}) => {

    const tabClick = (d) => {
        handleTab(d)
    }
    return (
        <>
            <ul className='flex bg-slate-400 border'>
                    <li className='p-2 border' onClick={()=>tabClick(1)}>Jabatan</li>
                    <li className='p-2 border' onClick={()=>tabClick(2)}>Gaji pokok</li>
            </ul>
        </>
    );
};

export default Tabnav;