import { useState } from 'react';
import Main from '../../components/Main';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../../redux/pegawai/PegawaiAction';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Tambahpegawai from './Tambahpegawai';
import Editpegawai from './Editpegawai';
const Datapegawai = () => {

    const [tambah, setTambah] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(false);

    const thead = ["No", "Foto", "NIK", "Nama", "Jenis kelamin", "Tanggal Lahir", "Alamat", "Jabatan", "Aksi"];
    const dispatch = useDispatch();

    const handleEdit = (id) => {
        setEdit(!edit);
        setEditId(id)
    }
    const handleDelete = async (id) => {
        const request = await fetch(`http://127.0.0.1:8000/api/pegawai/${id}`, {
            method: 'DELETE',
        });
        await request;
        dispatch(fetchData())
    }
    console.log(editId)
    const data = useSelector(state => state.pegawai.pegawai);
    const bool = useSelector(state => state.pegawai.loading);

    return (
        <>
            <Navbar header='Data pegawai' />
            <Sidenav />
            <Main>
                <Container>
                    <Header>
                        Data pegawai
                    </Header>
                    {bool ? (
                        <p>loading</p>
                    ) : (
                        <>
                            <Button onClick={() => setTambah(!tambah)}>Tambah</Button>
                            {data.pegawai && data.pegawai.links.map((item,i) => {
                                return <span onClick={() => dispatch(fetchData(i))}>{i}</span>
                            })}
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
                                                <tr key={item.id_pegawai} className={i%2 !== 0 && `bg-slate-200`}>
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
                                                            <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleEdit(item.id_pegawai)}/>
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
            {tambah && <Tambahpegawai tambah={(tambah) => setTambah(tambah)} />}
            {edit && <Editpegawai editId={editId} edit={(edit) => setEdit(edit)} />}
        </>
    );
};

export default Datapegawai;