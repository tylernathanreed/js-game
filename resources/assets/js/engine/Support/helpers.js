import Namespace from './Namespace.js'

const pathExists = require('path-exists');

if(typeof window['abstract'] === 'undefined') {

	/**
	 * Throws an Abstract implementation error.
	 *
	 * @param  {object}  The calling object.
	 *
	 * @return {void}
	 *
	 * @throws {Error}
	 */
	window['abstract'] = function abstract(object) {

		// Determine the Caller
		var caller = abstract.caller || arguments.callee.caller;

		// Determine the Method Name
		var methodName = caller.name;

		// Determine the Object Class Name
		var className = object.constructor.name;

		// Determine the Super Class Name
		var superName = Object.getPrototypeOf(object.constructor).name;

		// Throw a new Error
		throw new Error(`Must inherit abstract function ${className}::${methodName}() (previously declared abstract in ${superName})`);

	};

}

if(typeof window['fileExistsSync'] === 'undefined') {

	/**
	 * Throws an Abstract implementation error.
	 *
	 * @param  {string}  The name of the namespace.
	 *
	 * @return {object}
	 *
	 * @throws {Error}
	 */
	window['fileExistsSync'] = function fileExistsSync(path) {
		return pathExists.sync(path);
	};

}

if(typeof window['namespace'] === 'undefined') {

	/**
	 * Throws an Abstract implementation error.
	 *
	 * @param  {string}  The name of the namespace.
	 *
	 * @return {object}
	 *
	 * @throws {Error}
	 */
	window['namespace'] = function namespace(path) {
		return new Namespace(path);
	};

}