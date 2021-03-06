import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Tambahjabatan = ({ tambah }) => {

    const data = useSelector(state => state.pegawai.pegawai);
    const defaultForm = {
        kode_jabatan: data.kd_jb,
        jabatan: '',
        tunj_jb: '',
    }

    const [forms, setForms] = useState(defaultForm);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://127.0.0.1:8000/api/jabatan/create`, {
            method: 'POST',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await request.json();
        dispatch(fetchData());
        tambah(false);
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Tambah Jabatan</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex'>
                        <label htmlFor="kode_jabatan" className='basis-1/4'>Kode jabatan</label>
                        <input type='text' name='kode_jabatan' id='kode_jabatan' className='border border-gray-400 bg-gray-300' value={data.kd_jb} onChange={handleChange} disabled />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="jabatan" className='basis-1/4'>Jabatan</label>
                        <input type='text' name='jabatan' id='jabatan' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tunj_jb" className='basis-1/4'>Gaji Pokok</label>
                        <input type='text' name='tunj_jb' id='tunj_jb' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Button><span onClick={() => tambah("false")}>Batal</span></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tambahjabatan;