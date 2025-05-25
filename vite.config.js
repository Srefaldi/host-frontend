import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  prefix:'tw-',
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 3000, 
  },
})