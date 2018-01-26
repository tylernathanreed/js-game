import Container from 'Engine/Container/Container.js';

if(typeof window.app === 'undefined') {

	/**
	 * Returns the available container instance.
	 *
	 * @param  {string|null}  abstract
	 * @param  {array}        parameters
	 *
	 * @return {mixed}
	 */
	window.app = function(abstract = null, parameters = []) {

		// Check if no abstract type was provided
		if(abstract === null) {

			// Return the Container Instance
			return Container.getInstance();

		}

		// Return an instance of the abstract type
		return Container.getInstance().make(abstract, parameters);

	};

}