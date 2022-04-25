import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notfound from "./components/Notfound";
import Dashboard from "./pages/Dashboard";
import Datapegawai from "./pages/datapegawai/Datapegawai";
import Datajabatan from "./pages/datajabatan/Datajabatan";
import Tambahpegawai from "./pages/datapegawai/Tambahpegawai";
import Editpegawai from "./pages/datapegawai/Editpegawai";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/pegawai/PegawaiAction";
import AuthRouter from "./AuthRouter";
import Tambahjabatan from "./pages/datajabatan/Tambahjabatan";
import Editjabatan from "./pages/datajabatan/Editjabatan";
import Pengaturan from "./pages/Pengaturan";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])

  console.log(useSelector(state => state))
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={
          <AuthRouter>
            <Dashboard />
          </AuthRouter>
        } />
        
        <Route path="datapegawai" element={
          <AuthRouter>
            <Datapegawai />
          </AuthRouter>
        }>
          <Route path="tambah" element={<Tambahpegawai />} />
          <Route path="ubah/:id" element={<Editpegawai />} />
        </Route>

        {/* <Route path="datajabatan" element={
          <AuthRouter>
            <Datajabatan />
          </AuthRouter>
        } >
          <Route path="tambah" element={<Tambahjabatan />} />
          <Route path="ubah/:id" element={<Editjabatan />} />
        </Route> */}

        <Route path="pengaturan" element={
          <AuthRouter>
            <Pengaturan />
          </AuthRouter>
        }>
          <Route path="tambah-jabatan" element={<Tambahjabatan />} />  
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
