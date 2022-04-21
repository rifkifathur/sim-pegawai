import { useState } from 'react';
import Main from '../components/Main';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import Container from '../components/Container';
import Header from '../components/Header';

const Datajabatan = () => {
    const [side, setSide] = useState(true);
    const handleSide = (hideValue) => {
        setSide(hideValue)
    }
    return (
        <>
            <Navbar side={side} header='Jabatan'/>
            <Sidenav handleSide={handleSide} valueSide={side} />
            <Main side={side}>
                <Container>
                    <Header>
                        Data jabatan
                    </Header>
                </Container>
            </Main>
        </>
    );
};

export default Datajabatan;