var ns = namespace('Engine.Game');

import Loop from 'Engine/Game/Loop.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class GameServiceProvider extends ServiceProvider {

	/**
	 * Registers this service provider.
	 *
	 * @return {void}
	 */
	register() {

		this._registerGameLoop();

	};

	/**
	 * Registers the mouse.
	 *
	 * @return {void}
	 */
	_registerGameLoop() {

		this._app.singleton('steps', function(app) {
			return new Loop(app.make('objects'));
		});

	};

}

// Assign Constructor to Namespace
ns.GameServiceProvider = GameServiceProvider;