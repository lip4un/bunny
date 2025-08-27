import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Feed from '../components/Feed/Feed.tsx';
import Profile from '../components/Profile/Profile.tsx';
import Login from '../components/Auth/Login.tsx';
import Register from '../components/Auth/Register.tsx';
import UploadPhoto from '../components/Upload/UploadPhoto.tsx';
import useAuth from '../hooks/useAuth.ts';

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