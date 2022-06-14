import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Autocomplete from '../../components/Autocomplete';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Editabsensi = ({ update, updateId }) => {
    const data = useSelector(state => state.pegawai);
    const dispatch = useDispatch();
    const [forms, setForms] = useState({
        id_pegawai: '',
        nik: '',
        nama_pegawai: '',
        nama_jabatan: ''
    });

    const handleComplete = (complete) => {
        setForms({
            ...forms,
            id_pegawai: complete.id_pegawai,
            nik: complete.nik,
            nama_pegawai: complete.nama_pegawai,
            nama_jabatan: complete.nama_jabatan
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://127.0.0.1:8000/api/absensi/${updateId}`, {
            method: 'POST',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await request.json();
        dispatch(fetchData());
        update(!update)
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    console.log(forms)
    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Tambah pegawai</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex relative'>
                        <label htmlFor="nama" className='basis-1/4'>NIK</label>
                        <Autocomplete suggestions={data.pegawai ? data.pegawai.pegawai : []} handleComplete={handleComplete} />                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nama" className='basis-1/4'>Nama</label>
                        <input type='text' name='nama' id='nama' className='border border-gray-400' value={forms.nama_pegawai} disabled onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Jabatan</label>
                        <select name="id_jabatan" id="id_jabatan" disabled onChange={handleChange}>
                            <option>{forms.nama_jabatan}</option>
                        </select>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="absensi" className='basis-1/4'>Tidak hadir</label>
                        <input type='text' name='absensi' id='absensi' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Button>
                            <span onClick={() => update(!update)}>Batal</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editabsensi;