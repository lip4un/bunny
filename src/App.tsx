import React from 'react';
import { AuthProvider } from './context/AuthContext';
import GlobalStyle from './styles/globalStyle';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => (
  <AuthProvider>
    <GlobalStyle />
    <AppRoutes />
  </AuthProvider>
);

export default App;