var ns = namespace('Game.Objects');

export default class Manager {

	/**
	 * Creates a new Manager instance.
	 *
	 * @return {static}
	 */
	constructor() {

		/**
		 * The Game Objects keyed by their ID.
		 *
		 * @var {object}
		 */
		this._objectsById = {};

		/**
		 * The Game Objects keyed by their Class, then their ID.
		 *
		 * @var {object}
		 */
		this._objectsByClass = {};

		/**
		 * The Game Object with the lowest ID per Class.
		 *
		 * @var {object}
		 */
		this._objectByClass = {};

	};

	/**
	 * Creates a new Object Instance.
	 *
	 * @param  {string}  name
	 * @param  {float}   x
	 * @param  {float}   y
	 *
	 * @return {Game.Objects.GameObject}
	 */
	createInstance(name, x, y) {

		// Create the Instance
		var instance = new Game.Objects[name]();

		// Assign the Coordinates
		instance.x = x;
		instance.y = y;

		// Check for no Object by Class
		if(typeof this._objectByClass[name] === 'undefined') {

			// This indicates that this type of object has never been
			// created before, or all previous objects were removed
			// from the scene. We can utilize this assumption.

			// Assign the Object by Class
			this._objectByClass[name] = instance;

			// Initialize the Objects by Class
			this._objectsByClass[name] = {};

		}

		// Remember the Instance
		this._objectsById[instance.id] = instance;
		this._objectsByClass[name][instance.id] = instance;

		// Return the Instance
		return instance;

	};

	/**
	 * Deletes the specified Game Object.
	 *
	 * @param  {Game.Objects.GameObject}  object
	 *
	 * @return {void}
	 */
	deleteInstance(object) {

		// Determine the Object's Class Name
		var name = object.getClassName();

		// Dereference the Object
		delete this._objectsById[object.id];
		delete this._objectsByClass[name][object.id];

		// Check for an Object by Class Name
		if(typeof this._objectByClass[name] !== 'undefined') {

			// Check if the the Object was the Object for the Class
			if(this._objectByClass[name].id == object.id) {

				// Deference the Object
				delete this._objectByClass[name];

			}

		}

	};

	/**
	 * Draws the Game Objects.
	 *
	 * @param  {Game.Graphics.Canvas}  canvas
	 *
	 * @return {this}
	 */
	drawGameObjects(canvas) {

		// Iterate through the Game Objects
		this.each(function(object) {

			// Draw the Object
			object.draw(canvas, canvas.getContext());

		});

		// Allow Chaining
		return this;

	};

	/**
	 * Steps the Game Objects.
	 *
	 * @return {this}
	 */
	stepGameObjects() {

		// Fire the Step Events in Before / Step / After order
		this.fireBeforeStepEvents()
			.fireStepEvents()
			.fireAfterStepEvents();

		// Allow Chaining
		return this;

	};

	/**
	 * Fires the 'Before Step' Event for the Game Objects.
	 *
	 * @return {this}
	 */
	fireBeforeStepEvents() {

		// Iterate through the Game Objects
		this.each(function(object) {

			// Fire the Before Step Event
			object.fireBeforeStepEvent();

		});

		// Allow Chaining
		return this;

	};

	/**
	 * Fires the 'Step' Event for the Game Objects.
	 *
	 * @return {this}
	 */
	fireStepEvents() {

		// Iterate through the Game Objects
		this.each(function(object) {

			// Fire the Step Event
			object.fireStepEvent();

		});

		// Allow Chaining
		return this;

	};

	/**
	 * Fires the 'After Step' Event for the Game Objects.
	 *
	 * @return {this}
	 */
	fireAfterStepEvents() {

		// Iterate through the Game Objects
		this.each(function(object) {

			// Fire the After Step Event
			object.fireAfterStepEvent();

		});

		// Allow Chaining
		return this;

	};

	/**
	 * Invokes a Callback on each Game Object.
	 *
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	each(callback) {

		// Iterate through the Game Objects
		for(var id in this._objectsById) {

			// Make sure the Property exists
			if(!this._objectsById.hasOwnProperty(id)) {
				continue;
			}

			// Determine the current Game Object
			var object = this._objectsById[id];

			// Fire the Callback
			callback(object);

		}

	};

	/**
	 * Returns the Game Object with the specified ID.
	 *
	 * @param  {number}  id
	 *
	 * @return {Game.Objects.GameObject|null}
	 */
	getObjectById(id) {

		return this._objectsById[id] || null;

	};

	/**
	 * Returns the first Game Object with the specified Class Name.
	 *
	 * @param  {string}  name
	 *
	 * @return {Game.Objects.GameObject|null}
	 */
	getObjectByClass(name) {

		return this._objectByClass[name] || null;

	};
}

// Assign Constructor to Namespace
ns.Manager = Manager;