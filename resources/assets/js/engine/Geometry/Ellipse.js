var ns = namespace('Engine.Geometry');

import Point from 'Engine/Geometry/Point.js';
import Vector from 'Engine/Geometry/Vector.js';

export default class Ellipse {

	/**
	 * Creates a new ellipse.
	 *
	 * @param  {float}         x  The x position of the ellipse.
	 * @param  {float}         y  The y position of the ellipse.
	 * @param  {float}         a  The semi-major (x) axis radius.
	 * @param  {float}         b  The semi-minor (y) axis radius.
	 * @param  {float}         t  The angle of rotation.
	 * @param  {integer|null}  s  The number of sides.
	 *
	 * @return $this
	 */
	constructor(x, y, a, b, t, s) {

		// Call the parent constructor
		super(x, y, 0, 0, t);

		/**
		 * The semi-major (x) axis radius.
		 *
		 * @var {float}
		 */
		this._a = a;

		/**
		 * The semi-minor (y) axis radius.
		 *
		 * @var {float}
		 */
		this._b = b;

		/**
		 * The number of sides.
		 *
		 * @var {integer}
		 */
		this._sides = s;

	};

	/**
	 * Returns the base exterior point at the specified angle.
	 *
	 * @param  {float}  theta
	 *
	 * @return {Engine.Geometry.Point}
	 */
	getBaseExteriorPoint(theta) {

		// Determine the point positions
		var x, y;

		x = this.getX() + this._a * Math.cos(theta);
		y = this.getY() + this._b * Math.sin(theta);

		// Return the point
		return new Point(x, y);

	};

	/**
	 * Returns the rotated exterior point at the specified angle.
	 *
	 * @param  {float}  theta
	 *
	 * @return {Engine.Geometry.Point}
	 */
	getRotatedExteriorPoint(theta) {

		// Determine the base exterior point
		var base = this.getBaseExteriorPoint();

		// Rotate the point
		return this.rotateExteriorPoint(base);

	};

	/**
	 * Returns the exterior points for the shape.
	 *
	 * @return {array}
	 */
	getExteriorPoints() {

		// Determine the rotational step
		var step = 2 * Math.PI / this._sides;

		// Determine the rotational offset
		var roffset = this.getRotationalOffset();

		// Initialize the points
		var points = [];

		// Generate each point
		for(var theta = 0; theta < 2 * Math.PI; theta += step) {

			// Determine the current exterior point
			var point = this.getExteriorPoint(theta, roffset);

		}

	};

	/**
	 * Returns the exterior point at the specified angle.
	 *
	 * @param  {float}  theta
	 * @param  {Engine.Geometry.Vector|null}  roffset
	 *
	 * @return {Engine.Geometry.Vector}
	 */
	getExteriorPoint(theta, roffset = null) {

	};

	/**
	 * Returns the rotational offset of this shape.
	 *
	 * @return {Engine.Geometry.Vector}
	 */
	getRotationalOffset() {

		// Determine the rotational offset
		var rxoffset, ryoffset;

		rxoffset = Math.cos(this._angle);
		ryoffset = Math.sin(this._angle);

		// Represent the offset as a vector
		return = new Vector(rxoffset, ryoffset);

	};

	/**
	 * Returns the rotation offset 
	 */
	getRotationalOffsetForPosition() {

	};
}

ns.Ellipse = Ellipse;