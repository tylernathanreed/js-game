var ns = namespace('Engine.Collision');

export default class Mask {

	/**
	 * Creates a new collision mask.
	 *
	 * @param  {string}                     type
	 * @param  {Engine.Objects.GameObject}  object
	 * @param  {object}                     box
	 *
	 * @return {this}
	 */
	constructor(type, object, box = {}) {

		/**
		 * The type of this collision mask.
		 *
		 * @var {string}
		 */
		this._type = type;

		/**
		 * The object using this collision mask.
		 *
		 * @var {Engine.Objects.GameObject}
		 */
		this._object = object;

		/**
		 * The bounding box offsets for this collision mask.
		 *
		 * @var {object}
		 */
		this._box = box;

	};

	/**
	 * Returns whether or not this collision mask collides with the specified collision mask.
	 *
	 * @param  {Engine.Collision.Mask}  mask
	 *
	 * @return {boolean}
	 */
	collidesWith(mask) {

		// The bounding boxes must collide
		if(!this.collidesWithBoundingBox(mask)) {
			return false;
		}

		// Determine the collision type handler
		var handler = this.getCollisionHandler(mask.getType());

		// Invoke the handler
		return handler(this, mask);

	};

	/**
	 * Returns whether or not the bounding box of this collision mask collides with the bounding box of the specified collision mask.
	 *
	 * @param  {Engine.Collision.Mask}  mask
	 *
	 * @return {boolean}
	 */
	collidesWithBoundingBox(mask) {

		// If the right side of this mask is to the left of the left side
		// of the other mask, then the bounding boxes do not collide.
		// We can immediately return false when this is the case.

		// Check if the right side of this mask is to the left of the left side of the other mask
		if(this.getBoundingBoxRight() < mask.getBoundingBoxLeft()) {
			return false;
		}

		// If the top side of this mask is to the bottom of the bottom
		// side of the other mask, then the bounding boxes do not
		// collside. We could then immediately return false.

		// Check if the top side of this mask is to the bottom of the bottom side of the other mask
		if(this.getBoundingBoxTop() > mask.getBoundingBoxBottom()) {
			return false;
		}

		// If the left side of this mask is to the right of the right
		// side of the other mask, then the bounding boxes do not
		// collside. We could then immediately return false.

		// Check if the left side of this mask is to the right of the right side of the other mask
		if(this.getBoundingBoxLeft() > mask.getBoundingBoxRight()) {
			return false;
		}

		// If the bottom side of this mask is to the top of the top side
		// of the other mask, then the bounding boxes do not collide.
		// We can immediately return false when this is the case.

		// Check if the bottom side of this mask is to the top of the top side of the other mask
		if(this.getBoundingBoxBottom() < mask.getBoundingBoxTop()) {
			return false;
		}

		// The bounding boxes collide
		return true;

	};

	/**
	 * Returns the right bounding box for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxRight() {
		return this.getX() + this.getBoundingBoxOffsetRight();
	};

	/**
	 * Returns the top bounding box for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxTop() {
		return this.getY() - this.getBoundingBoxOffsetTop();
	};

	/**
	 * Returns the left bounding box for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxLeft() {
		return this.getX() - this.getBoundingBoxOffsetLeft();
	};

	/**
	 * Returns the bottom bounding box for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxBottom() {
		return this.getY() + this.getBoundingBoxOffsetBottom();
	};

	/**
	 * Returns the x position of the object.
	 *
	 * @return {float}
	 */
	getX() {
		return this._object.x;
	};

	/**
	 * Returns the y position of the object.
	 *
	 * @return {float}
	 */
	getY() {
		return this._object.y;
	};

	/**
	 * Returns the bounding box offset for this collision mask.
	 *
	 * @return {object}
	 */
	getBoundingBoxOffset() {
		return this._box;
	};

	/**
	 * Returns the right bounding box offset for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxOffsetRight() {
		return this._box[Mask.OFFSET_RIGHT] || 0;
	};

	/**
	 * Returns the top bounding box offset for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxOffsetTop() {
		return this._box[Mask.OFFSET_TOP] || 0;
	};

	/**
	 * Returns the left bounding box offset for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxOffsetLeft() {
		return this._box[Mask.OFFSET_LEFT] || 0;
	};

	/**
	 * Returns the bottom bounding box offset for this collision mask.
	 *
	 * @return {integer}
	 */
	getBoundingBoxOffsetBottom() {
		return this._box[Mask.OFFSET_BOTTOM] || 0;
	};

	/**
	 * Returns the type of this collision mask.
	 *
	 * @return {string}
	 */
	getType() {
		return this._type;
	};

	/**
	 * Returns the object using this collision mask.
	 *
	 * @return {Engine.Objects.GameObject}
	 */
	getGameObject() {
		return this._object;
	};

	/**
	 * Returns the collision handler.
	 *
	 * @return {Engine.Collision.Handler|null}
	 */
	static getCollisionHandler() {
		return this.COLLISION_HANDLER;
	};

	/**
	 * Sets the collision handler.
	 *
	 * @param  {Engine.Collision.Handler}  handler
	 *
	 * @return {void}
	 */
	static setCollisionHandler(handler) {
		this.COLLISION_HANDLER = handler;
	};

	/**
	 * Returns the collision handler for the specified type.
	 *
	 * @param  {string}  type
	 *
	 * @return {function}
	 */
	getCollisionHandler(type) {
		return this.constructor.getCollisionHandler().getHandler(this.getType(), type);
	};

}

/**
 * The offset constants.
 *
 * @var {string}
 */
Mask.OFFSET_RIGHT = 'right';
Mask.OFFSET_TOP = 'top';
Mask.OFFSET_LEFT = 'left';
Mask.OFFSET_BOTTOM = 'bottom';

/**
 * The collision handler.
 *
 * @var {Engine.Collision.Handler|null}
 */
Mask.COLLISION_HANDLER = null;

ns.Mask = Mask;