/* eslint-disable prettier/prettier */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import AppSider from './components/Appsider/AppSider.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/authContext.jsx';
import AppHeader from './components/AppHeader/AppHeader.jsx';

const domain = 'pabloelleproso.us.auth0.com';
const clientId = 'rXwlmefeCxHxBnwu0mAijg6AKtmRpyjn';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}>
      <AuthProvider>
        <BrowserRouter>
          <AppHeader />
          <AppSider />
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>
  </StrictMode>
);
