import { useState } from 'react';
import Main from '../components/Main';
import Sidenav from '../components/Sidenav';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Card from '../components/Card';
import Container from '../components/Container';
import Header from '../components/Header';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [side, setSide] = useState(true);

    const handleSide = (hideValue) => {
        setSide(hideValue)
    }

    const countPegawai = useSelector(state => state.pegawai.pegawai);
    const pLaki = useSelector(state => state.pegawai.pegawai.jk_L);
    const pPerem = useSelector(state => state.pegawai.pegawai.jk_p);


    const labels = [
        'Laki Laki',
        'Perempuan',
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                'rgb(0, 99, 132)',
                'rgb(255, 99, 132)'
            ],
            borderColor: 'rgb(255, 255, 255)',
            data: [pLaki, pPerem],
        }]
    };

    return (
        <>
            <Navbar side={side} header='Dashboard' />
            <Sidenav handleSide={handleSide} valueSide={side} />
            <Main side={side}>
                <Container>
                    <Header>
                        Dashboard
                    </Header>
                    <Card>
                        <p className='border-b border-black p-2'>Total Pegawai: {countPegawai && countPegawai.length}</p>
                        <Pie
                            // options={options}
                            data={data}
                        />
                    </Card>
                </Container>
            </Main>
        </>
    );
};

export default Dashboard;