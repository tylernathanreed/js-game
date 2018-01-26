var ns = namespace('Game.Support');

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

        // Unknown Class
        return null;

    }
}

// Assign Constructor to Namespace
ns.Obj = Obj;