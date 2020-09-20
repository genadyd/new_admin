const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
mix.js('resources/js/admin/app.js', 'public/js/admin/app.js')
mix.js('resources/js/admin/ckeditor.js', 'public/js/admin/ckeditor.js')
mix.js('resources/js/admin/modules/categories_module/index.js', 'public/js/admin/modules/categories_module/index.js')
// mix.js('resources/js/admin/modules/categories_module/form', 'public/js/admin/modules/categories_module/form')

    .sass('resources/sass/admin/app.scss', 'public/css/admin/app.css', {
        implementation: require('node-sass')
    })
    .sass('resources/sass/admin/modules/categories/categories.scss', 'public/css/admin/modules/', {
        implementation: require('node-sass')
    })
    // .sass('resources/sass/admin/modules/dashboard.scss', 'public/css/admin/modules/dashboard.css', {
    //     implementation: require('node-sass')
    // })
    // .sass('resources/sass/app.scss', 'public/css/app.css', {
    //     implementation: require('node-sass')
    // });
