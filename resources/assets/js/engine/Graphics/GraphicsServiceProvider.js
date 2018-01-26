var ns = namespace('Game.Graphics');

import Graphics from 'Engine/Graphics/Graphics.js';
import ServiceProvider from 'Engine/Support/ServiceProvider.js';

export default class GraphicsServiceProvider extends ServiceProvider {

	/**
	 * Registers the service provider.
	 *
	 * @return {void}
	 */
	register() {

		this._app.singleton('graphics', function(app) {
			return new Graphics(app);
		});

	};
	
}

// Assign Constructor to Namespace
ns.GraphicsServiceProvider = GraphicsServiceProvider;