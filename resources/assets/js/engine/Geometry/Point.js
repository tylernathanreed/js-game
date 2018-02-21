var ns = namespace('Engine.Geometry');

import Vector from 'Engine.Geometry.Vector';

export default class Point {

	////////////////////
	//* Constructors *//
	////////////////////
	/**
	 * Creates a new point.
	 *
	 * @param  {float}  x
	 * @param  {float}  y
	 *
	 * @return {this}
	 */
	constructor(x, y) {

		/**
		 * The position of the point.
		 *
		 * @var {Engine.Geometry.Vector}
		 */
		this._position = new Vector(x, y);

	};

	/**
	 * Creates a new point from a vector.
	 *
	 * @param  {Engine.Geometry.Vector}  vector
	 *
	 * @return {static}
	 */
	static fromVector(vector) {
		return new Point(vector.getX(), vector.getY());
	};

	//////////////////
	//* Attributes *//
	//////////////////
	/**
	 * Returns the x position of the point.
	 *
	 * @return {float}
	 */
	getX() {
		return this._position.getX();
	};

	/**
	 * Returns the y position of the point.
	 *
	 * @return {float}
	 */
	getY() {
		return this._position.getY();
	};

	/**
	 * Sets the x position of the point.
	 *
	 * @param  {float}  x
	 *
	 * @return {void}
	 */
	setX(x) {
		this._position.setX(x);
	};

	/**
	 * Sets the y position of the point.
	 *
	 * @param  {float}  y
	 *
	 * @return {void}
	 */
	setY(y) {
		this._position.setY(y);
	};

	/**
	 * Returns the vector representing the point.
	 *
	 * @return {Engine.Geometry.Vector}
	 */
	getVector() {
		return this._position;
	};

	//////////////
	//* Vector *//
	//////////////
	/**
	 * Adds the specified vector to this vector.
	 *
	 * @param  {Engine.Geometry.Vector}  vector
	 *
	 * @return {static}
	 */
	add(vector) {
		return this.constructor.fromVector(this._position.add(vector));
	};
}

ns.Point = Point;