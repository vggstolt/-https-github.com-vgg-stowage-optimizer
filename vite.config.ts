import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 0.0.0.0 so the preview proxy can reach the server; loopback-only
    // listens come back to the browser as ERR_EMPTY_RESPONSE.
    host: '0.0.0.0',
    port: 4873,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4874,
    strictPort: true,
    allowedHosts: true,
  },
})
