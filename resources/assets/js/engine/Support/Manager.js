var ns = namespace('Game.Support');

export default class Manager {

	/**
	 * Creates a new Manager instance.
	 *
	 * @param  {Game}  game
	 *
	 * @return {this}
	 */
	constructor(game) {

		/**
		 * The game instance.
		 *
		 * @var {Game}
		 */
		this._game = game;

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
	 * Returns the Default Driver Name.
	 *
	 * @return {string}
	 */
	getDefaultDriver() {
		return abstract(this);
	};

	/**
	 * Returns the specified Driver.
	 *
	 * @param  {string|null}  driver
	 *
	 * @return {mixed}
	 */
	driver(driver = null) {

		// Check for NULL Driver without Default Driver support
		if(driver == null && !this.usesDefaultDriver()) {
			throw new Error('Default driver is not supported.');
		}

		// Determine the Driver Name
		var driver = driver || this.getDefaultDriver();

        // If the given driver has not been created before, we will create the instances
        // here and cache it so we can return it next time very quickly. If there is
        // already a driver created by this name, we'll just return that instance.

        // Check if the Driver has not already been resolved
        if(typeof this._drivers[driver] === 'undefined') {

        	// Resolve the Driver
        	this._drivers[driver] = this._get(driver);

        }

        // Return the Driver
        return this._drivers[driver];

	};

	/**
	 * Creates the specified Driver instance.
	 *
	 * @param  {string}  name
	 *
	 * @return {mixed}
	 */
	_get(name) {

		// Some managers use a configuration setup, which use adapters with drivers. In
		// this case, we'll determine the configuration, and build a new driver from
		// it. The adapter here is dynamic, but the driver is still hard defined.

		// Check for Configurable Adapters
		if(this.usesConfigurableAdapters()) {

			// Create and return an Adapter
			return this._createAdapter(name);

		}

		// Use Driver Creation
		return this._createDriver(name);
	};

	/**
	 * Creates the specified Adapter instance.
	 *
	 * @param  {string}  name
	 *
	 * @return {mixed}
	 */
	_createAdapter(name) {

		// Determine the Adapter Configuration
		var config = this._getConfig(name);

		// Determine the Driver
		var driver = config[this.getConfigDriverKeyName()];

        // We'll check to see if a creator method exists for the given driver. If not we
        // will check for a custom driver creator, which allows developers to create
        // drivers using their own customized driver creator Closure to create it.

        // Check if a custom creator exists
        if(typeof this._customCreators[driver] !== 'undefined') {

        	// Call the custom creator
        	return this._callCustomCreator(config);

        }

        // Check if creation by method is enabled
        if(this.usesCreationByMethod()) {

        	// Determine the name of the creation method
        	var method = this._getCreationMethodName(driver);

        	// Check if the method exists
        	if(typeof this[method] === 'function') {
        		return this[method](config);
        	}

			throw new Error(`Driver [${driver}] is not supported.`);

        }

        // Throw an Error
        throw new Error(`Adapter [${name}] constructor is not supported.`);

	}

	/**
	 * Creates the specified Driver instance.
	 *
	 * @param  {string}  driver
	 *
	 * @return {mixed}
	 *
	 * @throws {Error}
	 */
	_createDriver(driver) {

        // We'll check to see if a creator method exists for the given driver. If not we
        // will check for a custom driver creator, which allows developers to create
        // drivers using their own customized driver creator Closure to create it.

        // Check if a custom creator exists
        if(typeof this._customCreators[driver] !== 'undefined') {

        	// Call the custom creator
        	return this._callCustomCreator(driver);

        }

        // Check if creation by method is enabled
        if(this.usesCreationByMethod()) {

        	// Determine the name of the creation method
        	var method = this._getCreationMethodName(driver);

        	// Check if the method exists
        	if(typeof this[method] === 'function') {
        		return this.method();
        	}

        	// Throw an Error
        	throw new Error(`Driver [${driver}] is not supported.`);

        }

        // Throw an Error
        throw new Error(`Driver [${driver}] constructor is not supported.`);

	};

	/**
	 * Calls the custom creator for the specified driver.
	 *
	 * @param  {string}  driver
	 *
	 * @return {mixed}
	 */
	_callCustomerCreator(driver) {

		// Call the custom creator, passing it the Game
		return this._customCreators[driver].apply(this, [this._game]);

	};

	/**
	 * Returns the Creation Method Name for the specified Driver.
	 *
	 * @param  {string}  driver
	 *
	 * @return {string}
	 *
	 * @throws {Error}
	 */
	_getCreationMethodName(driver) {

		// Make sure the driver is defined
		if(driver === null || driver === undefined) {
			throw new Error('Cannot derive driver creation method name without a specified driver.');
		}

		// Convert '-' and '_' to spaces
		var driver = driver.replace(/[-_]/g, ' ');

		// Determine the words
		var words = driver.split(' ');

		// Capitalize the first letter of each word
		words = words.map(function(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		});

		// Concatenate the Words together
		var method = words.join();

		// Wrap the Method Name
		method = 'create' + method + 'Driver';

		// Return the Method Name
		return method;

	};

	/**
	 * Returns whether or not this Manager supports driver creation
	 * from methods defined by an inheriting child instance. The
	 * name of the driver will be converted to a method name.
	 *
	 * @return {boolean}
	 */
	usesCreationByMethod() {

		// Supported by Default
		return true;

	};

	/**
	 * Returns whether or not this Manager supports adapter creation
	 * from configuration settings, where an underlying driver is
	 * typically specified. The driver is created separately.
	 *
	 * @return {boolean}
	 */
	usesConfigurableAdapters() {

		// Not supported by Default
		return false;

	};

	/**
	 * Returns whether or not this Manager supports a default driver
	 * implementation. This allows an "inferred" driver, and some
	 * proxies may take advantage of this to bubble down code.
	 *
	 * @return {boolean}
	 */
	usesDefaultDriver() {

		// Supported by Default
		return true;

	};

	/**
	 * Returns the name of the key that holds the name of the driver
	 * for any configured adapter for this manager. Most call it
	 * 'driver', but other implementations may be different.
	 *
	 * @return {string}
	 */
	getConfigDriverKeyName() {

		// Use 'driver' by Default
		return 'driver';

	};

	/**
	 * Registers the specified custom creator.
	 *
	 * @param  {string}    driver
	 * @param  {function}  callback
	 *
	 * @return {this}
	 */
	extend(driver, callback) {

		// Register the custom creator
		this._customCreators[driver] = callback;

		// Allow Chaining
		return this;

	};

    /**
     * Returns the created "drivers".
     *
     * @return {object}
     */
    getDrivers() {
        return this._drivers;
    };

    /**
     * Returns the Configuration for the specified Adapter.
     *
     * @param  {string}  name
     *
     * @return {object}
     */
    _getConfig(name) {
    	return this._game.make('config').get(this._getConfigurationRoot() + '.' + name, {});
    };

    /**
     * Returns the Configuration Root for this Manager.
     *
     * @param  {string}  name
     *
     * @return {string}
     */
    _getConfigurationRoot(name) {
    	return abstract(this);
    };

}

// Assign Constructor to Namespace
ns.Manager = Manager;