import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Editgajip = ({ ubah, ubahId }) => {

    const [forms, setForms] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        async function gajipId() {
            const request = await fetch(`http://127.0.0.1:8000/api/gajipokok/${ubahId}`);
            const response = await request.json();
            setForms(response)
        }
        gajipId()
    }, [ubahId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://127.0.0.1:8000/api/gajipokok/${ubahId}`, {
            method: 'PUT',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await request.json();
        dispatch(fetchData());
        ubah("false");
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name] : e.target.value
        })
    }

    console.log(forms)
    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50 z-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Edit Gaji pokok</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex'>
                        <label htmlFor="kd_gp" className='basis-1/4'>Kode</label>
                        <input type='text' name='kd_gp' id='kd_gp' className='border border-gray-400' defaultValue={forms.kd_gp} disabled onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="gol" className='basis-1/4'>Golongan</label>
                        <input type='text' name='gol_gp' id='gol' className='border border-gray-400' defaultValue={forms.gol_gp} onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="gaji_pokok" className='basis-1/4'>Gaji Pokok</label>
                        <input type='text' name='gaji_pokok' id='gaji_pokok' className='border border-gray-400' defaultValue={forms.gaji_pokok} onChange={handleChange} />
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

export default Editgajip;