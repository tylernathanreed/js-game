var ns = namespace('App.Game');

import GameKernel from 'Engine/Game/Kernel.js';

export default class Kernel extends GameKernel {

	/**
	 * Creates a new Kernel instance.
	 *
	 * @param  {Engine.Contracts.Foundation.Application}  app
	 *
	 * @return {this}
	 */
	constructor(app) {

		super(app);

	};

}

// Assign Constructor to Namespace
ns.Kernel = Kernel;