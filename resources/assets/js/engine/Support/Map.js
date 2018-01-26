var ns = namespace('Game.Support');

export default class Map {

	/**
	 * Returns whether or not the given value is array accessible.
	 *
	 * @param  {mixed}  value
	 *
	 * @return {boolean}
	 */
	static accessible(value) {
		return Array.isArray(value) || typeof value === 'object';
	}

	/**
	 * Adds the specified element to the given map using "dot" notation if it doesn't exist.
	 *
	 * @param  {object}  map
	 * @param  {string}  key
	 * @param  {value}   value
	 *
	 * @return {object}
	 */
	static add(map, key, value) {

		// Check if the value does not exist
		if(this.get(map, key) === null) {
			this.set(map, key, value);
		}

		// Return th eMap
		return map;

	};

	/**
	 * Returns whether or not the specified key exists in the given map.
	 *
	 * @param  {object}  map
	 * @param  {string}  key
	 *
	 * @return {boolean}
	 */
	static exists(map, key) {
		return typeof map[key] !== 'undefined';
	};

	/**
	 * Returns an item from the given map using "dot" notation.
	 *
	 * @param  {object}  map
	 * @param  {string}  key
	 * @param  {mixed}   fallback
	 *
	 * @return {mixed}
	 */
	static get(map, key, fallback = null) {

		// Make sure the map is accessible
		if(!this.accessible(map)) {
			return fallback;
		}

		// Return the map if the key is null
		if(key === null) {
			return map;
		}

		// Check if the Key explicitly exists
		if(this.exists(map, key)) {

			// Return the explict value
			return map[key];

		}

		// Check if the key doesn't use "dot" notation
		if(key.indexOf('.') === -1) {

			// Check if the key is defined
			if(typeof map[key] !== 'undefined') {

				// Return the value
				return map[key];

			}

			// Return the fallback value
			return fallback;

		}

		// Determine the Key Segments
		var segments = key.split('.');

		// Iterate through the Segments
		for(let index in segments) {

			// Determine the Segment
			let segment = segments[index];

			// Check if the map is still accessible, and that the key exists
			if(this.accessible(map) && this.exists(map, segment)) {

				// Step down into the map
				map = map[segment];

			}

			// Failed to find the key
			else {
				return fallback;
			}

		}

		// If all of the key's segments were iterated through, then the
		// map itself should be the final result. Otherwise, we would
		// have returned the fallback value by now. And away we go!

		// Return the value
		return map;

	};

	/**
	 * Returns whether or not the specified item(s) exist in the given map using "dot" notation.
	 *
	 * @param  {object}        map
	 * @param  {string|array}  keys
	 *
	 * @return {boolean}
	 */
	static has(map, keys) {

		// Make sure that keys have been specified
		if(keys === null) {
			return false;
		}

		// Convert Keys into an Array
		if(typeof keys !== 'object') {
			keys = [keys];
		}

		// Make sure Keys is truthy
		if(!keys) {
			return false;
		}

		// Make sure at least one Key was provided
		if(keys.length === 0) {
			return false;
		}

		// Now that we've checked all of the edge conditions, we're going
		// to iterate through all of the keys, and try to find a value
		// that isn't keyed in the provided map, then return false.

		// Iterate through the Keys
		for(let i = 0; i < keys.length; i++) {

			// Determine the current Key
			let key = keys[i];

			// Skip this iteration if the key explictly exists
			if(this.exists(map, key)) {
				continue;
			}

			// Initialize the Sub Map
			let subKeyMap = map;

			// Determine the keys using "dot" notation
			let dotKeys = key.split('.');

			// Iterate through to keys in the "dot" notation
			for(let j = 0; j < dotKeys.length; j++) {

				// Determine the current Segment
				let segment = dotKeys[j];

				// If the Sub Key Array is accessible and exists, then keep going deeper
				if(this.accessible(subKeyMap) && this.exists(subKeyMap, segment)) {
					subKeyMap = subKeyMap[segment];
				}

				// Otherwise, stop here
				else {
					return false;
				}

			}

		}

		// We managed to find everything, return true
		return true;

	};

	/**
	 * Sets the specified map item to the given value using "dot" notation.
	 * If no key is provided, the entire map will be replaced. Since we
	 * can't pass by reference in JavaScript, we'll return a copy.
	 *
	 * @param  {object}  map
	 * @param  {string}  key
	 * @param  {mixed}   value
	 *
	 * @return {object}
	 */
	static set(map, key, value) {

		// If no key is provided, then return the value
		if(key === null) {
			return value;
		}

		// Determine the Key Segments
		var segments = key.split('.');

		// If there's only one segment, then we've reached our base case
		// in the recursion (or we started off in a base case), so we
		// should directly set the keyed value and return the map.

		// Check for a single Segment
		if(segments.length === 1) {

			// Set the keyed value
			map[segments[0]] = value;

			// Return the Map
			return map;

		}

		// If there's multiple segments, then we have to do some tricky
		// recursion. JavaScript doesn't support pass by reference,
		// so we must recursively set each index within the map.

		// Splice off the first Segment
		var segment = segments.splice(0, 1)[0];

		// Initialize the Map Segment, if needed
		if(typeof map[segment] === 'undefined') {
			map[segment] = {};
		}

		// Recursively set the Value
		map[segment] = this.set(map[segment], segments.join('.'), value);

		// Return the Map
		return map;

	};

};

// Assign Constructor to Namespace
ns.Map = Map;