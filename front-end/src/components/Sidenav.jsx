import { NavLink } from "react-router-dom";

const Sidenav = (props) => {
    const sideList = [
        {
            id: 1,
            txt: 'Dashboard',
            icon: '/assets/dash-icon.svg',
            link: '/dashboard'
        },
        {
            id: 2,
            txt: 'Data pegawai',
            icon: '/assets/pegawai-icon.svg',
            link: '/datapegawai'
        },
        // {
        //     id: 3,
        //     txt: 'Data jabatan',
        //     icon: '/assets/jabatan-icon.svg',
        //     link: '/datajabatan'
        // },
        {
            id: 4,
            txt: 'Pengaturan',
            icon: '/assets/jabatan-icon.svg',
            link: '/pengaturan'
        }
    
    ]

    const { handleSide, valueSide } = props;
    
    const handleHide = () => {
        handleSide(!valueSide)
    }

    const NavStyle = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#1B2B65' : 'none',
            width: '100%',
            borderRadius: '5px'
        }
    }

    return (
        <aside className={valueSide ? 'flex flex-col w-52 h-full top-0 bg-[#081A51] text-white fixed' : 'flex flex-col w-12 h-full top-0 bg-[#081A51] text-white fixed'}>
            <img src="/assets/hide-icon.svg" alt="" className='w-8 absolute -right-3 top-4 cursor-pointer' onClick={handleHide} />
            <div className='basis-1/5 p-8 text-center'>
                <span className='text-2xl'>{valueSide && 'Manajemen pegawai'}</span>
            </div>
            <hr />
            <div className='mt-8'>
                <div className={valueSide ? 'ml-8' : 'ml-0'}>
                    <span className='text-sm text-[#51CBFF]'>{valueSide && 'Main Menu'}</span>
                    <ul className='text-lg'>
                        {sideList.map(item => {
                            return (

                                <NavLink key={item.id} to={item.link} className='flex' style={NavStyle}>
                                    <li className={`${valueSide ? 'py-3 px-2 flex rounded-md cursor-pointer' : 'p-3 flex cursor-pointer'}`}
                                    >
                                        <img src={item.icon} alt='item.txt' className={valueSide ? 'mx-2' : 'mx-0'} />
                                        <span>{valueSide && item.txt}</span></li>
                                </NavLink>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidenav;