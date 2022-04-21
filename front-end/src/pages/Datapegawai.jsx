import { useState } from 'react';
import Main from '../components/Main';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../redux/pegawai/PegawaiAction';
import Container from '../components/Container';
import Header from '../components/Header';
import Button from '../components/Button';

const Datapegawai = () => {

    const [side, setSide] = useState(true);
    const thead = ["No", "Foto", "Nama", "Jenis kelamin", "Tanggal Lahir", "Alamat", "Aksi"];
    const dispatch = useDispatch();

    const handleSide = (hideValue) => {
        setSide(hideValue)
    }

    const handleDelete = async (id) => {
        const request = await fetch(`http://127.0.0.1:8000/api/pegawai/${id}`, {
            method: 'DELETE',
        });
        await request;
        dispatch(fetchData())
    }

    const data = useSelector(state => state.pegawai.pegawai);
    const bool = useSelector(state => state.pegawai.loading);


    return (
        <>
            <Navbar side={side} header='Data pegawai' />
            <Sidenav handleSide={handleSide} valueSide={side} />
            <Main side={side}>
                <Container>
                    <Header>
                        Data pegawai
                    </Header>
                    {bool ? (
                        <p>loading</p>
                    ) : (
                        <>
                            <Link to='tambah'>
                                <Button>Tambah</Button>
                            </Link>
                            <table className='border border-gray-200 my-4'>
                                <thead className='bg-[#081A51]'>
                                    <tr>
                                        {thead.map((item, i) =>
                                            <th key={i} className='text-white border border-gray-400 py-1 px-2'>{item}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.pegawai && data.pegawai.map((item, i) => {
                                        return (
                                            <tr key={item.id}>
                                                <td className='border border-gray-200 px-2'>{i + 1}</td>
                                                <td className='border border-gray-200 px-2'><img src={`http://127.0.0.1:8000/images/${item.foto}`} alt="tes" /></td>
                                                <td className='border border-gray-200 px-2'>{item.nama_pegawai}</td>
                                                <td className='border border-gray-200 px-2'>{item.jk}</td>
                                                <td className='border border-gray-200 px-2'>{item.tgl_lahir}</td>
                                                <td className='border border-gray-200 px-2'>{item.alamat}</td>
                                                <td className='border border-gray-200 px-2'>
                                                    <div className='flex'>
                                                        <Link to={`ubah/${item.id}`}>
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" />
                                                        </Link>
                                                        <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(item.id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
                </Container>
            </Main>
            <Outlet />
        </>
    );
};

export default Datapegawai;