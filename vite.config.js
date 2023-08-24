import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/pages/about.js',
                'resources/js/pages/butterfly_counts.js',
                'resources/js/pages/data.js',
                'resources/js/pages/home.js',
                'resources/js/pages/how_to_participate.js',
                'resources/js/pages/login.js',
                'resources/js/pages/logout.js',
                'resources/js/pages/manage_users.js',
                'resources/js/pages/register.js',
                'resources/js/pages/resources.js',
                'resources/js/pages/validate_forms.js',
            ],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        VitePWA({
            outDir: 'public/build',
            injectRegister: 'auto',
            registerType: 'auto',
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },

        }),
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm-bundler',
        },
    }
})