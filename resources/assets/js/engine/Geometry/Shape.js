var ns = namespace('Engine.Geometry');

import Point from 'Engine/Geometry/Point.js';
import Vector from 'Engine/Geometry/Vector.js';

export default class Shape {

	///////////////////
	//* Constructor *//
	///////////////////
	/**
	 * Creates a new shape.
	 *
	 * @param  {float}  x        The x position of the shape.
	 * @param  {float}  y        The y position of the shape.
	 * @param  {float}  xoffset  The x offset from the position to the origin.
	 * @param  {float}  yoffset  The y offset from the position to the origin.
	 * @param  {float}  angle    The angle of rotation.
	 *
	 * @return $this
	 */
	constructor(x, y, xoffset, yoffset, angle) {

		/**
		 * The position of the shape.
		 *
		 * @var {Engine.Geometry.Point}
		 */
		this._position = new Point(x, y);

		/**
		 * The offset from the position to the origin.
		 *
		 * @var {Engine.Geometry.Point}
		 */
		this._offset = new Vector(xoffset, yoffset);

		/**
		 * The angle of rotation.
		 *
		 * @var {float}
		 */
		this._angle = angle;

	};

	////////////////
	//* Position *//
	////////////////
	/**
	 * Returns the position of the shape.
	 *
	 * @return {Engine.Geometry.Point}
	 */
	getPosition() {
		return this._position;
	};

	/**
	 * Returns the x position of the shape.
	 *
	 * @return {float}
	 */
	getX() {
		return this._position.getX();
	};

	/**
	 * Returns the y position of the shape.
	 *
	 * @return {float}
	 */
	getY() {
		return this._position.getY();
	};

	/**
	 * Sets the position of the shape.
	 *
	 * @param  {Engine.Geometry.Point}  position
	 *
	 * @return {void}
	 */
	setPosition(position) {
		this._position = position;
	};

	/**
	 * Sets the x position of the shape.
	 *
	 * @param  {float}  x
	 *
	 * @return {void}
	 */
	setX(x) {
		this._position.setX(x);
	};

	/**
	 * Sets the y position of the shape.
	 *
	 * @param  {float}  y
	 *
	 * @return {void}
	 */
	setY(y) {
		this._position.setY(y);
	};

	//////////////
	//* Offset *//
	//////////////
	/**
	 * Returns the offset of the shape.
	 *
	 * @return {Engine.Geometry.Vector}
	 */
	getOffset() {
		return this._offset;
	};

	/**
	 * Returns the x offset of the shape.
	 *
	 * @return {float}
	 */
	getXOffset() {
		return this._offset.getX();
	};

	/**
	 * Returns the y offset of the shape.
	 *
	 * @return {float}
	 */
	getYOffset() {
		return this._offset.getY();
	};

	/**
	 * Sets the offset of the shape.
	 *
	 * @param  {Engine.Geometry.Vector}  offset
	 *
	 * @return {void}
	 */
	setOffset(offset) {
		this._offset = offset;
	};

	/**
	 * Sets the x offset of the shape.
	 *
	 * @param  {float}  x
	 *
	 * @return {void}
	 */
	setXOffset(x) {
		this._offset.setX(x);
	};

	/**
	 * Sets the y offset of the shape.
	 *
	 * @param  {float}  y
	 *
	 * @return {void}
	 */
	setYOffset(y) {
		this._offset.setY(y);
	};

	//////////////
	//* Origin *//
	//////////////
	/**
	 * Returns the origin of the shape.
	 *
	 * @return {Engine.Geometry.Point}
	 */
	getOrigin() {
		return this._position.add(this._offset);
	};

	/**
	 * Returns the x offset of the shape.
	 *
	 * @return {float}
	 */
	getXOrigin() {
		return this._position.getX() + this._offset.getX();
	};

	/**
	 * Returns the y offset of the shape.
	 *
	 * @return {float}
	 */
	getYOffset() {
		return this._position.getY() + this._offset.getY();
	};

}

ns.Ellipse = Ellipse;