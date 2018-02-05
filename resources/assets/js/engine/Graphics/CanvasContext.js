var ns = namespace('Engine.Graphics');

export default class CanvasContext {

	/**
	 * Creates a new Canvas Context instance.
	 *
	 * @param  {CanvasRenderingContext2D}  context
	 *
	 * @return this
	 */
	constructor(context) {

		/**
		 * The underlying Context.
		 *
		 * @var {CanvasRenderingContext2D}
		 */
		this._context = context;

	};

	/**
	 * Returns the base Context of this Context.
	 *
	 * @return {CanvasRenderingContext2D}
	 */
	getContext() {
		return this._context;
	};

	/**
	 * Draws a new Path using the specified Callback.
	 *
	 * @param  {Closure}  callback
	 *
	 * @return {mixed}
	 */
	draw(callback) {

		// Begin the Path
		this._context.beginPath();

		// Call the Callback
		var result = callback(this._context);

		// Close the Path
		this._context.closePath();

		// Return the Result
		return result;

	};

	/**
	 * Draws the specified Circle.
	 *
	 * @param  {float}           x
	 * @param  {float}           y
	 * @param  {float}           radius
	 * @param  {string|boolean}  fill
	 * @param  {string|boolean}  outline
	 * @param  {float}           lineWidth
	 *
	 * @return {void}
	 */
	drawCircle(x, y, radius, fill = 'black', outline = false, lineWidth = 1) {

		// Draw the Circle
		return this.draw(function(context) {

			// Draw the Circle
			context.arc(x, y, radius, 0, Math.PI * 2)

			// Check for a Fill
			if(fill) {

				// Check for a Fill Style
				if(typeof fill === 'string') {
					context.fillStyle = fill;
				}

				// Fill the Circle
				context.fill();

			}

			// Check for an Outline
			if(outline) {

				// Check for an Outline Style
				if(typeof outline === 'string') {
					context.stokeStyle = outline;
				}

				// Set the Line Width
				context.lineWidth = lineWidth;

				// Outline the Circle
				context.stroke();

			}

		});
	};

	/**
	 * Draws the specified Rectangle.
	 *
	 * @param  {float}           x
	 * @param  {float}           y
	 * @param  {float}           width
	 * @param  {float}           height
	 * @param  {string|boolean}  fill
	 * @param  {string|boolean}  outline
	 * @param  {float}           lineWidth
	 *
	 * @return {void}
	 */
	drawRectangle(x, y, width, height, fill = 'black', outline = false, lineWidth = 1) {

		// Draw the Rectangle
		return this.draw(function(context) {

			// Draw the Rectangle
			context.rect(x, y, width, height);

			// Check for a Fill
			if(fill) {

				// Check for a Fill Style
				if(typeof fill === 'string') {
					context.fillStyle = fill;
				}

				// Fill the Rectangle
				context.fill();

			}

			// Check for an Outline
			if(outline) {

				// Check for an Outline Style
				if(typeof outline === 'string') {
					context.stokeStyle = outline;
				}

				// Set the Line Width
				context.lineWidth = lineWidth;

				// Outline the Rectangle
				context.stroke();

			}

		});

	};

	/**
	 * Draws the specified Rectangle.
	 *
	 * @param  {float}   x1
	 * @param  {float}   y1
	 * @param  {float}   x2
	 * @param  {float}   y2
	 * @param  {string}  color
	 * @param  {float}   lineWidth
	 *
	 * @return {void}
	 */
	drawLine(x1, y1, x2, y2, color = 'black', lineWidth = 1) {

		// Draw the Rectangle
		return this.draw(function(context) {

			// Move to the first Point
			context.moveTo(x1, y1);

			// Create a Line to the second Point
			context.lineTo(x2, y2);

			// Set the Line Color
			context.strokeStyle = color;

			// Set the Line Width
			context.lineWidth = lineWidth;

			// Draw the Line
			context.stroke();

		});

	};

	/**
	 * Draws the specified Text.
	 *
	 * @param  {float}           x
	 * @param  {float}           y
	 * @param  {string|boolean}  color
	 * @param  {string|boolean}  font
	 *
	 * @return {void}
	 */
	drawText(text, x, y, color = 'black', font = '20px Arial Bold') {

		// Draw the Text
		return this.draw(function(context) {

			// Check for a Color
			if(color) {

				// Check for a Fill Style
				if(typeof color === 'string') {
					context.fillStyle = color;
				}

			}

			// Check for a Font
			if(font) {

				// Check for an Outline Style
				if(typeof font === 'string') {
					context.font = font;
				}

			}

			// Draw the Text
			context.fillText(text, x, y);

		});

	};

};

// Assign Constructor to Namespace
ns.CanvasContext = CanvasContext;