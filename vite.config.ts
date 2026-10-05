import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Listen on every IPv4 and IPv6 address so the preview proxy can reach the
    // server; a loopback-only or IPv4-only listen surfaces as ERR_EMPTY_RESPONSE.
    host: true,
    port: 4873,
    strictPort: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4874,
    strictPort: true,
    allowedHosts: true,
  },
})
