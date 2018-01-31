var ns = namespace('Game.Support');

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
	 * @return {array}
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

			// Otherwise, make sure the values are an array
			else if(!Array.isArray(values)) {
				continue;
			}

			// Append the values to the results
			results = results.concat(values);

		}

		// Return the results
		return results;

	};

}

ns.Arr = Arr;