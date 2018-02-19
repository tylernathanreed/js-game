var ns = namespace('Engine.Collision');

import Mask from 'Engine/Collision/Mask.js';
import Handler from 'Engine/Collision/Handler.js';
import RectangleMask from 'Engine/Collision/RectangleMask.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class CollisionServiceProvider extends ServiceProvider {

	/**
	 * Registers this service provider.
	 *
	 * @return {void}
	 */
	register() {

		// Register the collision handler
		this._registerCollisionHandler();

	};

	/**
	 * Registers the collision handler.
	 *
	 * @return {void}
	 */
	_registerCollisionHandler() {

		this._app.singleton('collision', function(app) {
			return new Handler(app);
		});

	};

	/**
	 * Boots this service provider.
	 *
	 * @return {void}
	 */
	boot() {

		// Set the collision handler on the masks
		Mask.setCollisionHandler(this._app.make('collision'));

		// Boot the collision type handlers
		this._bootCollisionTypeHandlers();

	};

	/**
	 * Boots the collision type handlers.
	 *
	 * @return {void}
	 */
	_bootCollisionTypeHandlers() {

		// Boot the Rectangle Collision Handlers
		RectangleMask.registerDefaultHandlers();

	};
}

// Assign Constructor to Namespace
ns.CollisionServiceProvider = CollisionServiceProvider;