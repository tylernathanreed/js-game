export default class Namespace {

	/**
	 * Creates a new Namespace instance.
	 *
	 * @param  {string}   path
	 * @param  {boolean}  autoAssign
	 *
	 * @return {this}
	 */
	constructor(path, autoAssign = true) {

		/**
		 * The namespace path.
		 *
		 * @var {string}
		 */
		this._path = path;

		// Check for auto assign
		if(autoAssign) {

			// Assign the Namespace to the Window
			this.assignToWindow();

		}

		// Assign to static container
		if(typeof this.constructor._namespaces[path] === 'undefined') {
			this.constructor._namespaces[path] = this;
		}

	}

	/**
	 * Assigns this Namespace to the Window object.
	 *
	 * @return {void}
	 */
	assignToWindow() {

		this._set(window);

	};

	/**
	 * Sets the specified map item to the given value using "dot" notation.
	 * If no key is provided, the entire map will be replaced. Since we
	 * can't pass by reference in JavaScript, we'll return a copy.
	 *
	 * @param  {object}  object
	 * @param  {string}  key
	 * @param  {mixed}   value
	 * @param  {string}  prefix
	 *
	 * @return {boolean}
	 */
	_set(object, key = null, value = null, prefix = '') {

		// If no key is provided, then use the path
		if(key === null) {
			key = this._path;
		}

		// If no value is provided, then use the this
		if(value === null) {
			value = this;
		}

		// If a key is still not provided, then return failure
		if(key === null) {
			return false;
		}

		// Determine the Key Segments
		var segments = key.split('.');

		// If there's only one segment, then we've reached our base case
		// in the recursion (or we started off in a base case), so we
		// should directly set the keyed value and return the map.

		// Check for a single Segment
		if(segments.length === 1) {

			// Make sure nothing exists at the offset
			if(typeof object[segments[0]] !== 'undefined') {
				return false;
			}

			// Set the keyed value
			object[segments[0]] = value;

			// Return Success
			return true;

		}

		// If there's multiple segments, then we have to do some tricky
		// recursion. JavaScript doesn't support pass by reference,
		// so we must recursively set each index within the map.

		// Splice off the first Segment
		var segment = segments.splice(0, 1)[0];

		// Determine the nested Path
		var path = prefix ? prefix + '.' + segment : segment;

		// Create a nested Namespace, if needed
		if(typeof object[segment] === 'undefined') {
			object[segment] = new Namespace(path, false);
		}

		// Recursively set the Value
		this._set(object[segment], segments.join('.'), this, path);

		// Return Success
		return true;

	}
}

/**
 * The defined Namespaces.
 *
 * @var {object}
 */
Namespace._namespaces = {};

// Assign constructor to window
window.Namespace = Namespace;