var ns = namespace('Engine.Support');

import Obj from 'Engine/Support/Obj.js';
import Collection from 'Engine/Support/Collection.js';

export default class Arr {

	/**
	 * Returns whether or not the given value is array accessible.
	 *
	 * @param  {mixed}  value
	 *
	 * @return {boolean}
	 */
	static accessible(value) {
		return Array.isArray(value);
	};

	/**
	 * Collapses an array of arrays into a single array.
	 *
	 * @param  {array}  array
	 *
	 * @return {array|object}
	 */
	static collapse(array) {

		// Initialize the results
		var results = [];

		// Iterate through the array
		for(let index in array) {

			// Determine the index values
			let values = array[index];

			// Check if the values are a collection
			if(values instanceof Collection) {

				// Determine the collection items
				values = values.all();

			}

			// Otherwise, make sure the values are an array or object
			else if(!Array.isArray(values) && typeof values !== 'object') {
				continue;
			}

			// Check for object being added to array
			if(typeof values === 'object' && !Array.isArray(values) && Array.isArray(results)) {

				// Convert the results to an object
				results = Obj.fromArray(results);

			}

			// Append the values to the results
			results = Array.isArray(values)
				? results.concat(values)
				: Object.assign(results, values);

		}

		// Return the results
		return results;

	};

	/**
	 * Returns whether or not the specified arrays are equal.
	 *
	 * @param  {array}    one
	 * @param  {array}    two
	 * @param  {boolean}  strict
	 *
	 * @return {boolean}
	 */
	static equals(one, two, strict = true) {

		// Make sure the lengths match
		if(one.length !== two.length) {
			return false;
		}

		// Iterate through the first array
		for(let index = one.length; i--;) {

			// Check for strict comparison
			if(strict) {

				// Make sure the respective elements strictly match
				if(one[i] !== two[i]) {
					return false;
				}

			}

			// Use loose comparison
			else {

				// Make sure the respective elements loosely match
				if(one[i] != two[i]) {
					return false;
				}

			}

		}

	};

	/**
	 * Creates a new array from the specified object.
	 *
	 * @param  {object}  object
	 *
	 * @return {array}
	 */
	static fromObject(object) {

		// Check for collection
		if(object instanceof Collection) {
			return object.values().all();
		}

		// Cast to array
		return this.values(object);

	};

	/**
	 * Returns the values of the specified array.
	 *
	 * @param  {array|object}  array
	 *
	 * @return {array}
	 */
	static values(array) {

		// Check for Array
		if(Array.isArray(array)) {
			return array;
		}

		// Return object values
		return Object.values(array);

	};
}

ns.Arr = Arr;