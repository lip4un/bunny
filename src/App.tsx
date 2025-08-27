import React from 'react';
import { AuthProvider } from './context/AuthContext.tsx';
import GlobalStyle from './styles/globalStyle.ts';
import AppRoutes from './routes/AppRoutes.tsx';

const App: React.FC = () => (
  <AuthProvider>
    <GlobalStyle />
    <AppRoutes />
  </AuthProvider>
);

export default App;