var ns = namespace('Engine.Config');

import Map from 'Engine/Support/Map.js'

export default class Repository {

	/**
	 * Creates a new Repository instance.
	 *
	 * @param  {object}  items
	 *
	 * @return {this}
	 */
	constructor(items = {}) {

		/**
		 * All of the configuration items.
		 *
		 * @var {object}
		 */
		this._items = items;

	};

	/**
	 * Loads the specified configuration files.
	 *
	 * @param  {object}  files
	 *
	 * @return {void}
	 */
	loadConfigurationFiles(files) {

		// Iterate through the files
		for(let name in files) {

			// Skip non-property iterations
			if(!files.hasOwnProperty(name)) {
				continue;
			}

			// Determine the file
			let file = files[name];

			// Load the file
			this.set(name, file);

		}

	};

	/**
	 * Returns whether or not the given configuration value exists.
	 *
	 * @param  {string}  key
	 *
	 * @return {boolean}
	 */
	has(key) {
		return Map.has(this._items, key);
	};

	/**
	 * Returns the specified configuration value.
	 *
	 * @param  {string|array|object}  key
	 * @param  {mixed}                fallback
	 *
	 * @return {mixed}
	 */
	get(key, fallback = null) {

		// Check if the Key is an Array or Object
		if(Array.isArray(key) || typeof key === 'object') {
			return this._getMany(key);
		}

		// Return the configuration value
		return Map.get(this._items, key, fallback);

	};

	/**
	 * Returns the specified configuration values.
	 *
	 * @param  {array|object}  keys
	 *
	 * @return {object}
	 */
	getMany(keys) {

		// Initialize the result
		var config = {};

		// Iterate through the Keys
		for(let index in keys) {

			// If the keys variable is an array, then the index is
			// numerical, and the value is the name of the key.
			// Otherwise, the index is the name of the key.

			// Determine the Key
			let key = Array.isArray(keys) ? keys[index] : index;

			// If the keys variable is an array, then there is no
			// fallback. Otherwise, we can use the key on the
			// object to get the fallback value. Useful!

			// Determine the Fallback
			let fallback = Array.isArray(keys) ? null : keys[key];

			// Append the configuration value
			config[key] = Map.get(this._items, key, fallback);

		}

		// Return the result
		return config;

	};

	/**
	 * Sets the given configuration value.
	 *
	 * @param  {string|object}  key
	 * @param  {mixed}          value
	 *
	 * @return {void}
	 */
	set(key, value = null) {

		// Convert single key to object
		var keys = typeof key === 'string' ? {[key]: value} : key;

		// Iterate through the Keys
		for(let key in keys) {

			// Determine the Value
			let value = keys[key];

			// Set the configuration value
			Map.set(this._items, key, value);

		}

	};

	/**
	 * Push the specified value onto an array configuration value.
	 *
	 * @param  {string}  key
	 * @param  {mixed}   value
	 *
	 * @return {void}
	 */
	push(key, value) {

		// Determine the array
		var array = this.get(key);

		// Push the Value
		array.push(value);

		// Set the configuration value to the updated array
		this.set(key, array);

	};

	/**
	 * Returns all of the configuration values.
	 *
	 * @return {object}
	 */
	all() {
		return this._items;
	};

}

// Assign Constructor to Namespace
ns.Repository = Repository;