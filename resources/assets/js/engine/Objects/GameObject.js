var ns = namespace('Engine.Objects');

import Obj from 'Engine/Support/Obj.js';

/**
 * Creates a new Game Object.
 *
 * @return {this}
 */
export default class GameObject {

	/**
	 * Creates a new Game Object instance.
	 *
	 * @param  {float}  x
	 * @param  {float}  y
	 *
	 * @return {static}
	 */
	constructor(x = 0, y = 0) {

		/**
		 * The Instance ID.
		 *
		 * @var {integer}
		 */
		this.id = GameObject.maxInstanceId++;

		/**
		 * The X Position.
		 *
		 * @var {float}
		 */
		this.x = x;

		/**
		 * The Y Position.
		 *
		 * @var {float}
		 */
		this.y = y;

		/**
		 * Whether or not this Object should be visible.
		 *
		 * @var {boolean}
		 */
		this.visible = true;

		/**
		 * Whether or not this Object exists.
		 *
		 * @var {boolean}
		 */
		this.exists = true;

		// Boot if not Booted
		this._bootIfNotBooted();

		// Fire the Created Event
		this.fireObjectEvent('created', {'object': this}, false);

	};

	/**
	 * Check if this Object needs to be booted, and if so, do it.
	 *
	 * @return {void}
	 */
	_bootIfNotBooted() {

		// Make sure this Object has not been booted
		if(typeof GameObject._booted[this.getClassName()] !== 'undefined') {
			return;
		}

		// Mark this Object as Booted
		GameObject._booted[this.getClassName()] = true;

		// Fire the Booting Event
		this.fireObjectEvent('booting', {'object': this}, false);

		// Boot this Object
		this.constructor._boot();

		// Fire the Booted Event
		this.fireObjectEvent('booted', {'object': this}, false);

	};

	/**
	 * The "booting" method of this Object.
	 *
	 * @return {void}
	 */
	static _boot() {

		// Override by Child

	};

	/**
	 * Returns the Event Dispatcher.
	 *
	 * @return {Engine.Events.Dispatcher}
	 */
	static getDispatcher() {
		return this.dispatcher;
	};

	/**
	 * Sets the Event Dispatcher.
	 *
	 * @param  {Engine.Events.Dispatcher}  dispatcher
	 *
	 * @return {void}
	 */
	static setDispatcher(dispatcher) {
		this.dispatcher = dispatcher;
	};

	/**
	 * Returns the Object Manager.
	 *
	 * @return {Engine.Objects.Manager}
	 */
	static getManager() {
		return this._manager;
	};

	/**
	 * Sets the Object Manager.
	 *
	 * @param  {Engine.Objects.Manager}  manager
	 *
	 * @return {void}
	 */
	static setManager(manager) {
		this._manager = manager;
	};

	/**
	 * The Draw Event Handler for this Object.
	 *
	 * @param  {Engine.Graphics.Canvas}         canvas
	 * @param  {Engine.Graphics.CanvasContext}  context
	 *
	 * @return {void}
	 */
	draw(canvas, context) {

		// Make sure the Object is Visible
		if(!this.visible) {
			return;
		}

		// Determine the Event Parameters
		var parameters = {
			'object': this,
			'canvas': canvas,
			'context': context
		}

		// Make sure we're allowed to Draw
		if(this.fireObjectEvent('drawing', parameters) !== false) {

			// Fire the Draw Event
			this.fireObjectEvent('draw', parameters);

			// Fire the Post Draw Event
			this.fireObjectEvent('drawn', parameters);

		}

		context.drawLine(this.x, this.y, this.x + 10, this.y, 'green');
		context.drawLine(this.x, this.y, this.x, this.y + 10, 'red');

	};

	/**
	 * Destroys this Object.
	 *
	 * @return {boolean}
	 */
	destroy() {

		// Make sure we're allowed to delete
		if(this.fireObjectEvent('deleting') === false) {
			return false;
		}

		// Perform the Deletion
		this._performDeleteOnObject();

		// Once the Object has been deleted, we'll fire off the deleted
		// event so that listeners can define post-delete operations.
		// Finally, we'll return boolean true to indicate success.

		// Fire the Deleted Event
		this.fireObjectEvent('deleted', {}, false);

		// Return Success
		return true;

	};

	/**
	 * Performs the pseudo delete options on this Object.
	 *
	 * @return {void}
	 */
	_performDeleteOnObject() {

		// Straight up deleting this object won't suffice, as the
		// Object Manager is refering this Object. We need to
		// tell the Manager to delete this object entirely.

		// Tell the Object Manager to delete this Object
		this.constructor.getManager().deleteInstance(this);

		// We can't actually delete this object, as one: javascript
		// won't actually let us do that here, and two: we still
		// need the object for the deleted event. Workaround!

		// Flag this Object as non-existant
		this.exists = false;

	};

	/**
	 * Registers the specified Object Event.
	 *
	 * @param  {string}    event
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	static registerObjectEvent(event, callback) {

		// Make sure a Dispatcher is set
		if(this.dispatcher == null) {
			return;
		}

		// Determine the calling Class
		var name = this.getClassName();

		// Register the Callback as a Listener
		this.dispatcher.listen(`objects.${event}: ${name}`, callback);

	};

	/**
	 * Variants of {@see static::registerObjectEvent()}.
	 *
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	static onCreate(callback)     { this.registerObjectEvent('created',    callback); };
	static onPreDraw(callback)    { this.registerObjectEvent('drawing',    callback); };
	static onDraw(callback)       { this.registerObjectEvent('draw',       callback); };
	static onPostDraw(callback)   { this.registerObjectEvent('drawn',      callback); };
	static onBeforeStep(callback) { this.registerObjectEvent('stepping', callback); };
	static onStep(callback)       { this.registerObjectEvent('step',     callback); };
	static onAfterStep(callback)  { this.registerObjectEvent('stepped',  callback); };

	/**
	 * Fires the specified Object Event.
	 *
	 * @param  {string}   event
	 * @param  {object}   parameters
	 * @param  {boolean}  halt
	 *
	 * @return {mixed}
	 */
	fireObjectEvent(event, parameters = {}, halt = true) {

		// Make sure a Dispatcher is set
		if(GameObject.dispatcher == null) {
			return true;
		}

		// Determine the Event method
		var method = halt ? 'until' : 'fire';

		// Determine the calling Class
		var name = this.getClassName();

		// Call the Dispatcher
		return GameObject.dispatcher[method](`objects.${event}: ${name}`, parameters);

	};

	/**
	 * Variants of {@see this.fireObjectEvent()}.
	 *
	 * @return {void}
	 */
	fireBeforeStepEvent() { this.fireObjectEvent('stepping', {'object': this}); };
	fireStepEvent()       { this.fireObjectEvent('step',     {'object': this}); };
	fireAfterStepEvent()  { this.fireObjectEvent('stepped',  {'object': this}); };

	/**
	 * Returns the Class Name of this Object from a Static Context.
	 *
	 * @return {string}
	 */
	static getClassName() {
		return Obj.getClassName(this);
	};

	/**
	 * Returns the Class Name of this Object from an Instance Context.
	 *
	 * @return {string}
	 */
	getClassName() {
		return this.constructor.name;
	};

	/**
	 * Creates a new Object Instance.
	 *
	 * @param  {float}   x
	 * @param  {float}   y
	 *
	 * @return {static}
	 */
	static createInstance(x, y) {
		return this._manager.createInstance(this.getClassName(), x, y);
	};

	/**
	 * Returns the first Game Object using this class.
	 *
	 * @return {static|null}
	 */
	static getClassInstance() {
		return this._manager.getObjectByClass(this.getClassName());
	};

}

/**
 * The Max Instance ID.
 *
 * @var {integer}
 */
GameObject.maxInstanceId = 1;

/**
 * The Event Dispatcher.
 *
 * @var {Engine.Events.Dispatcher|null}
 */
GameObject.dispatcher = null;

/**
 * The booted Objects.
 *
 * @var {object}
 */
GameObject._booted = {};

/**
 * The Object Manager.
 *
 * @var {Engine.Objects.Manager|null}
 */
GameObject._manager = null;

// Assign Constructor to Namespace
ns.GameObject = GameObject;