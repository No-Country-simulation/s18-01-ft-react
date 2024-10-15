/* eslint-disable prettier/prettier */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/authContext.jsx';

//TODO: Llevar esto a variables de entorno y si no se va a usar borrar esto y la dependencia
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
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>
  </StrictMode>
);
