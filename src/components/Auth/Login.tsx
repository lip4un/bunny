// Login.tsx
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

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (!ok) setErr('Credenciais inválidas');
    else navigate('/');
  };

  return (
    <Container>
      <h2>Entrar</h2>
      <form onSubmit={handleLogin}>
        <Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        {err && <div style={{ color: '#e74c3c', marginBottom: 8 }}>{err}</div>}
        <Button bg="#e74c3c" color="#fff" rounded style={{ width: '100%' }}>Entrar</Button>
      </form>
      <div style={{ marginTop: 16, color: '#bbb' }}>
        Não tem conta? <a href="/register" style={{ color: '#e74c3c' }}>Cadastre-se</a>
      </div>
    </Container>
  );
};

export default Login;