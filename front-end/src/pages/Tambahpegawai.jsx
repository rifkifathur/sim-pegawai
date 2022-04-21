import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { fetchData } from '../redux/pegawai/PegawaiAction';

const Tambahpegawai = () => {
    const defaultForm = {
        foto: '',
        nama: '',
        jk: '',
        tgl_lahir: '',
        alamat: ''
    }

    const [forms, setForms] = useState(defaultForm);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('foto', forms.foto);
        formdata.append('nama', forms.nama);
        formdata.append('jk', forms.jk);
        formdata.append('tgl_lahir', forms.tgl_lahir);
        formdata.append('alamat', forms.alamat);
        const request = await fetch('http://127.0.0.1:8000/api/pegawai/create', {
            method: 'POST',
            body: formdata,
        });
        await request;
        dispatch(fetchData());
        navigate("/datapegawai");
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.name === 'foto' ? e.target.files[0] : e.target.value
        })
    }

    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Tambah pegawai</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex'>
                        <label htmlFor='foto' className='basis-1/4'>Foto</label>
                        <input type='file' name='foto' id='foto' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nama" className='basis-1/4'>Nama</label>
                        <input type='text' name='nama' id='nama' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex items-center'>
                        <label htmlFor="jk" className='basis-1/4'>Jenis Kelamin</label>
                        <input type='radio' name='jk' value='L' className='m-1' onChange={handleChange} />
                        <label htmlFor="jk">Laki-laki</label>
                        <input type='radio' name='jk' value='P' className='m-1' onChange={handleChange} />
                        <label htmlFor="jk">Perempuan</label>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Tanggal lahir</label>
                        <input type='date' name='tgl_lahir' id='ttl' className='border border-gray-400' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="alamat" className='basis-1/4'>Alamat</label>
                        <textarea name='alamat' id='alamat' className='border border-gray-400 h-12 w-60' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Link to='/datapegawai'>
                            <Button>Batal</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tambahpegawai;