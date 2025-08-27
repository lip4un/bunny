// Register.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

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

const Register: React.FC = () => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModel, setIsModel] = useState(false);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await register({ name, email, password, isModel });
    if (!ok) setErr('E-mail já cadastrado');
    else navigate('/');
  };

  return (
    <Container>
      <h2>Cadastrar</h2>
      <form onSubmit={handleRegister}>
        <Input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <label style={{ color: '#bbb', marginBottom: 12, display: 'block' }}>
          <input type="checkbox" checked={isModel} onChange={e => setIsModel(e.target.checked)} />
          {' '}Sou modelo (criador de conteúdo)
        </label>
        {err && <div style={{ color: '#e74c3c', marginBottom: 8 }}>{err}</div>}
        <Button bg="#e74c3c" color="#fff" rounded style={{ width: '100%' }}>Cadastrar</Button>
      </form>
      <div style={{ marginTop: 16, color: '#bbb' }}>
        Já tem conta? <a href="/login" style={{ color: '#e74c3c' }}>Entrar</a>
      </div>
    </Container>
  );
};

export default Register;