import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notfound from "./components/Notfound";
import Dashboard from "./pages/Dashboard";
import Datapegawai from "./pages/Datapegawai";
import Datajabatan from "./pages/Datajabatan";
import Tambahpegawai from "./pages/Tambahpegawai";
import Editpegawai from "./pages/Editpegawai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./redux/pegawai/PegawaiAction";
import AuthRouter from "./AuthRouter";

function App() {

  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])
  
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
        <Route path="datajabatan" element={<Datajabatan />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
