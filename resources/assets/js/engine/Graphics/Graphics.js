var ns = namespace('Game.Graphics');

import Manager from 'Engine/Support/Manager.js';

export default class Graphics extends Manager {

	/**
	 * Returns the Default Driver Name.
	 *
	 * @return {string}
	 */
	getDefaultDriver() {
		return this._game.make('config').get('graphics.default');
	};

    /**
     * Returns the Configuration Root for this Manager.
     *
     * @param  {string}  name
     *
     * @return {string}
     */
    _getConfigurationRoot(name) {
    	return 'graphics.canvases';
    };

	/**
	 * Returns whether or not this Manager supports adapter creation
	 * from configuration settings, where an underlying driver is
	 * typically specified. The driver is created separately.
	 *
	 * @return {boolean}
	 */
	usesConfigurableAdapters() {
		return true;
	};

	/**
	 * Returns the name of the key that holds the name of the driver
	 * for any configured adapter for this manager. Most call it
	 * 'driver', but other implementations may be different.
	 *
	 * @return {string}
	 */
	getConfigDriverKeyName() {

		// Canvases are made distinct by their context. Everything
		// else is pretty much the same. Therefore, we're going
		// to use the context as the driver for the adapter.

		// Use 'context' as the Driver key name
		return 'context';

	};

	/**
	 * Creates a new 2D Driver using the specified Configuration.
	 *
	 * @param  {object}  config
	 *
	 * @return {Game.Graphics.Canvas}
	 */
	create2dDriver(config) {

		// Determine the Canvas Parameters
		var selector = config['element'];
		var fps = config['fps'] || 60;

		// Create and return a new Canvas
		return this._createCanvas(selector, '2d', fps);

	};

	/**
	 * Creates and returns a new Canvas.
	 *
	 * @param  {string}   selector
	 * @param  {string}   context
	 * @param  {numeric}  fps
	 *
	 * @return {Game.Graphics.Canvas}
	 *
	 * @throws {Error}
	 */
	_createCanvas(selector, context, fps) {

		// Determine the Element from the Selector
		var element = this._getElementFromSelector(selector);

		// Make sure an Element was found
		if(element === null || element === undefined) {
			throw new Error(`Canvas [${selector}] could not be found.`);
		}

		// Create a return a new Canvas
		return new window.Game.Graphics.Canvas(element, '2d', fps);

	};

	/**
	 * Returns the element described by the specified selector.
	 *
	 * @param  {string}  selector
	 *
	 * @return {HTMLElement|null}
	 */
	_getElementFromSelector(selector) {

		return document.querySelector(selector)
			|| document.querySelectorAll(selector)[0]
			|| document.getElementById(selector.split('#')[0] === '' && selector.split('#')[1])
			|| document.getElementsByClassName(selector.split('.')[0] === '' && selector.split('.')[1]);

	};

	/**
	 * Starts the Graphics.
	 *
	 * @return {this}
	 */
	start() {

		// Begin the Drawing Loops
		this.beginDrawingLoops();

		// Allow Chaining
		return this;

	};

	/**
	 * Begins the Drawing Loops for each Canvas.
	 *
	 * @return {this}
	 */
	beginDrawingLoops() {

		// Iterate through each Canvas
		for(let i in this._drivers) {

			// Make sure that the iterator is a property
			if(!this._drivers.hasOwnProperty(i)) {
				continue;
			}

			// Determine the current Canvas
			var canvas = this._drivers[i];

			// Begin the Drawing Loop
			canvas.beginDrawingLoop();

		}

		// Allow Chaining
		return this;

	};

	/**
	 * Alias of {@see this.driver()}.
	 *
	 * @param  {string|null}  canvas
	 *
	 * @return {Game.Graphics.Canvas}
	 */
	getCanvas(canvas = null) {
		return this.driver(canvas);
	};

}

// Assign Constructor to Namespace
ns.Graphics = Graphics;