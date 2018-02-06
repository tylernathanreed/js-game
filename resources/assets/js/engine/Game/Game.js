var ns = namespace('Engine.Game');

import Loop from 'Engine/Support/Loop.js';
import Manager from 'Engine/Objects/Manager.js';

export default class Game {

	/**
	 * Creates a new Game instance.
	 *
	 * @return {this}
	 */
	constructor() {

		/**
		 * The Game's Object Manager.
		 *
		 * @var {Engine.Objects}
		 */
		this.objects = new Manager();

		/**
		 * The Step Loop.
		 *
		 * @var {Engine.Support.Loop}
		 */
		this.stepLoop = new Loop({
			'loop': this.doStepLoop.bind(this),
			'interval': 1 / 60
		});

	};

	/**
	 * Starts the Engine.
	 *
	 * @return {this}
	 */
	start() {

		this.stepLoop.start();

		// Allow Chaining
		return this;

	};

	doStepLoop() {
		this.objects.stepGameObjects();
	};

}

// Assign Constructor to Namespace
ns.Game = Game;