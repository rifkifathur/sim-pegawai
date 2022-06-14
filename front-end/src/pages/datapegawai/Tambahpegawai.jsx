import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Tambahpegawai = ({ tambah }) => {

    const data = useSelector(state => state.pegawai.pegawai);

    const defaultForm = {
        foto: '',
        nik: data.nik_oto,
        nama_pegawai: '',
        jk: '',
        tgl_lahir: '',
        alamat: '',
        id_jb: ''
    }

    const [forms, setForms] = useState(defaultForm);
    console.log(data)
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('foto', forms.foto);
        formdata.append('nik', forms.nik);
        formdata.append('nama_pegawai', forms.nama_pegawai);
        formdata.append('jk', forms.jk);
        formdata.append('tgl_lahir', forms.tgl_lahir);
        formdata.append('alamat', forms.alamat);
        formdata.append('id_jb', forms.id_jb);
        const request = await fetch('http://127.0.0.1:8000/api/pegawai/create', {
            method: 'POST',
            body: formdata,
        });
        await request;
        dispatch(fetchData());
        tambah(!tambah);
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.name === 'foto' ? e.target.files[0] : e.target.value
        })
    }


    console.log(forms)
    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Tambah pegawai</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex'>
                        <label htmlFor='foto' className='basis-1/4'>Foto</label>
                        <input type='file' name='foto' id='foto' onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nik" className='basis-1/4'>NIK</label>
                        <input type='text' name='nik' id='nik' className='border border-gray-400'
                            defaultValue={data.nik_oto} disabled onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nama" className='basis-1/4'>Nama</label>
                        <input type='text' name='nama_pegawai' id='nama_pegawai' className='border border-gray-400' onChange={handleChange} />
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
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Jabatan</label>
                        <select name="id_jb" id="id_jb" onChange={handleChange}>
                            <option>Pilih Jabatan</option>
                            {data.jabatan && data.jabatan.map(item => {
                                return <option value={item.id_jb} key={item.id_jb}>{item.nama_jabatan}</option>
                            })}
                        </select>
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Button onClick={()=>tambah(!tambah)}>Batal</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tambahpegawai;