import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Datajabatan = ({ tambah, ubah }) => {
    const thead = ["No", "jabatan", "Gaji Pokok", "Aksi"];
    const dispatch = useDispatch();

    const data = useSelector(state => state.pegawai.pegawai);
    const bool = useSelector(state => state.pegawai.loading);

    const handleDelete = async (id) => {
        const request = await fetch(`http://127.0.0.1:8000/api/jabatan/${id}`, {
            method: 'DELETE',
        });
        await request;
        dispatch(fetchData())
    }

    const handleEdit = (id) => {
        ubah(true, id) 
    }
    return (
        <>
            {bool ? (
                <p>loading</p>
            ) : (
                <>
                    <Button>
                        <span onClick={() => tambah(true)}>Tambah</span>
                    </Button>
                    <table className='border border-gray-200 my-4'>
                        <thead className='bg-[#081A51]'>
                            <tr>
                                {thead.map((item, i) =>
                                    <th key={i} className='text-white border border-gray-400 py-1 px-2'>{item}</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.jabatan && data.jabatan.map((item, i) => {
                                return (
                                    <tr key={item.id_jabatan}>
                                        <td className='border border-gray-200 px-2'>{i + 1}</td>
                                        <td className='border border-gray-200 px-2'>{item.nama_jabatan}</td>
                                        <td className='border border-gray-200 px-2'>{item.gaji_pokok}</td>
                                        <td className='border border-gray-200 px-2'>
                                            <div className='flex'>
                                                <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleEdit(item.id_jabatan)}/>
                                                <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
};

export default Datajabatan;