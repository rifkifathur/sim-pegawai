import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { fetchData } from '../../redux/pegawai/PegawaiAction';

const Gajipokok = ({ tambah, ubah }) => {
    const thead = ["No", "Kode", "Golongan", "Gaji pokok", "Aksi"];
    const GajiPokok = useSelector(state => state.pegawai.pegawai);

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        const request = await fetch(`http://127.0.0.1:8000/api/gajipokok/${id}`, {
            method: 'DELETE',
        });
        await request;
        dispatch(fetchData())
    }

    const handleEdit = (id) => {
        ubah("gp", id)
    }

    return (
        <>
            <Button>
                <span onClick={() => tambah("gp")}>Tambah</span>
            </Button>
            <div className='overflow-x-auto'>
                <table className='border border-gray-200 my-4'>
                    <thead className='bg-[#081A51]'>
                        <tr>
                            {thead.map((item, i) =>
                                <th key={i} className='text-sm text-white border border-gray-400 py-1 px-2'>{item}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {GajiPokok.gaji_pokok && GajiPokok.gaji_pokok.map((item, i) => {
                            return (
                                <tr key={item.id_gp}>
                                    <td className='border border-gray-200 px-2 text-xs'>{i + 1}</td>
                                    <td className='border border-gray-200 px-2 text-xs'>{item.kd_gp}</td>
                                    <td className='border border-gray-200 px-2 text-xs'>{item.gol_gp}</td>
                                    <CurrencyFormat value={item.gaji_pokok} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                        <td className='border border-gray-200 px-2 text-xs'>
                                            {value}
                                        </td>}
                                    />
                                    <td className='border border-gray-200 px-8 md:px-2'>
                                        <div className='flex'>
                                            <img className="cursor-pointer w-4 mx-2" src="./assets/edit.svg" alt="Edit Logo" onClick={() => handleEdit(item.id_gp)} />
                                            <img className="cursor-pointer w-4 mx-2" src="./assets/delete.svg" alt="Remove Logo" onClick={() => handleDelete(item.id_gp)} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Gajipokok;