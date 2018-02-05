var ns = namespace('Engine.Support.Str');

export default class Str {

	/**
	 * Returns whether or not the specified string starts with any of the given substrings.
	 *
	 * @param  {string}        haystack
	 * @param  {string|array}  needles
	 *
	 * @return {boolean}
	 */
	static startsWith(haystack, needles) {

		// Convert single needle to array of needles
		if(typeof needles === 'string') {
			needles = [needles];
		}

		// Iterate through the needles
		for(let index in needles) {

			// Determine the current needle
			let needle = needles[index];

			// Check each needle
			if(needle !== '' && haystack.substring(0, needle.length) === String(needle)) {

				// Return success on first match
				return true;

			}

		}

		// Failed to match any needles
		return false;

	};

}

ns.Str = Str;