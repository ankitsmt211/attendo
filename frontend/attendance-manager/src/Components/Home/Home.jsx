import '../Home/Home.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../Auth/register';
import Login from '../Auth/Login';
import Dashboard from '../Dashboard/Dashboard';
import { useContext } from 'react';
import { authContext } from '../../App';

export default function Home() {
  const { isLoggedIn } = useContext(authContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} />} />
          <Route path="/home" element={isLoggedIn ? <Dashboard /> : <Navigate to={'/login'} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
