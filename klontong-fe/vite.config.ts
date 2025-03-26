import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'
import tailwind from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  
  return {
    plugins: [vue()], // Remove tailwindcss() plugin
    server: {
      port: parseInt(env.VITE_PORT) || 3000,
      strictPort: true,
    },
    css: {
      postcss: {
        plugins: [
          // tailwindcss(),
          autoprefixer(),
          tailwind()
        ]
      }
    }
  }
})