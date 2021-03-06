let mix = require('laravel-mix');

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

mix.webpackConfig({

	node: {
		fs: 'empty'
	},

	resolve: {
		alias: {
			'App': path.resolve(__dirname, 'resources/assets/js/js-game/app'),
			'Base': path.resolve(__dirname, 'resources/assets/js/js-game'),
			'Engine': path.resolve(__dirname, 'resources/assets/js/engine/')
		}
	}

});

mix.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css')
   .sourceMaps();
