var ns = namespace('App.Game');

import LoadConfiguration from 'Engine/Foundation/Bootstrap/LoadConfiguration.js';

export default class Kernel {

	/**
	 * Creates a new Kernel instance.
	 *
	 * @param  {Game.Contracts.Foundation.Application}  app
	 *
	 * @return {this}
	 */
	constructor(app) {

		/**
		 * The application instance.
		 *
		 * @var {Game.Contracts.Foundation.Application}
		 */
		this._app = app;

		/**
		 * The bootstrappers for the application.
		 *
		 * @var {array}
		 */
		this._bootstrappers = [
			// 'Game.Foundation.Bootstrap.LoadEnvironmentVariables',
			'Game.Foundation.Bootstrap.LoadConfiguration',
			// 'Game.Foundation.Bootstrap.HandleExceptions',
			// 'Game.Foundation.Bootstrap.RegisterFacades',
			// 'Game.Foundation.Bootstrap.RegisterProviders',
			// 'Game.Foundation.Bootstrap.BootProviders',
		];

	};

	/**
	 * Bootstraps the application.
	 *
	 * @return {void}
	 */
	bootstrap() {

		// Make sure the application hasn't already been bootstrapped
		if(this._app.hasBeenBootstrapped()) {
			return;
		}

		// Bootstrap the application
		this._app.bootstrapWith(this.getBootstrappers());

	};

	/**
	 * Returns the bootstrap classes for the application.
	 *
	 * @return {array}
	 */
	getBootstrappers() {
		return this._bootstrappers;
	};

	/**
	 * Returns the application instance.
	 *
	 * @return {Game.Contracts.Foundation.Application}
	 */
	getApplication() {
		return this._app;
	};

}

// Assign Constructor to Namespace
ns.Kernel = Kernel;