import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Feed from '../components/Feed/Feed';
import Profile from '../components/Profile/Profile';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import UploadPhoto from '../components/Upload/UploadPhoto';
import useAuth from '../hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/upload" element={user?.isModel ? <UploadPhoto /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;