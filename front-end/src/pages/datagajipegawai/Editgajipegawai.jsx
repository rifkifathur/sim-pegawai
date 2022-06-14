import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Editgajipegawai = ({idgaji, update}) => {
    const ref = useRef(); 
    const dispatch = useDispatch();
    const data = useSelector(state => state.pegawai.pegawai);
    const [suggest, setSuggest] = useState([]);
    const [drop, setDrop] = useState(false);
    const [Uinput, setUinput] = useState('');
    const [fixSuggest, setFixSuggest] = useState({
        nik: '',
        nama_pegawai: '',
        nama_jabatan: ''
    });
    const [forms, setForms] = useState({
        id_pegawai: '',
        id_gp: '',
        t_transport: '',
        t_makan: '',
        id_bpjs_kes: ''
    });


    useEffect(() => { 
        const outside = (e) => {
            if (drop && ref.current && !ref.current.contains(e.target)) {
                setDrop(false);
            }
        }
        document.addEventListener("click", outside);

        return () => {
            document.removeEventListener("click", outside);
        }
    }, [drop])

    const handleSuggest = (e) => {
        const unLinked = data.pegawai.filter((item) =>
            item.nik.indexOf(e.target.value) > -1
        );
        setSuggest(unLinked);
        setDrop(true);
        setUinput(e.target.value);
    }

    const handleShowSuggest = (e) => {
        setFixSuggest({
            nik: e.nik,
            nama_pegawai: e.nama_pegawai,
            nama_jabatan: e.nama_jabatan
        });
        setUinput(e.nik);
        setForms({ ...forms, id_pegawai: e.id_pegawai, id_gp: e.id_gp })
    }

    const handleChange = (e) => {
        setForms({
            ...forms,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        async function jabatanId() {
            const request = await fetch(`http://127.0.0.1:8000/api/datagaji/${idgaji}`);
            const response = await request.json();
            setForms(response)
            setUinput(response.nik)
        }
        jabatanId()
    }, [idgaji])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://127.0.0.1:8000/api/datagaji/${idgaji}`, {
            method: 'PUT',
            body: JSON.stringify(forms),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        await request.json();
        dispatch(fetchData());
        update(!update) 

    }
    console.log(forms)
    return (
        <div className='fixed w-[100%] h-full bg-black top-0 bg-opacity-50'>
            <div className='mx-auto my-14 w-[80%] md:w-[50%] bg-white rounded-sm'>
                <header className='font-bold border-b p-3 border-gray-400'>Tambah pegawai</header>
                <form onSubmit={handleSubmit}>
                    <div className='p-3 flex relative'>
                        <label htmlFor="nama" className='basis-1/4'>NIK</label>
                        <input type='text' name='nama' id='nama' className='border border-gray-400' value={Uinput} onChange={handleSuggest} disabled />
                        {drop &&
                            <ul className='absolute left-44 top-8 w-[175px] bg-red-200 border-md border-slate-400'>
                                {suggest.map(item => {
                                    return (
                                        <div key={item.nik} className="border-b border-slate-400" onClick={() => handleShowSuggest(item)}>
                                            <li>{item.nik}</li>
                                            <li>{item.nama_pegawai}</li>
                                        </div>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="nama" className='basis-1/4'>Nama</label>
                        <input type='text' name='nama' id='nama' className='border border-gray-400' value={forms.nama_pegawai} disabled />
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="tgl_lahir" className='basis-1/4'>Jabatan</label>
                        <select name="id_jabatan" id="id_jabatan" disabled >
                            <option>{forms.nama_jabatan}</option>
                        </select>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="id_gp" className='basis-1/4'>Golongan</label>
                        <select name="id_gp" id="id_gp" onChange={handleChange} value={forms.id_gp}>
                            <option>Pilih</option>
                            {data.gaji_pokok && data.gaji_pokok.map((item) => {
                                return <option value={item.id_gp} key={item.kd_gp} selected>{item.gol_gp}</option>
                            })}
                        </select>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="t_transport" className='basis-1/4'>Tunj. Transport</label>
                        <input type='text' name='t_transport' id='t_transport' className='border border-gray-400' onChange={handleChange} value={forms.t_transport}/>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="t_makan" className='basis-1/4'>Tunj. Makan</label>
                        <input type='text' name='t_makan' id='t_makan' className='border border-gray-400' onChange={handleChange} value={forms.t_makan}/>
                    </div>
                    <div className='p-3 flex'>
                        <label htmlFor="id_bpjs_kes" className='basis-1/4'>BPJS Kes</label>
                        <select name="id_bpjs_kes" id="id_bpjs_kes" onChange={handleChange} value={forms.id_bpjs_kes}>
                            <option>Pilih</option>
                            {data.stts_bpjs_kes && data.stts_bpjs_kes.map((item, i) => {
                                return <option value={item.id_bpjs_kes} key={i}>{item.stts}</option>
                            })}
                        </select>
                    </div>
                    <div className='p-3 flex justify-end'>
                        <Button>
                            Simpan
                        </Button>
                        <Button>
                            <span onClick={() => update(!update) }>Batal</span>
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Editgajipegawai;