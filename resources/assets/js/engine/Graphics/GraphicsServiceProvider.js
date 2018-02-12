var ns = namespace('Engine.Graphics');

import Canvas from 'Engine/Graphics/Canvas.js';
import Graphics from 'Engine/Graphics/Graphics.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class GraphicsServiceProvider extends ServiceProvider {

	/**
	 * Registers this service provider.
	 *
	 * @return {void}
	 */
	register() {

		// Register the graphics manager
		this._registerGraphicsManager();

	};

	/**
	 * Registers the graphics manager.
	 *
	 * @return {void}
	 */
	_registerGraphicsManager() {

		this._app.singleton('graphics', function(app) {
			return new Graphics(app);
		});

	};

	/**
	 * Boots this service provider.
	 *
	 * @return {void}
	 */
	boot() {

		// Set the canvas mouse instance
		Canvas.setMouse(this._app.make('mouse'));

	};

}

// Assign Constructor to Namespace
ns.GraphicsServiceProvider = GraphicsServiceProvider;