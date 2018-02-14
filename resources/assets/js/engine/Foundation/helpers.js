import Container from 'Engine/Container/Container.js';

if(typeof window.app === 'undefined') {

	/**
	 * Returns the available container instance.
	 *
	 * @param  {string|null}  abstract
	 * @param  {array}        parameters
	 *
	 * @return {mixed}
	 */
	window.app = function(abstract = null, parameters = []) {

		// Check if no abstract type was provided
		if(abstract === null) {

			// Return the Container Instance
			return Container.getInstance();

		}

		// Return an instance of the abstract type
		return Container.getInstance().make(abstract, parameters);

	};

}

if(typeof window.getMouseX === 'undefined') {

	// Initialize the graphics manager
	var graphics = null;

	/**
	 * Returns the relative x position of the mouse within the specified canvas.
	 *
	 * @param  {string|null}  canvas
	 *
	 * @return {float}
	 */
	window.getMouseX = function(canvas = null) {

		// Determine the graphics manager
		graphics = graphics || app('graphics');

		// Return the mouse position
		return graphics.getCanvas(canvas).getMouseX();

	};

}

if(typeof window.getMouseY === 'undefined') {

	// Initialize the graphics manager
	var graphics = null;

	/**
	 * Returns the relative y position of the mouse within the specified canvas.
	 *
	 * @param  {string|null}  canvas
	 *
	 * @return {float}
	 */
	window.getMouseY = function(canvas = null) {

		// Determine the graphics manager
		graphics = graphics || app('graphics');

		// Return the mouse position
		return graphics.getCanvas(canvas).getMouseY();

	};

}