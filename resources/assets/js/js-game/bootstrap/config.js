/*
|--------------------------------------------------------------------------
| Configuration Files
|--------------------------------------------------------------------------
|
| Below we will register all of the configuration files needed for the
| application. Since JavaScript isn't a fan of requiring files with
| dynamic expressions, each configuration file must be listed.
|
*/

var files = {
	'app': require('Base/config/app.js').default,
	'graphics': require('Base/config/graphics.js').default
}

/**
 * Configures the specified application.
 *
 * @param  {Engine.Contracts.Foundation.Application}  app
 * @param  {Engine.Contracts.Config.Repository}       config
 *
 * @return {void}
 */
export default function(app, config) {

	// Load each file
	config.loadConfigurationFiles(files);

}