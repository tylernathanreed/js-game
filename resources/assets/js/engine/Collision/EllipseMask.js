var ns = namespace('Engine.Collision');

import Mask from 'Engine/Collision/Mask.js';
import RectangleMask from 'Engine/Collision/RectangleMask.js';

export default class EllipseMask extends Mask {

	/**
	 * Creates a new ellipse collision mask.
	 *
	 * @param  {Engine.Objects.GameObject}  object
	 * @param  {object}                     box
	 *
	 * @return {this}
	 */
	constructor(object, box = {}) {

		super('ellipse', object, box);

	};

	/**
	 * Returns whether or not this ellipse is a circle.
	 *
	 * @return {boolean}
	 */
	isCircle() {
		return this.getBoundingBoxWidth() == this.getBoundingBoxHeight();
	}

	/**
	 * Registers the default handlers.
	 *
	 * @return {void}
	 */
	static registerDefaultHandlers() {

		// Determine the collision handler
		var collision = this.getCollisionHandler();

		// Make sure the collision handler is defined
		if(collision === null) {
			return;
		}

		// Determine the default handlers
		var handlers = this.getDefaultHandlers();

		// Iterate through each handler
		for(let type in handlers) {

			// Skip non-properties of the object
			if(!handlers.hasOwnProperty(type)) {
				continue;
			}

			// Determine the type handler
			let handler = handlers[type];

			// Register each type handler
			collision.extend(this.MASK_TYPE, type, handler);

		}

	};

	/**
	 * Returns the default handlers.
	 *
	 * @return {object}
	 */
	static getDefaultHandlers() {

		return {
			[this.MASK_TYPE]: this.getDefaultSelfHandler()
		};

	};

	/**
	 * Returns the default handler for self collision.
	 *
	 * @return {function}
	 */
	static getDefaultSelfHandler() {

		return function(ellipseA, ellipseB) {

			// One of the optimizations performed by the collision engine
			// is to check the bounding boxes of the objects prior to
			// mask comparison. This is essentially box collision.

			// Nothing is needed
			return true;

		};

	};

}

/**
 * The mask type for ellipses.
 *
 * @var {string}
 */
EllipseMask.MASK_TYPE = 'ellipse';

ns.EllipseMask = EllipseMask;