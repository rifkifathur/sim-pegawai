import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';


const Editpegawai = ({edit, editId}) => {

    const [forms, setForms] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        async function DataId() {
            const request = await fetch(`http://127.0.0.1:8000/api/pegawai/${editId}`);
            const response = await request.json();
            setForms(response)
        }
        DataId()
    }, [editId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('foto', forms.foto);
        formdata.append('nama_pegawai', forms.nama_pegawai);
        formdata.append('jk', forms.jk);
        formdata.append('tgl_lahir', forms.tgl_lahir);
        formdata.append('alamat', forms.alamat);
        formdata.append('id_jabatan', forms.id_jabatan);

        const request = await fetch(`http://127.0.0.1:8000/api/pegawai/${editId}?_method=PUT`, {
            method: 'POST',
            body: formdata,
        });
        await request;
        dispatch(fetchData());
        edit(!edit);
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.name === 'foto' ? e.target.files[0] : e.target.value
        })
    }

    const jabatan = useSelector(state => state.pegawai.pegawai);
    console.log(forms)

    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Edit pegawai</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex flex-wrap'>
                        <label htmlFor='foto' className='basis-1/4'>Foto</label>
                        <input type='file' name='foto' id='foto' onChange={handleChange} className='basis-1/2' />
                        <img src={`http://127.0.0.1:8000/images/${forms.foto}`} alt="tes" className='mx-32 my-2' />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nama" className='basis-1/4'>Nama</label>
                        <input type='text' name='nama_pegawai' id='nama' className='border border-gray-400' defaultValue={forms.nama_pegawai} onChange={handleChange} />
                    </div>
                    <div className='p-3 flex items-center'>
                        <label htmlFor="jk" className='basis-1/4'>Jenis Kelamin</label>
                        <input type='radio' name='jk' value='L' className='m-1' checked={forms.jk === 'L'} onChange={handleChange} />
                        <label htmlFor="jk">Laki-laki</label>
                        <input type='radio' name='jk' value='P' className='m-1' checked={forms.jk === 'P'} onChange={handleChange} />
                        <label htmlFor="jk">Perempuan</label>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Tanggal lahir</label>
                        <input type='date' name='tgl_lahir' id='ttl' className='border border-gray-400' value={forms.tgl_lahir} onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="alamat" className='basis-1/4'>Alamat</label>
                        <textarea name='alamat' id='alamat' className='border border-gray-400 h-12 w-60' value={forms.alamat} onChange={handleChange} />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Jabatan</label>
                        <select name="id_jabatan" id="id_jabatan" onChange={handleChange} value={forms.id_jabatan}>
                            <option>Pilih Jabatan</option>
                            {jabatan.jabatan && jabatan.jabatan.map(item => {
                                return <option value={item.id_jabatan} key={item.id_jabatan} >{item.nama_jabatan}</option>
                            })}
                        </select>
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>Simpan</Button>
                        <Button onClick={()=> edit(!edit)}>Batal</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editpegawai;