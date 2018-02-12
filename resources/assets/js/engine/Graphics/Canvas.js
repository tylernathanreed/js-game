var ns = namespace('Engine.Graphics');

import Loop from 'Engine/Support/Loop.js';
import CanvasContext from 'Engine/Graphics/CanvasContext.js';

export default class Canvas {

	/**
	 * Creates a new Canvas.
	 *
	 * @param  {HTMLElement}  element
	 * @param  {string}       contextType
	 * @param  {integer}      fps
	 *
	 * @return {this}
	 */
	constructor(element, contextType = '2d', fps = 60) {

		/**
		 * The HTML Element that represents this Canvas.
		 *
		 * @var {HTMLElement}
		 */
		this.element = element;

		/**
		 * The Context Identifier for the Drawing Context.
		 *
		 * @var {string}
		 */
		this.contextType = contextType;

		/**
		 * The Rendering Context.
		 *
		 * @var {mixed}
		 */
		this.context = new CanvasContext(this.element.getContext(this.contextType));

		/**
		 * The Drawing Stack.
		 *
		 * @var array
		 */
		this.drawStack = [];

		/**
		 * The number of Drawing updates per Second.
		 *
		 * @var int
		 */
		this.fps = fps;

		/**
		 * The Draw Loop.
		 *
		 * @var {Engine.Support.Loop}
		 */
		this.drawLoop = new Loop({
			'before': this.beforeDrawingLoop.bind(this),
			'loop': this.invokeDrawStack.bind(this),
			'after': this.afterDrawingLoop.bind(this),
			'interval': 1 / this.fps
		});

	};

	/**
	 * Returns the HTML Element that represents this Canvas.
	 *
	 * @return {HTMLElement}
	 */
	getElement() {
		return this.element;
	};

	/**
	 * Returns the Context of this Canvas.
	 *
	 * @return {Engine.Graphics.CanvasContext}
	 */
	getContext() {
		return this.context;
	};

	/**
	 * Adds the specified Callback to the Draw Stack.
	 *
	 * @param  {Closure}  callback
	 * @param  {integer}  priority
	 *
	 * @return {this}
	 */
	draw(callback, priority) {

		// Determine the Priority
		var priority = priority || 0;

		// Make sure the Priority in the Draw Stack exists
		if(typeof this.drawStack[priority] === 'undefined') {
			this.drawStack[priority] = [];
		}

		// Add the Callback to the Draw Stack
		this.drawStack[priority].push(callback);

		// Allow Chaining
		return this;

	};

	/**
	 * Clears this Canvas.
	 *
	 * @return {this}
	 */
	clear() {

		// Clear the Canvas
		this.context.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());

		// Allow Chaining
		return this;

	};

	/**
	 * Begins the Drawing Loop.
	 *
	 * @return {this}
	 */
	beginDrawingLoop() {

		// Start the Drawing Loop
		this.drawLoop.start();

	};

	/**
	 * Performs various actions before the Drawing Loop.
	 *
	 * @return {this}
	 */
	beforeDrawingLoop() {

		// Clear the Canvas
		this.clear();

	};

	/**
	 * Invokes the Drawing Stack.
	 *
	 * @return {this}
	 */
	invokeDrawStack() {

		// Iterate through the Priorities in the Draw Stack
		for(var i = 0; i < this.drawStack.length; i++) {

			// Determine the current Drawing Priority
			var priority = this.drawStack[i];

			// Iterate through the Drawing Callbacks in the Drawing Priority
			for(var j = 0; j < this.drawStack[i].length; j++) {

				// Determine the current Drawing Callback
				var callback = this.drawStack[i][j];

				// Call the Drawing Callback
				var result = callback(this.context, priority);

				// Check for a False Result
				if(result === false) {
					return this;
				}

			}

		}

		// Allow Chaining
		return this;

	};

	/**
	 * Performs various actions after the Drawing Loop.
	 *
	 * @return {this}
	 */
	afterDrawingLoop() {

		//

	};

	/**
	 * Ends the Drawing Loop.
	 *
	 * @return {this}
	 */
	endDrawingLoop() {

		// Stop the Drawing Loop
		this.drawLoop.stop();

	};

	/**
	 * Returns the Width of this Canvas.
	 *
	 * @return float
	 */
	getWidth() {
		return this.element.width;
	};

	/**
	 * Returns the Height of this Canvas.
	 *
	 * @return float
	 */
	getHeight() {
		return this.element.height;
	};

	/**
	 * Returns the X Position of the Canvas Element.
	 *
	 * @return {float}
	 */
	getX() {
		return this.element.getBoundingClientRect().x;
	};

	/**
	 * Returns the Y Position of the Canvas Element.
	 *
	 * @return {float}
	 */
	getY() {
		return this.element.getBoundingClientRect().y;
	};

	/**
	 * Returns the Mouse instance.
	 *
	 * @return {Engine.Input.Mouse}
	 */
	static getMouse() {
		return this._mouse;
	}

	/**
	 * Sets the Mouse instance.
	 *
	 * @param  {Engine.Input.Mouse}  mouse
	 *
	 * @return {void}
	 */
	static setMouse(mouse) {
		this._mouse = mouse;
	}

	/**
	 * Returns the Mouse X Position relative to the Canvas Element.
	 *
	 * @return {float}
	 */
	getMouseX() {
		return this.constructor._mouse.getX() - this.getX();
	};

	/**
	 * Returns the Mouse Y Position relative to the Canvas Element.
	 *
	 * @return {float}
	 */
	getMouseY() {
		return this.constructor._mouse.getY() - this.getY();
	};

	/**
	 * Returns the Mouse Position relative to the Canvas Element.
	 *
	 * @return {object}
	 */
	getMousePosition() {

		return {
			'x': this.getMouseX(),
			'y': this.getMouseY()
		}

	};
}

/**
 * The Mouse instance.
 *
 * @var {Engine.Input.Mouse|null}
 */
Canvas._mouse = null;

// Assign Constructor to Namespace
ns.Canvas = Canvas;