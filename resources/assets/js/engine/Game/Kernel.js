var ns = namespace('Engine.Game');

import BootProviders from 'Engine/Foundation/Bootstrap/BootProviders.js';
import StartStepLoop from 'Engine/Foundation/Bootstrap/StartStepLoop.js';
import LoadConfiguration from 'Engine/Foundation/Bootstrap/LoadConfiguration.js';
import RegisterProviders from 'Engine/Foundation/Bootstrap/RegisterProviders.js';
import StartGraphicsLoop from 'Engine/Foundation/Bootstrap/StartGraphicsLoop.js';

export default class Kernel {

	/**
	 * Creates a new Game instance.
	 *
	 * @param  {Engine.Contracts.Foundation.Application}
	 *
	 * @return {this}
	 */
	constructor(app) {

		/**
		 * The application instance.
		 *
		 * @var {Engine.Contracts.Foundation.Application}
		 */
		this._app = app;

		/**
		 * The bootstrappers for the application.
		 *
		 * @var {array}
		 */
		this._bootstrappers = [
			// 'Engine.Foundation.Bootstrap.LoadEnvironmentVariables',
			'Engine.Foundation.Bootstrap.LoadConfiguration',
			// 'Engine.Foundation.Bootstrap.HandleExceptions',
			// 'Engine.Foundation.Bootstrap.RegisterFacades',
			'Engine.Foundation.Bootstrap.RegisterProviders',
			'Engine.Foundation.Bootstrap.BootProviders',
			'Engine.Foundation.Bootstrap.StartGraphicsLoop',
			'Engine.Foundation.Bootstrap.StartStepLoop'
		];

	};

	/**
	 * Starts the Engine.
	 *
	 * @return {this}
	 */
	start() {

		// Bootstrap the application
		this.bootstrap();

		// Fire the "Game Started" event
		this._app.make('events').dispatch('Engine.Game.Events.GameStarted');

		// Allow Chaining
		return this;

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
	 * @return {Engine.Contracts.Foundation.Application}
	 */
	getApplication() {
		return this._app;
	};

}

// Assign Constructor to Namespace
ns.Kernel = Kernel;