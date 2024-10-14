import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import AppSider from './components/Appsider/AppSider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppSider />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
