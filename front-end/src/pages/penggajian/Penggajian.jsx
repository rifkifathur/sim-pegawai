import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Navbar from '../../components/Navbar';
import Sidenav from '../../components/Sidenav';

const Penggajian = () => {

    const thead = ["No", "NIK", "Nama", "Gol", "Jabatan", "Gaji pokok", "Tunj. Jabatan", "Tunj. Transport", "Tunj. Makan", "Pot. BPJS Kes",
        "Pot. Kehadiran", "Aksi"];
    const data = useSelector(state => state.pegawai);
    const [penggajian, setPenggajian] = useState([]);
    const [proses, setProses] = useState(true);
    // console.log(data.pegawai)

    useEffect(() => {
        const newData = data.pegawai.datagaji ? data.pegawai.datagaji.map(item => {
            let potabsen = 0
            let total = Number(item.gaji_pokok) + Number(item.tunj_jb) + Number(item.t_transport) + Number(item.t_makan)
            const exist = data.pegawai.absen ? data.pegawai.absen.find(absen => absen.id_pegawai === item.id_pegawai) : null
            if (item.stts === "Y") {
                let potKes = total * 0.01;
                if (exist) {
                    potabsen = 100000
                }
                return { item, potKes: potKes, potabsen }
            } else {
                return { item, potKes: 0 }
            }

        }) : []
        setPenggajian(newData)
    }, [data])
    console.log(penggajian)
    const handleProses = () => {
        setProses(false)
    }

    return (
        <>
            <Navbar header=' penggajian' />
            <Sidenav />
            <Main >
                <Container>
                    <Header>
                        penggajian
                    </Header>
                    <>
                        <Button>
                            <span onClick={handleProses}>Proses</span>
                        </Button>
                        <div className='overflow-x-auto'>
                            <table className='border border-gray-200 my-4 w-full'>
                                <thead className='bg-[#081A51]'>
                                    <tr>
                                        {thead.map((item, i) =>
                                            <th key={i} className='text-sm text-white border border-gray-400 py-1 px-2'>{item}</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {proses ? (
                                        <tr className='bg-red-400'>
                                            <td>Silahkan proses</td>
                                        </tr>
                                    ) : penggajian.map((item, i) => {
                                        return (
                                            <tr key={item.item.id_datagaji}>
                                                <td className='border border-gray-200 px-2 text-xs'>{i + 1}</td>
                                                <td className='border border-gray-200 px-2 text-xs'>{item.item.nik}</td>
                                                <td className='border border-gray-200 px-2 text-xs'>{item.item.nama_pegawai}</td>
                                                <td className='border border-gray-200 px-2 text-xs'>{item.item.gol_gp}</td>
                                                <td className='border border-gray-200 px-2 text-xs'>{item.item.nama_jabatan}</td>
                                                <CurrencyFormat value={item.item.gaji_pokok} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <CurrencyFormat value={item.item.tunj_jb} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <CurrencyFormat value={item.item.t_transport} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <CurrencyFormat value={item.item.t_makan} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <CurrencyFormat value={item.potKes} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <CurrencyFormat value={item.potabsen} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value =>
                                                    <td className='border border-gray-200 px-2 text-xs'>
                                                        {value}
                                                    </td>}
                                                />
                                                <td className='border border-gray-200 px-2 text-xs'>
                                                    <Button>
                                                        <span>cetak</span>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                </Container>
            </Main>
        </>
    );
};

export default Penggajian;