import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Button from '../UI/Button';
import { uploadPhoto } from '../../utils/api';

const Container = styled.div`
  max-width: 400px;
  margin: 3em auto;
  background: #181818;
  padding: 2em 1.5em;
  border-radius: 16px;
  box-shadow: 0 2px 16px #0006;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9em;
  margin-bottom: 1.2em;
  border-radius: 8px;
  border: none;
  background: #222;
  color: #fff;
  font-size: 1rem;
`;

const UploadPhoto: React.FC = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && user) {
      const reader = new FileReader();
      reader.onload = () => {
        uploadPhoto(user.id, reader.result as string);
        setMsg('Foto enviada!');
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user?.isModel) return <Container>Somente modelos podem enviar fotos.</Container>;

  return (
    <Container>
      <h2>Enviar Foto</h2>
      <form onSubmit={handleUpload}>
        <Input type="file" accept="image/*" onChange={handleFile} required />
        {preview && <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 12, marginBottom: 12 }} />}
        <Button bg="#e74c3c" color="#fff" rounded style={{ width: '100%' }}>Enviar</Button>
      </form>
      {msg && <div style={{ color: '#2ecc40', marginTop: 12 }}>{msg}</div>}
    </Container>
  );
};

export default UploadPhoto;
