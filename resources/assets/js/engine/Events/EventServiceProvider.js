var ns = namespace('Game.Events');

import Dispatcher from 'Engine/Events/Dispatcher.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class EventServiceProvider extends ServiceProvider {

	/**
	 * Registers the service provider.
	 *
	 * @return {void}
	 */
	register() {

		this._app.singleton('events', function(app) {
			return new Dispatcher();
		});

	};
	
}

// Assign Constructor to Namespace
ns.EventServiceProvider = EventServiceProvider;