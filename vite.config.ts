import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    preview: {
        'allowedHosts': ['wallet.aucburg.com']
    }
})
