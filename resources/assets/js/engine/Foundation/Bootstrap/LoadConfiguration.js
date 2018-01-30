var ns = namespace('Game.Foundation.Bootstrap');

import Repository from 'Engine/Config/Repository.js';

export default class LoadConfiguration {

    /**
     * Bootstraps the given application.
     *
     * @param  {Game.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {

		// Initialize the Items
		var items = {};

		// Initialize the cache flag
		var loadedFromCache = false;

        // First we will see if we have a cache configuration file. If we do, we'll load
        // the configuration items from that file so that it is very quick. Otherwise
        // we will need to spin through every configuration file and load them all.

        // Determine the cached configuration file path
        var cached = app.getCachedConfigPath();

        // Check for a cache configuration file
        if(fileExistsSync(cached)) {

        	// Require the cached configuration file
        	// items = require(cached);

        	// Flag that we've loaded the configuration from a cache file
        	loadedFromCache = true;

        }

        // Create a new repository
        var config = new Repository(items);

        // Bind the respository to the application
		app.instance('config', config);

        // Next we will spin through all of the configuration files in the configuration
        // directory and load each one into the repository. This will make all of the
        // options available to the developer for use in various parts of this app.

        // Make sure we didn't load the configuration from a cache file
        if(!loadedFromCache) {

            // Load the configuration files
            this._loadConfigurationFiles(app, config);

        }

	};

    /**
     * Loads the configuration items from all of the files.
     *
     * @param  {Game.Contracts.Foundation.Application}  app
     * @param  {Game.Contracts.Config.Repository}       repository
     *
     * @return {void}
     */
    _loadConfigurationFiles(app, repository) {

        // Determine the configuration resolver
        var resolver = app.get('config.resolver');

        // Invoke the resolver
        resolver(app, repository);

    };

}

// Assign Constructor to Namespace
ns.LoadConfiguration = LoadConfiguration;