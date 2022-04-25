import React, { useState } from 'react';
import Container from '../components/Container';
import Header from '../components/Header';
import Main from '../components/Main';
import Navbar from '../components/Navbar';
import Sidenav from '../components/Sidenav';
import Tabnav from '../components/Tabnav';
import Datajabatan from './datajabatan/Datajabatan';
import Datadept from './datadept/Datadept';
import Tambahjabatan from './datajabatan/Tambahjabatan';
import Editjabatan from './datajabatan/Editjabatan';

const Pengaturan = () => {
    const [side, setSide] = useState(true);
    const [tab, setTabs] = useState(0);
    const [tambah, setTambah] = useState(false);
    const [ubah, setUbah] = useState(false);
    const [ubahId, setUbahId] = useState(0);

    const handleSide = (hideValue) => {
        setSide(hideValue)
    }
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

    console.log(ubahId)
    return (
        <>
        <Navbar side={side} header='Pengaturan' />
        <Sidenav handleSide={handleSide} valueSide={side} />
        <Main side={side}>
            <Container>
                <Header>
                    Pengaturan
                </Header>
                <Tabnav handleTab={handleTab}/>
                {tab === 0 ? <Datajabatan tambah={handleTambah} ubah={handleUbah}/> : null}
                {tab === 1 ? <Datajabatan tambah={handleTambah} ubah={handleUbah}/> : null}
                {tab === 2 ? <Datadept/> : null}
            </Container>
        </Main>
     
        {tambah && <Tambahjabatan tambah={handleTambah}/>}
        {ubah && <Editjabatan ubah={handleUbah} ubahId={ubahId}/>}
    </>
    );
};

export default Pengaturan;