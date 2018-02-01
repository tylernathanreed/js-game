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
	'app': require('App/config/app.js').default,
	'graphics': require('App/config/graphics.js').default
}

/**
 * Configures the specified application.
 *
 * @param  {Game.Contracts.Foundation.Application}  app
 * @param  {Game.Contracts.Config.Repository}       config
 *
 * @return {void}
 */
export default function(app, config) {

	// Load each file
	config.loadConfigurationFiles(files);

}