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

        Keyboard.setEventDispatcher(this._app['events']);

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

		this._app.singleton('keyboard', function(app) {
			return new Keyboard;
		});

	};
}

// Assign Constructor to Namespace
ns.InputServiceProvider = InputServiceProvider;