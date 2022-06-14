import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Notfound from "./components/Notfound";
import Dashboard from "./pages/Dashboard";
import Datapegawai from "./pages/datapegawai/Datapegawai";
import Tambahpegawai from "./pages/datapegawai/Tambahpegawai";
import Editpegawai from "./pages/datapegawai/Editpegawai";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { fetchData } from "./redux/pegawai/PegawaiAction";
import AuthRouter from "./AuthRouter";
import Tambahjabatan from "./pages/datajabatan/Tambahjabatan";
import Pengaturan from "./pages/Pengaturan";
import Gajipegawai from "./pages/datagajipegawai/Gajipegawai";
import Absensi from "./pages/absensi/Absensi";
import Penggajian from "./pages/penggajian/Penggajian";
import Akun from "./pages/Akun";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch])
  const user = useSelector(state => state.user);
  console.log(user)
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

        <Route path="pengaturan" element={
          <AuthRouter>
            <Pengaturan />
          </AuthRouter>
        }>
          <Route path="tambah-jabatan" element={<Tambahjabatan />} />
        </Route>

        <Route path="datagaji" element={
          <AuthRouter>
            <Gajipegawai />
          </AuthRouter>
        }>
        </Route>

        <Route path="absensi" element={
          <AuthRouter>
            <Absensi />
          </AuthRouter>
        }>
        </Route>

        <Route path="penggajian" element={
          <AuthRouter>
            <Penggajian/>
          </AuthRouter>
        }>
        </Route>

        <Route path="akun" element={
          <AuthRouter>
            <Akun/>
          </AuthRouter>
        }>
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
