// "undefined" means the URL will be computed from the `window.location` object
export const SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://2slpr5x7-4444.brs.devtunnels.ms'
    : 'http://localhost:4444';
