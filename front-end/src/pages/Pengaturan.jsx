import React, { useState } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Tabnav from '../components/Tabnav';
import Datajabatan from './datajabatan/Datajabatan';
import Gajipokok from './gajipokok/Gajipokok';
import Tambahjabatan from './datajabatan/Tambahjabatan';
import Editjabatan from './datajabatan/Editjabatan';
import Tambahgajip from './gajipokok/Tambahgajip';
import Editgajip from './gajipokok/Editgajip';

const Pengaturan = () => {
    const [tab, setTabs] = useState(0);
    const [tambah, setTambah] = useState("");
    const [ubah, setUbah] = useState("");
    const [ubahId, setUbahId] = useState(0);

    const handleTab = (Vtab) => {
        setTabs(Vtab)
    }
    const handleTambah = (tambah) => {
        setTambah(tambah)
    }

    const handleUbah = (ubah, id) => {
        setUbah(ubah)
        setUbahId(id)
    }

    return (
        <>
        <Navbar header='Pengaturan' />
        <Sidenav />
        <Main>
            <Container>
                <Header>
                    Pengaturan
                </Header>
                <Tabnav handleTab={handleTab}/>
                {tab === 0 ? <Datajabatan tambah={handleTambah} ubah={handleUbah}/> : null}
                {tab === 1 ? <Datajabatan tambah={handleTambah} ubah={handleUbah}/> : null}
                {tab === 2 ? <Gajipokok tambah={handleTambah} ubah={handleUbah}/> : null}
            </Container>
        </Main>
     
        {tambah === "jabatan" && <Tambahjabatan tambah={handleTambah}/>}
        {ubah === "jb" && <Editjabatan ubah={handleUbah} ubahId={ubahId}/>}

        {tambah === "gp" && <Tambahgajip tambah={handleTambah}/>}
        {ubah === "gp" && <Editgajip ubah={handleUbah} ubahId={ubahId}/>}
    </>
    );
};

export default Pengaturan;