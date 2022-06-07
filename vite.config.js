import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SvgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    SvgLoader()
  ]
})
