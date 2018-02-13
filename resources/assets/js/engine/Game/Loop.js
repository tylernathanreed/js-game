var ns = namespace('Engine.Game');

import Manager from 'Engine/Objects/Manager.js';
import SupportLoop from 'Engine/Support/Loop.js';

export default class Loop {

	/**
	 * Creates a new Loop instance.
	 *
	 * @param  {Engine.Objects.Manager}
	 *
	 * @return {this}
	 */
	constructor(objects) {

		/**
		 * The Game's Object Manager.
		 *
		 * @var {Engine.Objects.Manager}
		 */
		this._objects = objects;

		/**
		 * The Step Loop.
		 *
		 * @var {Engine.Support.Loop}
		 */
		this._stepLoop = new SupportLoop({
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

		this._stepLoop.start();

		// Allow Chaining
		return this;

	};

	doStepLoop() {
		this._objects.stepGameObjects();
	};

}

// Assign Constructor to Namespace
ns.Loop = Loop;