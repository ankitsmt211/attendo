import '../Home/Home.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../Auth/register';
import Login from '../Auth/Login';
import Dashboard from '../Dashboard/Dashboard';
export default function Home() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
