import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
  },
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 3000,
    strictPort: false,
    host: true,
  }
})
