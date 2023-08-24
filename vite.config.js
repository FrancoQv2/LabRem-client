import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'

export default defineConfig((config) => {
  const envFile = `.env.${config.mode}`
  dotenv.config({ path: envFile })

  return {
    plugins: [
      react()
    ],
    build: {
      outDir: 'build',
      assetsDir: 'assets',
      emptyOutDir: true
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'node_modules'),
        '@': path.resolve(__dirname, 'src'),
        '@api': path.resolve(__dirname, 'src/api'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@layouts': path.resolve(__dirname, 'src/layouts'),
        '@libs': path.resolve(__dirname, 'src/libs'),
        '@pages': path.resolve(__dirname, 'src/pages')
      }
    },
    server: {
      open: false,
      // proxy: {
      //   '/api/teleco': {
      //     target: process.env.VITE_API_TELECO,
      //     changeOrigin: true,
      //   },
      //   '/api/fisica': {
      //     target: process.env.VITE_API_FISICA,
      //     changeOrigin: true,
      //   },
      //   '/api/digital': {
      //     target: process.env.VITE_API_DIGITAL,
      //     changeOrigin: true,
      //   },
      //   '/api/control': {
      //     target: process.env.VITE_API_CONTROL,
      //     changeOrigin: true,
      //   }
      // }
    }
  }
})
