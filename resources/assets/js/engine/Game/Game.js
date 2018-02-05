var ns = namespace('Engine.Game');

import Loop from 'Engine/Support/Loop.js';
import Manager from 'Engine/Objects/Manager.js';
import Graphics from 'Engine/Graphics/Graphics.js';
import Dispatcher from 'Engine/Events/Dispatcher.js';

export default class Game {

	/**
	 * Creates a new Game instance.
	 *
	 * @return {this}
	 */
	constructor() {

		/**
		 * The Game's Graphics.
		 *
		 * @var {Engine.Graphics}
		 */
		this.graphics = new Graphics(this);

		/**
		 * The Game's Object Manager.
		 *
		 * @var {Engine.Objects}
		 */
		this.objects = new Manager();

		/**
		 * The Event Dispatcher.
		 *
		 * @var {Engine.Events.Dispatcher}
		 */
		this.events = new Dispatcher();

		/**
		 * The global game variables.
		 *
		 * @var {object}
		 */
		this._variables = {};

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

		// Start the Graphics
		this.graphics.start();

		this.stepLoop.start();

		// Allow Chaining
		return this;

	};

	doStepLoop() {
		this.objects.stepGameObjects();
	};

	/**
	 * Draws the Game Objects.
	 *
	 * @param  {Engine.Graphics.Canvas}  canvas
	 *
	 * @return {this}
	 */
	drawGameObjects(canvas) {

		// Draw the Game Objects
		this.objects.drawGameObjects(canvas);

		// Allow Chaining
		return this;

	};

	/**
	 * Returns the specified Game Variable.
	 *
	 * @param  {string}  key
	 *
	 * @return {mixed}
	 */
	getVariable(key) {
		return this._variables[key];
	};

	/**
	 * Sets the specified Game Variable.
	 *
	 * @param  {string}  key
	 * @param  {mixed}   value
	 *
	 * @return {void}
	 */
	setVariable(key, value) {
		this._variables[key] = value;
	};

	/**
	 * Increases the specified Game Variable by the given amount.
	 *
	 * @param  {string}   key
	 * @param  {numeric}  amount
	 *
	 * @return {void}
	 */
	incVariable(key, amount) {
		this._variables[key] += amount;
	};

	/**
	 * Decreases the specified Game Variable by the given amount.
	 *
	 * @param  {string}   key
	 * @param  {numeric}  amount
	 *
	 * @return {void}
	 */
	decVariable(key, amount) {
		this._variables[key] -= amount;
	};

	/**
	 * Returns whether or not the specified Game Variable is defined.
	 *
	 * @param  {string}  key
	 *
	 * @return {boolean}
	 */
	hasVariable(key) {
		return typeof this._variables[key] === 'undefined';
	};

	/**
	 * Returns the Game Variables.
	 *
	 * @return {object}
	 */
	getVariables() {
		return this._variables;
	};

}

// Assign Constructor to Namespace
ns.Game = Game;