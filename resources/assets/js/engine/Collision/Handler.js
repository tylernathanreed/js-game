var ns = namespace('Engine.Collision');

export default class Handler {

	/**
	 * Creates a new Manager instance.
	 *
	 * @param  {Engine.Contracts.Foundation.Application}  app
	 *
	 * @return {this}
	 */
	constructor(app) {

		/**
		 * The application instance.
		 *
		 * @var {Engine.Contracts.Foundation.Application}
		 */
		this._app = app;

		/**
		 * The registered custom driver creators.
		 *
		 * @var {object}
		 */
		this._customCreators = {};

		/**
		 * The created "drivers".
		 *
		 * @var {object}
		 */
		this._drivers = {};

	};

	/**
	 * Alias of {@see this.driver{}}.
	 *
	 * @param  {string}  typeA
	 * @param  {string}  typeB
	 *
	 * @return {mixed}
	 */
	getHandler(typeA, typeB) {
		return this.driver(typeA, typeB);
	};

	/**
	 * Returns the handler for the specified types.
	 *
	 * @param  {string}  typeA
	 * @param  {string}  typeB
	 *
	 * @return {mixed}
	 */
	driver(typeA, typeB) {

		// Check if drivers for typeA have not already been resolved
		if(typeof this._drivers[typeA] === 'undefined') {

			// Initialize the driver list for typeA
			this._drivers[typeA] = {};

		}

		// Check if the driver for typeB for typeA has not already been resolved
		if(typeof this._drivers[typeA][typeB] === 'undefined') {

			// Resolve the driver
			this._drivers[typeA][typeB] = this._get(typeA, typeB);

		}

		// Return the driver
		return this._drivers[typeA][typeB];

	};

	/**
	 * Creates the specified driver instance.
	 *
	 * @param  {string}  typeA
	 * @param  {string}  typeB
	 *
	 * @return {function}
	 */
	_get(typeA, typeB) {

		// The handler types are symmetric, so we should check if typeA
		// for typeA exists. If it does, we can use that handler, as
		// it would be the exact same handler for this type pair.

		// Determine the symmetric handler
		var symmetric = this._getSymmetricHandler(typeA, typeB);

		// Check if a symmetric handler was found
		if(symmetric !== null) {

			// Return the symmetric handler
			return symmetric;

		}

		// Create and return the handler
		return this._createDriver(typeA, typeB);

	};

	/**
	 * Returns the symmetric handler for the given types.
	 *
	 * @param  {string}  typeA
	 * @param  {string}  typeB
	 *
	 * @return {function|null}
	 */
	_getSymmetricHandler(typeA, typeB) {

		// Make sure drivers for typeB have already been resolved
		if(typeof this._drivers[typeB] === 'undefined') {
			return null;
		}

		// Make sure the driver for typeA for typeB has already been resolved
		if(typeof this._drivers[typeB][typeA] === 'undefined') {
			return null;
		}

		// Return the driver
		return this._drivers[typeB][typeA];

	};

	/**
	 * Creates the specified driver instance.
	 *
	 * @param  {string}  typeA
	 * @param  {string}  typeB
	 *
	 * @return {mixed}
	 *
	 * @throws {Error}
	 */
	_createDriver(typeA, typeB) {

        // We'll check to see if a creator method exists for the given types. If not we
        // will check for a custom driver creator, which allows developers to create
        // drivers using their own customized driver creator Closure to create it.

        // Determine the custom creator
        var creator = this._getCustomCreator(typeA, typeB);

        // Check if a custom creator exists
        if(creator !== null) {

        	// Call the custom creator
        	return this._callCustomCreator(creator);

        }
    };
}

ns.Handler = Handler;