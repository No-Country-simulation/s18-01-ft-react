import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'public',
  root: './',
  plugins: [react()],
  build: {
    lightningcss: {
      targets: { chrome: 115, firefox: 115, safari: 16 },
    },
  },
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: false,
  },
});
