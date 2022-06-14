import React, { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';
import { fetchData } from '../../redux/pegawai/PegawaiAction';
import Editgajipegawai from './Editgajipegawai';
import Tambahgajipegawai from './Tambahgajipegawai';

const Gajipegawai = () => {
    const data = useSelector(state => state.pegawai);
    const dispatch = useDispatch();
    const [tambah, setTambah] = useState(false);
    const [idgaji, setIdGaji] = useState(0);
    const [update, setUpdate] = useState(false);

    const thead = ["No", "NIK", "Nama", "Gol", "Jabatan", "Tunj. Transport", "Tunj. Makan",
        "BPJS Ket", "Aksi"];

    const handleUpdate = (id) => {
        setIdGaji(id)
        setUpdate(true)
    }

    const handleDelete = async (id) => {
        const request = await fetch(`http://127.0.0.1:8000/api/datagaji/${id}`, {
            method: 'DELETE',
        });
        await request;
        dispatch(fetchData());
        console.log(id)
    }

    return (
        <>
            <Navbar header=' Data Gaji Pegawai' />
            <Sidenav />
            <Main >
                <Container>
                    <Header>
                        Data Gaji Pegawai
                    </Header>
                    <>
                        {data.loading ? (
                            <p>Loading</p>
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
                                            {data.pegawai.datagaji && data.pegawai.datagaji.map((item, i) => {
                                                return (
                                                    <tr key={item.id_datagaji}>
                                                        <td className='border border-gray-200 px-2 text-xs'>{i + 1}</td>
                                                        <td className='border border-gray-200 px-2 text-xs'>{item.nik}</td>
                                                        <td className='border border-gray-200 px-2 text-xs'>{item.nama_pegawai}</td>
                                                        <td className='border border-gray-200 px-2 text-xs'>{item.gol_gp}</td>
                                                        <td className='border border-gray-200 px-2 text-xs'>{item.nama_jabatan}</td>
                                                        <CurrencyFormat value={item.t_transport} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                            <td className='border border-gray-200 px-2 text-xs'>
                                                                {value}
                                                            </td>}
                                                        />
                                                        <CurrencyFormat value={item.t_makan} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                            <td className='border border-gray-200 px-2 text-xs'>
                                                                {value}
                                                            </td>}
                                                        />
                                                        <td className='border border-gray-200 px-2 text-xs'>{item.stts}</td>
                                                        <td className='border border-gray-200 px-8 md:px-2 text-xs'>
                                                            <div className='flex'>
                                                                <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleUpdate(item.id_datagaji)} />
                                                                <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(item.id_datagaji)} />
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
                    </>
                </Container>
            </Main>
            {tambah && <Tambahgajipegawai tambah={(tambah) => setTambah(tambah)} />}
            {update && <Editgajipegawai idgaji={idgaji} update={(update) => setUpdate(update)} />}
        </>
    );
};

export default Gajipegawai;