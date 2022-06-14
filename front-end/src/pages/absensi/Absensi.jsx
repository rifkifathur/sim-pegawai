import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import Editabsensi from './Editabsensi';
import Tambahabsen from './Tambahabsen';

const Absensi = () => {
    const data = useSelector(state => state.pegawai)
    const [tambah, setTambah] = useState(false);
    const [update, setUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(false);
    const thead = ["No", "NIK", "Nama", "Jabatan", "Tidak Hadir", "Aksi"];

    const handleUpdate = (id) => {
        setUpdate(!update)
        setUpdateId(id);
    }

    const handleDelete = () => {

    }
    return (
        <>
            <Navbar header='Absensi' />
            <Sidenav />
            <Main>
                <Container>
                    <Header>
                        Absensi
                    </Header>
                    {data.loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <Button>
                                <span onClick={() => setTambah(!tambah)}>Tambah</span>
                            </Button>
                            <div className='overflow-x-auto'>
                                <table className='border border-gray-200 my-4'>
                                    <thead className='bg-[#081A51]'>
                                        <tr>
                                            {thead.map((item, i) =>
                                                <th key={i} className='text-sm text-white border border-gray-400 py-1 px-2'>{item}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.pegawai.absen && data.pegawai.absen.map((item, i) => {
                                            return (
                                                <tr key={item.nik}>
                                                    <td className='border border-gray-200 px-2 text-xs'>{i + 1}</td>
                                                    <td className='border border-gray-200 px-2 text-xs'>{item.nik}</td>
                                                    <td className='border border-gray-200 px-2 text-xs'>{item.nama_pegawai}</td>
                                                    <td className='border border-gray-200 px-2 text-xs'>{item.nama_jabatan}</td>
                                                    <td className='border border-gray-200 px-2 text-xs'>{item.absensi}</td>
                                                    <td className='border border-gray-200 px-8 md:px-2 text-xs'>
                                                        <div className='flex'>
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleUpdate(item.id_pegawai)} />
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(0)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </Container>
            </Main>
            {tambah && <Tambahabsen tambah={(tambah) => setTambah(tambah)} />}
            {update && <Editabsensi updateId={updateId} update={(update) => setUpdate(update)} />}
        </>
    );
};

export default Absensi;