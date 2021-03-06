import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Editjabatan = ({ ubah, ubahId }) => {

    const [forms, setForms] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        async function jabatanId() {
            const request = await fetch(`http://127.0.0.1:8000/api/jabatan/${ubahId}`);
            const response = await request.json();
            setForms(response)
        }
        jabatanId()
    }, [ubahId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://127.0.0.1:8000/api/jabatan/${ubahId}`, {
            method: 'PUT',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await request.json();
        dispatch(fetchData());
        ubah(false)
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
                <header className='font-bold border-b p-3 border-gray-400'>Edit Jabatan</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex'>
                        <label htmlFor="kode_jabatan" className='basis-1/4'>Kode jabatan</label>
                        <input type='text' name='kode_jabatan' id='kode_jabatan' className='border border-gray-400 bg-gray-300' defaultValue={forms.kode_jabatan} onChange={handleChange} disabled />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="jabatan" className='basis-1/4'>Jabatan</label>
                        <input type='text' defaultValue={forms.nama_jabatan} name='nama_jabatan' id='jabatan' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tunj_jb" className='basis-1/4'>Tunj. jabatan</label>
                        <input type='text' defaultValue={forms.tunj_jb} name='tunj_jb' id='tunj_jb' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Button><span onClick={() => ubah(false)}>Batal</span></Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editjabatan;