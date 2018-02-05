var ns = namespace('Engine.Events');

export default class Dispatcher {

    /**
     * Creates a new Event Dispatcher instance.
     */
    constructor() {

       /**
        * The registered event listeners.
        *
        * @var {object}
        */
        this.listeners = {};

        /**
         * The sorted event listeners.
         *
         * @var {array}
         */
        this.sorted = [];

        /**
         * The event firing stack.
         *
         * @var {array}
         */
        this.firing = [];

    }

    /**
     * Register an event listener with the dispatcher.
     *
     * @param  {string|array}  events
     * @param  {object}        listener
     * @param  {int}           priority
     *
     * @return {void}
     */
    listen(events, listener, priority) {

        // Initialize the Priority
        var priority = priority || 0;

        // Cast Events to an Array
        if(typeof events === 'string') {
            events = [events];
        }

        // Iterate through the Events Array
        for(var i = 0; i < events.length; i++) {

            // Determine the Event
            var event = events[i];

            // Instantiate the Event / Listener Object
            if(this.listeners[event] === undefined) {
                this.listeners[event] = {};
            }

            // Instantiate the Priority Array
            if(this.listeners[event][priority] === undefined) {
                this.listeners[event][priority] = [];
            }

            // Register the Listener to the Event
            this.listeners[event][priority].push(
                this.makeListener(listener)
            );

            // Unmark the Event / Listener pairing as Sorted
            this.sorted[event] = undefined;

        }

    };

    /**
     * Fires the specified Event until the first non-null response is returned.
     *
     * @param  {string|object}  event
     * @param  {mixed}          payload
     *
     * @return {array|null}
     */
    until(event, payload) {
        return this.fire(event, payload, true);
    };

    /**
     * Register an event listener with the dispatcher.
     *
     * @param  {string|object}  event
     * @param  {mixed}          payload
     * @param  {boolean}        halt
     *
     * @return {array|null}
     */
    fire(event, payload, halt) {
        return this.dispatch(event, payload, halt);
    }

    /**
     * Register an event listener with the dispatcher.
     *
     * @param  {string|object}  event
     * @param  {mixed}          payload
     * @param  {boolean}        halt
     *
     * @return {array|null}
     */
    dispatch(event, payload = [], halt = false) {

        // When the given "event" is actually an object we will assume it is an event
        // object and use the class as the event name and this event itself as the
        // payload to the handler, which makes object based events quite simple.

        // Check for an Event Object
        if(typeof event === 'object') {

            // Determine the Payload
            payload = [event];

            // Determine the Event
            var event = event.prototype.constructor.name;

        }

        // Initialize the Responses
        var responses = [];

        // If an array is not given to us as the payload, we will turn it into one so
        // we can easily use function.apply(this) on the listeners, passing in the
        // payload to each of them so that they receive each of these arguments.

        // Check for a Non-Array Payload
        if(typeof payload !== 'array') {

            // Check for an Object Payload
            if(typeof payload === 'object') {
                payload = Object.values(payload);
            }

            // Treat the Payload as a Scalar
            else {
                payload = [payload];
            }
            
        }

        // Determine the Listeners to the Event
        var listeners = this.getListeners(event);

        // Iterate through each Listener
        for(var i = 0; i < listeners.length; i++) {

            // Determine the current Listener
            var listener = listeners[i];

            // Determine the Listener response
            var response = listener.apply(null, [event, payload]);

            // If a response is returned from the listener and event halting is enabled
            // we will just return this response, and not call the rest of the event
            // listeners. Otherwise we will add the response on the response list.

            // Check for a response with halting enabled
            if(typeof response !== 'undefined' && halt) {

                // Return the Response
                return response;

            }

            // If a boolean false is returned from a listener, we will stop propagating
            // the event to any further listeners down in the chain, else we keep on
            // looping through the listeners and firing every one in our sequence.

            // Check for a false response
            if(response === false) {
                break;
            }

            // Append the Response to the list of Responses
            responses.push(response);

        }

        // Return NULL in Halting mode, else the Responses
        return halt ? null : responses;

    };

    /**
     * Register an event listener with the dispatcher.
     *
     * @param  {string}  eventName
     *
     * @return {array}
     */
    getListeners(eventName) {

        // Check if the Listeners for the Event require sorting
        if(this.sorted[eventName] === undefined) {
            this.sorted[eventName] = this._sortListeners(eventName);
        }

        // Return the sorted Event Listeners
        return this.sorted[eventName];

    };

    /**
     * Register an event listener with the dispatcher.
     *
     * @param  {string}  eventName
     *
     * @return {array}
     */
    _sortListeners(eventName) {

        // Initialize the list of Listeners
        this.sorted[eventName] = [];

        // First, make sure listeners for the Event actually exist
        if(this.listeners[eventName] === undefined) {
            return [];
        }

        // The listeners are grouped by priority, which we'll want in
        // descending order (so that highest priority goes first).
        // We should also try to retain the internal ordering.

        // Determine the Priorities
        var priorities = Object.keys(this.listeners[eventName]);

        // Sort the Priorities
        priorities.sort();

        // Reverse the Priorties to get them into Descending Order
        priorities.reverse();

        // Initialize the Listeners
        var listeners = [];

        // Iterate through the Priorities
        for(var i = 0; i < priorities.length; i++) {

            // Determine the current Priority
            var priority = priorities[i];

            // Append the Listeners of the current Priority to the list of Listeners
            listeners = listeners.concat(this.listeners[eventName][priority]);

        }

        // Return the Listeners
        return listeners;

    };

    /**
     * Returns the Handler for the specified Listener.
     *
     * @param  {mixed}    listener
     * @param  {boolean}  wildcard
     *
     * @return {function}
     */
    makeListener(listener, wildcard = false) {

        // Check for String
        if(typeof listener === 'string') {
            return this.createClassListener(listener, wildcard);
        }

        // Use the Listener as a Function
        return function(event, payload) {

            // Check if the Listener was a Wildcard
            if(wildcard) {
                return listener(event, payload);
            }

            // Invoke the Listener using the Parameters
            return listener(...payload);

        }

        // Return the Handler of the Listener
        return listener.handle;

    };

};

// Assign Constructor to Namespace
ns.Dispatcher = Dispatcher;