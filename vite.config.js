import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SvgLoader from 'vite-svg-loader'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    SvgLoader(),
    viteStaticCopy({
      targets: [
          {
            src: 'assets/avatars',
            dest: 'assets'
          },
          {
            src: 'assets/icons',
            dest: 'assets'
          }
      ]
    })
  ]
})
