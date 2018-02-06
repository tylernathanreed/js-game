var ns = namespace('Engine.Support');

import Map from 'Engine/Support/Map.js';

export default class Obj {

    /**
     * Returns whether or not the specified Value is a Class.
     *
     * @param  {mixed}  value
     *
     * @return {boolean}
     */
    static isClass(value) {

        return typeof value === 'function'
            && value.hasOwnProperty('prototype')
            && !value.hasOwnProperty('arguments')
            && /^\s*class\s+/.test(value.toString());

    };

    /**
     * Returns the Class Name of the specified Value.
     *
     * @param  {mixed}  value
     *
     * @return {string|null}
     */
    static getClassName(value) {

        // Check if the value is a Class
        if(this.isClass(value)) {
            return value.name;
        }

        // Check if the value is an Object
        if(typeof value === 'object') {
            return value.constructor.name;
        }

        // Check if the value is a String
        if(typeof value === 'string') {
            return value;
        }

        // Check if the value is a function
        if(typeof value === 'function') {
            return value.name;
        }

        // Unknown Class Name
        return null;

    };

    /**
     * Returns the Class of the specified Value.
     *
     * @param  {mixed}  value
     *
     * @return {class|null}
     */
    static getClass(value) {

        // Check if the value is a Class
        if(this.isClass(value)) {
            return value;
        }

        // Check if the value is an Object
        if(typeof value === 'object') {
            return value;
        }

        // Check if the value is a String
        if(typeof value === 'string') {
            return Map.get(window, value);
        }

        // Unknown Class
        return null;

    }

    /**
     * Creates a new object from the specified array.
     *
     * @param  {array}  array
     *
     * @return {object}
     */
    static fromArray(array) {

        // Initialize the object
        var object = {};

        // Iterate through the array
        for(let key in array) {

            // Assign key / value pair to the object
            object[key] = array[key];

        }

        // Return the object
        return object;

    };

    /**
     * Returns a unique identifier for the specified object.
     *
     * @param  {object}  obj
     *
     * @return {integer}
     */
    static getUniqueId(obj) {

        // Set the unique id
        this.setUniqueId(obj);

        // Return the unique id
        return obj.__uniqueId;

    };

    /**
     * Sets the unique identifier for the specified object.
     *
     * @param  {object}  obj
     *
     * @return {void}
     */
    static setUniqueId(obj) {

        // Make sure the object is an object
        if(typeof obj !== 'object') {
            return;
        }

        // Make sure the object doesn't already have a unique id
        if(typeof obj.__uniqueId !== 'undefined') {
            return;
        }

        // Define the unique id
        Object.defineProperty(obj, '__uniqueId', {
            value: ++Obj._uniqueId,
            enumerable: false,
            writeable: false
        });

    };
}

/**
 * The unique identifier for the newest object.
 *
 * @var {integer}
 */
Obj._uniqueId = 0;

// Assign Constructor to Namespace
ns.Obj = Obj;