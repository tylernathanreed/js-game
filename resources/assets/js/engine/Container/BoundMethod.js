var ns = namespace('Engine.Container');

import Obj from 'Engine/Support/Obj.js';

export default class BoundMethod {

    /**
     * Call the given Closure / class@method and inject its dependencies.
     *
     * @param  {Engine.Container.Container}  container
     * @param  {mixed}                       callback
     * @param  {array}                       parameters
     * @param  {string|null}                 defaultMethod
     *
     * @return {mixed}
     */
	static call(container, callback, parameters = [], defaultMethod = null) {

		// Check if the method is callable with an @ sign, or if a default method is provided
		if(this._isCallableWithAtSign(callback) || defaultMethod) {

			// Call the class method
			return this._callClass(container, callback, parameters, defaultMethod);

		}

		// Call the bound method
		return this._callBoundMethod(container, callback, (function() {
			return this._callUnboundMethod(callback);
		}).bind(this));
	};

	/**
	 * Calls a string reference to a class using Class@method syntax.
	 *
     * @param  {Engine.Container.Container}  container
     * @param  {string}                      target
     * @param  {array}                       parameters
     * @param  {string|null}                 defaultMethod
     *
     * @return {mixed}
     *
     * @throws {Error}
	 */
	static _callClass(container, target, parameters = [], defaultMethod = null) {

		// Determine the target segments
		var segments = target.split('@');

        // We will assume an @ sign is used to delimit the class name from the method
        // name. We will split on this @ sign and then build a callable array that
        // we can pass right back into the "call" method for dependency binding.

        // Determine the method being targeted
        var method = segments.length === 2 ? segments[1] : defaultMethod;

        // Make sure a method is provided
        if(method === null) {
        	throw new Error('Method not provided.');
        }

        // Call the method
        return this.call(container, [container.make(segments[0]), method], parameters);

	};

	/**
	 * Calls the specified method that has been bound to the container.
	 *
	 * @param  {Engine.Container.Container}  container
	 * @param  {function|array}              callback
	 * @param  {mixed}                       fallback
	 *
	 * @return {mixed}
	 */
	static _callBoundMethod(container, callback, fallback) {

		// Check if the callback is not an array
		if(!Array.isArray(callback)) {

			// Return the fallback value
			return typeof fallback === 'function' ? fallback() : fallback;

		}

        // Here we need to turn the array callable into a Class@method string we can use to
        // examine the container and see if there are any method bindings for this given
        // method. If there are, we can call this method binding callback immediately.

        // Normalize the method
        var method = this._normalizeMethod(callback);

        // Check if the container has a binding for the method
        if(container.hasMethodBinding(method)) {

        	// Call the method binding
        	return container.callMethodBinding(method, callback[0]);

        }

		// Return the fallback value
		return typeof fallback === 'function' ? fallback() : fallback;

	};

	/**
	 * Normalizes the given callback into a Class@method string.
	 *
	 * @param  {array}  callback
	 *
	 * @return {string}
	 */
	static _normalizeMethod(callback) {

		// Determine the class definition
		var definition = typeof callback[0] === 'string' ? callback[0] : Obj.getClass(callback[0]);

		// Return the Class@method string
		return `${definition}@${callback[1]}`;

	};

	/**
	 * Calls the given callback.
	 *
	 * @param  {function|array}  callback
	 *
	 * @return {mixed}
	 *
	 * @throws {Error}
	 */
	static _callUnboundMethod(callback) {

		// Check for a function
		if(typeof callback === 'function') {

			// Call the function directly
			return callback.call();

		}

		// Check for an array
		if(Array.isArray(callback)) {

			// Call the object's function
			return callback[0][callback[1]].call(callback[0]);

		}

		// Throw an exception
		throw new Error('Unable to call given callback.');
	};

	/**
	 * Returns whether or not the given string is in Class@method syntax.
	 *
	 * @param  {mixed}  callback
	 *
	 * @return {boolean}
	 */
	static _isCallableWithAtSign(callback) {

		// Make sure the callback is a string
		if(typeof callback !== 'string') {
			return false;
		}

		// Return whether or not an @ sign is present in the string
		return callback.indexOf('@') !== -1;

	};
}

ns.BoundMethod = BoundMethod;