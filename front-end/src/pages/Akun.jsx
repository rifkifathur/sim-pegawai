import React from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';

const Akun = () => {
    const thead = ["No", "Foto", "NIK", "Nama", "Jenis kelamin", "Tanggal Lahir", "Alamat", "Jabatan", "Aksi"];

    const data = useSelector(state => state.pegawai.pegawai);
    const bool = useSelector(state => state.pegawai.loading);

    const handleEdit = () => {

    }

    const handleDelete = () => {

    }
    return (
        <>
            <Navbar header='Akun' />
            <Sidenav />
            <Main>
                <Container>
                    <Header>
                        Akun
                    </Header>
                    <form onSubmit={null}>
                        <div className='p-3 flex'>
                            <label htmlFor="nama" className='basis-1/4'>Nama</label>
                            <input type='text' name='nama_pegawai' id='nama_pegawai' className='border border-gray-400' onChange={null} />
                        </div>
                        <div className='p-3 flex'>
                            <label htmlFor="nama_pengguna" className='basis-1/4'>Nama Pengguna</label>
                            <input type='text' name='nama_pengguna' id='nama_pengguna' className='border border-gray-400' onChange={null} />
                        </div>
                        <div className='p-3 flex'>
                            <label htmlFor="password" className='basis-1/4'>Nama Pengguna</label>
                            <input type='password' name='password' id='password' className='border border-gray-400' onChange={null} />
                        </div>
                        <div className='p-3 flex justify-end'>
                            <Button>Simpan</Button>
                            <Button onClick={() => null}>Batal</Button>
                        </div>
                    </form>
                    {bool ? (
                        <p>loading</p>
                    ) : (
                        <>
                            <div className='overflow-x-auto'>
                                <table className='border border-gray-400 my-4'>
                                    <thead className='bg-[#E6F3FF]'>
                                        <tr>
                                            {thead.map((item, i) =>
                                                <th key={i} className='text-sm text-black py-1 px-2'>{item}</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.pegawai && data.pegawai.data.map((item, i) => {
                                            return (
                                                <tr key={item.id_pegawai} className={i % 2 !== 0 && `bg-slate-200`}>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{i + 1}</td>
                                                    <td className='px-2 py-4 border-y border-r border-gray-300 text-xs'><img src={`http://127.0.0.1:8000/images/${item.foto}`} alt="tes" /></td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.nik}</td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.nama_pegawai}</td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.jk}</td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.tgl_lahir}</td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.alamat}</td>
                                                    <td className='px-2 border-y border-r border-gray-300 text-xs'>{item.nama_jabatan}</td>
                                                    <td className='px-12 md:px-6 border-y border-l border-gray-300 text-xs'>
                                                        <div className='flex'>
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleEdit(item.id_pegawai)} />
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(item.id_pegawai)} />
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
        </>
    );
};

export default Akun;