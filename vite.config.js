import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
 
export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            'resources/js/app.js',
            'resources/js/pages/about.js',
            'resources/js/pages/data.js',
            'resources/js/pages/home.js',
            'resources/js/pages/how_to_participate.js',
            'resources/js/pages/login.js',
            'resources/js/pages/logout.js',
            'resources/js/pages/register.js',
            'resources/js/pages/resources.js'
        ]),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
          'vue': 'vue/dist/vue.esm-bundler',
        },
      }
    // plugins: [
    //     laravel(['resources/js/app.js']),
    //     vue({
    //         template: {
    //             transformAssetUrls: {
    //                 // The Vue plugin will re-write asset URLs, when referenced
    //                 // in Single File Components, to point to the Laravel web
    //                 // server. Setting this to `null` allows the Laravel plugin
    //                 // to instead re-write asset URLs to point to the Vite
    //                 // server instead.
    //                 base: null,
 
    //                 // The Vue plugin will parse absolute URLs and treat them
    //                 // as absolute paths to files on disk. Setting this to
    //                 // `false` will leave absolute URLs un-touched so they can
    //                 // reference assets in the public directory as expected.
    //                 includeAbsolute: false,
    //             },
    //         },
    //     }),
    // ],
});