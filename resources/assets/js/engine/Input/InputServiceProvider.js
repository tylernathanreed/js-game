var ns = namespace('Engine.Input');

import Mouse from 'Engine/Input/Mouse.js';
import Keyboard from 'Engine/Input/Keyboard.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class InputServiceProvider extends ServiceProvider {

    /**
     * Bootstrap the application events.
     *
     * @return void
     */
    boot() {

        Keyboard.setEventDispatcher(this._app.make('events'));

    };

	/**
	 * Registers the service provider.
	 *
	 * @return {void}
	 */
	register() {

		this._registerMouse();
		this._registerKeyboard();

	};

	/**
	 * Registers the mouse.
	 *
	 * @return {void}
	 */
	_registerMouse() {

		this._app.singleton('mouse', function(app) {
			return new Mouse;
		});

	};

	/**
	 * Registers the keyboard.
	 *
	 * @return {void}
	 */
	_registerKeyboard() {

		// Determine the configuration
		var config = this._app.make('config').get('input.keyboard');

		// Register the keyboard as a singleton
		this._app.singleton('keyboard', function(app) {
			return new Keyboard(config);
		});

		// If the keyboard is enabled, resolve it immediately
		if(config.enabled) {
			this._app.resolve('keyboard');
		}

	};
}

// Assign Constructor to Namespace
ns.InputServiceProvider = InputServiceProvider;