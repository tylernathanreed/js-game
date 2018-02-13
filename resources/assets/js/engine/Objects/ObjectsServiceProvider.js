var ns = namespace('Engine.Objects');

import Manager from 'Engine/Objects/Manager.js';
import GameObject from 'Engine/Objects/GameObject.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class ObjectsServiceProvider extends ServiceProvider {

    /**
     * Boots the service provider.
     *
     * @return void
     */
    boot() {

		GameObject.setDispatcher(this._app.make('events'));
		GameObject.setManager(this._app.make('objects'));
		GameObject.setKeyboard(this._app.make('keyboard'));

    };

	/**
	 * Registers the service provider.
	 *
	 * @return {void}
	 */
	register() {

		this._registerObjectManager();

	};

	/**
	 * Registers the game object manager.
	 *
	 * @return {void}
	 */
	_registerObjectManager() {

		this._app.singleton('objects', function(app) {
			return new Manager(app);
		});

	};

}

// Assign Constructor to Namespace
ns.ObjectsServiceProvider = ObjectsServiceProvider;