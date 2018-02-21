var ns = namespace('Engine.Geometry');

export default class Vector {

	///////////////////
	//* Constructor *//
	///////////////////
	/**
	 * Creates a new vector.
	 *
	 * @param  {float}  x
	 * @param  {float}  y
	 *
	 * @return {this}
	 */
	constructor(x, y) {

		/**
		 * The x magnitute of the vector.
		 *
		 * @var {float}
		 */
		this._x = x;

		/**
		 * The y magnitute of the vector.
		 *
		 * @var {float}
		 */
		this._y = y;

	};

	//////////////////
	//* Attributes *//
	//////////////////
	/**
	 * Returns the x magnitute of the vector.
	 *
	 * @return {float}
	 */
	getX() {
		return this._x;
	};

	/**
	 * Returns the y magnitute of the vector.
	 *
	 * @return {float}
	 */
	getY() {
		return this._y;
	};

	/**
	 * Sets the x magnitute of the vector.
	 *
	 * @param  {float}  x
	 *
	 * @return {void}
	 */
	setX(x) {
		this._x = x;
	};

	/**
	 * Sets the y magnitute of the vector.
	 *
	 * @param  {float}  y
	 *
	 * @return {void}
	 */
	setY(y) {
		this._y = y;
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

		return new Vector(
			this._x + vector._x,
			this._y + vector._y
		);

	};
}

ns.Vector = Vector;