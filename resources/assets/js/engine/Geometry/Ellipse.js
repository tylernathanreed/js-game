var ns = namespace('Engine.Geometry');

import Point from 'Engine/Geometry/Point.js';

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

		/**
		 * The origin of the ellipse.
		 *
		 * @var {Engine.Geometry.Point}
		 */
		this._origin = new Point(x, y);

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
		 * The angle of rotation.
		 *
		 * @var {float}
		 */
		this._angle = t;

		/**
		 * The number of sides.
		 *
		 * @var {integer}
		 */
		this._sides = s;

	};

	/**
	 * Returns the origin of the ellipse.
	 *
	 * @return {Engine.Geometry.Point}
	 */
	getOrigin() {
		return this._origin;
	};

	/**
	 * Returns the x position of the ellipse.
	 *
	 * @return {float}
	 */
	getX() {
		return this._origin.getX();
	};

	/**
	 * Returns the y position of the ellipse.
	 *
	 * @return {float}
	 */
	getY() {
		return this._origin.getY();
	};

	/**
	 * Sets the origin of the ellipse.
	 *
	 * @param  {Engine.Geometry.Point}  origin
	 *
	 * @return {void}
	 */
	setOrigin(origin) {
		this._origin = origin;
	};

	/**
	 * Sets the x position of the ellipse.
	 *
	 * @param  {float}  x
	 *
	 * @return {void}
	 */
	setX(x) {
		this._origin.setX(x);
	};

	/**
	 * Sets the y position of the ellipse.
	 *
	 * @param  {float}  y
	 *
	 * @return {void}
	 */
	setY(y) {
		this._origin.setY(y);
	};
	
}

ns.Ellipse = Ellipse;