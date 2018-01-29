/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Objects');

/**
 * Creates a new Game Object.
 *
 * @return {this}
 */

var GameObject = function () {

	/**
  * Creates a new Game Object instance.
  *
  * @return {static}
  */
	function GameObject() {
		_classCallCheck(this, GameObject);

		/**
   * The Instance ID.
   *
   * @var {integer}
   */
		this.id = GameObject.maxInstanceId++;

		/**
   * The X Position.
   *
   * @var {float}
   */
		this.x = 0;

		/**
   * The Y Position.
   *
   * @var {float}
   */
		this.y = 0;

		/**
   * Whether or not this Object should be visible.
   *
   * @var {boolean}
   */
		this.visible = true;

		/**
   * Whether or not this Object exists.
   *
   * @var {boolean}
   */
		this.exists = true;

		// Boot if not Booted
		this._bootIfNotBooted();

		// Fire the Created Event
		this.fireObjectEvent('created', { 'object': this }, false);
	}

	_createClass(GameObject, [{
		key: '_bootIfNotBooted',


		/**
   * Check if this Object needs to be booted, and if so, do it.
   *
   * @return {void}
   */
		value: function _bootIfNotBooted() {

			// Make sure this Object has not been booted
			if (typeof GameObject._booted[this.getClassName()] !== 'undefined') {
				return;
			}

			// Mark this Object as Booted
			GameObject._booted[this.getClassName()] = true;

			// Fire the Booting Event
			this.fireObjectEvent('booting', { 'object': this }, false);

			// Boot this Object
			this.constructor._boot();

			// Fire the Booted Event
			this.fireObjectEvent('booted', { 'object': this }, false);
		}
	}, {
		key: 'draw',


		/**
   * The Draw Event Handler for this Object.
   *
   * @param  {Game.Graphics.Canvas}         canvas
   * @param  {Game.Graphics.CanvasContext}  context
   *
   * @return {void}
   */
		value: function draw(canvas, context) {

			// Make sure the Object is Visible
			if (!this.visible) {
				return;
			}

			// Determine the Event Parameters
			var parameters = {
				'object': this,
				'canvas': canvas,
				'context': context

				// Make sure we're allowed to Draw
			};if (this.fireObjectEvent('drawing', parameters) !== false) {

				// Fire the Draw Event
				this.fireObjectEvent('draw', parameters);

				// Fire the Post Draw Event
				this.fireObjectEvent('drawn', parameters);
			}

			context.drawLine(this.x, this.y, this.x + 10, this.y, 'green');
			context.drawLine(this.x, this.y, this.x, this.y + 10, 'red');
		}
	}, {
		key: 'destroy',


		/**
   * Destroys this Object.
   *
   * @return {boolean}
   */
		value: function destroy() {

			// Make sure we're allowed to delete
			if (this.fireObjectEvent('deleting') === false) {
				return false;
			}

			// Perform the Deletion
			this._performDeleteOnObject();

			// Once the Object has been deleted, we'll fire off the deleted
			// event so that listeners can define post-delete operations.
			// Finally, we'll return boolean true to indicate success.

			// Fire the Deleted Event
			this.fireObjectEvent('deleted', {}, false);

			// Return Success
			return true;
		}
	}, {
		key: '_performDeleteOnObject',


		/**
   * Performs the pseudo delete options on this Object.
   *
   * @return {void}
   */
		value: function _performDeleteOnObject() {

			// Straight up deleting this object won't suffice, as the
			// Object Manager is refering this Object. We need to
			// tell the Manager to delete this object entirely.

			// Tell the Object Manager to delete this Object
			this.constructor.getManager().deleteInstance(this);

			// We can't actually delete this object, as one: javascript
			// won't actually let us do that here, and two: we still
			// need the object for the deleted event. Workaround!

			// Flag this Object as non-existant
			this.exists = false;
		}
	}, {
		key: 'fireObjectEvent',


		/**
   * Fires the specified Object Event.
   *
   * @param  {string}   event
   * @param  {object}   parameters
   * @param  {boolean}  halt
   *
   * @return {mixed}
   */
		value: function fireObjectEvent(event) {
			var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var halt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;


			// Make sure a Dispatcher is set
			if (GameObject.dispatcher == null) {
				return true;
			}

			// Determine the Event method
			var method = halt ? 'until' : 'fire';

			// Determine the calling Class
			var name = this.getClassName();

			// Call the Dispatcher
			return GameObject.dispatcher[method]('objects.' + event + ': ' + name, parameters);
		}
	}, {
		key: 'fireBeforeStepEvent',


		/**
   * Variants of {@see this.fireObjectEvent()}.
   *
   * @return {void}
   */
		value: function fireBeforeStepEvent() {
			this.fireObjectEvent('stepping', { 'object': this });
		}
	}, {
		key: 'fireStepEvent',
		value: function fireStepEvent() {
			this.fireObjectEvent('step', { 'object': this });
		}
	}, {
		key: 'fireAfterStepEvent',
		value: function fireAfterStepEvent() {
			this.fireObjectEvent('stepped', { 'object': this });
		}
	}, {
		key: 'getClassName',


		/**
   * Returns the Class Name of this Object from an Instance Context.
   *
   * @return {string}
   */
		value: function getClassName() {

			return this.constructor.name;
		}
	}], [{
		key: '_boot',


		/**
   * The "booting" method of this Object.
   *
   * @return {void}
   */
		value: function _boot() {

			// Override by Child

		}
	}, {
		key: 'getDispatcher',


		/**
   * Returns the Event Dispatcher.
   *
   * @return {Game.Events.Dispatcher}
   */
		value: function getDispatcher() {

			return this.dispatcher;
		}
	}, {
		key: 'setDispatcher',


		/**
   * Sets the Event Dispatcher.
   *
   * @param  {Game.Events.Dispatcher}  dispatcher
   *
   * @return {void}
   */
		value: function setDispatcher(dispatcher) {

			this.dispatcher = dispatcher;
		}
	}, {
		key: 'getManager',


		/**
   * Returns the Object Manager.
   *
   * @return {Game.Objects.Manager}
   */
		value: function getManager() {

			return this.manager;
		}
	}, {
		key: 'setManager',


		/**
   * Sets the Object Manager.
   *
   * @param  {Game.Objects.Manager}  manager
   *
   * @return {void}
   */
		value: function setManager(manager) {

			this.manager = manager;
		}
	}, {
		key: 'registerObjectEvent',


		/**
   * Registers the specified Object Event.
   *
   * @param  {string}    event
   * @param  {function}  callback
   *
   * @return {void}
   */
		value: function registerObjectEvent(event, callback) {

			// Make sure a Dispatcher is set
			if (this.dispatcher == null) {
				return;
			}

			// Determine the calling Class
			var name = this.getClassName();

			// Register the Callback as a Listener
			this.dispatcher.listen('objects.' + event + ': ' + name, callback);
		}
	}, {
		key: 'onCreate',


		/**
   * Variants of {@see static::registerObjectEvent()}.
   *
   * @param  {function}  callback
   *
   * @return {void}
   */
		value: function onCreate(callback) {
			this.registerObjectEvent('created', callback);
		}
	}, {
		key: 'onPreDraw',
		value: function onPreDraw(callback) {
			this.registerObjectEvent('drawing', callback);
		}
	}, {
		key: 'onDraw',
		value: function onDraw(callback) {
			this.registerObjectEvent('draw', callback);
		}
	}, {
		key: 'onPostDraw',
		value: function onPostDraw(callback) {
			this.registerObjectEvent('drawn', callback);
		}
	}, {
		key: 'onBeforeStep',
		value: function onBeforeStep(callback) {
			this.registerObjectEvent('stepping', callback);
		}
	}, {
		key: 'onStep',
		value: function onStep(callback) {
			this.registerObjectEvent('step', callback);
		}
	}, {
		key: 'onAfterStep',
		value: function onAfterStep(callback) {
			this.registerObjectEvent('stepped', callback);
		}
	}, {
		key: 'getClassName',


		/**
   * Returns the Class Name of this Object from a Static Context.
   *
   * @return {string}
   */
		value: function getClassName() {

			return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
		}
	}]);

	return GameObject;
}();

/**
 * The Max Instance ID.
 *
 * @var {integer}
 */


/* harmony default export */ __webpack_exports__["default"] = (GameObject);
GameObject.maxInstanceId = 1;

/**
 * The Event Dispatcher.
 *
 * @var {Game.Events.Dispatcher|null}
 */
GameObject.dispatcher = null;

/**
 * The booted Objects.
 *
 * @var {object}
 */
GameObject._booted = {};

/**
 * The Object Manager.
 *
 * @var {Game.Objects.Manager|null}
 */
GameObject.manager = null;

// Assign Constructor to Namespace
ns.GameObject = GameObject;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Events');

var Dispatcher = function () {

        /**
         * Creates a new Event Dispatcher instance.
         */
        function Dispatcher() {
                _classCallCheck(this, Dispatcher);

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


        _createClass(Dispatcher, [{
                key: 'listen',
                value: function listen(events, listener, priority) {

                        // Initialize the Priority
                        var priority = priority || 0;

                        // Cast Events to an Array
                        if (typeof events === 'string') {
                                events = [events];
                        }

                        // Iterate through the Events Array
                        for (var i = 0; i < events.length; i++) {

                                // Determine the Event
                                var event = events[i];

                                // Instantiate the Event / Listener Object
                                if (this.listeners[event] === undefined) {
                                        this.listeners[event] = {};
                                }

                                // Instantiate the Priority Array
                                if (this.listeners[event][priority] === undefined) {
                                        this.listeners[event][priority] = [];
                                }

                                // Register the Listener to the Event
                                this.listeners[event][priority].push(this.makeListener(listener));

                                // Unmark the Event / Listener pairing as Sorted
                                this.sorted[event] = undefined;
                        }
                }
        }, {
                key: 'until',


                /**
                 * Fires the specified Event until the first non-null response is returned.
                 *
                 * @param  {string|object}  event
                 * @param  {mixed}          payload
                 *
                 * @return {array|null}
                 */
                value: function until(event, payload) {
                        return this.fire(event, payload, true);
                }
        }, {
                key: 'fire',


                /**
                 * Register an event listener with the dispatcher.
                 *
                 * @param  {string|object}  event
                 * @param  {mixed}          payload
                 * @param  {boolean}        halt
                 *
                 * @return {array|null}
                 */
                value: function fire(event, payload, halt) {
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

        }, {
                key: 'dispatch',
                value: function dispatch(event) {
                        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                        var halt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


                        // When the given "event" is actually an object we will assume it is an event
                        // object and use the class as the event name and this event itself as the
                        // payload to the handler, which makes object based events quite simple.

                        // Check for an Event Object
                        if ((typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {

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
                        if (typeof payload !== 'array') {

                                // Check for an Object Payload
                                if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object') {
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
                        for (var i = 0; i < listeners.length; i++) {

                                // Determine the current Listener
                                var listener = listeners[i];

                                // Determine the Listener response
                                var response = listener.apply(null, [event, payload]);

                                // If a response is returned from the listener and event halting is enabled
                                // we will just return this response, and not call the rest of the event
                                // listeners. Otherwise we will add the response on the response list.

                                // Check for a response with halting enabled
                                if (typeof response !== 'undefined' && halt) {

                                        // Return the Response
                                        return response;
                                }

                                // If a boolean false is returned from a listener, we will stop propagating
                                // the event to any further listeners down in the chain, else we keep on
                                // looping through the listeners and firing every one in our sequence.

                                // Check for a false response
                                if (response === false) {
                                        break;
                                }

                                // Append the Response to the list of Responses
                                responses.push(response);
                        }

                        // Return NULL in Halting mode, else the Responses
                        return halt ? null : responses;
                }
        }, {
                key: 'getListeners',


                /**
                 * Register an event listener with the dispatcher.
                 *
                 * @param  {string}  eventName
                 *
                 * @return {array}
                 */
                value: function getListeners(eventName) {

                        // Check if the Listeners for the Event require sorting
                        if (this.sorted[eventName] === undefined) {
                                this.sorted[eventName] = this._sortListeners(eventName);
                        }

                        // Return the sorted Event Listeners
                        return this.sorted[eventName];
                }
        }, {
                key: '_sortListeners',


                /**
                 * Register an event listener with the dispatcher.
                 *
                 * @param  {string}  eventName
                 *
                 * @return {array}
                 */
                value: function _sortListeners(eventName) {

                        // Initialize the list of Listeners
                        this.sorted[eventName] = [];

                        // First, make sure listeners for the Event actually exist
                        if (this.listeners[eventName] === undefined) {
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
                        for (var i = 0; i < priorities.length; i++) {

                                // Determine the current Priority
                                var priority = priorities[i];

                                // Append the Listeners of the current Priority to the list of Listeners
                                listeners = listeners.concat(this.listeners[eventName][priority]);
                        }

                        // Return the Listeners
                        return listeners;
                }
        }, {
                key: 'makeListener',


                /**
                 * Returns the Handler for the specified Listener.
                 *
                 * @param  {mixed}    listener
                 * @param  {boolean}  wildcard
                 *
                 * @return {function}
                 */
                value: function makeListener(listener) {
                        var wildcard = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


                        // Check for String
                        if (typeof listener === 'string') {
                                return this.createClassListener(listener, wildcard);
                        }

                        // Use the Listener as a Function
                        return function (event, payload) {

                                // Check if the Listener was a Wildcard
                                if (wildcard) {
                                        return listener(event, payload);
                                }

                                // Invoke the Listener using the Parameters
                                return listener.apply(undefined, _toConsumableArray(payload));
                        };

                        // Return the Handler of the Listener
                        return listener.handle;
                }
        }]);

        return Dispatcher;
}();

/* harmony default export */ __webpack_exports__["default"] = (Dispatcher);
;

// Assign Constructor to Namespace
ns.Dispatcher = Dispatcher;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__ = __webpack_require__(3);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Container');



var Container = function () {

        /**
         * Creates a Container instance.
         *
         * @return {this}
         */
        function Container() {
                _classCallCheck(this, Container);

                /**
                 * An array of the types that have been resolved.
                 *
                 * @var {object}
                 */
                this._resolved = {};

                /**
                 * The container's bindings.
                 *
                 * @var {object}
                 */
                this._bindings = {};

                /**
                 * The container's method bindings.
                 *
                 * @var {object}
                 */
                this._methodBindings = {};

                /**
                 * The container's shared instances.
                 *
                 * @var {object}
                 */
                this._instances = {};

                /**
                 * The registered type aliases.
                 *
                 * @var {object}
                 */
                this._aliases = {};

                /**
                 * The registered aliases keyed by the abstract name.
                 *
                 * @var {object}
                 */
                this._abstractAliases = {};

                /**
                 * The extension closures for services.
                 *
                 * @var {object}
                 */
                this._extenders = {};

                /**
                 * All of the registered tags.
                 *
                 * @var {array}
                 */
                this._tags = [];

                /**
                 * The stack of concretions currently being built.
                 *
                 * @var {array}
                 */
                this._buildStack = [];

                /**
                 * The parameter override stack.
                 *
                 * @var {array}
                 */
                this._with = [];

                /**
                 * The contextual binding map.
                 *
                 * @var {object}
                 */
                this.contextual = {};

                /**
                 * All of the registered rebound callbacks.
                 *
                 * @var {array}
                 */
                this._reboundCallbacks = [];

                /**
                 * All of the global resolving callbacks.
                 *
                 * @var {array}
                 */
                this._globalResolvingCallbacks = [];

                /**
                 * All of the global after resolving callbacks.
                 *
                 * @var {array}
                 */
                this._globalAfterResolvingCallbacks = [];

                /**
                 * All of the after resolving callbacks by class type.
                 *
                 * @var {array}
                 */
                this._resolvingCallbacks = [];

                /**
                 * All of the after resolving callbacks by class type.
                 *
                 * @var {array}
                 */
                this._afterResolvingCallbacks = [];
        }

        _createClass(Container, [{
                key: 'when',


                /**
                 * Defines a contextual binding.
                 *
                 * @param  {string}  concrete
                 *
                 * @return {mixed}
                 */
                value: function when(concrete) {

                        /**
                         * @todo Implementation
                         */

                }
        }, {
                key: 'bound',


                /**
                 * Returns whether or not the specified Abstract Type has been bound.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function bound(abstract) {

                        return typeof this._bindings[abstract] !== 'undefined' || typeof this._instances[abstract] !== 'undefined' || this.isAlias(abstract);
                }
        }, {
                key: 'has',


                /**
                 * Alias of {@see $this->bound()}.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function has(abstract) {

                        return this.bound(abstract);
                }
        }, {
                key: 'resolved',


                /**
                 * Returns whether or not the specified Abstract Type has been resolved.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function resolved(abstract) {

                        // Check if the Abstract is an Alias
                        if (this.isAlias(abstract)) {

                                // Resolve the Alias
                                var abstract = this.getAlias(abstract);
                        }

                        // Return whether or not the Instance has been resolved or shared
                        return typeof this._resolved[abstract] !== 'undefined' || typeof this._instances[abstract] !== 'undefined';
                }
        }, {
                key: 'isShared',


                /**
                 * Returns whether or not the given Type is shared.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function isShared(abstract) {

                        // Check if the Instance is shared
                        if (typeof this._instances[abstract] !== 'undefined') {
                                return true;
                        }

                        // Check if the Binding is Shared
                        if (this._bindings[abstract] === true) {
                                return true;
                        }

                        // The Type is not shared
                        return false;
                }
        }, {
                key: 'isAlias',


                /**
                 * Returns whether or not the specified string is registered as an Alias.
                 *
                 * @param  {string}  name
                 *
                 * @return {boolean}
                 */
                value: function isAlias(name) {

                        return typeof this._aliases[name] !== 'undefined';
                }
        }, {
                key: 'bind',


                /**
                 * Registers the specified Binding with this Container.
                 *
                 * @param  {string}                abstract
                 * @param  {function|string|null}  concrete
                 * @param  {boolean}               shared
                 *
                 * @return {void}
                 */
                value: function bind(abstract, concrete, shared) {

                        // Initialize the Arguments
                        var concrete = concrete || null;
                        var shared = shared || false;

                        // If no concrete type was given, we will simply set the concrete type to the
                        // abstract type. After that, the concrete type to be registered as shared
                        // without being forced to state their classes in both of the parameters.

                        // Remove shared and aliased instances
                        this._dropStaleInstances(abstract);

                        // Check if a Concrete definition wasn't provided
                        if (concrete == null) {

                                // Define the Concrete as the Abstract
                                concrete = abstract;
                        }

                        // If the factory is not a Closure, it means it is just a class name which is
                        // bound into this container to the abstract type and we will just wrap it
                        // up inside its own Closure to give us more convenience when extending.

                        // Check if the concrete isn't a Closure
                        if (typeof concrete !== 'function') {

                                // Create a closure from the Abstract and Concrete
                                concrete = this._getClosure(abstract, concrete);
                        }

                        // Define the Binding
                        this._bindings[abstract] = {
                                'concrete': concrete,
                                'shared': shared
                        };

                        // If the abstract type was already resolved in this container we'll fire the
                        // rebound listener so that any objects which have already gotten resolved
                        // can have their copy of the object updated via the listener callbacks.

                        // Check if the Abstract Type was already resolved
                        if (this.resolved(abstract)) {

                                // Fire the Rebound Event
                                this._rebound(abstract);
                        }
                }
        }, {
                key: '_getClosure',


                /**
                 * Registers the specified Binding with this Container.
                 *
                 * @param  {string}  abstract
                 * @param  {string}  concrete
                 *
                 * @return {function}
                 */
                value: function _getClosure(abstract, concrete) {

                        // Return the Closure
                        return function (container, parameters) {

                                // Initialize the Parameters
                                var parameters = parameters || [];

                                // Check if the Abstract is the Concrete
                                if (abstract == concrete) {

                                        // Build the Concrete instance without parameters
                                        return container.build(concrete);
                                }

                                // Make the Concrete instance with parmaeters
                                return container.make(concrete, parameters);
                        };
                }
        }, {
                key: 'hasMethodBinding',


                /**
                 * Returns whether or not the specified Method Binding exists.
                 *
                 * @param  {string}  method
                 *
                 * @return {boolean}
                 */
                value: function hasMethodBinding(method) {

                        return typeof this._methodBindings[method] !== 'undefined';
                }
        }, {
                key: 'bindMethod',


                /**
                 * Binds the specified Callback to the given method so that it may resolve using {@see Container.call()}.
                 *
                 * @param  {string}    method
                 * @param  {function}  callback
                 *
                 * @return {void}
                 */
                value: function bindMethod(method, callback) {

                        this._methodBindings[method] = callback;
                }
        }, {
                key: 'callMethodBinding',


                /**
                 * Calls the specified Method Binding.
                 *
                 * @param  {string}  method
                 * @param  {mixed}   instance
                 *
                 * @return {mixed}
                 */
                value: function callMethodBinding(method, instance) {

                        // Determine the Callback
                        var callback = this._methodBindings[method];

                        // Invoke the Callback
                        return callback(instance, this);
                }
        }, {
                key: 'addContextualBinding',


                /**
                 * Adds the specified Contextual Binding to this Container.
                 *
                 * @param  {string}           concrete
                 * @param  {string}           abstract
                 * @param  {function|string}  implementation
                 *
                 * @return {void}
                 */
                value: function addContextualBinding(concrete, abstract, implementation) {

                        this.contextual[concrete][this.getAlias(abstract)] = implementation;
                }
        }, {
                key: 'bindIf',


                /**
                 * Registers the specified Binding if it hasn't already been registered.
                 *
                 * @param  {string}                abstract
                 * @param  {function|string|null}  concrete
                 * @param  {boolean}               shared
                 *
                 * @return {void}
                 */
                value: function bindIf(abstract, concrete, shared) {

                        // Make sure the Binding hasn't already been registered
                        if (!this.bound(abstract)) {

                                // Register the Binding
                                this.bind(abstract, concrete, shared);
                        }
                }
        }, {
                key: 'bindIf',


                /**
                 * Registers the specified shared binding to this Container.
                 *
                 * @param  {string}                abstract
                 * @param  {function|string|null}  concrete
                 * @param  {boolean}               shared
                 *
                 * @return {void}
                 */
                value: function bindIf(abstract, concrete) {
                        var shared = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


                        // Register the Binding
                        this.bind(abstract, concrete, shared);
                }
        }, {
                key: 'singleton',


                /**
                 * Registers the specified shared binding to this Container.
                 */
                value: function singleton(abstract) {
                        var concrete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

                        this.bind(abstract, concrete, true);
                }
        }, {
                key: 'extend',


                /**
                 * Extend the specified Abstract Type in this Container.
                 *
                 * @param  {string}    abstract
                 * @param  {function}  callback
                 *
                 * @return {void}
                 */
                value: function extend(abstract, callback) {

                        // Resolve any aliases
                        var abstract = this.getAlias(abstract);

                        // Check if the Abstract Type is shared
                        if (typeof this._instances[abstract] !== 'undefined') {

                                // Rebind the Shared Instance
                                this._instances[abstract] = callback(this._instances[abstract], this);

                                // Fire the Rebound Event
                                this._rebound(abstract);
                        }

                        // Assume the Abstract Type isn't shared
                        else {

                                        // Initialize the Extenders if they don't exist
                                        if (typeof this._extenders[abstract] === 'undefined') {
                                                this._extenders[abstract] = [];
                                        }

                                        // Register the Extender
                                        this._extenders[abstract].push(callback);

                                        // Check if the Abstract Type has been resolved
                                        if (this.resolved(abstract)) {

                                                // Fire the Rebound Event
                                                this._rebound(abstract);
                                        }
                                }
                }
        }, {
                key: 'instance',


                /**
                 * Registers an existing Instance as shared in this Container.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   instance
                 *
                 * @return {mixed}
                 */
                value: function instance(abstract, _instance) {

                        // Remove any Abstract Aliases
                        this._removeAbstractAlias(abstract);

                        // We'll check to determine if this type has been bound before, and if it has
                        // we will fire the rebound callbacks registered with the container and it
                        // can be updated with consuming classes that have gotten resolved here.

                        // Remember whether or not the instance was bound
                        var isBound = this.bound(abstract);

                        // Remove the final Alias
                        delete this._aliases[abstract];

                        // Bind the Instance as shared
                        this._instances[abstract] = _instance;

                        // Check if the Instance was originally bound
                        if (isBound) {

                                // Fire the Rebound Event
                                this._reboud(abstract);
                        }

                        // Return the Instance
                        return _instance;
                }
        }, {
                key: '_removeAbstractAlias',


                /**
                 * Removes the specified Alias for the Contextual Binding Alias Cache.
                 *
                 * @param  {string}  search
                 *
                 * @return {void}
                 */
                value: function _removeAbstractAlias(search) {

                        // If the Search isn't an Alias, then don't bother
                        if (typeof this._aliases[search] === 'undefined') {
                                return;
                        }

                        // Iterate through the Abstract Aliases
                        for (var abstract in this._abstractAliases) {

                                // Make sure the Property exists
                                if (!this._abstractAliases.hasOwnProperty(abstract)) {
                                        continue;
                                }

                                // Determine the Aliases
                                var aliases = this._abstractAliases[abstract];

                                // Iterate through the Aliases
                                for (var index = 0; index < aliases.length; index++) {

                                        // Determine the Alias
                                        var alias = aliases[index];

                                        // Check if the Alias is the Search Key
                                        if (alias == search) {

                                                // Remove the Abstract Alias
                                                delete this._abstractAliases[abstract][index];
                                        }
                                }
                        }
                }
        }, {
                key: 'tag',


                /**
                 * Removes the specified Alias for the Contextual Binding Alias Cache.
                 *
                 * @param  {string|array}  abstracts
                 * @param  {...string}     ...tags
                 *
                 * @return {void}
                 */
                value: function tag(abstracts) {

                        // Determine the Abstracts
                        if (typeof abstracts === 'string') {
                                var abstracts = [abstracts];
                        }

                        // Iterate through each Tag

                        for (var _len = arguments.length, tags = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                                tags[_key - 1] = arguments[_key];
                        }

                        for (var i = 0; i < tags.length; i++) {

                                // Determine the current Tag
                                var tag = tags[i];

                                // Check if the Tag hasn't been initialized
                                if (typeof this._tags[tag] === 'undefined') {

                                        // Initialize the Tags
                                        this._tags[tag] = [];
                                }

                                // Iterate through the the Abstracts
                                for (var j = 0; j < abstracts.length; j++) {

                                        // Determine the current Abstract
                                        var abstract = abstracts[i];

                                        // Add each Abstract
                                        this._tags[tag].push(abstract);
                                }
                        }
                }
        }, {
                key: 'tagged',


                /**
                 * Returns all of the tags for the given binding.
                 *
                 * @param  {string}  tag
                 *
                 * @return {array}
                 */
                value: function tagged(tag) {

                        // Initialize the Results
                        var results = [];

                        // Make sure the tag exists
                        if (typeof this._tags[tag] === 'undefined') {
                                return results;
                        }

                        // Iterate through the tags
                        for (var i = 0; i < this._tags[tag].length; i++) {

                                // Determine the current abstract binding
                                var abstract = this._tags[tag][i];

                                // Resolve the binding and append it to the results
                                results.push(this.make(abstract));
                        }

                        // Return the Results
                        return results;
                }
        }, {
                key: 'alias',


                /**
                 * Aliases the specified type to a different name.
                 *
                 * @param  {string}  abstract
                 * @param  {string}  alias
                 *
                 * @return {void}
                 */
                value: function alias(abstract, _alias) {

                        // Assign the Alias
                        this._aliases[_alias] = abstract;

                        // Initialize the Abstract Aliases
                        if (typeof this._abstractAliases[abstract] === 'undefined') {
                                this._abstractAliases[abstract] = [];
                        }

                        // Append the Abstract Alias
                        this._abstractAliases[abstract].push(_alias);
                }
        }, {
                key: 'rebinding',


                /**
                 * Binds the specified callback to an abstract's rebind event.
                 *
                 * @param  {string}    abstract
                 * @param  {function}  callback
                 *
                 * @return {mixed}
                 */
                value: function rebinding(abstract, callback) {

                        // Resolve any aliases
                        var abstract = this.getAlias(abstract);

                        // Initialize the Rebound Callbacks
                        if (typeof this._reboundCallbacks[abstract] === 'undefined') {
                                this._reboundCallbacks[abstract] = [];
                        }

                        // Append the rebind callback
                        this._reboundCallbacks[abstract].push(callback);

                        // Check if the Abstract as already been bound
                        if (this.bound(abstract)) {
                                return this.make(abstract);
                        }

                        // Return NULL
                        return null;
                }
        }, {
                key: 'refresh',


                /**
                 * Refresh an instance using the given target and method.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   target
                 * @param  {string}  method
                 *
                 * @return {mixed}
                 */
                value: function refresh(abstract, target, method) {

                        // Register a Rebinding Callback
                        return this.rebinding(abstract, function (app, instance) {

                                // Call the Target's Method
                                target[method](instance);
                        });
                }
        }, {
                key: '_rebound',


                /**
                 * Invoke the "rebound" callbacks for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {void}
                 */
                value: function _rebound(abstract) {

                        // Resolve the instance
                        var instance = this.make(abstract);

                        // Iterate through the rebound callbacks
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                                for (var _iterator = this._getReboundCallbacks(abstract)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                        var callback = _step.value;

                                        callback.apply(null, [this, instance]);
                                }
                        } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion && _iterator.return) {
                                                _iterator.return();
                                        }
                                } finally {
                                        if (_didIteratorError) {
                                                throw _iteratorError;
                                        }
                                }
                        }
                }
        }, {
                key: '_getReboundCallbacks',


                /**
                 * Returns the rebound callbacks for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {array}
                 */
                value: function _getReboundCallbacks(abstract) {

                        // Make sure the rebound callbacks exist
                        if (typeof this._reboundCallbacks[abstract] === 'undefined') {
                                return [];
                        }

                        // Return the rebound callbacks
                        return this._reboundCallbacks[abstract];
                }
        }, {
                key: 'wrap',


                /**
                 * Wraps the given closure such that its dependencies will be injected when executed.
                 *
                 * @param  {function}  callback
                 * @param  {array}     parameters
                 *
                 * @return {function}
                 */
                value: function wrap(callback) {
                        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


                        // Return a wrapping closure
                        return function () {
                                return this.call(callback, parameters);
                        }.bind(this);
                }
        }, {
                key: 'call',


                /**
                 * Calls the given Closure / class@method and injects its dependencies.
                 *
                 * @param  {function|string}  callback
                 * @param  {array}            parameters
                 * @param  {string|null}      defaultMethod
                 *
                 * @return {mixed}
                 */
                value: function call(callback) {
                        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
                        var defaultMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


                        return Framework.BoundMethod.call(this, callback, parameters, defaultMethod);
                }
        }, {
                key: 'factory',


                /**
                 * Returns a closure to resolve the given abstract type from this container.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {function}
                 */
                value: function factory(abstract) {

                        // Return the closure
                        return function () {
                                return this.make(abstract);
                        }.bind(this);
                }
        }, {
                key: 'makeWith',


                /**
                 * Alias of {@see this.make()}.
                 *
                 * @param  {string}  abstract
                 * @param  {array}   parameters
                 *
                 * @return {mixed}
                 */
                value: function makeWith(abstract) {
                        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                        return this.make(abstract, parameters);
                }
        }, {
                key: 'make',


                /**
                 * Resolves the given abstract type from this container.
                 *
                 * @param  {string}  abstract
                 * @param  {array}   parameters
                 *
                 * @return {mixed}
                 */
                value: function make(abstract) {
                        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                        return this.resolve(abstract, parameters);
                }
        }, {
                key: 'get',


                /**
                 * Resolves the given abstract type form this container.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {mixed}
                 *
                 * @throws {Error}
                 */
                value: function get(abstract) {

                        // Make sure the Abstract type is defined
                        if (!this.has(abstract)) {
                                throw new Error('Abstract type [' + abstract + '] is not bound to the container.');
                        }

                        // Resolve the Abstract type
                        return this.resolve(abstract);
                }
        }, {
                key: 'resolve',


                /**
                 * Resolves the given abstract type from this container.
                 *
                 * @param  {string}  abstract
                 * @param  {array}   parameters
                 *
                 * @return {mixed}
                 */
                value: function resolve(abstract) {
                        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


                        // Resolve any aliases
                        var abstract = this.getAlias(abstract);

                        // Determine whether or not the instance will need contextual binding
                        var needsContextualBuild = parameters.length !== 0 || this._getContextualConcrete(abstract) !== null;

                        // If an instance of the type is currently being managed as a singleton we'll
                        // just return an existing instance instead of instantiating new instances
                        // so the developer can keep using the same objects instance every time.

                        // Check if an instance already exists as a singleton
                        if (typeof this._instances[abstract] !== 'undefined' && !needsContextualBuild) {
                                return this._instances[abstract];
                        }

                        // Push the Parameters
                        this._with.push(parameters);

                        // Determine the concrete instance
                        var concrete = this._getConcrete(abstract);

                        // We're ready to instantiate an instance of the concrete type registered for
                        // the binding. This will instantiate the types, as well as resolve any of
                        // its "nested" dependencies recursively until all have gotten resolved.

                        // Check if the instance is buildable
                        if (this._isBuildable(concrete, abstract)) {

                                // We're finally at a point to where we can build the concrete
                                // type, providing us with an concrete instance. Most of the
                                // dependencies should be resolved by now, so we're good.

                                // Build the instance
                                var object = this.build(concrete);
                        }

                        // Assume the instance is not buildable
                        else {

                                        // We're a step further in the chain, but we're not quite done
                                        // yet. We'll have to call make on the concrete type to get
                                        // even further along, hoping that we don't end up here.

                                        // Make the instance
                                        var object = this.make(concrete);
                                }

                        // If we defined any extenders for this type, we'll need to spin through them
                        // and apply them to the object being built. This allows for the extension
                        // of services, such as changing configuration or decorating the object.

                        // Iterate through the Extenders
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                                for (var _iterator2 = this._getExtenders(abstract)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                        var extender = _step2.value;


                                        // Invoke each Extender
                                        extender.apply(null, [object, this]);
                                }

                                // If the requested type is registered as a singleton we'll want to cache off
                                // the instances in "memory" so we can return it later without creating an
                                // entirely new instance of an object on each subsequent request for it.

                                // Check if the object should be a singleton
                        } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                _iterator2.return();
                                        }
                                } finally {
                                        if (_didIteratorError2) {
                                                throw _iteratorError2;
                                        }
                                }
                        }

                        if (this.isShared(abstract) && !needsContextualBuild) {

                                // Cache the instance
                                this._instances[abstract] = object;
                        }

                        // Fire any resolving callbacks
                        this._fireResolvingCallbacks(abstract, object);

                        // Before returning, we will also set the resolved flag to "true" and pop off
                        // the parameter overrides for this build. After those two things are done
                        // we will be ready to return back the fully constructed class instance.

                        // Mark the abstract as resolved
                        this._resolved[abstract] = true;

                        // Pop the Parameters
                        this._with.pop();

                        // Return the instance
                        return object;
                }
        }, {
                key: '_getConcrete',


                /**
                 * Returns the concrete type for the specified abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {mixed}
                 */
                value: function _getConcrete(abstract) {

                        // determine the contextual concrete type
                        var concrete = this._getContextualConcrete(abstract);

                        // Check for a contextual concrete type
                        if (concrete !== null) {
                                return concrete;
                        }

                        // If we don't have a registered resolver or concrete for the type, we'll just
                        // assume each type is a concrete name and will attempt to resolve it as is
                        // since the container should be able to resolve concretes automatically.

                        // Check for an existing binding
                        if (typeof this._bindings[abstract] !== 'undefined') {

                                // Use the concrete type
                                return this._bindings[abstract]['concrete'];
                        }

                        // Use the abstract type as the concrete type
                        return abstract;
                }
        }, {
                key: '_getContextualConcrete',


                /**
                 * Returns the contextual concrete binding for the specified abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return  {string|null}
                 */
                value: function _getContextualConcrete(abstract) {

                        // Try to find the contextual binding using the abstract type
                        var binding = this._findInContextualBindings(abstract);

                        // Check if a contextual binding was found
                        if (binding !== null) {
                                return binding;
                        }

                        // Next we need to see if a contextual binding might be bound under an alias of the
                        // given abstract type. So, we will need to check if any aliases exist with this
                        // type and then spin through them and check for contextual bindings on these.

                        // Make sure the abstract type has aliases
                        if (typeof this._abstractAliases[abstract] === 'undefined' || Object.keys(this._abstractAliases[abstract]).length === 0) {

                                // There aren't any aliases to spin through, so stop here
                                return null;
                        }

                        // Iterate through the Abstract Aliases
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = undefined;

                        try {
                                for (var _iterator3 = this._abstractAliases[abstract][Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                        var alias = _step3.value;


                                        // Try to find the contextual binding using the abstract type
                                        var binding = this._findInContextualBindings(alias);

                                        // Check if a contextual binding was found
                                        if (binding !== null) {
                                                return binding;
                                        }
                                }

                                // No binding was found
                        } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                        } finally {
                                try {
                                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                _iterator3.return();
                                        }
                                } finally {
                                        if (_didIteratorError3) {
                                                throw _iteratorError3;
                                        }
                                }
                        }

                        return null;
                }
        }, {
                key: '_findInContextualBindings',


                /**
                 * Finds and returns the concrete binding for the given abstract in the contextual binding array.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {string|null}
                 */
                value: function _findInContextualBindings(abstract) {

                        // Make sure the Build Stack has items
                        if (this._buildStack.length == 0) {
                                return null;
                        }

                        // Determine the last item in the build stack
                        var build = this._buildStack[this._buildStack.length - 1];

                        // Check for a Contextual Binding
                        if (typeof this.contextual[build][abstract] !== 'undefined') {

                                // Return the Contextual Binding
                                return this.contextual[build][abstract];
                        }

                        // No Contextual Binding
                        return null;
                }
        }, {
                key: '_isBuildable',


                /**
                 * Returns whether or not the given concrete type is buildable.
                 *
                 * @param  {mixed}   concrete
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function _isBuildable(concrete, abstract) {

                        // If the concrete type is the abstract type, or the concrete
                        // type is a function, then we can build the abstract type.
                        // Otherwise, we have to use make for the concrete type.

                        // Return whether or not the concrete type if buildable
                        return concrete === abstract || typeof concrete === 'function';
                }
        }, {
                key: 'build',


                /**
                 * Instantiate a concrete instance of the given type.
                 *
                 * @param  {string|function}  concrete
                 *
                 * @return {mixed}
                 *
                 * @throws {Error}
                 */
                value: function build(concrete) {

                        // If the concrete type is actually a Closure, we will just execute it and
                        // hand back the results of the functions, which allows functions to be
                        // used as resolvers for more fine-tuned resolution of these objects.

                        // Check if the concrete type is a Closure
                        if (typeof concrete === 'function' && !__WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__["a" /* default */].isClass(concrete)) {

                                // Return the results of the closure
                                return concrete(this, this._getLastParameterOverride());
                        }

                        // Sometimes Classes may be namespaced and thus nested in the window via
                        // nested objects. As a class string, this can be denoted using "dot"
                        // notation. If namespaces are used, we'll need to resolve them.

                        // Resolve the Class Namespace
                        var definition = this._resolveClassNamespace(concrete);

                        // Make sure the Class Namespace resolved
                        if (definition === null) {
                                throw new Error('Class [' + concrete + '] does not exist.');
                        }

                        // If the type is not instantiable, the developer is attempting to resolve
                        // an abstract type such as an Interface of Abstract Class and there is
                        // no binding registered for the abstractions so we need to bail out.

                        // Make sure the concrete type is instantiable
                        if (typeof definition !== 'function' || typeof definition.prototype === 'undefined') {
                                return this._notInstantiable(concrete);
                        }

                        // Add the concrete type to the build stack
                        this._buildStack.push(concrete);

                        // Create a new Instance
                        var instance = new definition();

                        // Determine the Constructor
                        var constructor = instance.constructor;

                        // If the constructor does not take any argments, then there's nothing
                        // that we need to resolve as a dependency. Since we had to create
                        // an empty instance to get the constructor, we can return it.

                        // Check if the Constructor does not require any arguments
                        if (constructor.length === 0) {

                                // Remove the concrete from the build stack
                                this._buildStack.pop();

                                // Return the new Instance
                                return instance;
                        }

                        // At this point, we know that the class requires arguments for its
                        // constructor. We'll have to hope that the developer passed us
                        // the parameters needed to do this. Otherwise, we'll fail.

                        // Determine the last parameter override
                        var parameters = this._getLastParameterOverride();

                        // Check if enough parameters were provided
                        if (constructor.length <= parameters.length) {

                                // Remove the concrete from the build stack
                                this._buildStack.pop();

                                // Return the new Instance
                                return new (Function.prototype.bind.apply(definition, [null].concat(_toConsumableArray(parameters))))();
                        }

                        // At this point, we know that the class requires arguments for its
                        // constructor, but there's really no way for us to know what to
                        // pass in. We're stuck telling the developer to help us out.

                        // Remove the concrete from the build stack
                        this._buildStack.pop();

                        // Throw an Error
                        throw new Error('Class ' + definition + ' has unresolvable dependencies.');
                }
        }, {
                key: '_resolveClassNamespace',


                /**
                 * Returns the Class Name into a Class.
                 *
                 * @param  {string}  concrete
                 *
                 * @return {object|null}
                 */
                value: function _resolveClassNamespace(concrete) {

                        // Check if "dot" notation isn't used
                        if (concrete.indexOf('.') === -1) {

                                // Resolve immediately
                                return window[concrete];
                        }

                        // Check if the explict class name is defined
                        if (typeof window[concrete] !== 'undefined') {

                                // Resolve using the explicit class name
                                return window[concrete];
                        }

                        // Initialize the Namespace to the Window
                        var namespace = window;

                        // Determine the Namespace segments
                        var segments = concrete.split('.');

                        // Iterate through the Segments
                        for (var i = 0; i < segments.length - 1; i++) {

                                // Determine the current Segment
                                var segment = segments[i];

                                // Check if the next Namespace exists
                                if (_typeof(namespace[segment]) === 'object') {
                                        namespace = namespace[segment];
                                }

                                // The next Namespace doesn't exist
                                else {
                                                return null;
                                        }
                        }

                        // Return the final Namespace
                        return namespace[segments[segments.length - 1]];
                }
        }, {
                key: '_getLastParameterOverride',


                /**
                 * Returns the last parameter override.
                 *
                 * @return {array}
                 */
                value: function _getLastParameterOverride() {

                        // Determine the number of parameter overrides
                        var count = this._with.length;

                        // Return the last parameter override
                        return count >= 0 ? this._with[count - 1] : [];
                }
        }, {
                key: '_notInstantiable',


                /**
                 * Throws an exception detailing that the concrete type is not instantiable.
                 *
                 * @param  {string}  concrete
                 *
                 * @return {void}
                 *
                 * @throws {Error}
                 */
                value: function _notInstantiable(concrete) {

                        // Check for a Build Stack
                        if (this._buildStack.length !== 0) {

                                // Determine the Previous Build
                                var previous = this._buildStack.join(', ');

                                // Determine the Message
                                var message = 'Target [' + concrete + '] is not instantiable while building [' + previous + '].';
                        } else {

                                // Determine the Message
                                var message = 'Target [' + concrete + '] is not instantiable.';
                        }

                        // Throw the Exception
                        throw new Error(message);
                }
        }, {
                key: 'resolving',


                /**
                 * Registers the specified resolving callback.
                 *
                 * @param  {string|function} abstract
                 * @param  {function|null}   callback
                 *
                 * @return {void}
                 */
                value: function resolving(abstract) {
                        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


                        // Check for a String Abstract
                        if (typeof abstract === 'string') {

                                // Resolve any aliases
                                var abstract = this.getAlias(abstract);
                        }

                        // Check for Closure Abstract without Callback
                        if (callback === null && typeof abstract === 'function') {

                                // Push the Abstract to the Global Resolving Callbacks
                                this._globalResolvingCallbacks.push(abstract);
                        } else {

                                // Initialize the Resolving Callbacks for the Abstract, if necessary
                                if (typeof this._resolvingCallbacks[abstract] === 'undefined') {
                                        this._resolvingCallbacks[abstract] = [];
                                }

                                // Push the Callback to the Abstract's Resolving Callbacks
                                this._resolvingCallbacks[abstract].push(callback);
                        }
                }
        }, {
                key: '_fireResolvingCallbacks',


                /**
                 * Fires all of the resolving callbacks.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   object
                 *
                 * @return {void}
                 */
                value: function _fireResolvingCallbacks(abstract, object) {

                        // Fire the Global Resolving Callbacks
                        this._fireCallbackArray(object, this._globalResolvingCallbacks);

                        // Fire the Abstract's Resolving Callbacks
                        this._fireCallbackArray(object, this._getCallbacksForType(abstract, object, this._resolvingCallbacks));

                        // Fire the After Resolving Callbacks
                        this._fireAfterResolvingCallbacks(abstract, object);
                }
        }, {
                key: '_fireAfterResolvingCallbacks',


                /**
                 * Fires all of the after resolving callbacks.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   object
                 *
                 * @return {void}
                 */
                value: function _fireAfterResolvingCallbacks(abstract, object) {

                        // Fire the Global After Resolving Callbacks
                        this._fireCallbackArray(object, this._globalAfterResolvingCallbacks);

                        // Fire the Abstract's After Resolving Callbacks
                        this._fireCallbackArray(object, this._getCallbacksForType(abstract, object, this._afterResolvingCallbacks));
                }
        }, {
                key: '_getCallbacksForType',


                /**
                 * Returns all of the callbacks for the given abstract type.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   mixed
                 * @param  {array}   callbacksPerType
                 *
                 * @return {array}
                 */
                value: function _getCallbacksForType(abstract, object, callbacksPerType) {

                        // Initialize the Results
                        var results = [];

                        // Iterate through the Callbacks Per Type
                        for (var type in callbacksPerType) {

                                // Determine the Callbacks for the current Type
                                var callbacks = callbacksPerType[type];

                                // Check if the Type is the Abstract, or if the Object is an instance of the Type
                                if (type === abstract || object instanceof type) {

                                        // Append the Callbacks to the Results
                                        results = results.concat(callbacks);
                                }
                        }

                        // Return the Results
                        return results;
                }
        }, {
                key: '_fireCallbackArray',


                /**
                 * Fires the given array of callbacks.
                 *
                 * @param  {mixed}  object
                 * @param  {array}  callbacks
                 *
                 * @return {void}
                 */
                value: function _fireCallbackArray(object, callbacks) {

                        // Iterate through the Callbacks
                        for (var i = 0; i < callbacks.length; i++) {

                                // Determine the current Callback
                                var callback = callbacks[i];

                                // Call the Callback
                                callback(object, this);
                        }
                }
        }, {
                key: 'getBindings',


                /**
                 * Returns the Bindings of this Container.
                 *
                 * @return {object}
                 */
                value: function getBindings() {
                        return this._bindings;
                }
        }, {
                key: 'getAlias',


                /**
                 * Returns the Alias of the specified Abstract, if available.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {string}
                 *
                 * @throws {Error}
                 */
                value: function getAlias(abstract) {

                        // Return the Abstract Type if an alias does not exist
                        if (typeof this._aliases[abstract] === 'undefined') {
                                return abstract;
                        }

                        // Make sure the Abstract is not aliased to itself
                        if (this._aliases[abstract] === abstract) {
                                throw new Error('[' + abstract + '] is aliased to itself.');
                        }

                        // Recursively derive the Alias
                        return this.getAlias(this._aliases[abstract]);
                }
        }, {
                key: '_getExtenders',


                /**
                 * Returns the extender callbacks for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {array}
                 */
                value: function _getExtenders(abstract) {

                        // Resolve any aliases
                        var abstract = this.getAlias(abstract);

                        // Return the extenders if they exist
                        if (typeof this._extenders[abstract] !== 'undefined') {
                                return this._extenders[abstract];
                        }

                        // Return an empty set
                        return [];
                }
        }, {
                key: 'forgetExtenders',


                /**
                 * Removes all of the extender callbacks for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {void}
                 */
                value: function forgetExtenders(abstract) {

                        // Resolve any aliases
                        var abstract = this.getAlias(abstract);

                        // Forget the Extenders
                        delete this._extenders[abstract];
                }
        }, {
                key: '_dropStaleInstances',


                /**
                 * Drops all of the stale instances and aliases for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {void}
                 */
                value: function _dropStaleInstances(abstract) {

                        // Forget the Instance
                        delete this._instances[abstract];

                        // Forget the Aliase
                        delete this._aliases[abstract];
                }
        }, {
                key: 'forgetInstance',


                /**
                 * Removes the resolved instance from the instance cache for the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {void}
                 */
                value: function forgetInstance(abstract) {

                        // Forget the Instance
                        delete this._instances[abstract];
                }
        }, {
                key: 'forgetInstances',


                /**
                 * Clears all of the instances from the container.
                 *
                 * @return {void}
                 */
                value: function forgetInstances() {

                        // Iterate through the Instances
                        for (var abstract in this._instances) {

                                // Delete the current Instance
                                delete this._instances[abstract];
                        }

                        // Reset the Instances
                        this._instances = {};
                }
        }, {
                key: 'flush',


                /**
                 * Flushes this Container of all bindings and resolved instances.
                 *
                 * @return {void}
                 */
                value: function flush() {

                        // Reset all properties that don't require garbage collection
                        this._aliases = {};
                        this._resolved = {};
                        this._bindings = {};
                        this._abstractAliases = {};

                        // Forget all Instances
                        this.forgetInstances();
                }
        }, {
                key: 'exists',


                /**
                 * Returns whether or not the given abstract type exists.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {boolean}
                 */
                value: function exists(abstract) {
                        return this.bound(abstract);
                }
        }, {
                key: 'get',


                /**
                 * Returns the given abstract type.
                 *
                 * @param  {string}  abstract
                 *
                 * @return {mixed}
                 */
                value: function get(abstract) {
                        return this.make(abstract);
                }
        }, {
                key: 'set',


                /**
                 * Sets the given abstract type.
                 *
                 * @param  {string}  abstract
                 * @param  {mixed}   value
                 *
                 * @return {mixed}
                 */
                value: function set(abstract, value) {

                        // Determine the concrete type
                        var concrete = typeof value === 'function' ? value : function () {
                                return value;
                        };

                        // Bind the abstract type to the concrete type
                        this.bind(abstract, concrete);
                }
        }, {
                key: 'unset',


                /**
                 * Unsets the given abstract type.
                 *
                 * @param  {string}  key
                 *
                 * @return {void}
                 */
                value: function unset(abstract) {

                        // Deference the abstract type
                        delete this._bindings[abstract];
                        delete this._instances[abstract];
                        delete this._resolved[abstract];
                }
        }], [{
                key: 'getInstance',


                /**
                 * Returns the globally available instance of the container.
                 *
                 * @return {static}
                 */
                value: function getInstance() {

                        // Check if an instance doesn't exist
                        if (Container._instance == null) {

                                // Create a new instance
                                Container._instance = new this();
                        }

                        // Return the instance
                        return Container._instance;
                }
        }, {
                key: 'setInstance',


                /**
                 * Sets the globally available instance of the container.
                 *
                 * @param  {Container|null}  container
                 *
                 * @return {static}
                 */
                value: function setInstance() {
                        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


                        // Set the Instance
                        Container._instance = container;

                        // Return the new Instance
                        return Container._instance;
                }
        }]);

        return Container;
}();

/**
 * The current globally available container (if any).
 *
 * @var {static}
 */


/* harmony default export */ __webpack_exports__["a"] = (Container);
Container._instance = null;

// Assign Constructor to Namespace
ns.Container = Container;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Support');

var Obj = function () {
    function Obj() {
        _classCallCheck(this, Obj);
    }

    _createClass(Obj, null, [{
        key: 'isClass',


        /**
         * Returns whether or not the specified Value is a Class.
         *
         * @param  {mixed}  value
         *
         * @return {boolean}
         */
        value: function isClass(value) {

            return typeof value === 'function' && value.hasOwnProperty('prototype') && !value.hasOwnProperty('arguments') && /^\s*class\s+/.test(value.toString());
        }
    }, {
        key: 'getClassName',


        /**
         * Returns the Class Name of the specified Value.
         *
         * @param  {mixed}  value
         *
         * @return {string|null}
         */
        value: function getClassName(value) {

            // Check if the value is a Class
            if (this.isClass(value)) {
                return value.name;
            }

            // Check if the value is an Object
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                return value.constructor.name;
            }

            // Check if the value is a String
            if (typeof value === 'string') {
                return value;
            }

            // Unknown Class Name
            return null;
        }
    }, {
        key: 'getClass',


        /**
         * Returns the Class of the specified Value.
         *
         * @param  {mixed}  value
         *
         * @return {class|null}
         */
        value: function getClass(value) {

            // Check if the value is a Class
            if (this.isClass(value)) {
                return value;
            }

            // Check if the value is an Object
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                return value;
            }

            // Unknown Class
            return null;
        }
    }]);

    return Obj;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["a"] = (Obj);
ns.Obj = Obj;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__ = __webpack_require__(15);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Config');



var Repository = function () {

	/**
  * Creates a new Repository instance.
  *
  * @param  {object}  items
  *
  * @return {this}
  */
	function Repository() {
		var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Repository);

		/**
   * All of the configuration items.
   *
   * @var {object}
   */
		this._items = items;
	}

	_createClass(Repository, [{
		key: 'has',


		/**
   * Returns whether or not the given configuration value exists.
   *
   * @param  {string}  key
   *
   * @return {boolean}
   */
		value: function has(key) {
			return __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__["a" /* default */].has(this._items, key);
		}
	}, {
		key: 'get',


		/**
   * Returns the specified configuration value.
   *
   * @param  {string|array|object}  key
   * @param  {mixed}                fallback
   *
   * @return {mixed}
   */
		value: function get(key) {
			var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			// Check if the Key is an Array or Object
			if (Array.isArray(key) || (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
				return this._getMany(key);
			}

			// Return the configuration value
			return __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__["a" /* default */].get(this._items, key, fallback);
		}
	}, {
		key: 'getMany',


		/**
   * Returns the specified configuration values.
   *
   * @param  {array|object}  keys
   *
   * @return {object}
   */
		value: function getMany(keys) {

			// Initialize the result
			var config = {};

			// Iterate through the Keys
			for (var index in keys) {

				// If the keys variable is an array, then the index is
				// numerical, and the value is the name of the key.
				// Otherwise, the index is the name of the key.

				// Determine the Key
				var key = Array.isArray(keys) ? keys[index] : index;

				// If the keys variable is an array, then there is no
				// fallback. Otherwise, we can use the key on the
				// object to get the fallback value. Useful!

				// Determine the Fallback
				var fallback = Array.isArray(keys) ? null : keys[key];

				// Append the configuration value
				config[key] = __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__["a" /* default */].get(this._items, key, fallback);
			}

			// Return the result
			return config;
		}
	}, {
		key: 'set',


		/**
   * Sets the given configuration value.
   *
   * @param  {string|object}  key
   * @param  {mixed}          value
   *
   * @return {void}
   */
		value: function set(key) {
			var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			// Convert single key to object
			var keys = typeof key === 'string' ? _defineProperty({}, key, value) : key;

			// Iterate through the Keys
			for (var _key in keys) {

				// Determine the Value
				var _value = keys[_key];

				// Set the configuration value
				__WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__["a" /* default */].set(this._items, _key, _value);
			}
		}
	}, {
		key: 'push',


		/**
   * Push the specified value onto an array configuration value.
   *
   * @param  {string}  key
   * @param  {mixed}   value
   *
   * @return {void}
   */
		value: function push(key, value) {

			// Determine the array
			var array = this.get(key);

			// Push the Value
			array.push(value);

			// Set the configuration value to the updated array
			this.set(key, array);
		}
	}, {
		key: 'all',


		/**
   * Returns all of the configuration values.
   *
   * @return {object}
   */
		value: function all() {
			return this._items;
		}
	}]);

	return Repository;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (Repository);
ns.Repository = Repository;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Support_Manager_js__ = __webpack_require__(17);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ns = namespace('Game.Graphics');



var Graphics = function (_Manager) {
	_inherits(Graphics, _Manager);

	function Graphics() {
		_classCallCheck(this, Graphics);

		return _possibleConstructorReturn(this, (Graphics.__proto__ || Object.getPrototypeOf(Graphics)).apply(this, arguments));
	}

	_createClass(Graphics, [{
		key: 'getDefaultDriver',


		/**
   * Returns the Default Driver Name.
   *
   * @return {string}
   */
		value: function getDefaultDriver() {
			return this._game.make('config').get('graphics.default');
		}
	}, {
		key: '_getConfigurationRoot',


		/**
   * Returns the Configuration Root for this Manager.
   *
   * @param  {string}  name
   *
   * @return {string}
   */
		value: function _getConfigurationRoot(name) {
			return 'graphics.canvases';
		}
	}, {
		key: 'usesConfigurableAdapters',


		/**
   * Returns whether or not this Manager supports adapter creation
   * from configuration settings, where an underlying driver is
   * typically specified. The driver is created separately.
   *
   * @return {boolean}
   */
		value: function usesConfigurableAdapters() {
			return true;
		}
	}, {
		key: 'getConfigDriverKeyName',


		/**
   * Returns the name of the key that holds the name of the driver
   * for any configured adapter for this manager. Most call it
   * 'driver', but other implementations may be different.
   *
   * @return {string}
   */
		value: function getConfigDriverKeyName() {

			// Canvases are made distinct by their context. Everything
			// else is pretty much the same. Therefore, we're going
			// to use the context as the driver for the adapter.

			// Use 'context' as the Driver key name
			return 'context';
		}
	}, {
		key: 'create2dDriver',


		/**
   * Creates a new 2D Driver using the specified Configuration.
   *
   * @param  {object}  config
   *
   * @return {Game.Graphics.Canvas}
   */
		value: function create2dDriver(config) {

			// Determine the Canvas Parameters
			var selector = config['element'];
			var fps = config['fps'] || 60;

			// Create and return a new Canvas
			return this._createCanvas(selector, '2d', fps);
		}
	}, {
		key: '_createCanvas',


		/**
   * Creates and returns a new Canvas.
   *
   * @param  {string}   selector
   * @param  {string}   context
   * @param  {numeric}  fps
   *
   * @return {Game.Graphics.Canvas}
   *
   * @throws {Error}
   */
		value: function _createCanvas(selector, context, fps) {

			// Determine the Element from the Selector
			var element = this._getElementFromSelector(selector);

			// Make sure an Element was found
			if (element === null || element === undefined) {
				throw new Error('Canvas [' + selector + '] could not be found.');
			}

			// Create a return a new Canvas
			return new window.Game.Graphics.Canvas(element, '2d', fps);
		}
	}, {
		key: '_getElementFromSelector',


		/**
   * Returns the element described by the specified selector.
   *
   * @param  {string}  selector
   *
   * @return {HTMLElement|null}
   */
		value: function _getElementFromSelector(selector) {

			return document.querySelector(selector) || document.querySelectorAll(selector)[0] || document.getElementById(selector.split('#')[0] === '' && selector.split('#')[1]) || document.getElementsByClassName(selector.split('.')[0] === '' && selector.split('.')[1]);
		}
	}, {
		key: 'start',


		/**
   * Starts the Graphics.
   *
   * @return {this}
   */
		value: function start() {

			// Begin the Drawing Loops
			this.beginDrawingLoops();

			// Allow Chaining
			return this;
		}
	}, {
		key: 'beginDrawingLoops',


		/**
   * Begins the Drawing Loops for each Canvas.
   *
   * @return {this}
   */
		value: function beginDrawingLoops() {

			// Iterate through each Canvas
			for (var i in this._drivers) {

				// Make sure that the iterator is a property
				if (!this._drivers.hasOwnProperty(i)) {
					continue;
				}

				// Determine the current Canvas
				var canvas = this._drivers[i];

				// Begin the Drawing Loop
				canvas.beginDrawingLoop();
			}

			// Allow Chaining
			return this;
		}
	}, {
		key: 'getCanvas',


		/**
   * Alias of {@see this.driver()}.
   *
   * @param  {string|null}  canvas
   *
   * @return {Game.Graphics.Canvas}
   */
		value: function getCanvas() {
			var canvas = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			return this.driver(canvas);
		}
	}]);

	return Graphics;
}(__WEBPACK_IMPORTED_MODULE_0__Support_Manager_js__["a" /* default */]);

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (Graphics);
ns.Graphics = Graphics;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Objects');

var Manager = function () {

		/**
   * Creates a new Manager instance.
   *
   * @return {static}
   */
		function Manager() {
				_classCallCheck(this, Manager);

				/**
     * The Game Objects keyed by their ID.
     *
     * @var {object}
     */
				this._objectsById = {};

				/**
     * The Game Objects keyed by their Class, then their ID.
     *
     * @var {object}
     */
				this._objectsByClass = {};

				/**
     * The Game Object with the lowest ID per Class.
     *
     * @var {object}
     */
				this._objectByClass = {};
		}

		_createClass(Manager, [{
				key: 'createInstance',


				/**
     * Creates a new Object Instance.
     *
     * @param  {string}  name
     * @param  {float}   x
     * @param  {float}   y
     *
     * @return {Game.Objects.GameObject}
     */
				value: function createInstance(name, x, y) {

						// Create the Instance
						var instance = new Game.Objects[name]();

						// Assign the Coordinates
						instance.x = x;
						instance.y = y;

						// Check for no Object by Class
						if (typeof this._objectByClass[name] === 'undefined') {

								// This indicates that this type of object has never been
								// created before, or all previous objects were removed
								// from the scene. We can utilize this assumption.

								// Assign the Object by Class
								this._objectByClass[name] = instance;

								// Initialize the Objects by Class
								this._objectsByClass[name] = {};
						}

						// Remember the Instance
						this._objectsById[instance.id] = instance;
						this._objectsByClass[name][instance.id] = instance;

						// Return the Instance
						return instance;
				}
		}, {
				key: 'deleteInstance',


				/**
     * Deletes the specified Game Object.
     *
     * @param  {Game.Objects.GameObject}  object
     *
     * @return {void}
     */
				value: function deleteInstance(object) {

						// Determine the Object's Class Name
						var name = object.getClassName();

						// Dereference the Object
						delete this._objectsById[object.id];
						delete this._objectsByClass[name][object.id];

						// Check for an Object by Class Name
						if (typeof this._objectByClass[name] !== 'undefined') {

								// Check if the the Object was the Object for the Class
								if (this._objectByClass[name].id == object.id) {

										// Deference the Object
										delete this._objectByClass[name];
								}
						}
				}
		}, {
				key: 'drawGameObjects',


				/**
     * Draws the Game Objects.
     *
     * @param  {Game.Graphics.Canvas}  canvas
     *
     * @return {this}
     */
				value: function drawGameObjects(canvas) {

						// Iterate through the Game Objects
						this.each(function (object) {

								// Draw the Object
								object.draw(canvas, canvas.getContext());
						});

						// Allow Chaining
						return this;
				}
		}, {
				key: 'stepGameObjects',


				/**
     * Steps the Game Objects.
     *
     * @return {this}
     */
				value: function stepGameObjects() {

						// Fire the Step Events in Before / Step / After order
						this.fireBeforeStepEvents().fireStepEvents().fireAfterStepEvents();

						// Allow Chaining
						return this;
				}
		}, {
				key: 'fireBeforeStepEvents',


				/**
     * Fires the 'Before Step' Event for the Game Objects.
     *
     * @return {this}
     */
				value: function fireBeforeStepEvents() {

						// Iterate through the Game Objects
						this.each(function (object) {

								// Fire the Before Step Event
								object.fireBeforeStepEvent();
						});

						// Allow Chaining
						return this;
				}
		}, {
				key: 'fireStepEvents',


				/**
     * Fires the 'Step' Event for the Game Objects.
     *
     * @return {this}
     */
				value: function fireStepEvents() {

						// Iterate through the Game Objects
						this.each(function (object) {

								// Fire the Step Event
								object.fireStepEvent();
						});

						// Allow Chaining
						return this;
				}
		}, {
				key: 'fireAfterStepEvents',


				/**
     * Fires the 'After Step' Event for the Game Objects.
     *
     * @return {this}
     */
				value: function fireAfterStepEvents() {

						// Iterate through the Game Objects
						this.each(function (object) {

								// Fire the After Step Event
								object.fireAfterStepEvent();
						});

						// Allow Chaining
						return this;
				}
		}, {
				key: 'each',


				/**
     * Invokes a Callback on each Game Object.
     *
     * @param  {function}  callback
     *
     * @return {void}
     */
				value: function each(callback) {

						// Iterate through the Game Objects
						for (var id in this._objectsById) {

								// Make sure the Property exists
								if (!this._objectsById.hasOwnProperty(id)) {
										continue;
								}

								// Determine the current Game Object
								var object = this._objectsById[id];

								// Fire the Callback
								callback(object);
						}
				}
		}, {
				key: 'getObjectById',


				/**
     * Returns the Game Object with the specified ID.
     *
     * @param  {number}  id
     *
     * @return {Game.Objects.GameObject|null}
     */
				value: function getObjectById(id) {

						return this._objectsById[id] || null;
				}
		}, {
				key: 'getObjectByClass',


				/**
     * Returns the first Game Object with the specified Class Name.
     *
     * @param  {string}  name
     *
     * @return {Game.Objects.GameObject|null}
     */
				value: function getObjectByClass(name) {

						return this._objectByClass[name] || null;
				}
		}]);

		return Manager;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (Manager);
ns.Manager = Manager;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
module.exports = __webpack_require__(37);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(9);
__webpack_require__(24);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(10);
__webpack_require__(13);

__webpack_require__(14);
__webpack_require__(1);
__webpack_require__(16);
__webpack_require__(5);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(23);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Namespace_js__ = __webpack_require__(11);


var fs = __webpack_require__(12);

if (typeof window['abstract'] === 'undefined') {

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
		throw new Error('Must inherit abstract function ' + className + '::' + methodName + '() (previously declared abstract in ' + superName + ')');
	};
}

if (typeof window['fileExistsSync'] === 'undefined') {

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

		try {
			fs.accessSync(path);
			return true;
		} catch (ex) {
			return false;
		}
	};
}

if (typeof window['namespace'] === 'undefined') {

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
		return new __WEBPACK_IMPORTED_MODULE_0__Namespace_js__["a" /* default */](path);
	};
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Namespace = function () {

		/**
   * Creates a new Namespace instance.
   *
   * @param  {string}   path
   * @param  {boolean}  autoAssign
   *
   * @return {this}
   */
		function Namespace(path) {
				var autoAssign = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

				_classCallCheck(this, Namespace);

				/**
     * The namespace path.
     *
     * @var {string}
     */
				this._path = path;

				// Check for auto assign
				if (autoAssign) {

						// Assign the Namespace to the Window
						this.assignToWindow();
				}

				// Assign to static container
				if (typeof this.constructor._namespaces[path] === 'undefined') {
						this.constructor._namespaces[path] = this;
				}
		}

		/**
   * Assigns this Namespace to the Window object.
   *
   * @return {void}
   */


		_createClass(Namespace, [{
				key: 'assignToWindow',
				value: function assignToWindow() {

						this._set(window);
				}
		}, {
				key: '_set',


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
				value: function _set(object) {
						var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
						var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
						var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';


						// If no key is provided, then use the path
						if (key === null) {
								key = this._path;
						}

						// If no value is provided, then use the this
						if (value === null) {
								value = this;
						}

						// If a key is still not provided, then return failure
						if (key === null) {
								return false;
						}

						// Determine the Key Segments
						var segments = key.split('.');

						// If there's only one segment, then we've reached our base case
						// in the recursion (or we started off in a base case), so we
						// should directly set the keyed value and return the map.

						// Check for a single Segment
						if (segments.length === 1) {

								// Make sure nothing exists at the offset
								if (typeof object[segments[0]] !== 'undefined') {
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
						if (typeof object[segment] === 'undefined') {
								object[segment] = new Namespace(path, false);
						}

						// Recursively set the Value
						this._set(object[segment], segments.join('.'), this, path);

						// Return Success
						return true;
				}
		}]);

		return Namespace;
}();

/**
 * The defined Namespaces.
 *
 * @var {object}
 */


/* harmony default export */ __webpack_exports__["a"] = (Namespace);
Namespace._namespaces = {};

// Assign constructor to window
window.Namespace = Namespace;

/***/ }),
/* 12 */
/***/ (function(module, exports) {



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Container_Container_js__ = __webpack_require__(2);


if (typeof window.app === 'undefined') {

		/**
   * Returns the available container instance.
   *
   * @param  {string|null}  abstract
   * @param  {array}        parameters
   *
   * @return {mixed}
   */
		window.app = function () {
				var abstract = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


				// Check if no abstract type was provided
				if (abstract === null) {

						// Return the Container Instance
						return __WEBPACK_IMPORTED_MODULE_0_Engine_Container_Container_js__["a" /* default */].getInstance();
				}

				// Return an instance of the abstract type
				return __WEBPACK_IMPORTED_MODULE_0_Engine_Container_Container_js__["a" /* default */].getInstance().make(abstract, parameters);
		};
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(4);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Support');

var Map = function () {
		function Map() {
				_classCallCheck(this, Map);
		}

		_createClass(Map, null, [{
				key: 'accessible',


				/**
     * Returns whether or not the given value is array accessible.
     *
     * @param  {mixed}  value
     *
     * @return {boolean}
     */
				value: function accessible(value) {
						return Array.isArray(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
				}

				/**
     * Adds the specified element to the given map using "dot" notation if it doesn't exist.
     *
     * @param  {object}  map
     * @param  {string}  key
     * @param  {value}   value
     *
     * @return {object}
     */

		}, {
				key: 'add',
				value: function add(map, key, value) {

						// Check if the value does not exist
						if (this.get(map, key) === null) {
								this.set(map, key, value);
						}

						// Return th eMap
						return map;
				}
		}, {
				key: 'exists',


				/**
     * Returns whether or not the specified key exists in the given map.
     *
     * @param  {object}  map
     * @param  {string}  key
     *
     * @return {boolean}
     */
				value: function exists(map, key) {
						return typeof map[key] !== 'undefined';
				}
		}, {
				key: 'get',


				/**
     * Returns an item from the given map using "dot" notation.
     *
     * @param  {object}  map
     * @param  {string}  key
     * @param  {mixed}   fallback
     *
     * @return {mixed}
     */
				value: function get(map, key) {
						var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


						// Make sure the map is accessible
						if (!this.accessible(map)) {
								return fallback;
						}

						// Return the map if the key is null
						if (key === null) {
								return map;
						}

						// Check if the Key explicitly exists
						if (this.exists(map, key)) {

								// Return the explict value
								return map[key];
						}

						// Check if the key doesn't use "dot" notation
						if (key.indexOf('.') === -1) {

								// Check if the key is defined
								if (typeof map[key] !== 'undefined') {

										// Return the value
										return map[key];
								}

								// Return the fallback value
								return fallback;
						}

						// Determine the Key Segments
						var segments = key.split('.');

						// Iterate through the Segments
						for (var index in segments) {

								// Determine the Segment
								var segment = segments[index];

								// Check if the map is still accessible, and that the key exists
								if (this.accessible(map) && this.exists(map, segment)) {

										// Step down into the map
										map = map[segment];
								}

								// Failed to find the key
								else {
												return fallback;
										}
						}

						// If all of the key's segments were iterated through, then the
						// map itself should be the final result. Otherwise, we would
						// have returned the fallback value by now. And away we go!

						// Return the value
						return map;
				}
		}, {
				key: 'has',


				/**
     * Returns whether or not the specified item(s) exist in the given map using "dot" notation.
     *
     * @param  {object}        map
     * @param  {string|array}  keys
     *
     * @return {boolean}
     */
				value: function has(map, keys) {

						// Make sure that keys have been specified
						if (keys === null) {
								return false;
						}

						// Convert Keys into an Array
						if ((typeof keys === 'undefined' ? 'undefined' : _typeof(keys)) !== 'object') {
								keys = [keys];
						}

						// Make sure Keys is truthy
						if (!keys) {
								return false;
						}

						// Make sure at least one Key was provided
						if (keys.length === 0) {
								return false;
						}

						// Now that we've checked all of the edge conditions, we're going
						// to iterate through all of the keys, and try to find a value
						// that isn't keyed in the provided map, then return false.

						// Iterate through the Keys
						for (var i = 0; i < keys.length; i++) {

								// Determine the current Key
								var key = keys[i];

								// Skip this iteration if the key explictly exists
								if (this.exists(map, key)) {
										continue;
								}

								// Initialize the Sub Map
								var subKeyMap = map;

								// Determine the keys using "dot" notation
								var dotKeys = key.split('.');

								// Iterate through to keys in the "dot" notation
								for (var j = 0; j < dotKeys.length; j++) {

										// Determine the current Segment
										var segment = dotKeys[j];

										// If the Sub Key Array is accessible and exists, then keep going deeper
										if (this.accessible(subKeyMap) && this.exists(subKeyMap, segment)) {
												subKeyMap = subKeyMap[segment];
										}

										// Otherwise, stop here
										else {
														return false;
												}
								}
						}

						// We managed to find everything, return true
						return true;
				}
		}, {
				key: 'set',


				/**
     * Sets the specified map item to the given value using "dot" notation.
     * If no key is provided, the entire map will be replaced. Since we
     * can't pass by reference in JavaScript, we'll return a copy.
     *
     * @param  {object}  map
     * @param  {string}  key
     * @param  {mixed}   value
     *
     * @return {object}
     */
				value: function set(map, key, value) {

						// If no key is provided, then return the value
						if (key === null) {
								return value;
						}

						// Determine the Key Segments
						var segments = key.split('.');

						// If there's only one segment, then we've reached our base case
						// in the recursion (or we started off in a base case), so we
						// should directly set the keyed value and return the map.

						// Check for a single Segment
						if (segments.length === 1) {

								// Set the keyed value
								map[segments[0]] = value;

								// Return the Map
								return map;
						}

						// If there's multiple segments, then we have to do some tricky
						// recursion. JavaScript doesn't support pass by reference,
						// so we must recursively set each index within the map.

						// Splice off the first Segment
						var segment = segments.splice(0, 1)[0];

						// Initialize the Map Segment, if needed
						if (typeof map[segment] === 'undefined') {
								map[segment] = {};
						}

						// Recursively set the Value
						map[segment] = this.set(map[segment], segments.join('.'), value);

						// Return the Map
						return map;
				}
		}]);

		return Map;
}();

/* harmony default export */ __webpack_exports__["a"] = (Map);
;

// Assign Constructor to Namespace
ns.Map = Map;

/***/ }),
/* 16 */
/***/ (function(module, exports) {



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Support');

var Manager = function () {

	/**
  * Creates a new Manager instance.
  *
  * @param  {Game}  game
  *
  * @return {this}
  */
	function Manager(game) {
		_classCallCheck(this, Manager);

		/**
   * The game instance.
   *
   * @var {Game}
   */
		this._game = game;

		/**
   * The registered custom driver creators.
   *
   * @var {object}
   */
		this._customCreators = {};

		/**
   * The created "drivers".
   *
   * @var {object}
   */
		this._drivers = {};
	}

	_createClass(Manager, [{
		key: 'getDefaultDriver',


		/**
   * Returns the Default Driver Name.
   *
   * @return {string}
   */
		value: function getDefaultDriver() {
			return abstract(this);
		}
	}, {
		key: 'driver',


		/**
   * Returns the specified Driver.
   *
   * @param  {string|null}  driver
   *
   * @return {mixed}
   */
		value: function driver() {
			var driver = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;


			// Check for NULL Driver without Default Driver support
			if (driver == null && !this.usesDefaultDriver()) {
				throw new Error('Default driver is not supported.');
			}

			// Determine the Driver Name
			var driver = driver || this.getDefaultDriver();

			// If the given driver has not been created before, we will create the instances
			// here and cache it so we can return it next time very quickly. If there is
			// already a driver created by this name, we'll just return that instance.

			// Check if the Driver has not already been resolved
			if (typeof this._drivers[driver] === 'undefined') {

				// Resolve the Driver
				this._drivers[driver] = this._get(driver);
			}

			// Return the Driver
			return this._drivers[driver];
		}
	}, {
		key: '_get',


		/**
   * Creates the specified Driver instance.
   *
   * @param  {string}  name
   *
   * @return {mixed}
   */
		value: function _get(name) {

			// Some managers use a configuration setup, which use adapters with drivers. In
			// this case, we'll determine the configuration, and build a new driver from
			// it. The adapter here is dynamic, but the driver is still hard defined.

			// Check for Configurable Adapters
			if (this.usesConfigurableAdapters()) {

				// Create and return an Adapter
				return this._createAdapter(name);
			}

			// Use Driver Creation
			return this._createDriver(name);
		}
	}, {
		key: '_createAdapter',


		/**
   * Creates the specified Adapter instance.
   *
   * @param  {string}  name
   *
   * @return {mixed}
   */
		value: function _createAdapter(name) {

			// Determine the Adapter Configuration
			var config = this._getConfig(name);

			// Determine the Driver
			var driver = config[this.getConfigDriverKeyName()];

			// We'll check to see if a creator method exists for the given driver. If not we
			// will check for a custom driver creator, which allows developers to create
			// drivers using their own customized driver creator Closure to create it.

			// Check if a custom creator exists
			if (typeof this._customCreators[driver] !== 'undefined') {

				// Call the custom creator
				return this._callCustomCreator(config);
			}

			// Check if creation by method is enabled
			if (this.usesCreationByMethod()) {

				// Determine the name of the creation method
				var method = this._getCreationMethodName(driver);

				// Check if the method exists
				if (typeof this[method] === 'function') {
					return this[method](config);
				}

				throw new Error('Driver [' + driver + '] is not supported.');
			}

			// Throw an Error
			throw new Error('Adapter [' + name + '] constructor is not supported.');
		}

		/**
   * Creates the specified Driver instance.
   *
   * @param  {string}  driver
   *
   * @return {mixed}
   *
   * @throws {Error}
   */

	}, {
		key: '_createDriver',
		value: function _createDriver(driver) {

			// We'll check to see if a creator method exists for the given driver. If not we
			// will check for a custom driver creator, which allows developers to create
			// drivers using their own customized driver creator Closure to create it.

			// Check if a custom creator exists
			if (typeof this._customCreators[driver] !== 'undefined') {

				// Call the custom creator
				return this._callCustomCreator(driver);
			}

			// Check if creation by method is enabled
			if (this.usesCreationByMethod()) {

				// Determine the name of the creation method
				var method = this._getCreationMethodName(driver);

				// Check if the method exists
				if (typeof this[method] === 'function') {
					return this.method();
				}

				// Throw an Error
				throw new Error('Driver [' + driver + '] is not supported.');
			}

			// Throw an Error
			throw new Error('Driver [' + driver + '] constructor is not supported.');
		}
	}, {
		key: '_callCustomerCreator',


		/**
   * Calls the custom creator for the specified driver.
   *
   * @param  {string}  driver
   *
   * @return {mixed}
   */
		value: function _callCustomerCreator(driver) {

			// Call the custom creator, passing it the Game
			return this._customCreators[driver].apply(this, [this._game]);
		}
	}, {
		key: '_getCreationMethodName',


		/**
   * Returns the Creation Method Name for the specified Driver.
   *
   * @param  {string}  driver
   *
   * @return {string}
   */
		value: function _getCreationMethodName(driver) {

			// Convert '-' and '_' to spaces
			var driver = driver.replace(/[-_]/g, ' ');

			// Determine the words
			var words = driver.split(' ');

			// Capitalize the first letter of each word
			words = words.map(function (word) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			});

			// Concatenate the Words together
			var method = words.join();

			// Wrap the Method Name
			method = 'create' + method + 'Driver';

			// Return the Method Name
			return method;
		}
	}, {
		key: 'usesCreationByMethod',


		/**
   * Returns whether or not this Manager supports driver creation
   * from methods defined by an inheriting child instance. The
   * name of the driver will be converted to a method name.
   *
   * @return {boolean}
   */
		value: function usesCreationByMethod() {

			// Supported by Default
			return true;
		}
	}, {
		key: 'usesConfigurableAdapters',


		/**
   * Returns whether or not this Manager supports adapter creation
   * from configuration settings, where an underlying driver is
   * typically specified. The driver is created separately.
   *
   * @return {boolean}
   */
		value: function usesConfigurableAdapters() {

			// Not supported by Default
			return false;
		}
	}, {
		key: 'usesDefaultDriver',


		/**
   * Returns whether or not this Manager supports a default driver
   * implementation. This allows an "inferred" driver, and some
   * proxies may take advantage of this to bubble down code.
   *
   * @return {boolean}
   */
		value: function usesDefaultDriver() {

			// Supported by Default
			return true;
		}
	}, {
		key: 'getConfigDriverKeyName',


		/**
   * Returns the name of the key that holds the name of the driver
   * for any configured adapter for this manager. Most call it
   * 'driver', but other implementations may be different.
   *
   * @return {string}
   */
		value: function getConfigDriverKeyName() {

			// Use 'driver' by Default
			return 'driver';
		}
	}, {
		key: 'extend',


		/**
   * Registers the specified custom creator.
   *
   * @param  {string}    driver
   * @param  {function}  callback
   *
   * @return {this}
   */
		value: function extend(driver, callback) {

			// Register the custom creator
			this._customCreators[driver] = callback;

			// Allow Chaining
			return this;
		}
	}, {
		key: 'getDrivers',


		/**
   * Returns the created "drivers".
   *
   * @return {object}
   */
		value: function getDrivers() {
			return this._drivers;
		}
	}, {
		key: '_getConfig',


		/**
   * Returns the Configuration for the specified Adapter.
   *
   * @param  {string}  name
   *
   * @return {object}
   */
		value: function _getConfig(name) {
			return this._game.make('config').get(this._getConfigurationRoot() + '.' + name);
		}
	}, {
		key: '_getConfigurationRoot',


		/**
   * Returns the Configuration Root for this Manager.
   *
   * @param  {string}  name
   *
   * @return {string}
   */
		value: function _getConfigurationRoot(name) {
			return abstract(this);
		}
	}]);

	return Manager;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["a"] = (Manager);
ns.Manager = Manager;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Graphics');

var CanvasContext = function () {

	/**
  * Creates a new Canvas Context instance.
  *
  * @param  {CanvasRenderingContext2D}  context
  *
  * @return this
  */
	function CanvasContext(context) {
		_classCallCheck(this, CanvasContext);

		/**
   * The underlying Context.
   *
   * @var {CanvasRenderingContext2D}
   */
		this._context = context;
	}

	_createClass(CanvasContext, [{
		key: 'getContext',


		/**
   * Returns the base Context of this Context.
   *
   * @return {CanvasRenderingContext2D}
   */
		value: function getContext() {
			return this._context;
		}
	}, {
		key: 'draw',


		/**
   * Draws a new Path using the specified Callback.
   *
   * @param  {Closure}  callback
   *
   * @return {mixed}
   */
		value: function draw(callback) {

			// Begin the Path
			this._context.beginPath();

			// Call the Callback
			var result = callback(this._context);

			// Close the Path
			this._context.closePath();

			// Return the Result
			return result;
		}
	}, {
		key: 'drawCircle',


		/**
   * Draws the specified Circle.
   *
   * @param  {float}           x
   * @param  {float}           y
   * @param  {float}           radius
   * @param  {string|boolean}  fill
   * @param  {string|boolean}  outline
   * @param  {float}           lineWidth
   *
   * @return {void}
   */
		value: function drawCircle(x, y, radius) {
			var fill = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';
			var outline = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
			var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;


			// Draw the Circle
			return this.draw(function (context) {

				// Draw the Circle
				context.arc(x, y, radius, 0, Math.PI * 2);

				// Check for a Fill
				if (fill) {

					// Check for a Fill Style
					if (typeof fill === 'string') {
						context.fillStyle = fill;
					}

					// Fill the Circle
					context.fill();
				}

				// Check for an Outline
				if (outline) {

					// Check for an Outline Style
					if (typeof outline === 'string') {
						context.stokeStyle = outline;
					}

					// Set the Line Width
					context.lineWidth = lineWidth;

					// Outline the Circle
					context.stroke();
				}
			});
		}
	}, {
		key: 'drawRectangle',


		/**
   * Draws the specified Rectangle.
   *
   * @param  {float}           x
   * @param  {float}           y
   * @param  {float}           width
   * @param  {float}           height
   * @param  {string|boolean}  fill
   * @param  {string|boolean}  outline
   * @param  {float}           lineWidth
   *
   * @return {void}
   */
		value: function drawRectangle(x, y, width, height) {
			var fill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'black';
			var outline = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
			var lineWidth = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 1;


			// Draw the Rectangle
			return this.draw(function (context) {

				// Draw the Rectangle
				context.rect(x, y, width, height);

				// Check for a Fill
				if (fill) {

					// Check for a Fill Style
					if (typeof fill === 'string') {
						context.fillStyle = fill;
					}

					// Fill the Rectangle
					context.fill();
				}

				// Check for an Outline
				if (outline) {

					// Check for an Outline Style
					if (typeof outline === 'string') {
						context.stokeStyle = outline;
					}

					// Set the Line Width
					context.lineWidth = lineWidth;

					// Outline the Rectangle
					context.stroke();
				}
			});
		}
	}, {
		key: 'drawLine',


		/**
   * Draws the specified Rectangle.
   *
   * @param  {float}   x1
   * @param  {float}   y1
   * @param  {float}   x2
   * @param  {float}   y2
   * @param  {string}  color
   * @param  {float}   lineWidth
   *
   * @return {void}
   */
		value: function drawLine(x1, y1, x2, y2) {
			var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'black';
			var lineWidth = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;


			// Draw the Rectangle
			return this.draw(function (context) {

				// Move to the first Point
				context.moveTo(x1, y1);

				// Create a Line to the second Point
				context.lineTo(x2, y2);

				// Set the Line Color
				context.strokeStyle = color;

				// Set the Line Width
				context.lineWidth = lineWidth;

				// Draw the Line
				context.stroke();
			});
		}
	}, {
		key: 'drawText',


		/**
   * Draws the specified Text.
   *
   * @param  {float}           x
   * @param  {float}           y
   * @param  {string|boolean}  color
   * @param  {string|boolean}  font
   *
   * @return {void}
   */
		value: function drawText(text, x, y) {
			var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'black';
			var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '20px Arial Bold';


			// Draw the Text
			return this.draw(function (context) {

				// Check for a Color
				if (color) {

					// Check for a Fill Style
					if (typeof color === 'string') {
						context.fillStyle = color;
					}
				}

				// Check for a Font
				if (font) {

					// Check for an Outline Style
					if (typeof font === 'string') {
						context.font = font;
					}
				}

				// Draw the Text
				context.fillText(text, x, y);
			});
		}
	}]);

	return CanvasContext;
}();

/* harmony default export */ __webpack_exports__["default"] = (CanvasContext);
;

// Assign Constructor to Namespace
ns.CanvasContext = CanvasContext;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {

	/**
  * Creates a new Canvas.
  *
  * @param  {HTMLElement}  element
  * @param  {string}       contextType
  * @param  {integer}      fps
  *
  * @return {this}
  */
	function Canvas(element) {
		var contextType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '2d';
		var fps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

		_classCallCheck(this, Canvas);

		/**
   * The HTML Element that represents this Canvas.
   *
   * @var {HTMLElement}
   */
		this.element = element;

		/**
   * The Context Identifier for the Drawing Context.
   *
   * @var {string}
   */
		this.contextType = contextType;

		/**
   * The Rendering Context.
   *
   * @var {mixed}
   */
		this.context = new window.Game.Graphics.CanvasContext(this.element.getContext(this.contextType));

		/**
   * The Drawing Stack.
   *
   * @var array
   */
		this.drawStack = [];

		/**
   * The number of Drawing updates per Second.
   *
   * @var int
   */
		this.fps = fps;

		/**
   * The Draw Loop.
   *
   * @var {Game.Support.Loop}
   */
		this.drawLoop = new Game.Support.Loop({
			'before': this.beforeDrawingLoop.bind(this),
			'loop': this.invokeDrawStack.bind(this),
			'after': this.afterDrawingLoop.bind(this),
			'interval': 1 / this.fps
		});
	}

	_createClass(Canvas, [{
		key: 'getElement',


		/**
   * Returns the HTML Element that represents this Canvas.
   *
   * @return {HTMLElement}
   */
		value: function getElement() {
			return this.element;
		}
	}, {
		key: 'getContext',


		/**
   * Returns the Context of this Canvas.
   *
   * @return {CanvasContext}
   */
		value: function getContext() {
			return this.context;
		}
	}, {
		key: 'draw',


		/**
   * Adds the specified Callback to the Draw Stack.
   *
   * @param  {Closure}  callback
   * @param  {integer}  priority
   *
   * @return {this}
   */
		value: function draw(callback, priority) {

			// Determine the Priority
			var priority = priority || 0;

			// Make sure the Priority in the Draw Stack exists
			if (typeof this.drawStack[priority] === 'undefined') {
				this.drawStack[priority] = [];
			}

			// Add the Callback to the Draw Stack
			this.drawStack[priority].push(callback);

			// Allow Chaining
			return this;
		}
	}, {
		key: 'clear',


		/**
   * Clears this Canvas.
   *
   * @return {this}
   */
		value: function clear() {

			// Clear the Canvas
			this.context.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());

			// Allow Chaining
			return this;
		}
	}, {
		key: 'beginDrawingLoop',


		/**
   * Begins the Drawing Loop.
   *
   * @return {this}
   */
		value: function beginDrawingLoop() {

			// Start the Drawing Loop
			this.drawLoop.start();
		}
	}, {
		key: 'beforeDrawingLoop',


		/**
   * Performs various actions before the Drawing Loop.
   *
   * @return {this}
   */
		value: function beforeDrawingLoop() {

			// Clear the Canvas
			this.clear();
		}
	}, {
		key: 'invokeDrawStack',


		/**
   * Invokes the Drawing Stack.
   *
   * @return {this}
   */
		value: function invokeDrawStack() {

			// Iterate through the Priorities in the Draw Stack
			for (var i = 0; i < this.drawStack.length; i++) {

				// Determine the current Drawing Priority
				var priority = this.drawStack[i];

				// Iterate through the Drawing Callbacks in the Drawing Priority
				for (var j = 0; j < this.drawStack[i].length; j++) {

					// Determine the current Drawing Callback
					var callback = this.drawStack[i][j];

					// Call the Drawing Callback
					var result = callback(this.context, priority);

					// Check for a False Result
					if (result === false) {
						return this;
					}
				}
			}

			// Allow Chaining
			return this;
		}
	}, {
		key: 'afterDrawingLoop',


		/**
   * Performs various actions after the Drawing Loop.
   *
   * @return {this}
   */
		value: function afterDrawingLoop() {

			//

		}
	}, {
		key: 'endDrawingLoop',


		/**
   * Ends the Drawing Loop.
   *
   * @return {this}
   */
		value: function endDrawingLoop() {

			// Stop the Drawing Loop
			this.drawLoop.stop();
		}
	}, {
		key: 'getWidth',


		/**
   * Returns the Width of this Canvas.
   *
   * @return float
   */
		value: function getWidth() {
			return this.element.width;
		}
	}, {
		key: 'getHeight',


		/**
   * Returns the Height of this Canvas.
   *
   * @return float
   */
		value: function getHeight() {
			return this.element.height;
		}
	}, {
		key: 'getX',


		/**
   * Returns the X Position of the Canvas Element.
   *
   * @return {float}
   */
		value: function getX() {
			return this.element.getBoundingClientRect().x;
		}
	}, {
		key: 'getY',


		/**
   * Returns the Y Position of the Canvas Element.
   *
   * @return {float}
   */
		value: function getY() {
			return this.element.getBoundingClientRect().y;
		}
	}, {
		key: 'getMouseX',


		/**
   * Returns the Mouse X Position relative to the Canvas Element.
   *
   * @return {float}
   */
		value: function getMouseX() {
			return game().make('mouse').getX() - this.getX();
		}
	}, {
		key: 'getMouseY',


		/**
   * Returns the Mouse Y Position relative to the Canvas Element.
   *
   * @return {float}
   */
		value: function getMouseY() {
			return game().make('mouse').getY() - this.getY();
		}
	}, {
		key: 'getMousePosition',


		/**
   * Returns the Mouse Position relative to the Canvas Element.
   *
   * @return {object}
   */
		value: function getMousePosition() {

			return {
				'x': this.getMouseX(),
				'y': this.getMouseY()
			};
		}
	}]);

	return Canvas;
}();

// Assign Constructor to Window


window.Game.Graphics.Canvas = Canvas;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(21);
__webpack_require__(22);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Input');

var Keyboard = function () {

    /**
     * Creates a new Keyboard instance.
     *
     * @return {static}
     */
    function Keyboard() {
        _classCallCheck(this, Keyboard);

        /**
         * The previous Keyboard Event.
         *
         * @var {KeyboardEvent|null}
         */
        this.previousKeyboardEvent = null;

        /**
         * The Key States.
         *
         * @var {object}
         */
        this.keyStates = {};

        /**
         * Initialize the Key State Types
         */
        this.keyStates[Keyboard.KEYSTATE_PRESSED] = {};
        this.keyStates[Keyboard.KEYSTATE_HOLD] = {};
        this.keyStates[Keyboard.KEYSTATE_RELEASED] = {};

        /**
         * The Key Code States.
         *
         * @var {object}
         */
        this.keyCodeStates = {};

        /**
         * Initialize the Key State Types
         */
        this.keyCodeStates[Keyboard.KEYSTATE_PRESSED] = {};
        this.keyCodeStates[Keyboard.KEYSTATE_HOLD] = {};
        this.keyCodeStates[Keyboard.KEYSTATE_RELEASED] = {};

        // Register the Keyboard Listeners
        this.registerKeyboardListeners();
    }

    _createClass(Keyboard, [{
        key: 'registerKeyboardListeners',


        /**
         * Registers the Keyboard Event Listeners.
         *
         * @return {void}
         */
        value: function registerKeyboardListeners() {

            // Register the Key Down Listener
            this.registerKeyDownListener();

            // Register the Key Up Listener
            this.registerKeyUpListener();
        }
    }, {
        key: 'registerKeyDownListener',


        /**
         * Registers the Key Down Listener.
         *
         * @return {void}
         */
        value: function registerKeyDownListener() {

            // Listen to the Key Down Event using this.keyDownHandler()
            document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        }
    }, {
        key: 'registerKeyUpListener',


        /**
         * Registers the Key Up Listener.
         *
         * @return {void}
         */
        value: function registerKeyUpListener() {

            // Listen to the Key Up Event using this.keyUpHandler()
            document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        }
    }, {
        key: 'keyDownHandler',


        /**
         * Handles the Key Down Event.
         *
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function keyDownHandler(event) {

            // Check for a Key Hold Event
            if (event.repeat) {

                // Handle as a Key Hold Event
                return this.keyHoldHandler(event);
            }

            // Handle as a Key Pressed Event
            return this.keyPressedHandler(event);
        }
    }, {
        key: 'keyPressedHandler',


        /**
         * Handles the Key Pressed Event.
         *
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function keyPressedHandler(event) {

            // Update the Keyboard State
            this._updateKeyboardStates(Keyboard.KEYSTATE_PRESSED, event);

            // Fire the Key Pressed Event
            Keyboard.dispatcher.fire('Keyboard.Pressed', {
                'keyboard': this,
                'event': event
            });

            // Remember the Keyboard Event
            this.previousKeyboardEvent = event;
        }
    }, {
        key: 'keyHoldHandler',


        /**
         * Handles the Key Hold Event.
         *
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function keyHoldHandler(event) {

            // Update the Keyboard State
            this._updateKeyboardStates(Keyboard.KEYSTATE_HOLD, event);

            // Fire the Key Hold Event
            Keyboard.dispatcher.fire('Keyboard.Hold', {
                'keyboard': this,
                'event': event
            });

            // Remember the Keyboard Event
            this.previousKeyboardEvent = event;
        }
    }, {
        key: 'keyUpHandler',


        /**
         * Handles the Key Up Event.
         *
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function keyUpHandler(event) {

            // Handle as a Key Released Event
            return this.keyReleasedHandler(event);
        }
    }, {
        key: 'keyReleasedHandler',


        /**
         * Handles the Key Released Event.
         *
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function keyReleasedHandler(event) {

            // Update the Keyboard State
            this._updateKeyboardStates(Keyboard.KEYSTATE_RELEASED, event);

            // Fire the Key Released Event
            Keyboard.dispatcher.fire('Keyboard.Released', {
                'keyboard': this,
                'event': event
            });

            // Remember the Keyboard Event
            this.previousKeyboardEvent = event;
        }
    }, {
        key: '_updateKeyboardStates',


        /**
         * Updates the Key State and Key Code State using the specified Keyboard Event.
         *
         * @param  {string}         state
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function _updateKeyboardStates(state, event) {

            // Update the Key State
            this._updateKeyState(event.key, state, event);

            // Update the Key Code State
            this._updateKeyCodeState(event.code, state, event);
        }
    }, {
        key: '_updateKeyState',


        /**
         * Updates the specified Key State using the given Keyboard Event.
         *
         * @param  {string}         key
         * @param  {string}         state
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function _updateKeyState(key, state, event) {

            // Convert the Key to Upper Case
            var key = key.toUpperCase();

            // Update the Key State
            this.keyStates[state][key] = event;

            // Clear the other States for the Key
            switch (state) {

                // Key Pressed
                case Keyboard.KEYSTATE_PRESSED:

                    // Delete the Key Released and Key Hold States
                    delete this.keyStates[Keyboard.KEYSTATE_RELEASED][key];
                    delete this.keyStates[Keyboard.KEYSTATE_HOLD][key];

                    break;

                // Key Hold
                case Keyboard.KEYSTATE_HOLD:

                    // Delete the Key Released and Key Pressed States
                    delete this.keyStates[Keyboard.KEYSTATE_RELEASED][key];
                    delete this.keyStates[Keyboard.KEYSTATE_PRESSED][key];

                    break;

                // Key Released
                case Keyboard.KEYSTATE_RELEASED:

                    // Delete the Key Hold and Key Pressed States
                    delete this.keyStates[Keyboard.KEYSTATE_HOLD][key];
                    delete this.keyStates[Keyboard.KEYSTATE_PRESSED][key];

                    break;

            }
        }
    }, {
        key: '_updateKeyCodeState',


        /**
         * Updates the specified Key Code State using the given Keyboard Event.
         *
         * @param  {string}         code
         * @param  {string}         state
         * @param  {KeyboardEvent}  event
         *
         * @return {void}
         */
        value: function _updateKeyCodeState(code, state, event) {

            // Update the Key Code State
            this.keyCodeStates[state][code] = event;

            // Clear the other States for the Key Code
            switch (state) {

                // Key Pressed
                case Keyboard.KEYSTATE_PRESSED:

                    // Delete the Key Released and Key Hold States
                    delete this.keyCodeStates[Keyboard.KEYSTATE_RELEASED][code];
                    delete this.keyCodeStates[Keyboard.KEYSTATE_HOLD][code];

                    break;

                // Key Hold
                case Keyboard.KEYSTATE_HOLD:

                    // Delete the Key Released and Key Pressed States
                    delete this.keyCodeStates[Keyboard.KEYSTATE_RELEASED][code];
                    delete this.keyCodeStates[Keyboard.KEYSTATE_PRESSED][code];

                    break;

                // Key Released
                case Keyboard.KEYSTATE_RELEASED:

                    // Delete the Key Hold and Key Pressed States
                    delete this.keyCodeStates[Keyboard.KEYSTATE_HOLD][code];
                    delete this.keyCodeStates[Keyboard.KEYSTATE_PRESSED][code];

                    break;

            }
        }
    }, {
        key: 'isKeyPressed',


        /**
         * Returns whether or not the specified Key is pressed.
         *
         * @param  {string}  key
         *
         * @return {boolean}
         */
        value: function isKeyPressed(key) {

            // Convert the Key to Upper Case
            key = key.toUpperCase();

            // Return whether or not the Key is pressed
            return typeof this.keyStates[Keyboard.KEYSTATE_PRESSED][key] !== 'undefined';
        }

        /**
         * Returns whether or not the specified Key Code is pressed.
         *
         * @param  {string}  code
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyCodePressed',
        value: function isKeyCodePressed(code) {

            // Return whether or not the Key Code is pressed
            return typeof this.keyCodeStates[Keyboard.KEYSTATE_PRESSED][code] !== 'undefined';
        }

        /**
         * Returns whether or not the specified Key is being held.
         *
         * @param  {string}  key
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyHeld',
        value: function isKeyHeld(key) {

            // Convert the Key to Upper Case
            key = key.toUpperCase();

            // Return whether or not the Key is being held
            return typeof this.keyStates[Keyboard.KEYSTATE_HOLD][key] !== 'undefined';
        }

        /**
         * Returns whether or not the specified Key Code is being held.
         *
         * @param  {string}  code
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyCodeHeld',
        value: function isKeyCodeHeld(code) {

            // Return whether or not the Key Code is being held
            return typeof this.keyCodeStates[Keyboard.KEYSTATE_HOLD][code] !== 'undefined';
        }

        /**
         * Returns whether or not the specified Key is down.
         *
         * @param  {string}  key
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyDown',
        value: function isKeyDown(key) {

            // Return whether or not the Key is Pressed or Held
            return this.isKeyPressed(key) || this.isKeyHeld(key);
        }

        /**
         * Returns whether or not the specified Key Code is down.
         *
         * @param  {string}  code
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyCodeDown',
        value: function isKeyCodeDown(code) {

            // Return whether or not the Key Code is Pressed or Held
            return this.isKeyCodePressed(key) || this.isKeyCodeHeld(key);
        }

        /**
         * Returns whether or not the specified Key is up.
         *
         * @param  {string}  key
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyReleased',
        value: function isKeyReleased(key) {

            // Convert the Key to Upper Case
            key = key.toUpperCase();

            // Return whether or not the Key is up
            return typeof this.keyStates[Keyboard.KEYSTATE_RELEASED][key] !== 'undefined';
        }

        /**
         * Returns whether or not the specified Key Code is up.
         *
         * @param  {string}  code
         *
         * @return {boolean}
         */

    }, {
        key: 'isKeyCodeReleased',
        value: function isKeyCodeReleased(code) {

            // Return whether or not the Key Code is up
            return typeof this.keyCodeStates[Keyboard.KEYSTATE_RELEASED][code] !== 'undefined';
        }

        /**
         * Returns the Event Dispatcher.
         *
         * @return {Game.Events.Dispatcher}
         */

    }], [{
        key: 'getDispatcher',
        value: function getDispatcher() {

            return Keyboard.dispatcher;
        }

        /**
         * Sets the Event Dispatcher.
         *
         * @param  {Game.Events.Dispatcher}  dispatcher
         *
         * @return {void}
         */

    }, {
        key: 'setDispatcher',
        value: function setDispatcher(dispatcher) {

            Keyboard.dispatcher = dispatcher;
        }
    }]);

    return Keyboard;
}();

;

/**
 * The Event Dispatcher.
 *
 * @var {Game.Events.Dispatcher}
 */
Keyboard.dispatcher = null;

/**
 * The Pressed Key State.
 *
 * @var {string}
 */
Keyboard.KEYSTATE_PRESSED = 'pressed';

/**
 * The Hold Key State.
 *
 * @var {string}
 */
Keyboard.KEYSTATE_HOLD = 'hold';

/**
 * The Released Key State.
 *
 * @var {string}
 */
Keyboard.KEYSTATE_RELEASED = 'released';

/**
 * The Key Constants.
 *
 * @var {string}
 */
Keyboard.KEY_ALT = 'Alt';
Keyboard.KEY_BACKSPACE = 'Backspace';
Keyboard.KEY_CONTROL = 'Control';
Keyboard.KEY_DELETE = 'Delete';
Keyboard.KEY_DOWN = 'ArrowDown';
Keyboard.KEY_END = 'End';
Keyboard.KEY_ESCAPE = 'Escape';
Keyboard.KEY_HOME = 'Home';
Keyboard.KEY_INSERT = 'Insert';
Keyboard.KEY_LEFT = 'ArrowLeft';
Keyboard.KEY_META = 'Meta';
Keyboard.KEY_NUMLOCK = 'NumLock';
Keyboard.KEY_PAGE_DOWN = 'PageDown';
Keyboard.KEY_PAGE_UP = 'PageUp';
Keyboard.KEY_RETURN = 'Enter';
Keyboard.KEY_RIGHT = 'ArrowRight';
Keyboard.KEY_SCROLL = 'ScrollLock';
Keyboard.KEY_SHIFT = 'Shift';
Keyboard.KEY_SPACE = ' ';
Keyboard.KEY_TAB = 'Tab';
Keyboard.KEY_UP = 'ArrowUp';

/**
 * The Key Constants aliases.
 *
 * @var {string}
 */
Keyboard.KEY_ENTER = Keyboard.KEY_RETURN;
Keyboard.KEY_NEXT = Keyboard.KEY_PAGE_DOWN;
Keyboard.KEY_PRIOR = Keyboard.KEY_PAGE_UP;
Keyboard.KEY_SCROLL_LOCK = Keyboard.KEY_SCROLL;

// Assign Constructor to Namespace
ns.Keyboard = Keyboard;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Input');

var Mouse = function () {

    /**
     * Creates a new Mouse instance.
     *
     * @return {static}
     */
    function Mouse() {
        _classCallCheck(this, Mouse);

        /**
         * The previous Mouse Event.
         *
         * @var {MouseEvent|null}
         */
        this.previousMouseMoveEvent = null;

        /**
         * The Mouse Position.
         *
         * @var {object}
         */
        this._position = {
            'x': 0,
            'y': 0
        };

        // Register the Mouse Listeners
        this.registerMouseListeners();
    }

    _createClass(Mouse, [{
        key: 'registerMouseListeners',


        /**
         * Registers the Mouse Event Listeners.
         *
         * @return {void}
         */
        value: function registerMouseListeners() {

            // Register the Mouse Move Listener
            this.registerMouseMoveListener();
        }
    }, {
        key: 'registerMouseMoveListener',


        /**
         * Registers the Mouse Move Listener.
         *
         * @return {void}
         */
        value: function registerMouseMoveListener() {

            // Listen to the Key Down Event using this.mouseMoveHandler()
            document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);
        }
    }, {
        key: 'mouseMoveHandler',


        /**
         * Handles the Key Down Event.
         *
         * @param  {MouseEvent}  event
         *
         * @return {void}
         */
        value: function mouseMoveHandler(event) {

            // Determine the Mouse Position from the Event
            var position = this._getMousePositionFromEvent(event);

            // Update the Position
            this._position = position;
        }
    }, {
        key: '_getMousePositionFromEvent',


        /**
         * Returns the Mouse Position from the specified Mouse Event.
         *
         * @param  {MouseEvent}  event
         *
         * @return {object}
         */
        value: function _getMousePositionFromEvent(event) {

            return {
                'x': event.clientX,
                'y': event.clientY
            };
        }
    }, {
        key: 'getPosition',


        /**
         * Returns the Mouse Position.
         *
         * @return {object}
         */
        value: function getPosition() {
            return this._position;
        }
    }, {
        key: 'getX',


        /**
         * Returns the Mouse X Position.
         *
         * @return {float}
         */
        value: function getX() {
            return this._position['x'];
        }
    }, {
        key: 'getY',


        /**
         * Returns the Mouse Y Position.
         *
         * @return {float}
         */
        value: function getY() {
            return this._position['y'];
        }
    }]);

    return Mouse;
}();

;

// Assign Constructor to Namespace
ns.Mouse = Mouse;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(6);
__webpack_require__(0);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Game_js__ = __webpack_require__(32);
/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

var app = __webpack_require__(25).default;

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

var kernel = __webpack_require__(29).default;

kernel = app.make('Engine.Contracts.Game.Kernel', [app]);

var response = kernel.bootstrap();

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */



__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Application_js__ = __webpack_require__(26);


/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

var app = new __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Application_js__["a" /* default */]('App');

/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

app.singleton('Engine.Contracts.Game.Kernel', 'App.Game.Kernel');

app.singleton('Engine.Contracts.Console.Kernel', 'App.Console.Kernel');

app.singleton('Engine.Contracts.Debug.ExceptionHandler', 'App.Exceptions.Handler');

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Engine_Container_Container_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Engine_Events_EventServiceProvider_js__ = __webpack_require__(27);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Application = function (_Container) {
	_inherits(Application, _Container);

	/**
  * Creates a new Application instance.
  *
  * @param  {string|null}  basePath
  *
  * @return {this}
  */
	function Application() {
		var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		_classCallCheck(this, Application);

		/**
   * The base path for the framework installation.
   *
   * @var {string}
   */
		var _this = _possibleConstructorReturn(this, (Application.__proto__ || Object.getPrototypeOf(Application)).call(this));

		// Call parent constructor


		_this._basePath = basePath;

		/**
   * Indicates if the application has been bootstrapped before.
   *
   * @var {boolean}
   */
		_this._hasBeenBootstrapped = false;

		/**
   * Indicates if the application has "booted".
   *
   * @var {bool}
   */
		_this._booted = false;

		/**
   * The array of booting callbacks.
   *
   * @var {array}
   */
		_this._bootingCallbacks = [];

		/**
   * The array of booted callbacks.
   *
   * @var {array}
   */
		_this._bootedCallbacks = [];

		/**
   * The array of terminating callbacks.
   *
   * @var {array}
   */
		_this._terminatingCallbacks = [];

		/**
   * All of the registered service providers.
   *
   * @var {array}
   */
		_this._serviceProviders = [];

		/**
   * The names of the loaded service providers.
   *
   * @var {object}
   */
		_this._loadedProviders = {};

		/**
   * The deferred services and their providers.
   *
   * @var {array}
   */
		_this._deferredServices = [];

		/**
   * A custom callback used to configure Monolog.
   *
   * @var {callable|null}
   */
		_this._monologConfigurator = null;

		/**
   * The custom database path defined by the developer.
   *
   * @var {string|null}
   */
		_this._databasePath = null;

		/**
   * The custom storage path defined by the developer.
   *
   * @var {string|null}
   */
		_this._storagePath = null;

		/**
   * The custom environment path defined by the developer.
   *
   * @var {string|null}
   */
		_this._environmentPath = null;

		/**
   * The environment file to load during bootstrapping.
   *
   * @var {string}
   */
		_this._environmentFile = '.env';

		/**
   * The application namespace.
   *
   * @var {string|null}
   */
		_this._namespace = null;

		// Check if a Base Path was provided
		if (basePath !== null) {

			// Set the Base Path
			_this.setBasePath(basePath);
		}

		// Register the Base Bindings
		_this._registerBaseBindings();

		// Register the Base Service Providers
		_this._registerBaseServiceProviders();

		// Register the Core Container Aliases
		// this._registerCoreContainerAliases();

		return _this;
	}

	_createClass(Application, [{
		key: '_registerBaseBindings',


		/**
   * Registers the basic bindings into the container.
   *
   * @return {void}
   */
		value: function _registerBaseBindings() {

			// Set the Container instance to this Application
			this.constructor.setInstance(this);

			// Bind the 'app' keyword to this Application
			this.instance('app', this);

			// Bind the Container Class to this Application
			this.instance('Framework.Container', this);

			/**
    * @todo Register Package Manifest
    */
		}
	}, {
		key: '_registerBaseServiceProviders',


		/**
   * Registers all of the base service providers.
   *
   * @return {void}
   */
		value: function _registerBaseServiceProviders() {

			// Register the Event Service Provider
			this.register(new __WEBPACK_IMPORTED_MODULE_2_Engine_Events_EventServiceProvider_js__["a" /* default */](this));

			// // Register the Log Service Provider
			// this.register(new LogServiceProvider(this));

			// // Register the Routing Service Provider
			// this.register(new RoutingServiceProvider(this));
		}
	}, {
		key: 'bootstrapWith',


		/**
   * Boots the application using the given bootstrappers.
   *
   * @param  {array}  bootstrappers
   *
   * @return {void}
   */
		value: function bootstrapWith(bootstrappers) {

			// Mark the application has booted
			this._hasBeenBootstrapped = true;

			// Run each bootstrapper
			for (var i = 0; i < bootstrappers.length; i++) {

				// Determine the current bootstrapper
				var bootstrapper = bootstrappers[i];

				// Fire the bootstrapping event
				this.get('events').fire('bootstrapping: ' + bootstrapper, [this]);

				// Run the bootstrapper
				this.make(bootstrapper).bootstrap(this);

				// Fire the bootstrapped event
				this.get('events').fire('bootstrapped: ' + bootstrapper, [this]);
			}
		}
	}, {
		key: 'beforeBootstrapping',


		/**
   * Registers a callback to run before a bootstrapper.
   *
   * @param  {string}    bootstrapper
   * @param  {function}  callback
   *
   * @return {void}
   */
		value: function beforeBootstrapping(bootstrapper, callback) {
			this.get('events').listen('bootstrapping: ' + bootstrapper, callback);
		}
	}, {
		key: 'afterBootstrapping',


		/**
   * Registers a callback to run after a bootstrapper.
   *
   * @param  {string}    bootstrapper
   * @param  {function}  callback
   *
   * @return {void}
   */
		value: function afterBootstrapping(bootstrapper, callback) {
			this.get('events').listen('bootstrapped: ' + bootstrapper, callback);
		}
	}, {
		key: 'hasBeenBootstrapped',


		/**
   * Returns whether or not the application has been bootstrapped.
   *
   * @return {boolean}
   */
		value: function hasBeenBootstrapped() {
			return this._hasBeenBootstrapped;
		}
	}, {
		key: 'setBasePath',


		/**
   * Sets the base path for the application.
   *
   * @param  {string}  basePath
   *
   * @return {this}
   */
		value: function setBasePath(basePath) {

			// Set the base path
			this._basePath = basePath.replace(/[\\\/]+$/, '');

			// Bind the paths in the container
			this._bindPathsInContainer();

			// Allow chaining
			return this;
		}
	}, {
		key: '_bindPathsInContainer',


		/**
   * Binds all of the application paths in the container.
   *
   * @return {void}
   */
		value: function _bindPathsInContainer() {

			this.instance('path', this.path());
			this.instance('path.base', this.basePath());
			// this.instance('path.lang', this.langPath());
			this.instance('path.config', this.configPath());
			// this.instance('path.public', this.publicPath());
			// this.instance('path.storage', this.storagePath());
			// this.instance('path.database', this.databasePath());
			// this.instance('path.resources', this.resourcesPath());
			this.instance('path.bootstrap', this.bootstrapPath());
		}
	}, {
		key: 'path',


		/**
   * Returns the path to the application "app" directory.
   *
   * @param  {string}  path
   *
   * @return {string}
   */
		value: function path() {
			var _path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this._basePath + '/app' + (_path ? '/' + _path : '');
		}
	}, {
		key: 'basePath',


		/**
   * Returns the base path to the framework installation.
   *
   * @param  {string}  path
   *
   * @return {string}
   */
		value: function basePath() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this._basePath + (path ? '/' + path : '');
		}
	}, {
		key: 'bootstrapPath',


		/**
   * Returns the path to the bootstrap directory.
   *
   * @param  {string}  path
   *
   * @return {string}
   */
		value: function bootstrapPath() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this._basePath + '/bootstrap' + (path ? '/' + path : '');
		}
	}, {
		key: 'configPath',


		/**
   * Returns the path to the application configuration files.
   *
   * @param  {string}  path
   *
   * @return {string}
   */
		value: function configPath() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this._basePath + '/config' + (path ? '/' + path : '');
		}
	}, {
		key: 'register',


		/**
   * Registers the given service provider with the application.
   *
   * @param  {Framework.Support.ServiceProvider|string}  provider
   * @param  {object}                                    options
   * @param  {boolean}                                   force
   *
   * @return {Framework.Support.ServiceProvider}
   */
		value: function register(provider) {
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


			// Declare the registered provider
			var registered;

			// Check if the service provider is already registered, and we're not forcing
			if ((registered = this.getProvider(provider)) && !force) {
				return registered;
			}

			// If the given "provider" is a string, we will resolve it, passing in the
			// application instance automatically for the developer. This is simply
			// a more convenient way of specifying your service provider classes.

			// Check if the given "provider" is a string
			if (typeof provider === 'string') {

				// Resolve the provider
				provider = this.resolveProvider(provider);
			}

			// Check if the provider uses a register method
			if (typeof provider.register === 'function') {

				// Register the provider
				provider.register();
			}

			// Mark the provider as registered
			this._markAsRegistered(provider);

			// If the application has already booted, we will call this boot method on
			// the provider class so it has an opportunity to do its boot logic and
			// will be ready for any usage by this developer's application logic.

			// Check if the application has already booted
			if (this._booted) {
				this._bootProvider(provider);
			}

			// Return the Provider
			return provider;
		}
	}, {
		key: 'getProvider',


		/**
   * Returns the registered service provider instance if it exists.
   *
   * @param  {Framework.Support.ServiceProvider|class}  provider
   *
   * @return {Framework.Support.ServiceProvider|null}
   */
		value: function getProvider(provider) {

			// Determine the Providers that are an instance of the given provider
			var providers = this.getProviders(provider);

			// Check if no providers were found
			if (providers.length === 0) {
				return null;
			}

			// Return the first provider
			return providers[0];
		}
	}, {
		key: 'getProviders',


		/**
   * Returns the registered service provider instances if any exist.
   *
   * @param  {Framework.Support.ServiceProvider|class}  provider
   *
   * @return {array}
   */
		value: function getProviders(provider) {

			// Determine the provider class definition
			var definition = __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__["a" /* default */].getClass(provider);

			// Return the providers that are an instance of the provider class
			return this._serviceProviders.filter(function (value) {
				return value instanceof definition;
			});
		}
	}, {
		key: 'resolveProvider',


		/**
   * Resolves the given service provider instance.
   *
   * @param  {class}  provider
   *
   * @return {Framework.Support.ServiceProvider}
   */
		value: function resolveProvider(provider) {
			return new provider(this);
		}
	}, {
		key: '_markAsRegistered',


		/**
   * Marks the given service provider as registered.
   *
   * @param  {Framework.Support.ServiceProvider}  provider
   *
   * @return {void}
   */
		value: function _markAsRegistered(provider) {

			// Append the service provider to the list of providers
			this._serviceProviders.push(provider);

			// Mark the service provider as loaded
			this._loadedProviders[__WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__["a" /* default */].getClassName(provider)] = true;
		}
	}, {
		key: 'loadDeferredProviders',


		/**
   * Load and boot all of the remaining deferred providers.
   *
   * @return {void}
   */
		value: function loadDeferredProviders() {

			// We will simply spin through each of the deferred providers and register each
			// one and boot them if the application has booted. This should make each of
			// the remaining services available to this application for immediate use.

			// Iterate through the deferred service providers
			for (var service in this._deferredServices) {

				// Make sure the property exists
				if (!this._deferredServices.hasOwnProperty(service)) {
					continue;
				}

				// Load the deferred service provider
				this.loadDeferredProvider(service);
			}

			// Clear the deferred services
			this._deferredServices = {};
		}
	}, {
		key: 'registerDeferredProvider',


		/**
   * Registers the specified deferred provider and service.
   *
   * @param  {string|class}  provider
   * @param  {string|null}   service
   *
   * @retrun {void}
   */
		value: function registerDeferredProvider(provider) {
			var service = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


			// Once the provider that provides the deferred service has been registered we
			// will remove it from our local list of the deferred services with related
			// providers so that this container does not try to resolve it out again.

			// Check if a service was provided
			if (service) {
				this._deferredServices[service] = undefined;
			}

			// Create the service provider
			var instance = new provider(this);

			// Register the service provider
			this.register(instance);

			// Check if the application hasn't booted yet
			if (!this._booted) {

				// Boot the provider with the other providers
				this.booting(function () {
					this.bootProvider(instance);
				});
			}
		}
	}, {
		key: 'make',


		/**
   * Resolves the specified abstract type from the container.
   *
   * @param  {string}  abstract
   * @param  {array}   parameters
   *
   * @return {mixed}
   */
		value: function make(abstract) {
			var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


			// Resolve any aliases
			abstract = this.getAlias(abstract);

			// Check if the abstract type is bound as a deferred service provider
			if (typeof this._deferredServices[abstract] !== 'undefined' && typeof this._instances[abstract] === 'undefined') {

				// Load the deferred service provider
				this.loadDeferredProvider(abstract);
			}

			// Call the parent method
			return _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'make', this).call(this, abstract, parameters);
		}
	}, {
		key: 'bound',


		/**
   * Returns whether or not the specified abstract type has been bound to the container.
   *
   * @param  {string}  abstract
   *
   * @return {boolean}
   */
		value: function bound(abstract) {

			// Check if the abstract type is bound as a deferred service provider
			if (typeof this._deferredServices[abstract] !== 'undefined') {
				return true;
			}

			// Call the parent method
			return _get(Application.prototype.__proto__ || Object.getPrototypeOf(Application.prototype), 'bound', this).call(this, abstract);
		}
	}, {
		key: 'isBooted',


		/**
   * Returns whether or not the application has been booted.
   *
   * @return {boolean}
   */
		value: function isBooted() {
			return this._booted;
		}
	}, {
		key: 'getCachedConfigPath',


		/**
   * Returns the path to the configuration cache file.
   *
   * @return {string}
   */
		value: function getCachedConfigPath() {
			return this.bootstrapPath() + '/cache/config.js';
		}
	}]);

	return Application;
}(__WEBPACK_IMPORTED_MODULE_1_Engine_Container_Container_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Application);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Events_Dispatcher_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Engine_Support_ServiceProvider_js__ = __webpack_require__(28);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ns = namespace('Game.Events');




var EventServiceProvider = function (_ServiceProvider) {
	_inherits(EventServiceProvider, _ServiceProvider);

	function EventServiceProvider() {
		_classCallCheck(this, EventServiceProvider);

		return _possibleConstructorReturn(this, (EventServiceProvider.__proto__ || Object.getPrototypeOf(EventServiceProvider)).apply(this, arguments));
	}

	_createClass(EventServiceProvider, [{
		key: 'register',


		/**
   * Registers the service provider.
   *
   * @return {void}
   */
		value: function register() {

			this._app.singleton('events', function (app) {
				return new __WEBPACK_IMPORTED_MODULE_0_Engine_Events_Dispatcher_js__["default"]();
			});
		}
	}]);

	return EventServiceProvider;
}(__WEBPACK_IMPORTED_MODULE_1_Engine_Support_ServiceProvider_js__["a" /* default */]);

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["a"] = (EventServiceProvider);
ns.EventServiceProvider = EventServiceProvider;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Support');

var ServiceProvider = function () {

  /**
   * Creates a new Service Provider instance.
   *
   * @param  {Framework.Application}  app
   *
   * @return {this}
   */
  function ServiceProvider(app) {
    _classCallCheck(this, ServiceProvider);

    /**
     * The application instance.
     *
     * @var {Framework.Application}
     */
    this._app = app;

    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var {boolean}
     */
    this._defer = false;
  }

  _createClass(ServiceProvider, [{
    key: 'provides',


    /**
     * Returns the services provided by this provider.
     *
     * @return {array}
     */
    value: function provides() {
      return [];
    }
  }, {
    key: 'when',


    /**
     * Returns the events that trigger this service provider to register.
     *
     * @return {array}
     */
    value: function when() {
      return [];
    }

    /**
     * Returns whether or not this provider is deferred.
     *
     * @return {boolean}
     */

  }, {
    key: 'isDeferred',
    value: function isDeferred() {
      return this._defer;
    }
  }]);

  return ServiceProvider;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["a"] = (ServiceProvider);
ns.ServiceProvider = ServiceProvider;

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Bootstrap_LoadConfiguration_js__ = __webpack_require__(30);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('App.Game');



var Kernel = function () {

	/**
  * Creates a new Kernel instance.
  *
  * @param  {Game.Contracts.Foundation.Application}  app
  *
  * @return {this}
  */
	function Kernel(app) {
		_classCallCheck(this, Kernel);

		/**
   * The application instance.
   *
   * @var {Game.Contracts.Foundation.Application}
   */
		this._app = app;

		/**
   * The bootstrappers for the application.
   *
   * @var {array}
   */
		this._bootstrappers = [
		// 'Game.Foundation.Bootstrap.LoadEnvironmentVariables',
		'Game.Foundation.Bootstrap.LoadConfiguration'];
	}

	_createClass(Kernel, [{
		key: 'bootstrap',


		/**
   * Bootstraps the application.
   *
   * @return {void}
   */
		value: function bootstrap() {

			// Make sure the application hasn't already been bootstrapped
			if (this._app.hasBeenBootstrapped()) {
				return;
			}

			// Bootstrap the application
			this._app.bootstrapWith(this.getBootstrappers());
		}
	}, {
		key: 'getBootstrappers',


		/**
   * Returns the bootstrap classes for the application.
   *
   * @return {array}
   */
		value: function getBootstrappers() {
			return this._bootstrappers;
		}
	}, {
		key: 'getApplication',


		/**
   * Returns the application instance.
   *
   * @return {Game.Contracts.Foundation.Application}
   */
		value: function getApplication() {
			return this._app;
		}
	}]);

	return Kernel;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (Kernel);
ns.Kernel = Kernel;

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Config_Repository_js__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Foundation.Bootstrap');



var LoadConfiguration = function () {
        function LoadConfiguration() {
                _classCallCheck(this, LoadConfiguration);
        }

        _createClass(LoadConfiguration, [{
                key: 'bootstrap',


                /**
                 * Bootstraps the given application.
                 *
                 * @param  {Game.Contracts.Foundation.Application}  app
                 *
                 * @return {void}
                 */
                value: function bootstrap(app) {

                        // Initialize the Items
                        var items = {};

                        // Initialize the cache flag
                        var loadedFromCache = false;

                        // First we will see if we have a cache configuration file. If we do, we'll load
                        // the configuration items from that file so that it is very quick. Otherwise
                        // we will need to spin through every configuration file and load them all.

                        // Determine the cached configuration file path
                        var cached = app.getCachedConfigPath();

                        // Check for a cache configuration file
                        if (fileExistsSync(cached)) {

                                // Require the cached configuration file
                                items = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());

                                // Flag that we've loaded the configuration from a cache file
                                loadedFromCache = true;
                        }

                        // Create a new repository
                        var config = new __WEBPACK_IMPORTED_MODULE_0_Engine_Config_Repository_js__["default"](items);

                        // Bind the respository to the application
                        app.instance('config', config);

                        // Next we will spin through all of the configuration files in the configuration
                        // directory and load each one into the repository. This will make all of the
                        // options available to the developer for use in various parts of this app.
                }
        }]);

        return LoadConfiguration;
}();

// Assign Constructor to Namespace


/* unused harmony default export */ var _unused_webpack_default_export = (LoadConfiguration);
ns.LoadConfiguration = LoadConfiguration;

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 31;

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Loop_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Engine_Objects_Manager_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Engine_Graphics_Graphics_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Engine_Events_Dispatcher_js__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Foundation');






var Game = function () {

	/**
  * Creates a new Game instance.
  *
  * @return {this}
  */
	function Game() {
		_classCallCheck(this, Game);

		/**
   * The Game's Graphics.
   *
   * @var {Game.Graphics}
   */
		this.graphics = new __WEBPACK_IMPORTED_MODULE_2_Engine_Graphics_Graphics_js__["default"](this);

		/**
   * The Game's Object Manager.
   *
   * @var {Game.Objects}
   */
		this.objects = new __WEBPACK_IMPORTED_MODULE_1_Engine_Objects_Manager_js__["default"]();

		/**
   * The Event Dispatcher.
   *
   * @var {Game.Events.Dispatcher}
   */
		this.events = new __WEBPACK_IMPORTED_MODULE_3_Engine_Events_Dispatcher_js__["default"]();

		/**
   * The global game variables.
   *
   * @var {object}
   */
		this._variables = {};

		/**
   * The Step Loop.
   *
   * @var {Game.Support.Loop}
   */
		this.stepLoop = new __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Loop_js__["a" /* default */]({
			'loop': this.doStepLoop.bind(this),
			'interval': 1 / 60
		});
	}

	_createClass(Game, [{
		key: 'start',


		/**
   * Starts the Game.
   *
   * @return {this}
   */
		value: function start() {

			// Start the Graphics
			this.graphics.start();

			this.stepLoop.start();

			// Allow Chaining
			return this;
		}
	}, {
		key: 'doStepLoop',
		value: function doStepLoop() {
			this.objects.stepGameObjects();
		}
	}, {
		key: 'drawGameObjects',


		/**
   * Draws the Game Objects.
   *
   * @param  {Game.Graphics.Canvas}  canvas
   *
   * @return {this}
   */
		value: function drawGameObjects(canvas) {

			// Draw the Game Objects
			this.objects.drawGameObjects(canvas);

			// Allow Chaining
			return this;
		}
	}, {
		key: 'getVariable',


		/**
   * Returns the specified Game Variable.
   *
   * @param  {string}  key
   *
   * @return {mixed}
   */
		value: function getVariable(key) {
			return this._variables[key];
		}
	}, {
		key: 'setVariable',


		/**
   * Sets the specified Game Variable.
   *
   * @param  {string}  key
   * @param  {mixed}   value
   *
   * @return {void}
   */
		value: function setVariable(key, value) {
			this._variables[key] = value;
		}
	}, {
		key: 'incVariable',


		/**
   * Increases the specified Game Variable by the given amount.
   *
   * @param  {string}   key
   * @param  {numeric}  amount
   *
   * @return {void}
   */
		value: function incVariable(key, amount) {
			this._variables[key] += amount;
		}
	}, {
		key: 'decVariable',


		/**
   * Decreases the specified Game Variable by the given amount.
   *
   * @param  {string}   key
   * @param  {numeric}  amount
   *
   * @return {void}
   */
		value: function decVariable(key, amount) {
			this._variables[key] -= amount;
		}
	}, {
		key: 'hasVariable',


		/**
   * Returns whether or not the specified Game Variable is defined.
   *
   * @param  {string}  key
   *
   * @return {boolean}
   */
		value: function hasVariable(key) {
			return typeof this._variables[key] === 'undefined';
		}
	}, {
		key: 'getVariables',


		/**
   * Returns the Game Variables.
   *
   * @return {object}
   */
		value: function getVariables() {
			return this._variables;
		}
	}]);

	return Game;
}();

// Assign Constructor to Namespace


/* unused harmony default export */ var _unused_webpack_default_export = (Game);
ns.Game = Game;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ns = namespace('Game.Support');

var Loop = function () {

		/**
   * Creates a new Loop instance.
   *
   * @param  {object}  options
   *
   * @return {this}
   */
		function Loop() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				_classCallCheck(this, Loop);

				/**
     * The interval timeout (in milliseconds).
     *
     * @var {number}
     */
				this.intervalTimeout = options.interval || 10;

				/**
     * Whether or not the Loop is running.
     *
     * @var {boolean}
     */
				this.running = false;

				/**
     * The Before Loop Handler.
     *
     * @var {function|null}
     */
				this.beforeLoopHandler = options.before || null;

				/**
     * The Loop Handler.
     *
     * @var {function|null}
     */
				this.loopHandler = options.loop || null;

				/**
     * The After Loop Handler.
     *
     * @var {function|null}
     */
				this.afterLoopHandler = options.after || null;
		}

		_createClass(Loop, [{
				key: 'start',


				/**
     * Starts the Loop.
     *
     * @return {this}
     */
				value: function start() {

						// Check if the Loop is already active
						if (this.intervalId != null) {

								// Clear the Loop Interval
								clearInterval(this.intervalId);
						}

						// Start the Loop
						this.intervalId = setInterval(this.doLoop.bind(this), this.intervalTimeout);

						// Mark the Loop as running
						this.running = true;

						// Allow Chaining
						return this;
				}
		}, {
				key: 'doLoop',


				/**
     * Performs an iteration of the Loop.
     *
     * @return {this}
     */
				value: function doLoop() {

						// Perform any actions before the Loop
						this.beforeLoopIteration();

						// Perform the Loop iteration
						this.doLoopIteration();

						// Perform any actions after the Loop
						this.afterLoopIteration();

						// Allow Chaining
						return this;
				}
		}, {
				key: 'beforeLoopIteration',


				/**
     * Calls the Before Loop Handler.
     *
     * @return {void}
     */
				value: function beforeLoopIteration() {

						// Make sure the Before Loop Handler is defined
						if (typeof this.beforeLoopHandler !== 'function') {
								return;
						}

						// Call the Before Loop Handler
						this.beforeLoopHandler.apply(this, []);
				}
		}, {
				key: 'doLoopIteration',


				/**
     * Calls the Loop Handler.
     *
     * @return {void}
     */
				value: function doLoopIteration() {

						// Make sure the Loop Handler is defined
						if (typeof this.loopHandler !== 'function') {
								return;
						}

						// Call the Loop Handler
						this.loopHandler.apply(this, []);
				}
		}, {
				key: 'afterLoopIteration',


				/**
     * Calls the After Loop Handler.
     *
     * @return {void}
     */
				value: function afterLoopIteration() {

						// Make sure the After Loop Handler is defined
						if (typeof this.afterLoopHandler !== 'function') {
								return;
						}

						// Call the After Loop Handler
						this.afterLoopHandler.apply(this, []);
				}
		}, {
				key: 'onBeforeLoop',


				/**
     * Sets the Before Loop Handler.
     *
     * @param  {function|null}  callback
     *
     * @return {this}
     */
				value: function onBeforeLoop(callback) {

						this.beforeLoopHandler = callback;

						return this;
				}
		}, {
				key: 'onLoop',


				/**
     * Sets the Loop Handler.
     *
     * @param  {function|null}  callback
     *
     * @return {this}
     */
				value: function onLoop(callback) {

						this.loopHandler = callback;

						return this;
				}
		}, {
				key: 'onAfterLoop',


				/**
     * Sets the After Loop Handler.
     *
     * @param  {function|null}  callback
     *
     * @return {this}
     */
				value: function onAfterLoop(callback) {

						this.afterLoopHandler = callback;

						return this;
				}
		}, {
				key: 'stop',


				/**
     * Ends the Loop.
     *
     * @return {this}
     */
				value: function stop() {

						// Clear the Loop Interval
						clearInterval(this.intervalId);

						// Mark the Loop as no longer running
						this.running = true;

						// Allow Chaining
						return this;
				}
		}]);

		return Loop;
}();

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["a"] = (Loop);
ns.Loop = Loop;

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ns = namespace('App.Objects');



var BallGameObject = function (_GameObject) {
		_inherits(BallGameObject, _GameObject);

		function BallGameObject() {
				_classCallCheck(this, BallGameObject);

				return _possibleConstructorReturn(this, (BallGameObject.__proto__ || Object.getPrototypeOf(BallGameObject)).apply(this, arguments));
		}

		_createClass(BallGameObject, [{
				key: 'hitBrick',


				/**
     * Hits the specified Brick.
     *
     * @param  {Game.Objects.BrickGameObject}  brick
     *
     * @return {void}
     */
				value: function hitBrick(brick) {

						// Reverse the Vertical Direction of the Ball
						this.dy *= -1;

						// Damage the Brick
						brick.damage();
				}
		}, {
				key: 'stop',


				/**
     * Stops this Ball's Movement.
     *
     * @return {void}
     */
				value: function stop() {

						this.dx = 0;
						this.dy = 0;
				}
		}, {
				key: 'launch',


				/**
     * Launches this Ball in the specified direction.
     *
     * @param  {float}  direction
     * @param  {float}  speed
     * @param  {float}  accuracy
     *
     * @return {void}
     */
				value: function launch() {
						var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 90;
						var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
						var accuracy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.9;


						// Determine the spread
						var spread = 1 - accuracy;

						// Offset the Direction
						direction *= 1 + (Math.random() * spread * 2 - spread);

						// Determine the movement
						this.dx = Math.cos(direction * Math.PI / 180) * speed;
						this.dy = -Math.sin(direction * Math.PI / 180) * speed;

						console.log('Launch: ' + this.dx + ', ' + this.dy);

						// Release the Tracking Object
						this.trackingObject = null;
						this.trackingOffset = 0;
				}
		}, {
				key: 'setTrackingObject',


				/**
     * Sets the Tracking Object for this Ball.
     *
     * @param  {Game.Objects.GameObject}  object
     * @param  integer                    offset
     *
     * @return {void}
     */
				value: function setTrackingObject(object) {
						var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;


						// Set the Tracking Object
						this.trackingObject = object;

						// Set the Tracking Offset
						this.trackingOffset = offset;

						// Stop any movement
						this.stop();
				}
		}], [{
				key: '_boot',


				/**
     * The "booting" method of this Object.
     *
     * @return {void}
     */
				value: function _boot() {

						/**
       * Assign Instance Attributes.
       *
       * @param  {Game.Objects.BallGameObject}  ball
       *
       * @return {void}
       */
						this.onCreate(function (ball) {

								ball.radius = 10;
								ball.dx = 0;
								ball.dy = 0;
								ball.trackingObject = null;
								ball.trackingOffset = null;
						});

						/**
       * The Draw Event Handler for this Object.
       *
       * @param  {Game.Objects.BallGameObject}  ball
       * @param  {Game.Graphics.Canvas}         canvas
       * @param  {Game.Graphics.CanvasContext}  context
       *
       * @return {void}
       */
						this.onDraw(function (ball, canvas, context) {

								// Draw the Ball
								context.drawCircle(ball.x, ball.y, ball.radius, '#0095DD');
						});

						/**
       * The Step Event Handler for this Object.
       *
       * @param  {Game.Objects.BallGameObject}  ball
       *
       * @return {void}
       */
						this.onStep(function (ball) {

								// Check for a Tracking Object
								if (ball.trackingObject) {

										// Track the Tracking Object
										ball.x = ball.trackingObject.x + ball.trackingOffset;
								}

								// Check for Top Collision
								if (ball.y + ball.dy < 0 + ball.radius) {

										// Reverse the Vertical Direction
										ball.dy *= -1;
								}

								// Check for Bottom Collision
								else if (ball.y + ball.dy > game().graphics.getCanvas().getHeight() - ball.radius) {

												// Find the Paddle Object
												var paddle = game().objects.getObjectByClass('PaddleGameObject');

												// Check if the Paddle would stop the Ball
												if (paddle != null && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {

														// Bounce off of the Paddle
														paddle.bounce(ball);
												}

												// Assume Game Over
												else {

																// Initiate Game Over
																alert('GAME OVER');

																ball.x = 50;
																ball.y = 50;
																ball.dx = 0;
																ball.dy = 0;
														}
										}

								// Check for Left Collision
								if (ball.x + ball.dx < 0 + ball.radius) {

										// Reverse the Horizontal Direction
										ball.dx *= -1;
								}

								// Check for Right Collision
								else if (ball.x + ball.dy > game().graphics.getCanvas().getWidth() - ball.radius) {

												// Reverse the Horizontal Direction
												ball.dx *= -1;
										}

								// Move the Ball
								ball.x += ball.dx;
								ball.y += ball.dy;
						});
				}
		}]);

		return BallGameObject;
}(__WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__["default"]);

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (BallGameObject);
ns.BallGameObject = BallGameObject;

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ns = namespace('App.Objects');



var BrickGameObject = function (_GameObject) {
	_inherits(BrickGameObject, _GameObject);

	function BrickGameObject() {
		_classCallCheck(this, BrickGameObject);

		return _possibleConstructorReturn(this, (BrickGameObject.__proto__ || Object.getPrototypeOf(BrickGameObject)).apply(this, arguments));
	}

	_createClass(BrickGameObject, [{
		key: 'isBallColliding',


		/**
   * Returns whether or not the specified Ball is colliding with this Object.
   *
   * @param  {BallGameObject}  ball
   *
   * @return {boolean}
   */
		value: function isBallColliding(ball) {

			return ball.x > this.x // Check Left Edge
			&& ball.x < this.x + this.width // Check Right Edge
			&& ball.y > this.y // Check Top Edge
			&& ball.y < this.y + this.height; // Check Bottom Edge
		}
	}, {
		key: 'damage',


		/**
   * Damages this Brick.
   *
   * @param  {integer}  amount
   *
   * @return {void}
   */
		value: function damage() {
			var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;


			// Reduce the Health
			this.health -= amount;

			// Check for Death
			if (this.health < 0) {
				this.die();
			}
		}
	}, {
		key: 'die',


		/**
   * Kills this Brick.
   *
   * @return {void}
   */
		value: function die() {

			// Destroy the Brick
			this.destroy();

			// Increase the Game Score
			game().incVariable('score', 1);
		}
	}], [{
		key: '_boot',


		/**
   * The "booting" method of this Object.
   *
   * @return {void}
   */
		value: function _boot() {

			/**
    * Assign Instance Attributes.
    *
    * @param  {Game.Objects.BrickGameObject}  brick
    *
    * @return {void}
    */
			this.onCreate(function (brick) {

				// Initialize the Health
				brick.health = brick.healthMax = 1;
			});

			/**
    * The Draw Event Handler for this Object.
    *
    * @param  {Game.Objects.BrickGameObject}  brick
    * @param  {Game.Graphics.Canvas}          canvas
    * @param  {Game.Graphics.CanvasContext}   context
    *
    * @return {void}
    */
			this.onDraw(function (brick, canvas, context) {

				// Find the Ball Object
				var ball = window.App.game.objects.getObjectByClass('BallGameObject');

				// Check if a Ball was found
				if (ball != null) {

					// Check for Ball Collision
					if (brick.isBallColliding(ball)) {

						// Hit the Brick
						ball.hitBrick(brick);
					}
				}

				// Draw the Brick
				context.drawRectangle(brick.x, brick.y, brick.width, brick.height, '#0095DD');
			});
		}
	}]);

	return BrickGameObject;
}(__WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__["default"]);

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (BrickGameObject);
ns.BrickGameObject = BrickGameObject;

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ns = namespace('App.Objects');



var PaddleGameObject = function (_GameObject) {
		_inherits(PaddleGameObject, _GameObject);

		function PaddleGameObject() {
				_classCallCheck(this, PaddleGameObject);

				return _possibleConstructorReturn(this, (PaddleGameObject.__proto__ || Object.getPrototypeOf(PaddleGameObject)).apply(this, arguments));
		}

		_createClass(PaddleGameObject, [{
				key: 'applyMovementActions',


				/**
     * Applies the Movement Actions of this Paddle.
     *
     * @return {void}
     */
				value: function applyMovementActions() {

						// Check for Move Right
						if (window.keyboard.isKeyDown(window.controlMap.moveRight)) {

								if (this.canMoveRight()) {
										this.moveRight();
								}
						}

						// Check for Move Left
						else if (window.keyboard.isKeyDown(window.controlMap.moveLeft)) {

										if (this.canMoveLeft()) {
												this.moveLeft();
										}
								}
				}
		}, {
				key: 'canMoveLeft',


				/**
     * Returns whether or not the Paddle can move to the Left.
     *
     * @return {boolean}
     */
				value: function canMoveLeft() {
						return this.x > 0;
				}
		}, {
				key: 'moveLeft',


				/**
     * Moves this Paddle to the Left.
     *
     * @return {void}
     */
				value: function moveLeft() {
						this.x -= this.movementSpeed;
				}
		}, {
				key: 'canMoveRight',


				/**
     * Returns whether or not the Paddle can move to the Right.
     *
     * @return {boolean}
     */
				value: function canMoveRight() {
						return this.x < game().graphics.getCanvas().getWidth() - this.width;
				}
		}, {
				key: 'moveRight',


				/**
     * Moves this Paddle to the Right.
     *
     * @return {void}
     */
				value: function moveRight() {
						this.x += this.movementSpeed;
				}
		}, {
				key: 'applyLaunchAction',


				/**
     * Applies the Launch Action of this Paddle.
     *
     * @return {void}
     */
				value: function applyLaunchAction() {

						// Check for Launch Action
						if (window.keyboard.isKeyPressed(window.controlMap.launch)) {

								// Make sure the Paddle can launch the Tracking Object
								if (this.canLaunchTrackingObject()) {

										// Launch the Tracking Object
										this.launchTrackingObject();
								}
						}
				}
		}, {
				key: 'canLaunchTrackingObject',


				/**
     * Returns whether or not this Paddle can launch.
     *
     * @return {boolean}
     */
				value: function canLaunchTrackingObject() {
						return this.hasTrackingObject();
				}
		}, {
				key: 'hasTrackingObject',


				/**
     * Returns whether or not this Paddle has a Tracking Object.
     *
     * @return {boolean}
     */
				value: function hasTrackingObject() {
						return this.trackingObject != null;
				}
		}, {
				key: 'setTrackingObject',


				/**
     * Sets the Tracking Object for this Paddle.
     *
     * @param  {Game.Objects.GameObject}  object
     *
     * @return {void}
     */
				value: function setTrackingObject(object) {
						this.trackingObject = object;
				}
		}, {
				key: 'launchTrackingObject',


				/**
     * Launches the Tracking Object.
     *
     * @return {void}
     */
				value: function launchTrackingObject() {

						// Launch the Ball
						this.trackingObject.launch(90);

						// Release the Tracking Object
						this.trackingObject = null;
				}
		}, {
				key: 'createTrackingBall',


				/**
     * Creates a new Tracking Ball.
     *
     * @return {Game.Objects.BallGameObject}
     */
				value: function createTrackingBall() {

						// Create a new Ball
						var ball = game().objects.createInstance('BallGameObject', this.x + this.width / 2, this.y - 10);

						// Force the Ball to track this Paddle
						ball.setTrackingObject(this, this.width / 2);

						// Set the Tracking Object to the Ball
						this.setTrackingObject(ball);

						// Return the Ball
						return ball;
				}
		}, {
				key: 'bounce',


				/**
     * Bounces the specified Ball off of this Paddle.
     *
     * @param  {Game.Objects.BallGameObject}  ball
     * @param  {float}                        acceleration
     * @param  {float}                        accuracy
     *
     * @return {void}
     */
				value: function bounce(ball) {
						var acceleration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
						var accuracy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.9;


						// For determining the bounce direction, we want this to drop from
						// the ball, compare the impact to the center and bounce away
						// from the direction. This creates a real paddle effect.

						// Determine the impact line
						var x1, y1, x2, y2;

						x1 = game().graphics.getCanvas().getMouseX();
						y1 = this.y;
						x2 = this.x + this.width / 2;
						y2 = this.y + this.height / 2;

						// Determine the line direction
						var direction = Game.Support.Calc.pointDirection(x1, y1, x2, y2);

						console.log('Initial: Dir: ' + direction + ' (Rad) ' + direction * 180 / Math.PI + ' (Deg)');

						// To make things a bit more random, we're going to spread around
						// the direction a bit, making our game a bit harder to know
						// how the ball is going to bounce ahead of time. Neat!

						// Determine the spread
						var spread = accuracy - 1;

						// Offset the direction
						// direction *= 1 + ((Math.random() * spread * 2 - spread) / (180 / Math.PI));

						console.log('Spread: Dir: ' + direction + ' (Rad) ' + direction * 180 / Math.PI + ' (Deg)');

						// Make sure the direction isn't completely wack
						direction = Math.min(Math.max(Math.PI * 9 / 8, direction), Math.PI * 15 / 8);

						console.log('Clamp: Dir: ' + direction + ' (Rad) ' + direction * 180 / Math.PI + ' (Deg)');

						// Before we determine the new direction of the ball, we need
						// to determine how fast the ball should be travelling. We
						// can take the current speed, and accelerate the ball.

						// Determine the current speed of the ball
						var speed = Math.sqrt(Math.pow(ball.dx, 2) + Math.pow(ball.dy, 2));

						console.log('Initial: Speed: ' + speed);

						// Increase the speed
						speed *= acceleration + 1;

						console.log('Acc: Speed: ' + speed);

						// When determining the line components, we'd normally have
						// to flip dy, as we want the ball to "bounce". However,
						// since the axis is inverted, this is done for us.

						// Flip the line direction
						var dx = -Math.cos(direction) * speed;
						var dy = Math.sin(direction) * speed;

						console.log('New: Speed: ' + dx + ', ' + dy);

						// Set the speed of the ball
						ball.dx = dx;
						ball.dy = dy;

						// Move the Ball once to prevent additional collisions
						ball.x += ball.dx;
						ball.y += ball.dy;
				}
		}], [{
				key: '_boot',


				/**
     * The "booting" method of this Object.
     *
     * @return {void}
     */
				value: function _boot() {

						/**
       * Assign Instance Attributes.
       *
       * @param  {Game.Objects.PaddleGameObject}  paddle
       *
       * @return {void}
       */
						this.onCreate(function (paddle) {

								paddle.width = 75;
								paddle.height = 10;
								paddle.movementSpeed = 2;
								paddle.trackingObject = null;
						});

						/**
       * The Step Event Handler for this Object.
       *
       * @param  {Game.Objects.PaddleGameObject}  paddle
       *
       * @return {void}
       */
						this.onStep(function (paddle) {

								// Apply Movement
								paddle.applyMovementActions();

								// Apply Launch
								paddle.applyLaunchAction();
						});

						/**
       * The Draw Event Handler for this Object.
       *
       * @param  {Game.Objects.PaddleGameObject}  paddle
       * @param  {Game.Graphics.Canvas}           canvas
       * @param  {Game.Graphics.CanvasContext}    context
       *
       * @return {void}
       */
						this.onDraw(function (paddle, canvas, context) {

								// Draw the Paddle
								context.drawRectangle(paddle.x, paddle.y, paddle.width, paddle.height, '#0095DD');

								// Determine the Ball
								var ball = game().objects.getObjectByClass('BallGameObject');

								var accuracy = 0.9;
								var acceleration = 0;

								// Determine the impact line
								var x1, y1, x2, y2;

								x1 = canvas.getMouseX();
								y1 = canvas.getMouseY();
								x2 = paddle.x + paddle.width / 2;
								y2 = paddle.y;

								// Determine the line direction
								var direction = Game.Support.Calc.pointDirection(x1, y1, x2, y2);

								context.drawLine(x1, y1, x2, y2, 'red');

								// Average the direction with straight down
								direction = (direction + Math.PI * 3 / 2) / 2;

								context.drawLine(x2, y2, x2 - Math.cos(direction) * 60, y2 + Math.cos(direction) * 60, 'green');

								// console.log('Initial: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

								// To make things a bit more random, we're going to spread around
								// the direction a bit, making our game a bit harder to know
								// how the ball is going to bounce ahead of time. Neat!

								// Determine the spread
								var spread = accuracy - 1;

								// Offset the direction
								// direction *= 1 + ((Math.random() * spread * 2 - spread) / (180 / Math.PI));

								// console.log('Spread: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

								// Make sure the direction isn't completely wack
								direction = Math.min(Math.max(Math.PI * 9 / 8, direction), Math.PI * 15 / 8);

								context.drawLine(x2, y2, x2 - Math.cos(direction) * 60, y2 + Math.cos(direction) * 60, 'orange');

								// console.log('Clamp: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

								// Before we determine the new direction of the ball, we need
								// to determine how fast the ball should be travelling. We
								// can take the current speed, and accelerate the ball.

								// Determine the current speed of the ball
								var speed = 2;
								// var speed = Math.sqrt(Math.pow(ball.dx, 2) + Math.pow(ball.dy, 2));

								// console.log('Initial: Speed: ' + speed);

								// Increase the speed
								speed *= acceleration + 1;

								// console.log('Acc: Speed: ' + speed);

								// When determining the line components, we'd normally have
								// to flip dy, as we want the ball to "bounce". However,
								// since the axis is inverted, this is done for us.

								// Flip the line direction
								var dx = -Math.cos(direction) * speed * 30;
								var dy = Math.sin(direction) * speed * 30;

								context.drawLine(x1, y1, x1 + dx, y1 + dy, 'blue');
								context.drawLine(x2, y2, x2 + dx, y2 + dy, 'blue');

								// console.log('New: Speed: ' + dx + ', ' + dy);
						});
				}
		}]);

		return PaddleGameObject;
}(__WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__["default"]);

// Assign Constructor to Namespace


/* harmony default export */ __webpack_exports__["default"] = (PaddleGameObject);
ns.PaddleGameObject = PaddleGameObject;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTA5ZjEyNGE2OTg4NjQ1NGFmNzAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvT2JqZWN0cy9HYW1lT2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0V2ZW50cy9EaXNwYXRjaGVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0NvbnRhaW5lci9Db250YWluZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvU3VwcG9ydC9PYmouanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvQ29uZmlnL1JlcG9zaXRvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvR3JhcGhpY3MvR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvT2JqZWN0cy9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L05hbWVzcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvQ29uZmlnL0NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvR3JhcGhpY3MvQ2FudmFzQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9HcmFwaGljcy9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvS2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvTW91c2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvT2JqZWN0cy9PYmplY3RzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvYm9vdHN0cmFwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0V2ZW50cy9FdmVudFNlcnZpY2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvR2FtZS9LZXJuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9Cb290c3RyYXAvTG9hZENvbmZpZ3VyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9Cb290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9HYW1lLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvTG9vcC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvT2JqZWN0cy9CYWxsR2FtZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvT2JqZWN0cy9Ccmlja0dhbWVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvUGFkZGxlR2FtZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3MiXSwibmFtZXMiOlsibnMiLCJuYW1lc3BhY2UiLCJHYW1lT2JqZWN0IiwiaWQiLCJtYXhJbnN0YW5jZUlkIiwieCIsInkiLCJ2aXNpYmxlIiwiZXhpc3RzIiwiX2Jvb3RJZk5vdEJvb3RlZCIsImZpcmVPYmplY3RFdmVudCIsIl9ib290ZWQiLCJnZXRDbGFzc05hbWUiLCJjb25zdHJ1Y3RvciIsIl9ib290IiwiY2FudmFzIiwiY29udGV4dCIsInBhcmFtZXRlcnMiLCJkcmF3TGluZSIsIl9wZXJmb3JtRGVsZXRlT25PYmplY3QiLCJnZXRNYW5hZ2VyIiwiZGVsZXRlSW5zdGFuY2UiLCJldmVudCIsImhhbHQiLCJkaXNwYXRjaGVyIiwibWV0aG9kIiwibmFtZSIsIm1hbmFnZXIiLCJjYWxsYmFjayIsImxpc3RlbiIsInJlZ2lzdGVyT2JqZWN0RXZlbnQiLCJ0b1N0cmluZyIsInNwbGl0IiwiRGlzcGF0Y2hlciIsImxpc3RlbmVycyIsInNvcnRlZCIsImZpcmluZyIsImV2ZW50cyIsImxpc3RlbmVyIiwicHJpb3JpdHkiLCJpIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwicHVzaCIsIm1ha2VMaXN0ZW5lciIsInBheWxvYWQiLCJmaXJlIiwiZGlzcGF0Y2giLCJwcm90b3R5cGUiLCJyZXNwb25zZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJnZXRMaXN0ZW5lcnMiLCJyZXNwb25zZSIsImFwcGx5IiwiZXZlbnROYW1lIiwiX3NvcnRMaXN0ZW5lcnMiLCJwcmlvcml0aWVzIiwia2V5cyIsInNvcnQiLCJyZXZlcnNlIiwiY29uY2F0Iiwid2lsZGNhcmQiLCJjcmVhdGVDbGFzc0xpc3RlbmVyIiwiaGFuZGxlIiwiQ29udGFpbmVyIiwiX3Jlc29sdmVkIiwiX2JpbmRpbmdzIiwiX21ldGhvZEJpbmRpbmdzIiwiX2luc3RhbmNlcyIsIl9hbGlhc2VzIiwiX2Fic3RyYWN0QWxpYXNlcyIsIl9leHRlbmRlcnMiLCJfdGFncyIsIl9idWlsZFN0YWNrIiwiX3dpdGgiLCJjb250ZXh0dWFsIiwiX3JlYm91bmRDYWxsYmFja3MiLCJfZ2xvYmFsUmVzb2x2aW5nQ2FsbGJhY2tzIiwiX2dsb2JhbEFmdGVyUmVzb2x2aW5nQ2FsbGJhY2tzIiwiX3Jlc29sdmluZ0NhbGxiYWNrcyIsIl9hZnRlclJlc29sdmluZ0NhbGxiYWNrcyIsImNvbmNyZXRlIiwiYWJzdHJhY3QiLCJpc0FsaWFzIiwiYm91bmQiLCJnZXRBbGlhcyIsInNoYXJlZCIsIl9kcm9wU3RhbGVJbnN0YW5jZXMiLCJfZ2V0Q2xvc3VyZSIsInJlc29sdmVkIiwiX3JlYm91bmQiLCJjb250YWluZXIiLCJidWlsZCIsIm1ha2UiLCJpbnN0YW5jZSIsImltcGxlbWVudGF0aW9uIiwiYmluZCIsIl9yZW1vdmVBYnN0cmFjdEFsaWFzIiwiaXNCb3VuZCIsIl9yZWJvdWQiLCJzZWFyY2giLCJoYXNPd25Qcm9wZXJ0eSIsImFsaWFzZXMiLCJpbmRleCIsImFsaWFzIiwiYWJzdHJhY3RzIiwidGFncyIsInRhZyIsImoiLCJyZXN1bHRzIiwidGFyZ2V0IiwicmViaW5kaW5nIiwiYXBwIiwiX2dldFJlYm91bmRDYWxsYmFja3MiLCJjYWxsIiwiZGVmYXVsdE1ldGhvZCIsIkZyYW1ld29yayIsIkJvdW5kTWV0aG9kIiwicmVzb2x2ZSIsImhhcyIsIkVycm9yIiwibmVlZHNDb250ZXh0dWFsQnVpbGQiLCJfZ2V0Q29udGV4dHVhbENvbmNyZXRlIiwiX2dldENvbmNyZXRlIiwiX2lzQnVpbGRhYmxlIiwib2JqZWN0IiwiX2dldEV4dGVuZGVycyIsImV4dGVuZGVyIiwiaXNTaGFyZWQiLCJfZmlyZVJlc29sdmluZ0NhbGxiYWNrcyIsInBvcCIsImJpbmRpbmciLCJfZmluZEluQ29udGV4dHVhbEJpbmRpbmdzIiwiT2JqIiwiaXNDbGFzcyIsIl9nZXRMYXN0UGFyYW1ldGVyT3ZlcnJpZGUiLCJkZWZpbml0aW9uIiwiX3Jlc29sdmVDbGFzc05hbWVzcGFjZSIsIl9ub3RJbnN0YW50aWFibGUiLCJpbmRleE9mIiwid2luZG93Iiwic2VnbWVudHMiLCJzZWdtZW50IiwiY291bnQiLCJwcmV2aW91cyIsImpvaW4iLCJtZXNzYWdlIiwiX2ZpcmVDYWxsYmFja0FycmF5IiwiX2dldENhbGxiYWNrc0ZvclR5cGUiLCJfZmlyZUFmdGVyUmVzb2x2aW5nQ2FsbGJhY2tzIiwiY2FsbGJhY2tzUGVyVHlwZSIsInR5cGUiLCJjYWxsYmFja3MiLCJmb3JnZXRJbnN0YW5jZXMiLCJ2YWx1ZSIsIl9pbnN0YW5jZSIsInRlc3QiLCJSZXBvc2l0b3J5IiwiaXRlbXMiLCJfaXRlbXMiLCJrZXkiLCJNYXAiLCJmYWxsYmFjayIsIkFycmF5IiwiaXNBcnJheSIsIl9nZXRNYW55IiwiZ2V0IiwiY29uZmlnIiwic2V0IiwiYXJyYXkiLCJHcmFwaGljcyIsIl9nYW1lIiwic2VsZWN0b3IiLCJmcHMiLCJfY3JlYXRlQ2FudmFzIiwiZWxlbWVudCIsIl9nZXRFbGVtZW50RnJvbVNlbGVjdG9yIiwiR2FtZSIsIkNhbnZhcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnZXRFbGVtZW50QnlJZCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJiZWdpbkRyYXdpbmdMb29wcyIsIl9kcml2ZXJzIiwiYmVnaW5EcmF3aW5nTG9vcCIsImRyaXZlciIsIk1hbmFnZXIiLCJfb2JqZWN0c0J5SWQiLCJfb2JqZWN0c0J5Q2xhc3MiLCJfb2JqZWN0QnlDbGFzcyIsIk9iamVjdHMiLCJlYWNoIiwiZHJhdyIsImdldENvbnRleHQiLCJmaXJlQmVmb3JlU3RlcEV2ZW50cyIsImZpcmVTdGVwRXZlbnRzIiwiZmlyZUFmdGVyU3RlcEV2ZW50cyIsImZpcmVCZWZvcmVTdGVwRXZlbnQiLCJmaXJlU3RlcEV2ZW50IiwiZmlyZUFmdGVyU3RlcEV2ZW50IiwicmVxdWlyZSIsImZzIiwiY2FsbGVyIiwiYXJndW1lbnRzIiwiY2FsbGVlIiwibWV0aG9kTmFtZSIsImNsYXNzTmFtZSIsInN1cGVyTmFtZSIsImdldFByb3RvdHlwZU9mIiwiZmlsZUV4aXN0c1N5bmMiLCJwYXRoIiwiYWNjZXNzU3luYyIsImV4IiwiTmFtZXNwYWNlIiwiYXV0b0Fzc2lnbiIsIl9wYXRoIiwiYXNzaWduVG9XaW5kb3ciLCJfbmFtZXNwYWNlcyIsIl9zZXQiLCJwcmVmaXgiLCJzcGxpY2UiLCJnZXRJbnN0YW5jZSIsIm1hcCIsImFjY2Vzc2libGUiLCJzdWJLZXlNYXAiLCJkb3RLZXlzIiwiZ2FtZSIsIl9jdXN0b21DcmVhdG9ycyIsInVzZXNEZWZhdWx0RHJpdmVyIiwiZ2V0RGVmYXVsdERyaXZlciIsIl9nZXQiLCJ1c2VzQ29uZmlndXJhYmxlQWRhcHRlcnMiLCJfY3JlYXRlQWRhcHRlciIsIl9jcmVhdGVEcml2ZXIiLCJfZ2V0Q29uZmlnIiwiZ2V0Q29uZmlnRHJpdmVyS2V5TmFtZSIsIl9jYWxsQ3VzdG9tQ3JlYXRvciIsInVzZXNDcmVhdGlvbkJ5TWV0aG9kIiwiX2dldENyZWF0aW9uTWV0aG9kTmFtZSIsInJlcGxhY2UiLCJ3b3JkcyIsIndvcmQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiX2dldENvbmZpZ3VyYXRpb25Sb290IiwiQ2FudmFzQ29udGV4dCIsIl9jb250ZXh0IiwiYmVnaW5QYXRoIiwicmVzdWx0IiwiY2xvc2VQYXRoIiwicmFkaXVzIiwiZmlsbCIsIm91dGxpbmUiLCJsaW5lV2lkdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJzdG9rZVN0eWxlIiwic3Ryb2tlIiwid2lkdGgiLCJoZWlnaHQiLCJyZWN0IiwieDEiLCJ5MSIsIngyIiwieTIiLCJjb2xvciIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZVN0eWxlIiwidGV4dCIsImZvbnQiLCJmaWxsVGV4dCIsImNvbnRleHRUeXBlIiwiZHJhd1N0YWNrIiwiZHJhd0xvb3AiLCJTdXBwb3J0IiwiTG9vcCIsImJlZm9yZURyYXdpbmdMb29wIiwiaW52b2tlRHJhd1N0YWNrIiwiYWZ0ZXJEcmF3aW5nTG9vcCIsImNsZWFyUmVjdCIsImdldFdpZHRoIiwiZ2V0SGVpZ2h0Iiwic3RhcnQiLCJjbGVhciIsInN0b3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJnZXRYIiwiZ2V0WSIsImdldE1vdXNlWCIsImdldE1vdXNlWSIsIktleWJvYXJkIiwicHJldmlvdXNLZXlib2FyZEV2ZW50Iiwia2V5U3RhdGVzIiwiS0VZU1RBVEVfUFJFU1NFRCIsIktFWVNUQVRFX0hPTEQiLCJLRVlTVEFURV9SRUxFQVNFRCIsImtleUNvZGVTdGF0ZXMiLCJyZWdpc3RlcktleWJvYXJkTGlzdGVuZXJzIiwicmVnaXN0ZXJLZXlEb3duTGlzdGVuZXIiLCJyZWdpc3RlcktleVVwTGlzdGVuZXIiLCJhZGRFdmVudExpc3RlbmVyIiwia2V5RG93bkhhbmRsZXIiLCJrZXlVcEhhbmRsZXIiLCJyZXBlYXQiLCJrZXlIb2xkSGFuZGxlciIsImtleVByZXNzZWRIYW5kbGVyIiwiX3VwZGF0ZUtleWJvYXJkU3RhdGVzIiwia2V5UmVsZWFzZWRIYW5kbGVyIiwic3RhdGUiLCJfdXBkYXRlS2V5U3RhdGUiLCJfdXBkYXRlS2V5Q29kZVN0YXRlIiwiY29kZSIsImlzS2V5UHJlc3NlZCIsImlzS2V5SGVsZCIsImlzS2V5Q29kZVByZXNzZWQiLCJpc0tleUNvZGVIZWxkIiwiS0VZX0FMVCIsIktFWV9CQUNLU1BBQ0UiLCJLRVlfQ09OVFJPTCIsIktFWV9ERUxFVEUiLCJLRVlfRE9XTiIsIktFWV9FTkQiLCJLRVlfRVNDQVBFIiwiS0VZX0hPTUUiLCJLRVlfSU5TRVJUIiwiS0VZX0xFRlQiLCJLRVlfTUVUQSIsIktFWV9OVU1MT0NLIiwiS0VZX1BBR0VfRE9XTiIsIktFWV9QQUdFX1VQIiwiS0VZX1JFVFVSTiIsIktFWV9SSUdIVCIsIktFWV9TQ1JPTEwiLCJLRVlfU0hJRlQiLCJLRVlfU1BBQ0UiLCJLRVlfVEFCIiwiS0VZX1VQIiwiS0VZX0VOVEVSIiwiS0VZX05FWFQiLCJLRVlfUFJJT1IiLCJLRVlfU0NST0xMX0xPQ0siLCJNb3VzZSIsInByZXZpb3VzTW91c2VNb3ZlRXZlbnQiLCJfcG9zaXRpb24iLCJyZWdpc3Rlck1vdXNlTGlzdGVuZXJzIiwicmVnaXN0ZXJNb3VzZU1vdmVMaXN0ZW5lciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJwb3NpdGlvbiIsIl9nZXRNb3VzZVBvc2l0aW9uRnJvbUV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJkZWZhdWx0Iiwia2VybmVsIiwiYm9vdHN0cmFwIiwic2luZ2xldG9uIiwiQXBwbGljYXRpb24iLCJiYXNlUGF0aCIsIl9iYXNlUGF0aCIsIl9oYXNCZWVuQm9vdHN0cmFwcGVkIiwiX2Jvb3RpbmdDYWxsYmFja3MiLCJfYm9vdGVkQ2FsbGJhY2tzIiwiX3Rlcm1pbmF0aW5nQ2FsbGJhY2tzIiwiX3NlcnZpY2VQcm92aWRlcnMiLCJfbG9hZGVkUHJvdmlkZXJzIiwiX2RlZmVycmVkU2VydmljZXMiLCJfbW9ub2xvZ0NvbmZpZ3VyYXRvciIsIl9kYXRhYmFzZVBhdGgiLCJfc3RvcmFnZVBhdGgiLCJfZW52aXJvbm1lbnRQYXRoIiwiX2Vudmlyb25tZW50RmlsZSIsIl9uYW1lc3BhY2UiLCJzZXRCYXNlUGF0aCIsIl9yZWdpc3RlckJhc2VCaW5kaW5ncyIsIl9yZWdpc3RlckJhc2VTZXJ2aWNlUHJvdmlkZXJzIiwic2V0SW5zdGFuY2UiLCJyZWdpc3RlciIsImJvb3RzdHJhcHBlcnMiLCJib290c3RyYXBwZXIiLCJfYmluZFBhdGhzSW5Db250YWluZXIiLCJjb25maWdQYXRoIiwiYm9vdHN0cmFwUGF0aCIsInByb3ZpZGVyIiwib3B0aW9ucyIsImZvcmNlIiwicmVnaXN0ZXJlZCIsImdldFByb3ZpZGVyIiwicmVzb2x2ZVByb3ZpZGVyIiwiX21hcmtBc1JlZ2lzdGVyZWQiLCJfYm9vdFByb3ZpZGVyIiwicHJvdmlkZXJzIiwiZ2V0UHJvdmlkZXJzIiwiZ2V0Q2xhc3MiLCJmaWx0ZXIiLCJzZXJ2aWNlIiwibG9hZERlZmVycmVkUHJvdmlkZXIiLCJib290aW5nIiwiYm9vdFByb3ZpZGVyIiwiRXZlbnRTZXJ2aWNlUHJvdmlkZXIiLCJfYXBwIiwiU2VydmljZVByb3ZpZGVyIiwiX2RlZmVyIiwiS2VybmVsIiwiX2Jvb3RzdHJhcHBlcnMiLCJoYXNCZWVuQm9vdHN0cmFwcGVkIiwiYm9vdHN0cmFwV2l0aCIsImdldEJvb3RzdHJhcHBlcnMiLCJMb2FkQ29uZmlndXJhdGlvbiIsImxvYWRlZEZyb21DYWNoZSIsImNhY2hlZCIsImdldENhY2hlZENvbmZpZ1BhdGgiLCJncmFwaGljcyIsIm9iamVjdHMiLCJfdmFyaWFibGVzIiwic3RlcExvb3AiLCJkb1N0ZXBMb29wIiwic3RlcEdhbWVPYmplY3RzIiwiZHJhd0dhbWVPYmplY3RzIiwiYW1vdW50IiwiaW50ZXJ2YWxUaW1lb3V0IiwiaW50ZXJ2YWwiLCJydW5uaW5nIiwiYmVmb3JlTG9vcEhhbmRsZXIiLCJiZWZvcmUiLCJsb29wSGFuZGxlciIsImxvb3AiLCJhZnRlckxvb3BIYW5kbGVyIiwiYWZ0ZXIiLCJpbnRlcnZhbElkIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiZG9Mb29wIiwiYmVmb3JlTG9vcEl0ZXJhdGlvbiIsImRvTG9vcEl0ZXJhdGlvbiIsImFmdGVyTG9vcEl0ZXJhdGlvbiIsIkJhbGxHYW1lT2JqZWN0IiwiYnJpY2siLCJkeSIsImRhbWFnZSIsImR4IiwiZGlyZWN0aW9uIiwic3BlZWQiLCJhY2N1cmFjeSIsInNwcmVhZCIsInJhbmRvbSIsImNvcyIsInNpbiIsImNvbnNvbGUiLCJsb2ciLCJ0cmFja2luZ09iamVjdCIsInRyYWNraW5nT2Zmc2V0Iiwib2Zmc2V0Iiwib25DcmVhdGUiLCJiYWxsIiwib25EcmF3IiwiZHJhd0NpcmNsZSIsIm9uU3RlcCIsImdldENhbnZhcyIsInBhZGRsZSIsImdldE9iamVjdEJ5Q2xhc3MiLCJib3VuY2UiLCJhbGVydCIsIkJyaWNrR2FtZU9iamVjdCIsImhlYWx0aCIsImRpZSIsImRlc3Ryb3kiLCJpbmNWYXJpYWJsZSIsImhlYWx0aE1heCIsIkFwcCIsImlzQmFsbENvbGxpZGluZyIsImhpdEJyaWNrIiwiZHJhd1JlY3RhbmdsZSIsIlBhZGRsZUdhbWVPYmplY3QiLCJrZXlib2FyZCIsImlzS2V5RG93biIsImNvbnRyb2xNYXAiLCJtb3ZlUmlnaHQiLCJjYW5Nb3ZlUmlnaHQiLCJtb3ZlTGVmdCIsImNhbk1vdmVMZWZ0IiwibW92ZW1lbnRTcGVlZCIsImxhdW5jaCIsImNhbkxhdW5jaFRyYWNraW5nT2JqZWN0IiwibGF1bmNoVHJhY2tpbmdPYmplY3QiLCJoYXNUcmFja2luZ09iamVjdCIsImNyZWF0ZUluc3RhbmNlIiwic2V0VHJhY2tpbmdPYmplY3QiLCJhY2NlbGVyYXRpb24iLCJDYWxjIiwicG9pbnREaXJlY3Rpb24iLCJtaW4iLCJtYXgiLCJzcXJ0IiwicG93IiwiYXBwbHlNb3ZlbWVudEFjdGlvbnMiLCJhcHBseUxhdW5jaEFjdGlvbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxh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QXZCLEdBQStCLEVBQXhDO0FBQ0EsWUFBSUosS0FBS3hMLEtBQUtpTSxHQUFMLENBQVNOLFNBQVQsSUFBc0JDLEtBQXRCLEdBQThCLEVBQXZDOztBQUVBL2EsZ0JBQVFFLFFBQVIsQ0FBaUJ5UCxFQUFqQixFQUFxQkMsRUFBckIsRUFBeUJELEtBQUtrTCxFQUE5QixFQUFrQ2pMLEtBQUsrSyxFQUF2QyxFQUEyQyxNQUEzQztBQUNBM2EsZ0JBQVFFLFFBQVIsQ0FBaUIyUCxFQUFqQixFQUFxQkMsRUFBckIsRUFBeUJELEtBQUtnTCxFQUE5QixFQUFrQy9LLEtBQUs2SyxFQUF2QyxFQUEyQyxNQUEzQzs7QUFFQTtBQUVBLE9BOUVEO0FBZ0ZBOzs7O0VBbkk0QyxxRTs7QUE0VzlDOzs7K0RBNVdxQm1DLGdCO0FBNldyQjlkLEdBQUc4ZCxnQkFBSCxHQUFzQkEsZ0JBQXRCLEM7Ozs7OztBQ2pYQSx5QyIsImZpbGUiOiJcXGpzXFxhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA3KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5MDlmMTI0YTY5ODg2NDU0YWY3MCIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5PYmplY3RzJyk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBHYW1lIE9iamVjdC5cclxuICpcclxuICogQHJldHVybiB7dGhpc31cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPYmplY3Qge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IEdhbWUgT2JqZWN0IGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RhdGljfVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEluc3RhbmNlIElELlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2ludGVnZXJ9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaWQgPSBHYW1lT2JqZWN0Lm1heEluc3RhbmNlSWQrKztcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBYIFBvc2l0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2Zsb2F0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnggPSAwO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFkgUG9zaXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7ZmxvYXR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMueSA9IDA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIE9iamVjdCBzaG91bGQgYmUgdmlzaWJsZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtib29sZWFufVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnZpc2libGUgPSB0cnVlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogV2hldGhlciBvciBub3QgdGhpcyBPYmplY3QgZXhpc3RzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2Jvb2xlYW59XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZXhpc3RzID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBCb290IGlmIG5vdCBCb290ZWRcclxuXHRcdHRoaXMuX2Jvb3RJZk5vdEJvb3RlZCgpO1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIENyZWF0ZWQgRXZlbnRcclxuXHRcdHRoaXMuZmlyZU9iamVjdEV2ZW50KCdjcmVhdGVkJywgeydvYmplY3QnOiB0aGlzfSwgZmFsc2UpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDaGVjayBpZiB0aGlzIE9iamVjdCBuZWVkcyB0byBiZSBib290ZWQsIGFuZCBpZiBzbywgZG8gaXQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdF9ib290SWZOb3RCb290ZWQoKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoaXMgT2JqZWN0IGhhcyBub3QgYmVlbiBib290ZWRcclxuXHRcdGlmKHR5cGVvZiBHYW1lT2JqZWN0Ll9ib290ZWRbdGhpcy5nZXRDbGFzc05hbWUoKV0gIT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBNYXJrIHRoaXMgT2JqZWN0IGFzIEJvb3RlZFxyXG5cdFx0R2FtZU9iamVjdC5fYm9vdGVkW3RoaXMuZ2V0Q2xhc3NOYW1lKCldID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBGaXJlIHRoZSBCb290aW5nIEV2ZW50XHJcblx0XHR0aGlzLmZpcmVPYmplY3RFdmVudCgnYm9vdGluZycsIHsnb2JqZWN0JzogdGhpc30sIGZhbHNlKTtcclxuXHJcblx0XHQvLyBCb290IHRoaXMgT2JqZWN0XHJcblx0XHR0aGlzLmNvbnN0cnVjdG9yLl9ib290KCk7XHJcblxyXG5cdFx0Ly8gRmlyZSB0aGUgQm9vdGVkIEV2ZW50XHJcblx0XHR0aGlzLmZpcmVPYmplY3RFdmVudCgnYm9vdGVkJywgeydvYmplY3QnOiB0aGlzfSwgZmFsc2UpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgXCJib290aW5nXCIgbWV0aG9kIG9mIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgX2Jvb3QoKSB7XHJcblxyXG5cdFx0Ly8gT3ZlcnJpZGUgYnkgQ2hpbGRcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuRXZlbnRzLkRpc3BhdGNoZXJ9XHJcblx0ICovXHJcblx0c3RhdGljIGdldERpc3BhdGNoZXIoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuZGlzcGF0Y2hlcjtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuRXZlbnRzLkRpc3BhdGNoZXJ9ICBkaXNwYXRjaGVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXREaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBPYmplY3QgTWFuYWdlci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuT2JqZWN0cy5NYW5hZ2VyfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXRNYW5hZ2VyKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLm1hbmFnZXI7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIE9iamVjdCBNYW5hZ2VyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLk1hbmFnZXJ9ICBtYW5hZ2VyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXRNYW5hZ2VyKG1hbmFnZXIpIHtcclxuXHJcblx0XHR0aGlzLm1hbmFnZXIgPSBtYW5hZ2VyO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgRHJhdyBFdmVudCBIYW5kbGVyIGZvciB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzfSAgICAgICAgIGNhbnZhc1xyXG5cdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzQ29udGV4dH0gIGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZHJhdyhjYW52YXMsIGNvbnRleHQpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIE9iamVjdCBpcyBWaXNpYmxlXHJcblx0XHRpZighdGhpcy52aXNpYmxlKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIEV2ZW50IFBhcmFtZXRlcnNcclxuXHRcdHZhciBwYXJhbWV0ZXJzID0ge1xyXG5cdFx0XHQnb2JqZWN0JzogdGhpcyxcclxuXHRcdFx0J2NhbnZhcyc6IGNhbnZhcyxcclxuXHRcdFx0J2NvbnRleHQnOiBjb250ZXh0XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHdlJ3JlIGFsbG93ZWQgdG8gRHJhd1xyXG5cdFx0aWYodGhpcy5maXJlT2JqZWN0RXZlbnQoJ2RyYXdpbmcnLCBwYXJhbWV0ZXJzKSAhPT0gZmFsc2UpIHtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIERyYXcgRXZlbnRcclxuXHRcdFx0dGhpcy5maXJlT2JqZWN0RXZlbnQoJ2RyYXcnLCBwYXJhbWV0ZXJzKTtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIFBvc3QgRHJhdyBFdmVudFxyXG5cdFx0XHR0aGlzLmZpcmVPYmplY3RFdmVudCgnZHJhd24nLCBwYXJhbWV0ZXJzKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Y29udGV4dC5kcmF3TGluZSh0aGlzLngsIHRoaXMueSwgdGhpcy54ICsgMTAsIHRoaXMueSwgJ2dyZWVuJyk7XHJcblx0XHRjb250ZXh0LmRyYXdMaW5lKHRoaXMueCwgdGhpcy55LCB0aGlzLngsIHRoaXMueSArIDEwLCAncmVkJyk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlc3Ryb3lzIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRkZXN0cm95KCkge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSdyZSBhbGxvd2VkIHRvIGRlbGV0ZVxyXG5cdFx0aWYodGhpcy5maXJlT2JqZWN0RXZlbnQoJ2RlbGV0aW5nJykgPT09IGZhbHNlKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBQZXJmb3JtIHRoZSBEZWxldGlvblxyXG5cdFx0dGhpcy5fcGVyZm9ybURlbGV0ZU9uT2JqZWN0KCk7XHJcblxyXG5cdFx0Ly8gT25jZSB0aGUgT2JqZWN0IGhhcyBiZWVuIGRlbGV0ZWQsIHdlJ2xsIGZpcmUgb2ZmIHRoZSBkZWxldGVkXHJcblx0XHQvLyBldmVudCBzbyB0aGF0IGxpc3RlbmVycyBjYW4gZGVmaW5lIHBvc3QtZGVsZXRlIG9wZXJhdGlvbnMuXHJcblx0XHQvLyBGaW5hbGx5LCB3ZSdsbCByZXR1cm4gYm9vbGVhbiB0cnVlIHRvIGluZGljYXRlIHN1Y2Nlc3MuXHJcblxyXG5cdFx0Ly8gRmlyZSB0aGUgRGVsZXRlZCBFdmVudFxyXG5cdFx0dGhpcy5maXJlT2JqZWN0RXZlbnQoJ2RlbGV0ZWQnLCB7fSwgZmFsc2UpO1xyXG5cclxuXHRcdC8vIFJldHVybiBTdWNjZXNzXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgdGhlIHBzZXVkbyBkZWxldGUgb3B0aW9ucyBvbiB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0X3BlcmZvcm1EZWxldGVPbk9iamVjdCgpIHtcclxuXHJcblx0XHQvLyBTdHJhaWdodCB1cCBkZWxldGluZyB0aGlzIG9iamVjdCB3b24ndCBzdWZmaWNlLCBhcyB0aGVcclxuXHRcdC8vIE9iamVjdCBNYW5hZ2VyIGlzIHJlZmVyaW5nIHRoaXMgT2JqZWN0LiBXZSBuZWVkIHRvXHJcblx0XHQvLyB0ZWxsIHRoZSBNYW5hZ2VyIHRvIGRlbGV0ZSB0aGlzIG9iamVjdCBlbnRpcmVseS5cclxuXHJcblx0XHQvLyBUZWxsIHRoZSBPYmplY3QgTWFuYWdlciB0byBkZWxldGUgdGhpcyBPYmplY3RcclxuXHRcdHRoaXMuY29uc3RydWN0b3IuZ2V0TWFuYWdlcigpLmRlbGV0ZUluc3RhbmNlKHRoaXMpO1xyXG5cclxuXHRcdC8vIFdlIGNhbid0IGFjdHVhbGx5IGRlbGV0ZSB0aGlzIG9iamVjdCwgYXMgb25lOiBqYXZhc2NyaXB0XHJcblx0XHQvLyB3b24ndCBhY3R1YWxseSBsZXQgdXMgZG8gdGhhdCBoZXJlLCBhbmQgdHdvOiB3ZSBzdGlsbFxyXG5cdFx0Ly8gbmVlZCB0aGUgb2JqZWN0IGZvciB0aGUgZGVsZXRlZCBldmVudC4gV29ya2Fyb3VuZCFcclxuXHJcblx0XHQvLyBGbGFnIHRoaXMgT2JqZWN0IGFzIG5vbi1leGlzdGFudFxyXG5cdFx0dGhpcy5leGlzdHMgPSBmYWxzZTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgT2JqZWN0IEV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBldmVudFxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhdGljIHJlZ2lzdGVyT2JqZWN0RXZlbnQoZXZlbnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIGEgRGlzcGF0Y2hlciBpcyBzZXRcclxuXHRcdGlmKHRoaXMuZGlzcGF0Y2hlciA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIGNhbGxpbmcgQ2xhc3NcclxuXHRcdHZhciBuYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciB0aGUgQ2FsbGJhY2sgYXMgYSBMaXN0ZW5lclxyXG5cdFx0dGhpcy5kaXNwYXRjaGVyLmxpc3Rlbihgb2JqZWN0cy4ke2V2ZW50fTogJHtuYW1lfWAsIGNhbGxiYWNrKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVmFyaWFudHMgb2Yge0BzZWUgc3RhdGljOjpyZWdpc3Rlck9iamVjdEV2ZW50KCl9LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgb25DcmVhdGUoY2FsbGJhY2spICAgICB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnY3JlYXRlZCcsICAgIGNhbGxiYWNrKTsgfTtcclxuXHRzdGF0aWMgb25QcmVEcmF3KGNhbGxiYWNrKSAgICB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnZHJhd2luZycsICAgIGNhbGxiYWNrKTsgfTtcclxuXHRzdGF0aWMgb25EcmF3KGNhbGxiYWNrKSAgICAgICB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnZHJhdycsICAgICAgIGNhbGxiYWNrKTsgfTtcclxuXHRzdGF0aWMgb25Qb3N0RHJhdyhjYWxsYmFjaykgICB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnZHJhd24nLCAgICAgIGNhbGxiYWNrKTsgfTtcclxuXHRzdGF0aWMgb25CZWZvcmVTdGVwKGNhbGxiYWNrKSB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnc3RlcHBpbmcnLCBjYWxsYmFjayk7IH07XHJcblx0c3RhdGljIG9uU3RlcChjYWxsYmFjaykgICAgICAgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ3N0ZXAnLCAgICAgY2FsbGJhY2spOyB9O1xyXG5cdHN0YXRpYyBvbkFmdGVyU3RlcChjYWxsYmFjaykgIHsgdGhpcy5yZWdpc3Rlck9iamVjdEV2ZW50KCdzdGVwcGVkJywgIGNhbGxiYWNrKTsgfTtcclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgdGhlIHNwZWNpZmllZCBPYmplY3QgRXZlbnQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgZXZlbnRcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICAgcGFyYW1ldGVyc1xyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59ICBoYWx0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRmaXJlT2JqZWN0RXZlbnQoZXZlbnQsIHBhcmFtZXRlcnMgPSB7fSwgaGFsdCA9IHRydWUpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgYSBEaXNwYXRjaGVyIGlzIHNldFxyXG5cdFx0aWYoR2FtZU9iamVjdC5kaXNwYXRjaGVyID09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBFdmVudCBtZXRob2RcclxuXHRcdHZhciBtZXRob2QgPSBoYWx0ID8gJ3VudGlsJyA6ICdmaXJlJztcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIGNhbGxpbmcgQ2xhc3NcclxuXHRcdHZhciBuYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoKTtcclxuXHJcblx0XHQvLyBDYWxsIHRoZSBEaXNwYXRjaGVyXHJcblx0XHRyZXR1cm4gR2FtZU9iamVjdC5kaXNwYXRjaGVyW21ldGhvZF0oYG9iamVjdHMuJHtldmVudH06ICR7bmFtZX1gLCBwYXJhbWV0ZXJzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVmFyaWFudHMgb2Yge0BzZWUgdGhpcy5maXJlT2JqZWN0RXZlbnQoKX0uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGZpcmVCZWZvcmVTdGVwRXZlbnQoKSB7IHRoaXMuZmlyZU9iamVjdEV2ZW50KCdzdGVwcGluZycsIHsnb2JqZWN0JzogdGhpc30pOyB9O1xyXG5cdGZpcmVTdGVwRXZlbnQoKSAgICAgICB7IHRoaXMuZmlyZU9iamVjdEV2ZW50KCdzdGVwJywgICAgIHsnb2JqZWN0JzogdGhpc30pOyB9O1xyXG5cdGZpcmVBZnRlclN0ZXBFdmVudCgpICB7IHRoaXMuZmlyZU9iamVjdEV2ZW50KCdzdGVwcGVkJywgIHsnb2JqZWN0JzogdGhpc30pOyB9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBDbGFzcyBOYW1lIG9mIHRoaXMgT2JqZWN0IGZyb20gYSBTdGF0aWMgQ29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0Q2xhc3NOYW1lKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLnRvU3RyaW5nKCkuc3BsaXQgKCcoJyB8fCAvcysvKVswXS5zcGxpdCAoJyAnIHx8IC9zKy8pWzFdO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBDbGFzcyBOYW1lIG9mIHRoaXMgT2JqZWN0IGZyb20gYW4gSW5zdGFuY2UgQ29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRnZXRDbGFzc05hbWUoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgTWF4IEluc3RhbmNlIElELlxyXG4gKlxyXG4gKiBAdmFyIHtpbnRlZ2VyfVxyXG4gKi9cclxuR2FtZU9iamVjdC5tYXhJbnN0YW5jZUlkID0gMTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuICpcclxuICogQHZhciB7R2FtZS5FdmVudHMuRGlzcGF0Y2hlcnxudWxsfVxyXG4gKi9cclxuR2FtZU9iamVjdC5kaXNwYXRjaGVyID0gbnVsbDtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYm9vdGVkIE9iamVjdHMuXHJcbiAqXHJcbiAqIEB2YXIge29iamVjdH1cclxuICovXHJcbkdhbWVPYmplY3QuX2Jvb3RlZCA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBPYmplY3QgTWFuYWdlci5cclxuICpcclxuICogQHZhciB7R2FtZS5PYmplY3RzLk1hbmFnZXJ8bnVsbH1cclxuICovXHJcbkdhbWVPYmplY3QubWFuYWdlciA9IG51bGw7XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkdhbWVPYmplY3QgPSBHYW1lT2JqZWN0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL09iamVjdHMvR2FtZU9iamVjdC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5FdmVudHMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBFdmVudCBEaXNwYXRjaGVyIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIFRoZSByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgc29ydGVkIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc29ydGVkID0gW107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBldmVudCBmaXJpbmcgc3RhY2suXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHthcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZpcmluZyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGFuIGV2ZW50IGxpc3RlbmVyIHdpdGggdGhlIGRpc3BhdGNoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSAgZXZlbnRzXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICBsaXN0ZW5lclxyXG4gICAgICogQHBhcmFtICB7aW50fSAgICAgICAgICAgcHJpb3JpdHlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBsaXN0ZW4oZXZlbnRzLCBsaXN0ZW5lciwgcHJpb3JpdHkpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgUHJpb3JpdHlcclxuICAgICAgICB2YXIgcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xyXG5cclxuICAgICAgICAvLyBDYXN0IEV2ZW50cyB0byBhbiBBcnJheVxyXG4gICAgICAgIGlmKHR5cGVvZiBldmVudHMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGV2ZW50cyA9IFtldmVudHNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBFdmVudHMgQXJyYXlcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIEV2ZW50XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBFdmVudCAvIExpc3RlbmVyIE9iamVjdFxyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBQcmlvcml0eSBBcnJheVxyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudF1bcHJpb3JpdHldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XVtwcmlvcml0eV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIExpc3RlbmVyIHRvIHRoZSBFdmVudFxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF1bcHJpb3JpdHldLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VMaXN0ZW5lcihsaXN0ZW5lcilcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVubWFyayB0aGUgRXZlbnQgLyBMaXN0ZW5lciBwYWlyaW5nIGFzIFNvcnRlZFxyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZFtldmVudF0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIHNwZWNpZmllZCBFdmVudCB1bnRpbCB0aGUgZmlyc3Qgbm9uLW51bGwgcmVzcG9uc2UgaXMgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICAgICAgICAgcGF5bG9hZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fG51bGx9XHJcbiAgICAgKi9cclxuICAgIHVudGlsKGV2ZW50LCBwYXlsb2FkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyZShldmVudCwgcGF5bG9hZCwgdHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCB0aGUgZGlzcGF0Y2hlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd8b2JqZWN0fSAgZXZlbnRcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgICAgICAgICBwYXlsb2FkXHJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgICAgICAgaGFsdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fG51bGx9XHJcbiAgICAgKi9cclxuICAgIGZpcmUoZXZlbnQsIHBheWxvYWQsIGhhbHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChldmVudCwgcGF5bG9hZCwgaGFsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9ICBldmVudFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgICAgICAgIHBheWxvYWRcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICBoYWx0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7YXJyYXl8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZGlzcGF0Y2goZXZlbnQsIHBheWxvYWQgPSBbXSwgaGFsdCA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIC8vIFdoZW4gdGhlIGdpdmVuIFwiZXZlbnRcIiBpcyBhY3R1YWxseSBhbiBvYmplY3Qgd2Ugd2lsbCBhc3N1bWUgaXQgaXMgYW4gZXZlbnRcclxuICAgICAgICAvLyBvYmplY3QgYW5kIHVzZSB0aGUgY2xhc3MgYXMgdGhlIGV2ZW50IG5hbWUgYW5kIHRoaXMgZXZlbnQgaXRzZWxmIGFzIHRoZVxyXG4gICAgICAgIC8vIHBheWxvYWQgdG8gdGhlIGhhbmRsZXIsIHdoaWNoIG1ha2VzIG9iamVjdCBiYXNlZCBldmVudHMgcXVpdGUgc2ltcGxlLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYW4gRXZlbnQgT2JqZWN0XHJcbiAgICAgICAgaWYodHlwZW9mIGV2ZW50ID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBQYXlsb2FkXHJcbiAgICAgICAgICAgIHBheWxvYWQgPSBbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBFdmVudFxyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZXNwb25zZXNcclxuICAgICAgICB2YXIgcmVzcG9uc2VzID0gW107XHJcblxyXG4gICAgICAgIC8vIElmIGFuIGFycmF5IGlzIG5vdCBnaXZlbiB0byB1cyBhcyB0aGUgcGF5bG9hZCwgd2Ugd2lsbCB0dXJuIGl0IGludG8gb25lIHNvXHJcbiAgICAgICAgLy8gd2UgY2FuIGVhc2lseSB1c2UgZnVuY3Rpb24uYXBwbHkodGhpcykgb24gdGhlIGxpc3RlbmVycywgcGFzc2luZyBpbiB0aGVcclxuICAgICAgICAvLyBwYXlsb2FkIHRvIGVhY2ggb2YgdGhlbSBzbyB0aGF0IHRoZXkgcmVjZWl2ZSBlYWNoIG9mIHRoZXNlIGFyZ3VtZW50cy5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGEgTm9uLUFycmF5IFBheWxvYWRcclxuICAgICAgICBpZih0eXBlb2YgcGF5bG9hZCAhPT0gJ2FycmF5Jykge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGFuIE9iamVjdCBQYXlsb2FkXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwYXlsb2FkID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IE9iamVjdC52YWx1ZXMocGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRyZWF0IHRoZSBQYXlsb2FkIGFzIGEgU2NhbGFyXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IFtwYXlsb2FkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgTGlzdGVuZXJzIHRvIHRoZSBFdmVudFxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldmVudCk7XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIExpc3RlbmVyXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IExpc3RlbmVyXHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgTGlzdGVuZXIgcmVzcG9uc2VcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gbGlzdGVuZXIuYXBwbHkobnVsbCwgW2V2ZW50LCBwYXlsb2FkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhIHJlc3BvbnNlIGlzIHJldHVybmVkIGZyb20gdGhlIGxpc3RlbmVyIGFuZCBldmVudCBoYWx0aW5nIGlzIGVuYWJsZWRcclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBqdXN0IHJldHVybiB0aGlzIHJlc3BvbnNlLCBhbmQgbm90IGNhbGwgdGhlIHJlc3Qgb2YgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIC8vIGxpc3RlbmVycy4gT3RoZXJ3aXNlIHdlIHdpbGwgYWRkIHRoZSByZXNwb25zZSBvbiB0aGUgcmVzcG9uc2UgbGlzdC5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhIHJlc3BvbnNlIHdpdGggaGFsdGluZyBlbmFibGVkXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXNwb25zZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgUmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgYm9vbGVhbiBmYWxzZSBpcyByZXR1cm5lZCBmcm9tIGEgbGlzdGVuZXIsIHdlIHdpbGwgc3RvcCBwcm9wYWdhdGluZ1xyXG4gICAgICAgICAgICAvLyB0aGUgZXZlbnQgdG8gYW55IGZ1cnRoZXIgbGlzdGVuZXJzIGRvd24gaW4gdGhlIGNoYWluLCBlbHNlIHdlIGtlZXAgb25cclxuICAgICAgICAgICAgLy8gbG9vcGluZyB0aHJvdWdoIHRoZSBsaXN0ZW5lcnMgYW5kIGZpcmluZyBldmVyeSBvbmUgaW4gb3VyIHNlcXVlbmNlLlxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGEgZmFsc2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgaWYocmVzcG9uc2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBSZXNwb25zZSB0byB0aGUgbGlzdCBvZiBSZXNwb25zZXNcclxuICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBOVUxMIGluIEhhbHRpbmcgbW9kZSwgZWxzZSB0aGUgUmVzcG9uc2VzXHJcbiAgICAgICAgcmV0dXJuIGhhbHQgPyBudWxsIDogcmVzcG9uc2VzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGV2ZW50TmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRMaXN0ZW5lcnMoZXZlbnROYW1lKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBMaXN0ZW5lcnMgZm9yIHRoZSBFdmVudCByZXF1aXJlIHNvcnRpbmdcclxuICAgICAgICBpZih0aGlzLnNvcnRlZFtldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRbZXZlbnROYW1lXSA9IHRoaXMuX3NvcnRMaXN0ZW5lcnMoZXZlbnROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgc29ydGVkIEV2ZW50IExpc3RlbmVyc1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRlZFtldmVudE5hbWVdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGV2ZW50TmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBfc29ydExpc3RlbmVycyhldmVudE5hbWUpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgbGlzdCBvZiBMaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLnNvcnRlZFtldmVudE5hbWVdID0gW107XHJcblxyXG4gICAgICAgIC8vIEZpcnN0LCBtYWtlIHN1cmUgbGlzdGVuZXJzIGZvciB0aGUgRXZlbnQgYWN0dWFsbHkgZXhpc3RcclxuICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIGxpc3RlbmVycyBhcmUgZ3JvdXBlZCBieSBwcmlvcml0eSwgd2hpY2ggd2UnbGwgd2FudCBpblxyXG4gICAgICAgIC8vIGRlc2NlbmRpbmcgb3JkZXIgKHNvIHRoYXQgaGlnaGVzdCBwcmlvcml0eSBnb2VzIGZpcnN0KS5cclxuICAgICAgICAvLyBXZSBzaG91bGQgYWxzbyB0cnkgdG8gcmV0YWluIHRoZSBpbnRlcm5hbCBvcmRlcmluZy5cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBQcmlvcml0aWVzXHJcbiAgICAgICAgdmFyIHByaW9yaXRpZXMgPSBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB0aGUgUHJpb3JpdGllc1xyXG4gICAgICAgIHByaW9yaXRpZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAvLyBSZXZlcnNlIHRoZSBQcmlvcnRpZXMgdG8gZ2V0IHRoZW0gaW50byBEZXNjZW5kaW5nIE9yZGVyXHJcbiAgICAgICAgcHJpb3JpdGllcy5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIExpc3RlbmVyc1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBQcmlvcml0aWVzXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHByaW9yaXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgY3VycmVudCBQcmlvcml0eVxyXG4gICAgICAgICAgICB2YXIgcHJpb3JpdHkgPSBwcmlvcml0aWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBMaXN0ZW5lcnMgb2YgdGhlIGN1cnJlbnQgUHJpb3JpdHkgdG8gdGhlIGxpc3Qgb2YgTGlzdGVuZXJzXHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQodGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXVtwcmlvcml0eV0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgTGlzdGVuZXJzXHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgSGFuZGxlciBmb3IgdGhlIHNwZWNpZmllZCBMaXN0ZW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICAgbGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICB3aWxkY2FyZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBtYWtlTGlzdGVuZXIobGlzdGVuZXIsIHdpbGRjYXJkID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIFN0cmluZ1xyXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2xhc3NMaXN0ZW5lcihsaXN0ZW5lciwgd2lsZGNhcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIHRoZSBMaXN0ZW5lciBhcyBhIEZ1bmN0aW9uXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50LCBwYXlsb2FkKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgTGlzdGVuZXIgd2FzIGEgV2lsZGNhcmRcclxuICAgICAgICAgICAgaWYod2lsZGNhcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcihldmVudCwgcGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSB0aGUgTGlzdGVuZXIgdXNpbmcgdGhlIFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyKC4uLnBheWxvYWQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgSGFuZGxlciBvZiB0aGUgTGlzdGVuZXJcclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlO1xyXG5cclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9FdmVudHMvRGlzcGF0Y2hlci5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5Db250YWluZXInKTtcclxuXHJcbmltcG9ydCBPYmogZnJvbSAnRW5naW5lL1N1cHBvcnQvT2JqLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhaW5lciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgQ29udGFpbmVyIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3RoaXN9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBhcnJheSBvZiB0aGUgdHlwZXMgdGhhdCBoYXZlIGJlZW4gcmVzb2x2ZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZWQgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGNvbnRhaW5lcidzIGJpbmRpbmdzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2JpbmRpbmdzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBjb250YWluZXIncyBtZXRob2QgYmluZGluZ3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fbWV0aG9kQmluZGluZ3MgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGNvbnRhaW5lcidzIHNoYXJlZCBpbnN0YW5jZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5faW5zdGFuY2VzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSByZWdpc3RlcmVkIHR5cGUgYWxpYXNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9hbGlhc2VzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSByZWdpc3RlcmVkIGFsaWFzZXMga2V5ZWQgYnkgdGhlIGFic3RyYWN0IG5hbWUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fYWJzdHJhY3RBbGlhc2VzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBleHRlbnNpb24gY2xvc3VyZXMgZm9yIHNlcnZpY2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2V4dGVuZGVycyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgb2YgdGhlIHJlZ2lzdGVyZWQgdGFncy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3RhZ3MgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHN0YWNrIG9mIGNvbmNyZXRpb25zIGN1cnJlbnRseSBiZWluZyBidWlsdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2J1aWxkU3RhY2sgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHBhcmFtZXRlciBvdmVycmlkZSBzdGFjay5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3dpdGggPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGNvbnRleHR1YWwgYmluZGluZyBtYXAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5jb250ZXh0dWFsID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBvZiB0aGUgcmVnaXN0ZXJlZCByZWJvdW5kIGNhbGxiYWNrcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3JlYm91bmRDYWxsYmFja3MgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIG9mIHRoZSBnbG9iYWwgcmVzb2x2aW5nIGNhbGxiYWNrcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbFJlc29sdmluZ0NhbGxiYWNrcyA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgb2YgdGhlIGdsb2JhbCBhZnRlciByZXNvbHZpbmcgY2FsbGJhY2tzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIG9mIHRoZSBhZnRlciByZXNvbHZpbmcgY2FsbGJhY2tzIGJ5IGNsYXNzIHR5cGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHthcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9yZXNvbHZpbmdDYWxsYmFja3MgPSBbXTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIG9mIHRoZSBhZnRlciByZXNvbHZpbmcgY2FsbGJhY2tzIGJ5IGNsYXNzIHR5cGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHthcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9hZnRlclJlc29sdmluZ0NhbGxiYWNrcyA9IFtdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZWZpbmVzIGEgY29udGV4dHVhbCBiaW5kaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGNvbmNyZXRlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKi9cclxuICAgIHdoZW4oY29uY3JldGUpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHRvZG8gSW1wbGVtZW50YXRpb25cclxuICAgICAgICAgKi9cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIEFic3RyYWN0IFR5cGUgaGFzIGJlZW4gYm91bmQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBib3VuZChhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLl9iaW5kaW5nc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICB8fCAodHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICB8fCB0aGlzLmlzQWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGlhcyBvZiB7QHNlZSAkdGhpcy0+Ym91bmQoKX0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBoYXMoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm91bmQoYWJzdHJhY3QpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgQWJzdHJhY3QgVHlwZSBoYXMgYmVlbiByZXNvbHZlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHJlc29sdmVkKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBBYnN0cmFjdCBpcyBhbiBBbGlhc1xyXG4gICAgICAgIGlmKHRoaXMuaXNBbGlhcyhhYnN0cmFjdCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIEFsaWFzXHJcbiAgICAgICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgSW5zdGFuY2UgaGFzIGJlZW4gcmVzb2x2ZWQgb3Igc2hhcmVkXHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGhpcy5fcmVzb2x2ZWRbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJylcclxuICAgICAgICAgICAgfHwgKHR5cGVvZiB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIFR5cGUgaXMgc2hhcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNTaGFyZWQoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEluc3RhbmNlIGlzIHNoYXJlZFxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBCaW5kaW5nIGlzIFNoYXJlZFxyXG4gICAgICAgIGlmKHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBUeXBlIGlzIG5vdCBzaGFyZWRcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBzdHJpbmcgaXMgcmVnaXN0ZXJlZCBhcyBhbiBBbGlhcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNBbGlhcyhuYW1lKSB7XHJcblxyXG4gICAgICAgIHJldHVybiAodHlwZW9mIHRoaXMuX2FsaWFzZXNbbmFtZV0gIT09ICd1bmRlZmluZWQnKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgQmluZGluZyB3aXRoIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufHN0cmluZ3xudWxsfSAgY29uY3JldGVcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgICAgICAgc2hhcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYmluZChhYnN0cmFjdCwgY29uY3JldGUsIHNoYXJlZCkge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBBcmd1bWVudHNcclxuICAgICAgICB2YXIgY29uY3JldGUgPSBjb25jcmV0ZSB8fCBudWxsO1xyXG4gICAgICAgIHZhciBzaGFyZWQgPSBzaGFyZWQgfHwgZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIElmIG5vIGNvbmNyZXRlIHR5cGUgd2FzIGdpdmVuLCB3ZSB3aWxsIHNpbXBseSBzZXQgdGhlIGNvbmNyZXRlIHR5cGUgdG8gdGhlXHJcbiAgICAgICAgLy8gYWJzdHJhY3QgdHlwZS4gQWZ0ZXIgdGhhdCwgdGhlIGNvbmNyZXRlIHR5cGUgdG8gYmUgcmVnaXN0ZXJlZCBhcyBzaGFyZWRcclxuICAgICAgICAvLyB3aXRob3V0IGJlaW5nIGZvcmNlZCB0byBzdGF0ZSB0aGVpciBjbGFzc2VzIGluIGJvdGggb2YgdGhlIHBhcmFtZXRlcnMuXHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBzaGFyZWQgYW5kIGFsaWFzZWQgaW5zdGFuY2VzXHJcbiAgICAgICAgdGhpcy5fZHJvcFN0YWxlSW5zdGFuY2VzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSBDb25jcmV0ZSBkZWZpbml0aW9uIHdhc24ndCBwcm92aWRlZFxyXG4gICAgICAgIGlmKGNvbmNyZXRlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmluZSB0aGUgQ29uY3JldGUgYXMgdGhlIEFic3RyYWN0XHJcbiAgICAgICAgICAgIGNvbmNyZXRlID0gYWJzdHJhY3Q7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGZhY3RvcnkgaXMgbm90IGEgQ2xvc3VyZSwgaXQgbWVhbnMgaXQgaXMganVzdCBhIGNsYXNzIG5hbWUgd2hpY2ggaXNcclxuICAgICAgICAvLyBib3VuZCBpbnRvIHRoaXMgY29udGFpbmVyIHRvIHRoZSBhYnN0cmFjdCB0eXBlIGFuZCB3ZSB3aWxsIGp1c3Qgd3JhcCBpdFxyXG4gICAgICAgIC8vIHVwIGluc2lkZSBpdHMgb3duIENsb3N1cmUgdG8gZ2l2ZSB1cyBtb3JlIGNvbnZlbmllbmNlIHdoZW4gZXh0ZW5kaW5nLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY29uY3JldGUgaXNuJ3QgYSBDbG9zdXJlXHJcbiAgICAgICAgaWYodHlwZW9mIGNvbmNyZXRlICE9PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBjbG9zdXJlIGZyb20gdGhlIEFic3RyYWN0IGFuZCBDb25jcmV0ZVxyXG4gICAgICAgICAgICBjb25jcmV0ZSA9IHRoaXMuX2dldENsb3N1cmUoYWJzdHJhY3QsIGNvbmNyZXRlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZWZpbmUgdGhlIEJpbmRpbmdcclxuICAgICAgICB0aGlzLl9iaW5kaW5nc1thYnN0cmFjdF0gPSB7XHJcbiAgICAgICAgICAgICdjb25jcmV0ZSc6IGNvbmNyZXRlLFxyXG4gICAgICAgICAgICAnc2hhcmVkJzogc2hhcmVkXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGFic3RyYWN0IHR5cGUgd2FzIGFscmVhZHkgcmVzb2x2ZWQgaW4gdGhpcyBjb250YWluZXIgd2UnbGwgZmlyZSB0aGVcclxuICAgICAgICAvLyByZWJvdW5kIGxpc3RlbmVyIHNvIHRoYXQgYW55IG9iamVjdHMgd2hpY2ggaGF2ZSBhbHJlYWR5IGdvdHRlbiByZXNvbHZlZFxyXG4gICAgICAgIC8vIGNhbiBoYXZlIHRoZWlyIGNvcHkgb2YgdGhlIG9iamVjdCB1cGRhdGVkIHZpYSB0aGUgbGlzdGVuZXIgY2FsbGJhY2tzLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgQWJzdHJhY3QgVHlwZSB3YXMgYWxyZWFkeSByZXNvbHZlZFxyXG4gICAgICAgIGlmKHRoaXMucmVzb2x2ZWQoYWJzdHJhY3QpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJlIHRoZSBSZWJvdW5kIEV2ZW50XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYm91bmQoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIEJpbmRpbmcgd2l0aCB0aGlzIENvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29uY3JldGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgX2dldENsb3N1cmUoYWJzdHJhY3QsIGNvbmNyZXRlKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgQ2xvc3VyZVxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjb250YWluZXIsIHBhcmFtZXRlcnMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFic3RyYWN0IGlzIHRoZSBDb25jcmV0ZVxyXG4gICAgICAgICAgICBpZihhYnN0cmFjdCA9PSBjb25jcmV0ZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBDb25jcmV0ZSBpbnN0YW5jZSB3aXRob3V0IHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb250YWluZXIuYnVpbGQoY29uY3JldGUpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgQ29uY3JldGUgaW5zdGFuY2Ugd2l0aCBwYXJtYWV0ZXJzXHJcbiAgICAgICAgICAgIHJldHVybiBjb250YWluZXIubWFrZShjb25jcmV0ZSwgcGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBNZXRob2QgQmluZGluZyBleGlzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaGFzTWV0aG9kQmluZGluZyhtZXRob2QpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGhpcy5fbWV0aG9kQmluZGluZ3NbbWV0aG9kXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyB0aGUgc3BlY2lmaWVkIENhbGxiYWNrIHRvIHRoZSBnaXZlbiBtZXRob2Qgc28gdGhhdCBpdCBtYXkgcmVzb2x2ZSB1c2luZyB7QHNlZSBDb250YWluZXIuY2FsbCgpfS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIG1ldGhvZFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGJpbmRNZXRob2QobWV0aG9kLCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICB0aGlzLl9tZXRob2RCaW5kaW5nc1ttZXRob2RdID0gY2FsbGJhY2s7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHRoZSBzcGVjaWZpZWQgTWV0aG9kIEJpbmRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBjYWxsTWV0aG9kQmluZGluZyhtZXRob2QsIGluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgQ2FsbGJhY2tcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLl9tZXRob2RCaW5kaW5nc1ttZXRob2RdO1xyXG5cclxuICAgICAgICAvLyBJbnZva2UgdGhlIENhbGxiYWNrXHJcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGluc3RhbmNlLCB0aGlzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyB0aGUgc3BlY2lmaWVkIENvbnRleHR1YWwgQmluZGluZyB0byB0aGlzIENvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICBjb25jcmV0ZVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufHN0cmluZ30gIGltcGxlbWVudGF0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYWRkQ29udGV4dHVhbEJpbmRpbmcoY29uY3JldGUsIGFic3RyYWN0LCBpbXBsZW1lbnRhdGlvbikge1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHR1YWxbY29uY3JldGVdW3RoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpXSA9IGltcGxlbWVudGF0aW9uO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBCaW5kaW5nIGlmIGl0IGhhc24ndCBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgICAgIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbnxzdHJpbmd8bnVsbH0gIGNvbmNyZXRlXHJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgICAgICAgICAgICAgIHNoYXJlZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGJpbmRJZihhYnN0cmFjdCwgY29uY3JldGUsIHNoYXJlZCkge1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIEJpbmRpbmcgaGFzbid0IGFscmVhZHkgYmVlbiByZWdpc3RlcmVkXHJcbiAgICAgICAgaWYoIXRoaXMuYm91bmQoYWJzdHJhY3QpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgQmluZGluZ1xyXG4gICAgICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIGNvbmNyZXRlLCBzaGFyZWQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIHNoYXJlZCBiaW5kaW5nIHRvIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufHN0cmluZ3xudWxsfSAgY29uY3JldGVcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgICAgICAgc2hhcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYmluZElmKGFic3RyYWN0LCBjb25jcmV0ZSwgc2hhcmVkID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIEJpbmRpbmdcclxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIGNvbmNyZXRlLCBzaGFyZWQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBzaGFyZWQgYmluZGluZyB0byB0aGlzIENvbnRhaW5lci5cclxuICAgICAqL1xyXG4gICAgc2luZ2xldG9uKGFic3RyYWN0LCBjb25jcmV0ZSA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmJpbmQoYWJzdHJhY3QsIGNvbmNyZXRlLCB0cnVlKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeHRlbmQgdGhlIHNwZWNpZmllZCBBYnN0cmFjdCBUeXBlIGluIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBleHRlbmQoYWJzdHJhY3QsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgYW55IGFsaWFzZXNcclxuICAgICAgICB2YXIgYWJzdHJhY3QgPSB0aGlzLmdldEFsaWFzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFic3RyYWN0IFR5cGUgaXMgc2hhcmVkXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZWJpbmQgdGhlIFNoYXJlZCBJbnN0YW5jZVxyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdID0gY2FsbGJhY2sodGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XSwgdGhpcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBGaXJlIHRoZSBSZWJvdW5kIEV2ZW50XHJcbiAgICAgICAgICAgIHRoaXMuX3JlYm91bmQoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFzc3VtZSB0aGUgQWJzdHJhY3QgVHlwZSBpc24ndCBzaGFyZWRcclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIEV4dGVuZGVycyBpZiB0aGV5IGRvbid0IGV4aXN0XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLl9leHRlbmRlcnNbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXh0ZW5kZXJzW2Fic3RyYWN0XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZWdpc3RlciB0aGUgRXh0ZW5kZXJcclxuICAgICAgICAgICAgdGhpcy5fZXh0ZW5kZXJzW2Fic3RyYWN0XS5wdXNoKGNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBBYnN0cmFjdCBUeXBlIGhhcyBiZWVuIHJlc29sdmVkXHJcbiAgICAgICAgICAgIGlmKHRoaXMucmVzb2x2ZWQoYWJzdHJhY3QpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRmlyZSB0aGUgUmVib3VuZCBFdmVudFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVib3VuZChhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIGFuIGV4aXN0aW5nIEluc3RhbmNlIGFzIHNoYXJlZCBpbiB0aGlzIENvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgaW5zdGFuY2VcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgaW5zdGFuY2UoYWJzdHJhY3QsIGluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhbnkgQWJzdHJhY3QgQWxpYXNlc1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZUFic3RyYWN0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBXZSdsbCBjaGVjayB0byBkZXRlcm1pbmUgaWYgdGhpcyB0eXBlIGhhcyBiZWVuIGJvdW5kIGJlZm9yZSwgYW5kIGlmIGl0IGhhc1xyXG4gICAgICAgIC8vIHdlIHdpbGwgZmlyZSB0aGUgcmVib3VuZCBjYWxsYmFja3MgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjb250YWluZXIgYW5kIGl0XHJcbiAgICAgICAgLy8gY2FuIGJlIHVwZGF0ZWQgd2l0aCBjb25zdW1pbmcgY2xhc3NlcyB0aGF0IGhhdmUgZ290dGVuIHJlc29sdmVkIGhlcmUuXHJcblxyXG4gICAgICAgIC8vIFJlbWVtYmVyIHdoZXRoZXIgb3Igbm90IHRoZSBpbnN0YW5jZSB3YXMgYm91bmRcclxuICAgICAgICB2YXIgaXNCb3VuZCA9IHRoaXMuYm91bmQoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZpbmFsIEFsaWFzXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2FsaWFzZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgICAgICAvLyBCaW5kIHRoZSBJbnN0YW5jZSBhcyBzaGFyZWRcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdID0gaW5zdGFuY2U7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBJbnN0YW5jZSB3YXMgb3JpZ2luYWxseSBib3VuZFxyXG4gICAgICAgIGlmKGlzQm91bmQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcmUgdGhlIFJlYm91bmQgRXZlbnRcclxuICAgICAgICAgICAgdGhpcy5fcmVib3VkKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIEluc3RhbmNlXHJcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgQWxpYXMgZm9yIHRoZSBDb250ZXh0dWFsIEJpbmRpbmcgQWxpYXMgQ2FjaGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgc2VhcmNoXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX3JlbW92ZUFic3RyYWN0QWxpYXMoc2VhcmNoKSB7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBTZWFyY2ggaXNuJ3QgYW4gQWxpYXMsIHRoZW4gZG9uJ3QgYm90aGVyXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2FsaWFzZXNbc2VhcmNoXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBBYnN0cmFjdCBBbGlhc2VzXHJcbiAgICAgICAgZm9yKHZhciBhYnN0cmFjdCBpbiB0aGlzLl9hYnN0cmFjdEFsaWFzZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgUHJvcGVydHkgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9hYnN0cmFjdEFsaWFzZXMuaGFzT3duUHJvcGVydHkoYWJzdHJhY3QpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBBbGlhc2VzXHJcbiAgICAgICAgICAgIHZhciBhbGlhc2VzID0gdGhpcy5fYWJzdHJhY3RBbGlhc2VzW2Fic3RyYWN0XTtcclxuXHJcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgQWxpYXNlc1xyXG4gICAgICAgICAgICBmb3IodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhbGlhc2VzLmxlbmd0aDsgaW5kZXgrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgQWxpYXNcclxuICAgICAgICAgICAgICAgIHZhciBhbGlhcyA9IGFsaWFzZXNbaW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBBbGlhcyBpcyB0aGUgU2VhcmNoIEtleVxyXG4gICAgICAgICAgICAgICAgaWYoYWxpYXMgPT0gc2VhcmNoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgQWJzdHJhY3QgQWxpYXNcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYWJzdHJhY3RBbGlhc2VzW2Fic3RyYWN0XVtpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIEFsaWFzIGZvciB0aGUgQ29udGV4dHVhbCBCaW5kaW5nIEFsaWFzIENhY2hlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gIGFic3RyYWN0c1xyXG4gICAgICogQHBhcmFtICB7Li4uc3RyaW5nfSAgICAgLi4udGFnc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHRhZyhhYnN0cmFjdHMsIC4uLnRhZ3MpIHtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBBYnN0cmFjdHNcclxuICAgICAgICBpZih0eXBlb2YgYWJzdHJhY3RzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB2YXIgYWJzdHJhY3RzID0gW2Fic3RyYWN0c107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBUYWdcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IFRhZ1xyXG4gICAgICAgICAgICB2YXIgdGFnID0gdGFnc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBUYWcgaGFzbid0IGJlZW4gaW5pdGlhbGl6ZWRcclxuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMuX3RhZ3NbdGFnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBUYWdzXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YWdzW3RhZ10gPSBbXTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgdGhlIEFic3RyYWN0c1xyXG4gICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgYWJzdHJhY3RzLmxlbmd0aDsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IEFic3RyYWN0XHJcbiAgICAgICAgICAgICAgICB2YXIgYWJzdHJhY3QgPSBhYnN0cmFjdHNbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWRkIGVhY2ggQWJzdHJhY3RcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhZ3NbdGFnXS5wdXNoKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYWxsIG9mIHRoZSB0YWdzIGZvciB0aGUgZ2l2ZW4gYmluZGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICB0YWdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgdGFnZ2VkKHRhZykge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZXN1bHRzXHJcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSB0YWcgZXhpc3RzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX3RhZ3NbdGFnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHRhZ3NcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGFnc1t0YWddLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgYWJzdHJhY3QgYmluZGluZ1xyXG4gICAgICAgICAgICB2YXIgYWJzdHJhY3QgPSB0aGlzLl90YWdzW3RhZ11baV07XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHRoZSBiaW5kaW5nIGFuZCBhcHBlbmQgaXQgdG8gdGhlIHJlc3VsdHNcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMubWFrZShhYnN0cmFjdCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgUmVzdWx0c1xyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGlhc2VzIHRoZSBzcGVjaWZpZWQgdHlwZSB0byBhIGRpZmZlcmVudCBuYW1lLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhbGlhc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGFsaWFzKGFic3RyYWN0LCBhbGlhcykge1xyXG5cclxuICAgICAgICAvLyBBc3NpZ24gdGhlIEFsaWFzXHJcbiAgICAgICAgdGhpcy5fYWxpYXNlc1thbGlhc10gPSBhYnN0cmFjdDtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgQWJzdHJhY3QgQWxpYXNlc1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBcHBlbmQgdGhlIEFic3RyYWN0IEFsaWFzXHJcbiAgICAgICAgdGhpcy5fYWJzdHJhY3RBbGlhc2VzW2Fic3RyYWN0XS5wdXNoKGFsaWFzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQmluZHMgdGhlIHNwZWNpZmllZCBjYWxsYmFjayB0byBhbiBhYnN0cmFjdCdzIHJlYmluZCBldmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKi9cclxuICAgIHJlYmluZGluZyhhYnN0cmFjdCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgLy8gUmVzb2x2ZSBhbnkgYWxpYXNlc1xyXG4gICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZWJvdW5kIENhbGxiYWNrc1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9yZWJvdW5kQ2FsbGJhY2tzW2Fic3RyYWN0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVib3VuZENhbGxiYWNrc1thYnN0cmFjdF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgcmViaW5kIGNhbGxiYWNrXHJcbiAgICAgICAgdGhpcy5fcmVib3VuZENhbGxiYWNrc1thYnN0cmFjdF0ucHVzaChjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBBYnN0cmFjdCBhcyBhbHJlYWR5IGJlZW4gYm91bmRcclxuICAgICAgICBpZih0aGlzLmJvdW5kKGFic3RyYWN0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlKGFic3RyYWN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBOVUxMXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZnJlc2ggYW4gaW5zdGFuY2UgdXNpbmcgdGhlIGdpdmVuIHRhcmdldCBhbmQgbWV0aG9kLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICB0YXJnZXRcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIG1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICByZWZyZXNoKGFic3RyYWN0LCB0YXJnZXQsIG1ldGhvZCkge1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciBhIFJlYmluZGluZyBDYWxsYmFja1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlYmluZGluZyhhYnN0cmFjdCwgZnVuY3Rpb24oYXBwLCBpbnN0YW5jZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgVGFyZ2V0J3MgTWV0aG9kXHJcbiAgICAgICAgICAgIHRhcmdldFttZXRob2RdKGluc3RhbmNlKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEludm9rZSB0aGUgXCJyZWJvdW5kXCIgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIF9yZWJvdW5kKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgdGhlIGluc3RhbmNlXHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5tYWtlKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSByZWJvdW5kIGNhbGxiYWNrc1xyXG4gICAgICAgIGZvcihsZXQgY2FsbGJhY2sgb2YgdGhpcy5fZ2V0UmVib3VuZENhbGxiYWNrcyhhYnN0cmFjdCkpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgW3RoaXMsIGluc3RhbmNlXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSByZWJvdW5kIGNhbGxiYWNrcyBmb3IgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgX2dldFJlYm91bmRDYWxsYmFja3MoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSByZWJvdW5kIGNhbGxiYWNrcyBleGlzdFxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9yZWJvdW5kQ2FsbGJhY2tzW2Fic3RyYWN0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSByZWJvdW5kIGNhbGxiYWNrc1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWJvdW5kQ2FsbGJhY2tzW2Fic3RyYWN0XTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgdGhlIGdpdmVuIGNsb3N1cmUgc3VjaCB0aGF0IGl0cyBkZXBlbmRlbmNpZXMgd2lsbCBiZSBpbmplY3RlZCB3aGVuIGV4ZWN1dGVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgICAgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICB3cmFwKGNhbGxiYWNrLCBwYXJhbWV0ZXJzID0gW10pIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIGEgd3JhcHBpbmcgY2xvc3VyZVxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGwoY2FsbGJhY2ssIHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIHRoZSBnaXZlbiBDbG9zdXJlIC8gY2xhc3NAbWV0aG9kIGFuZCBpbmplY3RzIGl0cyBkZXBlbmRlbmNpZXMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb258c3RyaW5nfSAgY2FsbGJhY2tcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgICAgICAgICAgIHBhcmFtZXRlcnNcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xudWxsfSAgICAgIGRlZmF1bHRNZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgY2FsbChjYWxsYmFjaywgcGFyYW1ldGVycyA9IFtdLCBkZWZhdWx0TWV0aG9kID0gbnVsbCkge1xyXG5cclxuICAgICAgICByZXR1cm4gRnJhbWV3b3JrLkJvdW5kTWV0aG9kLmNhbGwodGhpcywgY2FsbGJhY2ssIHBhcmFtZXRlcnMsIGRlZmF1bHRNZXRob2QpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgY2xvc3VyZSB0byByZXNvbHZlIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlIGZyb20gdGhpcyBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cclxuICAgICAqL1xyXG4gICAgZmFjdG9yeShhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGNsb3N1cmVcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYWtlKGFic3RyYWN0KTtcclxuICAgICAgICB9KS5iaW5kKHRoaXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbGlhcyBvZiB7QHNlZSB0aGlzLm1ha2UoKX0uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgbWFrZVdpdGgoYWJzdHJhY3QsIHBhcmFtZXRlcnMgPSBbXSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1ha2UoYWJzdHJhY3QsIHBhcmFtZXRlcnMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc29sdmVzIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlIGZyb20gdGhpcyBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgbWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZShhYnN0cmFjdCwgcGFyYW1ldGVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXMgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUgZm9ybSB0aGlzIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICpcclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gICAgICovXHJcbiAgICBnZXQoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBBYnN0cmFjdCB0eXBlIGlzIGRlZmluZWRcclxuICAgICAgICBpZighdGhpcy5oYXMoYWJzdHJhY3QpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQWJzdHJhY3QgdHlwZSBbJHthYnN0cmFjdH1dIGlzIG5vdCBib3VuZCB0byB0aGUgY29udGFpbmVyLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzb2x2ZSB0aGUgQWJzdHJhY3QgdHlwZVxyXG4gICAgICAgIHJldHVybiB0aGlzLnJlc29sdmUoYWJzdHJhY3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc29sdmVzIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlIGZyb20gdGhpcyBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgIHBhcmFtZXRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgcmVzb2x2ZShhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgYW55IGFsaWFzZXNcclxuICAgICAgICB2YXIgYWJzdHJhY3QgPSB0aGlzLmdldEFsaWFzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRoZSBpbnN0YW5jZSB3aWxsIG5lZWQgY29udGV4dHVhbCBiaW5kaW5nXHJcbiAgICAgICAgdmFyIG5lZWRzQ29udGV4dHVhbEJ1aWxkID0gcGFyYW1ldGVycy5sZW5ndGggIT09IDAgfHwgdGhpcy5fZ2V0Q29udGV4dHVhbENvbmNyZXRlKGFic3RyYWN0KSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gSWYgYW4gaW5zdGFuY2Ugb2YgdGhlIHR5cGUgaXMgY3VycmVudGx5IGJlaW5nIG1hbmFnZWQgYXMgYSBzaW5nbGV0b24gd2UnbGxcclxuICAgICAgICAvLyBqdXN0IHJldHVybiBhbiBleGlzdGluZyBpbnN0YW5jZSBpbnN0ZWFkIG9mIGluc3RhbnRpYXRpbmcgbmV3IGluc3RhbmNlc1xyXG4gICAgICAgIC8vIHNvIHRoZSBkZXZlbG9wZXIgY2FuIGtlZXAgdXNpbmcgdGhlIHNhbWUgb2JqZWN0cyBpbnN0YW5jZSBldmVyeSB0aW1lLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBhbiBpbnN0YW5jZSBhbHJlYWR5IGV4aXN0cyBhcyBhIHNpbmdsZXRvblxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJyAmJiAhbmVlZHNDb250ZXh0dWFsQnVpbGQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQdXNoIHRoZSBQYXJhbWV0ZXJzXHJcbiAgICAgICAgdGhpcy5fd2l0aC5wdXNoKHBhcmFtZXRlcnMpO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvbmNyZXRlIGluc3RhbmNlXHJcbiAgICAgICAgdmFyIGNvbmNyZXRlID0gdGhpcy5fZ2V0Q29uY3JldGUoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBXZSdyZSByZWFkeSB0byBpbnN0YW50aWF0ZSBhbiBpbnN0YW5jZSBvZiB0aGUgY29uY3JldGUgdHlwZSByZWdpc3RlcmVkIGZvclxyXG4gICAgICAgIC8vIHRoZSBiaW5kaW5nLiBUaGlzIHdpbGwgaW5zdGFudGlhdGUgdGhlIHR5cGVzLCBhcyB3ZWxsIGFzIHJlc29sdmUgYW55IG9mXHJcbiAgICAgICAgLy8gaXRzIFwibmVzdGVkXCIgZGVwZW5kZW5jaWVzIHJlY3Vyc2l2ZWx5IHVudGlsIGFsbCBoYXZlIGdvdHRlbiByZXNvbHZlZC5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGluc3RhbmNlIGlzIGJ1aWxkYWJsZVxyXG4gICAgICAgIGlmKHRoaXMuX2lzQnVpbGRhYmxlKGNvbmNyZXRlLCBhYnN0cmFjdCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlJ3JlIGZpbmFsbHkgYXQgYSBwb2ludCB0byB3aGVyZSB3ZSBjYW4gYnVpbGQgdGhlIGNvbmNyZXRlXHJcbiAgICAgICAgICAgIC8vIHR5cGUsIHByb3ZpZGluZyB1cyB3aXRoIGFuIGNvbmNyZXRlIGluc3RhbmNlLiBNb3N0IG9mIHRoZVxyXG4gICAgICAgICAgICAvLyBkZXBlbmRlbmNpZXMgc2hvdWxkIGJlIHJlc29sdmVkIGJ5IG5vdywgc28gd2UncmUgZ29vZC5cclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5idWlsZChjb25jcmV0ZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXNzdW1lIHRoZSBpbnN0YW5jZSBpcyBub3QgYnVpbGRhYmxlXHJcbiAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSdyZSBhIHN0ZXAgZnVydGhlciBpbiB0aGUgY2hhaW4sIGJ1dCB3ZSdyZSBub3QgcXVpdGUgZG9uZVxyXG4gICAgICAgICAgICAvLyB5ZXQuIFdlJ2xsIGhhdmUgdG8gY2FsbCBtYWtlIG9uIHRoZSBjb25jcmV0ZSB0eXBlIHRvIGdldFxyXG4gICAgICAgICAgICAvLyBldmVuIGZ1cnRoZXIgYWxvbmcsIGhvcGluZyB0aGF0IHdlIGRvbid0IGVuZCB1cCBoZXJlLlxyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgdmFyIG9iamVjdCA9IHRoaXMubWFrZShjb25jcmV0ZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgd2UgZGVmaW5lZCBhbnkgZXh0ZW5kZXJzIGZvciB0aGlzIHR5cGUsIHdlJ2xsIG5lZWQgdG8gc3BpbiB0aHJvdWdoIHRoZW1cclxuICAgICAgICAvLyBhbmQgYXBwbHkgdGhlbSB0byB0aGUgb2JqZWN0IGJlaW5nIGJ1aWx0LiBUaGlzIGFsbG93cyBmb3IgdGhlIGV4dGVuc2lvblxyXG4gICAgICAgIC8vIG9mIHNlcnZpY2VzLCBzdWNoIGFzIGNoYW5naW5nIGNvbmZpZ3VyYXRpb24gb3IgZGVjb3JhdGluZyB0aGUgb2JqZWN0LlxyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEV4dGVuZGVyc1xyXG4gICAgICAgIGZvcihsZXQgZXh0ZW5kZXIgb2YgdGhpcy5fZ2V0RXh0ZW5kZXJzKGFic3RyYWN0KSkge1xyXG5cclxuICAgICAgICAgICAgLy8gSW52b2tlIGVhY2ggRXh0ZW5kZXJcclxuICAgICAgICAgICAgZXh0ZW5kZXIuYXBwbHkobnVsbCwgW29iamVjdCwgdGhpc10pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSByZXF1ZXN0ZWQgdHlwZSBpcyByZWdpc3RlcmVkIGFzIGEgc2luZ2xldG9uIHdlJ2xsIHdhbnQgdG8gY2FjaGUgb2ZmXHJcbiAgICAgICAgLy8gdGhlIGluc3RhbmNlcyBpbiBcIm1lbW9yeVwiIHNvIHdlIGNhbiByZXR1cm4gaXQgbGF0ZXIgd2l0aG91dCBjcmVhdGluZyBhblxyXG4gICAgICAgIC8vIGVudGlyZWx5IG5ldyBpbnN0YW5jZSBvZiBhbiBvYmplY3Qgb24gZWFjaCBzdWJzZXF1ZW50IHJlcXVlc3QgZm9yIGl0LlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgb2JqZWN0IHNob3VsZCBiZSBhIHNpbmdsZXRvblxyXG4gICAgICAgIGlmKHRoaXMuaXNTaGFyZWQoYWJzdHJhY3QpICYmICFuZWVkc0NvbnRleHR1YWxCdWlsZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FjaGUgdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gPSBvYmplY3Q7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmlyZSBhbnkgcmVzb2x2aW5nIGNhbGxiYWNrc1xyXG4gICAgICAgIHRoaXMuX2ZpcmVSZXNvbHZpbmdDYWxsYmFja3MoYWJzdHJhY3QsIG9iamVjdCk7XHJcblxyXG4gICAgICAgIC8vIEJlZm9yZSByZXR1cm5pbmcsIHdlIHdpbGwgYWxzbyBzZXQgdGhlIHJlc29sdmVkIGZsYWcgdG8gXCJ0cnVlXCIgYW5kIHBvcCBvZmZcclxuICAgICAgICAvLyB0aGUgcGFyYW1ldGVyIG92ZXJyaWRlcyBmb3IgdGhpcyBidWlsZC4gQWZ0ZXIgdGhvc2UgdHdvIHRoaW5ncyBhcmUgZG9uZVxyXG4gICAgICAgIC8vIHdlIHdpbGwgYmUgcmVhZHkgdG8gcmV0dXJuIGJhY2sgdGhlIGZ1bGx5IGNvbnN0cnVjdGVkIGNsYXNzIGluc3RhbmNlLlxyXG5cclxuICAgICAgICAvLyBNYXJrIHRoZSBhYnN0cmFjdCBhcyByZXNvbHZlZFxyXG4gICAgICAgIHRoaXMuX3Jlc29sdmVkW2Fic3RyYWN0XSA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIFBvcCB0aGUgUGFyYW1ldGVyc1xyXG4gICAgICAgIHRoaXMuX3dpdGgucG9wKCk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcclxuICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjb25jcmV0ZSB0eXBlIGZvciB0aGUgc3BlY2lmaWVkIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgX2dldENvbmNyZXRlKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIGRldGVybWluZSB0aGUgY29udGV4dHVhbCBjb25jcmV0ZSB0eXBlXHJcbiAgICAgICAgdmFyIGNvbmNyZXRlID0gdGhpcy5fZ2V0Q29udGV4dHVhbENvbmNyZXRlKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGEgY29udGV4dHVhbCBjb25jcmV0ZSB0eXBlXHJcbiAgICAgICAgaWYoY29uY3JldGUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmNyZXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgaGF2ZSBhIHJlZ2lzdGVyZWQgcmVzb2x2ZXIgb3IgY29uY3JldGUgZm9yIHRoZSB0eXBlLCB3ZSdsbCBqdXN0XHJcbiAgICAgICAgLy8gYXNzdW1lIGVhY2ggdHlwZSBpcyBhIGNvbmNyZXRlIG5hbWUgYW5kIHdpbGwgYXR0ZW1wdCB0byByZXNvbHZlIGl0IGFzIGlzXHJcbiAgICAgICAgLy8gc2luY2UgdGhlIGNvbnRhaW5lciBzaG91bGQgYmUgYWJsZSB0byByZXNvbHZlIGNvbmNyZXRlcyBhdXRvbWF0aWNhbGx5LlxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYW4gZXhpc3RpbmcgYmluZGluZ1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9iaW5kaW5nc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGNvbmNyZXRlIHR5cGVcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XVsnY29uY3JldGUnXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVc2UgdGhlIGFic3RyYWN0IHR5cGUgYXMgdGhlIGNvbmNyZXRlIHR5cGVcclxuICAgICAgICByZXR1cm4gYWJzdHJhY3Q7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbnRleHR1YWwgY29uY3JldGUgYmluZGluZyBmb3IgdGhlIHNwZWNpZmllZCBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiAge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29udGV4dHVhbENvbmNyZXRlKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjb250ZXh0dWFsIGJpbmRpbmcgdXNpbmcgdGhlIGFic3RyYWN0IHR5cGVcclxuICAgICAgICB2YXIgYmluZGluZyA9IHRoaXMuX2ZpbmRJbkNvbnRleHR1YWxCaW5kaW5ncyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGEgY29udGV4dHVhbCBiaW5kaW5nIHdhcyBmb3VuZFxyXG4gICAgICAgIGlmKGJpbmRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOZXh0IHdlIG5lZWQgdG8gc2VlIGlmIGEgY29udGV4dHVhbCBiaW5kaW5nIG1pZ2h0IGJlIGJvdW5kIHVuZGVyIGFuIGFsaWFzIG9mIHRoZVxyXG4gICAgICAgIC8vIGdpdmVuIGFic3RyYWN0IHR5cGUuIFNvLCB3ZSB3aWxsIG5lZWQgdG8gY2hlY2sgaWYgYW55IGFsaWFzZXMgZXhpc3Qgd2l0aCB0aGlzXHJcbiAgICAgICAgLy8gdHlwZSBhbmQgdGhlbiBzcGluIHRocm91Z2ggdGhlbSBhbmQgY2hlY2sgZm9yIGNvbnRleHR1YWwgYmluZGluZ3Mgb24gdGhlc2UuXHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgYWJzdHJhY3QgdHlwZSBoYXMgYWxpYXNlc1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJyB8fCBPYmplY3Qua2V5cyh0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdKS5sZW5ndGggPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZXJlIGFyZW4ndCBhbnkgYWxpYXNlcyB0byBzcGluIHRocm91Z2gsIHNvIHN0b3AgaGVyZVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEFic3RyYWN0IEFsaWFzZXNcclxuICAgICAgICBmb3IobGV0IGFsaWFzIG9mIHRoaXMuX2Fic3RyYWN0QWxpYXNlc1thYnN0cmFjdF0pIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBjb250ZXh0dWFsIGJpbmRpbmcgdXNpbmcgdGhlIGFic3RyYWN0IHR5cGVcclxuICAgICAgICAgICAgdmFyIGJpbmRpbmcgPSB0aGlzLl9maW5kSW5Db250ZXh0dWFsQmluZGluZ3MoYWxpYXMpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSBjb250ZXh0dWFsIGJpbmRpbmcgd2FzIGZvdW5kXHJcbiAgICAgICAgICAgIGlmKGJpbmRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBiaW5kaW5nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTm8gYmluZGluZyB3YXMgZm91bmRcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmluZHMgYW5kIHJldHVybnMgdGhlIGNvbmNyZXRlIGJpbmRpbmcgZm9yIHRoZSBnaXZlbiBhYnN0cmFjdCBpbiB0aGUgY29udGV4dHVhbCBiaW5kaW5nIGFycmF5LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIF9maW5kSW5Db250ZXh0dWFsQmluZGluZ3MoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBCdWlsZCBTdGFjayBoYXMgaXRlbXNcclxuICAgICAgICBpZih0aGlzLl9idWlsZFN0YWNrLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBsYXN0IGl0ZW0gaW4gdGhlIGJ1aWxkIHN0YWNrXHJcbiAgICAgICAgdmFyIGJ1aWxkID0gdGhpcy5fYnVpbGRTdGFja1t0aGlzLl9idWlsZFN0YWNrLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBDb250ZXh0dWFsIEJpbmRpbmdcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5jb250ZXh0dWFsW2J1aWxkXVthYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIENvbnRleHR1YWwgQmluZGluZ1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250ZXh0dWFsW2J1aWxkXVthYnN0cmFjdF07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTm8gQ29udGV4dHVhbCBCaW5kaW5nXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGNvbmNyZXRlIHR5cGUgaXMgYnVpbGRhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgIGNvbmNyZXRlXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIF9pc0J1aWxkYWJsZShjb25jcmV0ZSwgYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNvbmNyZXRlIHR5cGUgaXMgdGhlIGFic3RyYWN0IHR5cGUsIG9yIHRoZSBjb25jcmV0ZVxyXG4gICAgICAgIC8vIHR5cGUgaXMgYSBmdW5jdGlvbiwgdGhlbiB3ZSBjYW4gYnVpbGQgdGhlIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB3ZSBoYXZlIHRvIHVzZSBtYWtlIGZvciB0aGUgY29uY3JldGUgdHlwZS5cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBjb25jcmV0ZSB0eXBlIGlmIGJ1aWxkYWJsZVxyXG4gICAgICAgIHJldHVybiBjb25jcmV0ZSA9PT0gYWJzdHJhY3QgfHwgdHlwZW9mIGNvbmNyZXRlID09PSAnZnVuY3Rpb24nO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbnN0YW50aWF0ZSBhIGNvbmNyZXRlIGluc3RhbmNlIG9mIHRoZSBnaXZlbiB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xmdW5jdGlvbn0gIGNvbmNyZXRlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKlxyXG4gICAgICogQHRocm93cyB7RXJyb3J9XHJcbiAgICAgKi9cclxuICAgIGJ1aWxkKGNvbmNyZXRlKSB7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb25jcmV0ZSB0eXBlIGlzIGFjdHVhbGx5IGEgQ2xvc3VyZSwgd2Ugd2lsbCBqdXN0IGV4ZWN1dGUgaXQgYW5kXHJcbiAgICAgICAgLy8gaGFuZCBiYWNrIHRoZSByZXN1bHRzIG9mIHRoZSBmdW5jdGlvbnMsIHdoaWNoIGFsbG93cyBmdW5jdGlvbnMgdG8gYmVcclxuICAgICAgICAvLyB1c2VkIGFzIHJlc29sdmVycyBmb3IgbW9yZSBmaW5lLXR1bmVkIHJlc29sdXRpb24gb2YgdGhlc2Ugb2JqZWN0cy5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNvbmNyZXRlIHR5cGUgaXMgYSBDbG9zdXJlXHJcbiAgICAgICAgaWYodHlwZW9mIGNvbmNyZXRlID09PSAnZnVuY3Rpb24nICYmICFPYmouaXNDbGFzcyhjb25jcmV0ZSkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiB0aGUgY2xvc3VyZVxyXG4gICAgICAgICAgICByZXR1cm4gY29uY3JldGUodGhpcywgdGhpcy5fZ2V0TGFzdFBhcmFtZXRlck92ZXJyaWRlKCkpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvbWV0aW1lcyBDbGFzc2VzIG1heSBiZSBuYW1lc3BhY2VkIGFuZCB0aHVzIG5lc3RlZCBpbiB0aGUgd2luZG93IHZpYVxyXG4gICAgICAgIC8vIG5lc3RlZCBvYmplY3RzLiBBcyBhIGNsYXNzIHN0cmluZywgdGhpcyBjYW4gYmUgZGVub3RlZCB1c2luZyBcImRvdFwiXHJcbiAgICAgICAgLy8gbm90YXRpb24uIElmIG5hbWVzcGFjZXMgYXJlIHVzZWQsIHdlJ2xsIG5lZWQgdG8gcmVzb2x2ZSB0aGVtLlxyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIHRoZSBDbGFzcyBOYW1lc3BhY2VcclxuICAgICAgICB2YXIgZGVmaW5pdGlvbiA9IHRoaXMuX3Jlc29sdmVDbGFzc05hbWVzcGFjZShjb25jcmV0ZSk7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgQ2xhc3MgTmFtZXNwYWNlIHJlc29sdmVkXHJcbiAgICAgICAgaWYoZGVmaW5pdGlvbiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENsYXNzIFske2NvbmNyZXRlfV0gZG9lcyBub3QgZXhpc3QuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB0aGUgdHlwZSBpcyBub3QgaW5zdGFudGlhYmxlLCB0aGUgZGV2ZWxvcGVyIGlzIGF0dGVtcHRpbmcgdG8gcmVzb2x2ZVxyXG4gICAgICAgIC8vIGFuIGFic3RyYWN0IHR5cGUgc3VjaCBhcyBhbiBJbnRlcmZhY2Ugb2YgQWJzdHJhY3QgQ2xhc3MgYW5kIHRoZXJlIGlzXHJcbiAgICAgICAgLy8gbm8gYmluZGluZyByZWdpc3RlcmVkIGZvciB0aGUgYWJzdHJhY3Rpb25zIHNvIHdlIG5lZWQgdG8gYmFpbCBvdXQuXHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgY29uY3JldGUgdHlwZSBpcyBpbnN0YW50aWFibGVcclxuICAgICAgICBpZih0eXBlb2YgZGVmaW5pdGlvbiAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZGVmaW5pdGlvbi5wcm90b3R5cGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ub3RJbnN0YW50aWFibGUoY29uY3JldGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSBjb25jcmV0ZSB0eXBlIHRvIHRoZSBidWlsZCBzdGFja1xyXG4gICAgICAgIHRoaXMuX2J1aWxkU3RhY2sucHVzaChjb25jcmV0ZSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyBJbnN0YW5jZVxyXG4gICAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBkZWZpbml0aW9uO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIENvbnN0cnVjdG9yXHJcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yID0gaW5zdGFuY2UuY29uc3RydWN0b3I7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBjb25zdHJ1Y3RvciBkb2VzIG5vdCB0YWtlIGFueSBhcmdtZW50cywgdGhlbiB0aGVyZSdzIG5vdGhpbmdcclxuICAgICAgICAvLyB0aGF0IHdlIG5lZWQgdG8gcmVzb2x2ZSBhcyBhIGRlcGVuZGVuY3kuIFNpbmNlIHdlIGhhZCB0byBjcmVhdGVcclxuICAgICAgICAvLyBhbiBlbXB0eSBpbnN0YW5jZSB0byBnZXQgdGhlIGNvbnN0cnVjdG9yLCB3ZSBjYW4gcmV0dXJuIGl0LlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgQ29uc3RydWN0b3IgZG9lcyBub3QgcmVxdWlyZSBhbnkgYXJndW1lbnRzXHJcbiAgICAgICAgaWYoY29uc3RydWN0b3IubGVuZ3RoID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGNvbmNyZXRlIGZyb20gdGhlIGJ1aWxkIHN0YWNrXHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkU3RhY2sucG9wKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIG5ldyBJbnN0YW5jZVxyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2Uga25vdyB0aGF0IHRoZSBjbGFzcyByZXF1aXJlcyBhcmd1bWVudHMgZm9yIGl0c1xyXG4gICAgICAgIC8vIGNvbnN0cnVjdG9yLiBXZSdsbCBoYXZlIHRvIGhvcGUgdGhhdCB0aGUgZGV2ZWxvcGVyIHBhc3NlZCB1c1xyXG4gICAgICAgIC8vIHRoZSBwYXJhbWV0ZXJzIG5lZWRlZCB0byBkbyB0aGlzLiBPdGhlcndpc2UsIHdlJ2xsIGZhaWwuXHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgbGFzdCBwYXJhbWV0ZXIgb3ZlcnJpZGVcclxuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHRoaXMuX2dldExhc3RQYXJhbWV0ZXJPdmVycmlkZSgpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBlbm91Z2ggcGFyYW1ldGVycyB3ZXJlIHByb3ZpZGVkXHJcbiAgICAgICAgaWYoY29uc3RydWN0b3IubGVuZ3RoIDw9IHBhcmFtZXRlcnMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGNvbmNyZXRlIGZyb20gdGhlIGJ1aWxkIHN0YWNrXHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkU3RhY2sucG9wKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIG5ldyBJbnN0YW5jZVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGRlZmluaXRpb24oLi4ucGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2Uga25vdyB0aGF0IHRoZSBjbGFzcyByZXF1aXJlcyBhcmd1bWVudHMgZm9yIGl0c1xyXG4gICAgICAgIC8vIGNvbnN0cnVjdG9yLCBidXQgdGhlcmUncyByZWFsbHkgbm8gd2F5IGZvciB1cyB0byBrbm93IHdoYXQgdG9cclxuICAgICAgICAvLyBwYXNzIGluLiBXZSdyZSBzdHVjayB0ZWxsaW5nIHRoZSBkZXZlbG9wZXIgdG8gaGVscCB1cyBvdXQuXHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgY29uY3JldGUgZnJvbSB0aGUgYnVpbGQgc3RhY2tcclxuICAgICAgICB0aGlzLl9idWlsZFN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2xhc3MgJHtkZWZpbml0aW9ufSBoYXMgdW5yZXNvbHZhYmxlIGRlcGVuZGVuY2llcy5gKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgQ2xhc3MgTmFtZSBpbnRvIGEgQ2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29uY3JldGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R8bnVsbH1cclxuICAgICAqL1xyXG4gICAgX3Jlc29sdmVDbGFzc05hbWVzcGFjZShjb25jcmV0ZSkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBcImRvdFwiIG5vdGF0aW9uIGlzbid0IHVzZWRcclxuICAgICAgICBpZihjb25jcmV0ZS5pbmRleE9mKCcuJykgPT09IC0xKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIGltbWVkaWF0ZWx5XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dbY29uY3JldGVdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBleHBsaWN0IGNsYXNzIG5hbWUgaXMgZGVmaW5lZFxyXG4gICAgICAgIGlmKHR5cGVvZiB3aW5kb3dbY29uY3JldGVdICE9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB1c2luZyB0aGUgZXhwbGljaXQgY2xhc3MgbmFtZVxyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93W2NvbmNyZXRlXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBOYW1lc3BhY2UgdG8gdGhlIFdpbmRvd1xyXG4gICAgICAgIHZhciBuYW1lc3BhY2UgPSB3aW5kb3c7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgTmFtZXNwYWNlIHNlZ21lbnRzXHJcbiAgICAgICAgdmFyIHNlZ21lbnRzID0gY29uY3JldGUuc3BsaXQoJy4nKTtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBTZWdtZW50c1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGggLSAxOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgY3VycmVudCBTZWdtZW50XHJcbiAgICAgICAgICAgIHZhciBzZWdtZW50ID0gc2VnbWVudHNbaV07XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmV4dCBOYW1lc3BhY2UgZXhpc3RzXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBuYW1lc3BhY2Vbc2VnbWVudF0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBuYW1lc3BhY2UgPSBuYW1lc3BhY2Vbc2VnbWVudF07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBuZXh0IE5hbWVzcGFjZSBkb2Vzbid0IGV4aXN0XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGZpbmFsIE5hbWVzcGFjZVxyXG4gICAgICAgIHJldHVybiBuYW1lc3BhY2Vbc2VnbWVudHNbc2VnbWVudHMubGVuZ3RoIC0gMV1dO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBsYXN0IHBhcmFtZXRlciBvdmVycmlkZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgX2dldExhc3RQYXJhbWV0ZXJPdmVycmlkZSgpIHtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBudW1iZXIgb2YgcGFyYW1ldGVyIG92ZXJyaWRlc1xyXG4gICAgICAgIHZhciBjb3VudCA9IHRoaXMuX3dpdGgubGVuZ3RoO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGxhc3QgcGFyYW1ldGVyIG92ZXJyaWRlXHJcbiAgICAgICAgcmV0dXJuIGNvdW50ID49IDAgPyB0aGlzLl93aXRoW2NvdW50IC0gMV0gOiBbXTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhyb3dzIGFuIGV4Y2VwdGlvbiBkZXRhaWxpbmcgdGhhdCB0aGUgY29uY3JldGUgdHlwZSBpcyBub3QgaW5zdGFudGlhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGNvbmNyZXRlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqXHJcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn1cclxuICAgICAqL1xyXG4gICAgX25vdEluc3RhbnRpYWJsZShjb25jcmV0ZSkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBCdWlsZCBTdGFja1xyXG4gICAgICAgIGlmKHRoaXMuX2J1aWxkU3RhY2subGVuZ3RoICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIFByZXZpb3VzIEJ1aWxkXHJcbiAgICAgICAgICAgIHZhciBwcmV2aW91cyA9IHRoaXMuX2J1aWxkU3RhY2suam9pbignLCAnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgTWVzc2FnZVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGBUYXJnZXQgWyR7Y29uY3JldGV9XSBpcyBub3QgaW5zdGFudGlhYmxlIHdoaWxlIGJ1aWxkaW5nIFske3ByZXZpb3VzfV0uYDtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgTWVzc2FnZVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IGBUYXJnZXQgWyR7Y29uY3JldGV9XSBpcyBub3QgaW5zdGFudGlhYmxlLmA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhyb3cgdGhlIEV4Y2VwdGlvblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgcmVzb2x2aW5nIGNhbGxiYWNrLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xmdW5jdGlvbn0gYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufG51bGx9ICAgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZXNvbHZpbmcoYWJzdHJhY3QsIGNhbGxiYWNrID0gbnVsbCkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBTdHJpbmcgQWJzdHJhY3RcclxuICAgICAgICBpZih0eXBlb2YgYWJzdHJhY3QgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIGFueSBhbGlhc2VzXHJcbiAgICAgICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBDbG9zdXJlIEFic3RyYWN0IHdpdGhvdXQgQ2FsbGJhY2tcclxuICAgICAgICBpZihjYWxsYmFjayA9PT0gbnVsbCAmJiB0eXBlb2YgYWJzdHJhY3QgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFB1c2ggdGhlIEFic3RyYWN0IHRvIHRoZSBHbG9iYWwgUmVzb2x2aW5nIENhbGxiYWNrc1xyXG4gICAgICAgICAgICB0aGlzLl9nbG9iYWxSZXNvbHZpbmdDYWxsYmFja3MucHVzaChhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZXNvbHZpbmcgQ2FsbGJhY2tzIGZvciB0aGUgQWJzdHJhY3QsIGlmIG5lY2Vzc2FyeVxyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5fcmVzb2x2aW5nQ2FsbGJhY2tzW2Fic3RyYWN0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc29sdmluZ0NhbGxiYWNrc1thYnN0cmFjdF0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUHVzaCB0aGUgQ2FsbGJhY2sgdG8gdGhlIEFic3RyYWN0J3MgUmVzb2x2aW5nIENhbGxiYWNrc1xyXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZpbmdDYWxsYmFja3NbYWJzdHJhY3RdLnB1c2goY2FsbGJhY2spO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIGFsbCBvZiB0aGUgcmVzb2x2aW5nIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX2ZpcmVSZXNvbHZpbmdDYWxsYmFja3MoYWJzdHJhY3QsIG9iamVjdCkge1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBHbG9iYWwgUmVzb2x2aW5nIENhbGxiYWNrc1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDYWxsYmFja0FycmF5KG9iamVjdCwgdGhpcy5fZ2xvYmFsUmVzb2x2aW5nQ2FsbGJhY2tzKTtcclxuXHJcbiAgICAgICAgLy8gRmlyZSB0aGUgQWJzdHJhY3QncyBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgdGhpcy5fZmlyZUNhbGxiYWNrQXJyYXkob2JqZWN0LCB0aGlzLl9nZXRDYWxsYmFja3NGb3JUeXBlKGFic3RyYWN0LCBvYmplY3QsIHRoaXMuX3Jlc29sdmluZ0NhbGxiYWNrcykpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBBZnRlciBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgdGhpcy5fZmlyZUFmdGVyUmVzb2x2aW5nQ2FsbGJhY2tzKGFic3RyYWN0LCBvYmplY3QpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaXJlcyBhbGwgb2YgdGhlIGFmdGVyIHJlc29sdmluZyBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgIG9iamVjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIF9maXJlQWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MoYWJzdHJhY3QsIG9iamVjdCkge1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBHbG9iYWwgQWZ0ZXIgUmVzb2x2aW5nIENhbGxiYWNrc1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDYWxsYmFja0FycmF5KG9iamVjdCwgdGhpcy5fZ2xvYmFsQWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBBYnN0cmFjdCdzIEFmdGVyIFJlc29sdmluZyBDYWxsYmFja3NcclxuICAgICAgICB0aGlzLl9maXJlQ2FsbGJhY2tBcnJheShvYmplY3QsIHRoaXMuX2dldENhbGxiYWNrc0ZvclR5cGUoYWJzdHJhY3QsIG9iamVjdCwgdGhpcy5fYWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MpKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgb2YgdGhlIGNhbGxiYWNrcyBmb3IgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgIG1peGVkXHJcbiAgICAgKiBAcGFyYW0gIHthcnJheX0gICBjYWxsYmFja3NQZXJUeXBlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIF9nZXRDYWxsYmFja3NGb3JUeXBlKGFic3RyYWN0LCBvYmplY3QsIGNhbGxiYWNrc1BlclR5cGUpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgUmVzdWx0c1xyXG4gICAgICAgIHZhciByZXN1bHRzID0gW107XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgQ2FsbGJhY2tzIFBlciBUeXBlXHJcbiAgICAgICAgZm9yKGxldCB0eXBlIGluIGNhbGxiYWNrc1BlclR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgQ2FsbGJhY2tzIGZvciB0aGUgY3VycmVudCBUeXBlXHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFja3MgPSBjYWxsYmFja3NQZXJUeXBlW3R5cGVdO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIFR5cGUgaXMgdGhlIEFic3RyYWN0LCBvciBpZiB0aGUgT2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIHRoZSBUeXBlXHJcbiAgICAgICAgICAgIGlmKHR5cGUgPT09IGFic3RyYWN0IHx8IG9iamVjdCBpbnN0YW5jZW9mIHR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIENhbGxiYWNrcyB0byB0aGUgUmVzdWx0c1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuY29uY2F0KGNhbGxiYWNrcyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBSZXN1bHRzXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIHRoZSBnaXZlbiBhcnJheSBvZiBjYWxsYmFja3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICBvYmplY3RcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgY2FsbGJhY2tzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX2ZpcmVDYWxsYmFja0FycmF5KG9iamVjdCwgY2FsbGJhY2tzKSB7XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgQ2FsbGJhY2tzXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IENhbGxiYWNrXHJcbiAgICAgICAgICAgIGxldCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENhbGwgdGhlIENhbGxiYWNrXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG9iamVjdCwgdGhpcyk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgQmluZGluZ3Mgb2YgdGhpcyBDb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRCaW5kaW5ncygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ3M7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgQWxpYXMgb2YgdGhlIHNwZWNpZmllZCBBYnN0cmFjdCwgaWYgYXZhaWxhYmxlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICpcclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gICAgICovXHJcbiAgICBnZXRBbGlhcyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIEFic3RyYWN0IFR5cGUgaWYgYW4gYWxpYXMgZG9lcyBub3QgZXhpc3RcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fYWxpYXNlc1thYnN0cmFjdF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhYnN0cmFjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgQWJzdHJhY3QgaXMgbm90IGFsaWFzZWQgdG8gaXRzZWxmXHJcbiAgICAgICAgaWYodGhpcy5fYWxpYXNlc1thYnN0cmFjdF0gPT09IGFic3RyYWN0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7YWJzdHJhY3R9XSBpcyBhbGlhc2VkIHRvIGl0c2VsZi5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlY3Vyc2l2ZWx5IGRlcml2ZSB0aGUgQWxpYXNcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRBbGlhcyh0aGlzLl9hbGlhc2VzW2Fic3RyYWN0XSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGV4dGVuZGVyIGNhbGxiYWNrcyBmb3IgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgX2dldEV4dGVuZGVycyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIGFueSBhbGlhc2VzXHJcbiAgICAgICAgdmFyIGFic3RyYWN0ID0gdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZXh0ZW5kZXJzIGlmIHRoZXkgZXhpc3RcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fZXh0ZW5kZXJzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V4dGVuZGVyc1thYnN0cmFjdF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gYW4gZW1wdHkgc2V0XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgZXh0ZW5kZXIgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZvcmdldEV4dGVuZGVycyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIGFueSBhbGlhc2VzXHJcbiAgICAgICAgdmFyIGFic3RyYWN0ID0gdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIEZvcmdldCB0aGUgRXh0ZW5kZXJzXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2V4dGVuZGVyc1thYnN0cmFjdF07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERyb3BzIGFsbCBvZiB0aGUgc3RhbGUgaW5zdGFuY2VzIGFuZCBhbGlhc2VzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIF9kcm9wU3RhbGVJbnN0YW5jZXMoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gRm9yZ2V0IHRoZSBJbnN0YW5jZVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgICAgICAvLyBGb3JnZXQgdGhlIEFsaWFzZVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9hbGlhc2VzW2Fic3RyYWN0XTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgcmVzb2x2ZWQgaW5zdGFuY2UgZnJvbSB0aGUgaW5zdGFuY2UgY2FjaGUgZm9yIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9yZ2V0SW5zdGFuY2UoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gRm9yZ2V0IHRoZSBJbnN0YW5jZVxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDbGVhcnMgYWxsIG9mIHRoZSBpbnN0YW5jZXMgZnJvbSB0aGUgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZvcmdldEluc3RhbmNlcygpIHtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBJbnN0YW5jZXNcclxuICAgICAgICBmb3IobGV0IGFic3RyYWN0IGluIHRoaXMuX2luc3RhbmNlcykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBjdXJyZW50IEluc3RhbmNlXHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJlc2V0IHRoZSBJbnN0YW5jZXNcclxuICAgICAgICB0aGlzLl9pbnN0YW5jZXMgPSB7fTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmx1c2hlcyB0aGlzIENvbnRhaW5lciBvZiBhbGwgYmluZGluZ3MgYW5kIHJlc29sdmVkIGluc3RhbmNlcy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmbHVzaCgpIHtcclxuXHJcbiAgICAgICAgLy8gUmVzZXQgYWxsIHByb3BlcnRpZXMgdGhhdCBkb24ndCByZXF1aXJlIGdhcmJhZ2UgY29sbGVjdGlvblxyXG4gICAgICAgIHRoaXMuX2FsaWFzZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9yZXNvbHZlZCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX2JpbmRpbmdzID0ge307XHJcbiAgICAgICAgdGhpcy5fYWJzdHJhY3RBbGlhc2VzID0ge307XHJcblxyXG4gICAgICAgIC8vIEZvcmdldCBhbGwgSW5zdGFuY2VzXHJcbiAgICAgICAgdGhpcy5mb3JnZXRJbnN0YW5jZXMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZ2xvYmFsbHkgYXZhaWxhYmxlIGluc3RhbmNlIG9mIHRoZSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RhdGljfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGFuIGluc3RhbmNlIGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICBpZihDb250YWluZXIuX2luc3RhbmNlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBpbnN0YW5jZVxyXG4gICAgICAgICAgICBDb250YWluZXIuX2luc3RhbmNlID0gbmV3IHRoaXM7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgIHJldHVybiBDb250YWluZXIuX2luc3RhbmNlO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnbG9iYWxseSBhdmFpbGFibGUgaW5zdGFuY2Ugb2YgdGhlIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtDb250YWluZXJ8bnVsbH0gIGNvbnRhaW5lclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0YXRpY31cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldEluc3RhbmNlKGNvbnRhaW5lciA9IG51bGwpIHtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRoZSBJbnN0YW5jZVxyXG4gICAgICAgIENvbnRhaW5lci5faW5zdGFuY2UgPSBjb250YWluZXI7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbmV3IEluc3RhbmNlXHJcbiAgICAgICAgcmV0dXJuIENvbnRhaW5lci5faW5zdGFuY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUgZXhpc3RzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgZXhpc3RzKGFic3RyYWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm91bmQoYWJzdHJhY3QpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgZ2V0KGFic3RyYWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZShhYnN0cmFjdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgc2V0KGFic3RyYWN0LCB2YWx1ZSkge1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGNvbmNyZXRlIHR5cGVcclxuICAgICAgICB2YXIgY29uY3JldGUgPSB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gQmluZCB0aGUgYWJzdHJhY3QgdHlwZSB0byB0aGUgY29uY3JldGUgdHlwZVxyXG4gICAgICAgIHRoaXMuYmluZChhYnN0cmFjdCwgY29uY3JldGUpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVbnNldHMgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdW5zZXQoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gRGVmZXJlbmNlIHRoZSBhYnN0cmFjdCB0eXBlXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XTtcclxuICAgICAgICBkZWxldGUgdGhpcy5fcmVzb2x2ZWRbYWJzdHJhY3RdO1xyXG5cclxuICAgIH07XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIGN1cnJlbnQgZ2xvYmFsbHkgYXZhaWxhYmxlIGNvbnRhaW5lciAoaWYgYW55KS5cclxuICpcclxuICogQHZhciB7c3RhdGljfVxyXG4gKi9cclxuQ29udGFpbmVyLl9pbnN0YW5jZSA9IG51bGw7XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkNvbnRhaW5lciA9IENvbnRhaW5lcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Db250YWluZXIvQ29udGFpbmVyLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLlN1cHBvcnQnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9iaiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgVmFsdWUgaXMgYSBDbGFzcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzQ2xhc3ModmFsdWUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJ1xyXG4gICAgICAgICAgICAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgncHJvdG90eXBlJylcclxuICAgICAgICAgICAgJiYgIXZhbHVlLmhhc093blByb3BlcnR5KCdhcmd1bWVudHMnKVxyXG4gICAgICAgICAgICAmJiAvXlxccypjbGFzc1xccysvLnRlc3QodmFsdWUudG9TdHJpbmcoKSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIENsYXNzIE5hbWUgb2YgdGhlIHNwZWNpZmllZCBWYWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRDbGFzc05hbWUodmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgQ2xhc3NcclxuICAgICAgICBpZih0aGlzLmlzQ2xhc3ModmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGFuIE9iamVjdFxyXG4gICAgICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYSBTdHJpbmdcclxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVua25vd24gQ2xhc3MgTmFtZVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDbGFzcyBvZiB0aGUgc3BlY2lmaWVkIFZhbHVlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgdmFsdWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtjbGFzc3xudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Q2xhc3ModmFsdWUpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgQ2xhc3NcclxuICAgICAgICBpZih0aGlzLmlzQ2xhc3ModmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhbiBPYmplY3RcclxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVua25vd24gQ2xhc3NcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuT2JqID0gT2JqO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvT2JqLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkNvbmZpZycpO1xyXG5cclxuaW1wb3J0IE1hcCBmcm9tICdFbmdpbmUvU3VwcG9ydC9NYXAuanMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXBvc2l0b3J5IHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBSZXBvc2l0b3J5IGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgaXRlbXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoaXRlbXMgPSB7fSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWxsIG9mIHRoZSBjb25maWd1cmF0aW9uIGl0ZW1zLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5faXRlbXMgPSBpdGVtcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiB2YWx1ZSBleGlzdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0aGFzKGtleSkge1xyXG5cdFx0cmV0dXJuIE1hcC5oYXModGhpcy5faXRlbXMsIGtleSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc3BlY2lmaWVkIGNvbmZpZ3VyYXRpb24gdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8YXJyYXl8b2JqZWN0fSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgICAgICAgICAgICAgIGZhbGxiYWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRnZXQoa2V5LCBmYWxsYmFjayA9IG51bGwpIHtcclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgS2V5IGlzIGFuIEFycmF5IG9yIE9iamVjdFxyXG5cdFx0aWYoQXJyYXkuaXNBcnJheShrZXkpIHx8IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLl9nZXRNYW55KGtleSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlXHJcblx0XHRyZXR1cm4gTWFwLmdldCh0aGlzLl9pdGVtcywga2V5LCBmYWxsYmFjayk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHNwZWNpZmllZCBjb25maWd1cmF0aW9uIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2FycmF5fG9iamVjdH0gIGtleXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge29iamVjdH1cclxuXHQgKi9cclxuXHRnZXRNYW55KGtleXMpIHtcclxuXHJcblx0XHQvLyBJbml0aWFsaXplIHRoZSByZXN1bHRcclxuXHRcdHZhciBjb25maWcgPSB7fTtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEtleXNcclxuXHRcdGZvcihsZXQgaW5kZXggaW4ga2V5cykge1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIGtleXMgdmFyaWFibGUgaXMgYW4gYXJyYXksIHRoZW4gdGhlIGluZGV4IGlzXHJcblx0XHRcdC8vIG51bWVyaWNhbCwgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgbmFtZSBvZiB0aGUga2V5LlxyXG5cdFx0XHQvLyBPdGhlcndpc2UsIHRoZSBpbmRleCBpcyB0aGUgbmFtZSBvZiB0aGUga2V5LlxyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBLZXlcclxuXHRcdFx0bGV0IGtleSA9IEFycmF5LmlzQXJyYXkoa2V5cykgPyBrZXlzW2luZGV4XSA6IGluZGV4O1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIGtleXMgdmFyaWFibGUgaXMgYW4gYXJyYXksIHRoZW4gdGhlcmUgaXMgbm9cclxuXHRcdFx0Ly8gZmFsbGJhY2suIE90aGVyd2lzZSwgd2UgY2FuIHVzZSB0aGUga2V5IG9uIHRoZVxyXG5cdFx0XHQvLyBvYmplY3QgdG8gZ2V0IHRoZSBmYWxsYmFjayB2YWx1ZS4gVXNlZnVsIVxyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBGYWxsYmFja1xyXG5cdFx0XHRsZXQgZmFsbGJhY2sgPSBBcnJheS5pc0FycmF5KGtleXMpID8gbnVsbCA6IGtleXNba2V5XTtcclxuXHJcblx0XHRcdC8vIEFwcGVuZCB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZVxyXG5cdFx0XHRjb25maWdba2V5XSA9IE1hcC5nZXQodGhpcy5faXRlbXMsIGtleSwgZmFsbGJhY2spO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIHJlc3VsdFxyXG5cdFx0cmV0dXJuIGNvbmZpZztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgZ2l2ZW4gY29uZmlndXJhdGlvbiB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gICAgICAgICAgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c2V0KGtleSwgdmFsdWUgPSBudWxsKSB7XHJcblxyXG5cdFx0Ly8gQ29udmVydCBzaW5nbGUga2V5IHRvIG9iamVjdFxyXG5cdFx0dmFyIGtleXMgPSB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IHtba2V5XTogdmFsdWV9IDoga2V5O1xyXG5cclxuXHRcdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgS2V5c1xyXG5cdFx0Zm9yKGxldCBrZXkgaW4ga2V5cykge1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBWYWx1ZVxyXG5cdFx0XHRsZXQgdmFsdWUgPSBrZXlzW2tleV07XHJcblxyXG5cdFx0XHQvLyBTZXQgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWVcclxuXHRcdFx0TWFwLnNldCh0aGlzLl9pdGVtcywga2V5LCB2YWx1ZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBQdXNoIHRoZSBzcGVjaWZpZWQgdmFsdWUgb250byBhbiBhcnJheSBjb25maWd1cmF0aW9uIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0cHVzaChrZXksIHZhbHVlKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBhcnJheVxyXG5cdFx0dmFyIGFycmF5ID0gdGhpcy5nZXQoa2V5KTtcclxuXHJcblx0XHQvLyBQdXNoIHRoZSBWYWx1ZVxyXG5cdFx0YXJyYXkucHVzaCh2YWx1ZSk7XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIHRvIHRoZSB1cGRhdGVkIGFycmF5XHJcblx0XHR0aGlzLnNldChrZXksIGFycmF5KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbGwgb2YgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWVzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdGFsbCgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9pdGVtcztcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5SZXBvc2l0b3J5ID0gUmVwb3NpdG9yeTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Db25maWcvUmVwb3NpdG9yeS5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5HcmFwaGljcycpO1xyXG5cclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi4vU3VwcG9ydC9NYW5hZ2VyLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIGV4dGVuZHMgTWFuYWdlciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIERlZmF1bHQgRHJpdmVyIE5hbWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0RGVmYXVsdERyaXZlcigpIHtcclxuXHRcdHJldHVybiB0aGlzLl9nYW1lLm1ha2UoJ2NvbmZpZycpLmdldCgnZ3JhcGhpY3MuZGVmYXVsdCcpO1xyXG5cdH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDb25maWd1cmF0aW9uIFJvb3QgZm9yIHRoaXMgTWFuYWdlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlndXJhdGlvblJvb3QobmFtZSkge1xyXG4gICAgXHRyZXR1cm4gJ2dyYXBoaWNzLmNhbnZhc2VzJztcclxuICAgIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBNYW5hZ2VyIHN1cHBvcnRzIGFkYXB0ZXIgY3JlYXRpb25cclxuXHQgKiBmcm9tIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3MsIHdoZXJlIGFuIHVuZGVybHlpbmcgZHJpdmVyIGlzXHJcblx0ICogdHlwaWNhbGx5IHNwZWNpZmllZC4gVGhlIGRyaXZlciBpcyBjcmVhdGVkIHNlcGFyYXRlbHkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHVzZXNDb25maWd1cmFibGVBZGFwdGVycygpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGtleSB0aGF0IGhvbGRzIHRoZSBuYW1lIG9mIHRoZSBkcml2ZXJcclxuXHQgKiBmb3IgYW55IGNvbmZpZ3VyZWQgYWRhcHRlciBmb3IgdGhpcyBtYW5hZ2VyLiBNb3N0IGNhbGwgaXRcclxuXHQgKiAnZHJpdmVyJywgYnV0IG90aGVyIGltcGxlbWVudGF0aW9ucyBtYXkgYmUgZGlmZmVyZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldENvbmZpZ0RyaXZlcktleU5hbWUoKSB7XHJcblxyXG5cdFx0Ly8gQ2FudmFzZXMgYXJlIG1hZGUgZGlzdGluY3QgYnkgdGhlaXIgY29udGV4dC4gRXZlcnl0aGluZ1xyXG5cdFx0Ly8gZWxzZSBpcyBwcmV0dHkgbXVjaCB0aGUgc2FtZS4gVGhlcmVmb3JlLCB3ZSdyZSBnb2luZ1xyXG5cdFx0Ly8gdG8gdXNlIHRoZSBjb250ZXh0IGFzIHRoZSBkcml2ZXIgZm9yIHRoZSBhZGFwdGVyLlxyXG5cclxuXHRcdC8vIFVzZSAnY29udGV4dCcgYXMgdGhlIERyaXZlciBrZXkgbmFtZVxyXG5cdFx0cmV0dXJuICdjb250ZXh0JztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyAyRCBEcml2ZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBDb25maWd1cmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgY29uZmlnXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLkdyYXBoaWNzLkNhbnZhc31cclxuXHQgKi9cclxuXHRjcmVhdGUyZERyaXZlcihjb25maWcpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIENhbnZhcyBQYXJhbWV0ZXJzXHJcblx0XHR2YXIgc2VsZWN0b3IgPSBjb25maWdbJ2VsZW1lbnQnXTtcclxuXHRcdHZhciBmcHMgPSBjb25maWdbJ2ZwcyddIHx8IDYwO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IENhbnZhc1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUNhbnZhcyhzZWxlY3RvciwgJzJkJywgZnBzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29udGV4dFxyXG5cdCAqIEBwYXJhbSAge251bWVyaWN9ICBmcHNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuR3JhcGhpY3MuQ2FudmFzfVxyXG5cdCAqXHJcblx0ICogQHRocm93cyB7RXJyb3J9XHJcblx0ICovXHJcblx0X2NyZWF0ZUNhbnZhcyhzZWxlY3RvciwgY29udGV4dCwgZnBzKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBFbGVtZW50IGZyb20gdGhlIFNlbGVjdG9yXHJcblx0XHR2YXIgZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSBhbiBFbGVtZW50IHdhcyBmb3VuZFxyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYW52YXMgWyR7c2VsZWN0b3J9XSBjb3VsZCBub3QgYmUgZm91bmQuYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgcmV0dXJuIGEgbmV3IENhbnZhc1xyXG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuR2FtZS5HcmFwaGljcy5DYW52YXMoZWxlbWVudCwgJzJkJywgZnBzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZWxlbWVudCBkZXNjcmliZWQgYnkgdGhlIHNwZWNpZmllZCBzZWxlY3Rvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIHNlbGVjdG9yXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfVxyXG5cdCAqL1xyXG5cdF9nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG5cdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcblx0XHRcdHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdXHJcblx0XHRcdHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnNwbGl0KCcjJylbMF0gPT09ICcnICYmIHNlbGVjdG9yLnNwbGl0KCcjJylbMV0pXHJcblx0XHRcdHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc3BsaXQoJy4nKVswXSA9PT0gJycgJiYgc2VsZWN0b3Iuc3BsaXQoJy4nKVsxXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgR3JhcGhpY3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHN0YXJ0KCkge1xyXG5cclxuXHRcdC8vIEJlZ2luIHRoZSBEcmF3aW5nIExvb3BzXHJcblx0XHR0aGlzLmJlZ2luRHJhd2luZ0xvb3BzKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCZWdpbnMgdGhlIERyYXdpbmcgTG9vcHMgZm9yIGVhY2ggQ2FudmFzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiZWdpbkRyYXdpbmdMb29wcygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBDYW52YXNcclxuXHRcdGZvcihsZXQgaSBpbiB0aGlzLl9kcml2ZXJzKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaXRlcmF0b3IgaXMgYSBwcm9wZXJ0eVxyXG5cdFx0XHRpZighdGhpcy5fZHJpdmVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgQ2FudmFzXHJcblx0XHRcdHZhciBjYW52YXMgPSB0aGlzLl9kcml2ZXJzW2ldO1xyXG5cclxuXHRcdFx0Ly8gQmVnaW4gdGhlIERyYXdpbmcgTG9vcFxyXG5cdFx0XHRjYW52YXMuYmVnaW5EcmF3aW5nTG9vcCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBBbGxvdyBDaGFpbmluZ1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsaWFzIG9mIHtAc2VlIHRoaXMuZHJpdmVyKCl9LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfG51bGx9ICBjYW52YXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuR3JhcGhpY3MuQ2FudmFzfVxyXG5cdCAqL1xyXG5cdGdldENhbnZhcyhjYW52YXMgPSBudWxsKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kcml2ZXIoY2FudmFzKTtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5HcmFwaGljcyA9IEdyYXBoaWNzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0dyYXBoaWNzL0dyYXBoaWNzLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLk9iamVjdHMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hbmFnZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdGF0aWN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgR2FtZSBPYmplY3RzIGtleWVkIGJ5IHRoZWlyIElELlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fb2JqZWN0c0J5SWQgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lIE9iamVjdHMga2V5ZWQgYnkgdGhlaXIgQ2xhc3MsIHRoZW4gdGhlaXIgSUQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7b2JqZWN0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9vYmplY3RzQnlDbGFzcyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEdhbWUgT2JqZWN0IHdpdGggdGhlIGxvd2VzdCBJRCBwZXIgQ2xhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7b2JqZWN0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9vYmplY3RCeUNsYXNzID0ge307XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgT2JqZWN0IEluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgIHhcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICB5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdH1cclxuXHQgKi9cclxuXHRjcmVhdGVJbnN0YW5jZShuYW1lLCB4LCB5KSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBJbnN0YW5jZVxyXG5cdFx0dmFyIGluc3RhbmNlID0gbmV3IEdhbWUuT2JqZWN0c1tuYW1lXSgpO1xyXG5cclxuXHRcdC8vIEFzc2lnbiB0aGUgQ29vcmRpbmF0ZXNcclxuXHRcdGluc3RhbmNlLnggPSB4O1xyXG5cdFx0aW5zdGFuY2UueSA9IHk7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIG5vIE9iamVjdCBieSBDbGFzc1xyXG5cdFx0aWYodHlwZW9mIHRoaXMuX29iamVjdEJ5Q2xhc3NbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdFx0XHQvLyBUaGlzIGluZGljYXRlcyB0aGF0IHRoaXMgdHlwZSBvZiBvYmplY3QgaGFzIG5ldmVyIGJlZW5cclxuXHRcdFx0Ly8gY3JlYXRlZCBiZWZvcmUsIG9yIGFsbCBwcmV2aW91cyBvYmplY3RzIHdlcmUgcmVtb3ZlZFxyXG5cdFx0XHQvLyBmcm9tIHRoZSBzY2VuZS4gV2UgY2FuIHV0aWxpemUgdGhpcyBhc3N1bXB0aW9uLlxyXG5cclxuXHRcdFx0Ly8gQXNzaWduIHRoZSBPYmplY3QgYnkgQ2xhc3NcclxuXHRcdFx0dGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSA9IGluc3RhbmNlO1xyXG5cclxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgT2JqZWN0cyBieSBDbGFzc1xyXG5cdFx0XHR0aGlzLl9vYmplY3RzQnlDbGFzc1tuYW1lXSA9IHt9O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW1lbWJlciB0aGUgSW5zdGFuY2VcclxuXHRcdHRoaXMuX29iamVjdHNCeUlkW2luc3RhbmNlLmlkXSA9IGluc3RhbmNlO1xyXG5cdFx0dGhpcy5fb2JqZWN0c0J5Q2xhc3NbbmFtZV1baW5zdGFuY2UuaWRdID0gaW5zdGFuY2U7XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBJbnN0YW5jZVxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGVzIHRoZSBzcGVjaWZpZWQgR2FtZSBPYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdH0gIG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkZWxldGVJbnN0YW5jZShvYmplY3QpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIE9iamVjdCdzIENsYXNzIE5hbWVcclxuXHRcdHZhciBuYW1lID0gb2JqZWN0LmdldENsYXNzTmFtZSgpO1xyXG5cclxuXHRcdC8vIERlcmVmZXJlbmNlIHRoZSBPYmplY3RcclxuXHRcdGRlbGV0ZSB0aGlzLl9vYmplY3RzQnlJZFtvYmplY3QuaWRdO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX29iamVjdHNCeUNsYXNzW25hbWVdW29iamVjdC5pZF07XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIGFuIE9iamVjdCBieSBDbGFzcyBOYW1lXHJcblx0XHRpZih0eXBlb2YgdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB0aGUgT2JqZWN0IHdhcyB0aGUgT2JqZWN0IGZvciB0aGUgQ2xhc3NcclxuXHRcdFx0aWYodGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXS5pZCA9PSBvYmplY3QuaWQpIHtcclxuXHJcblx0XHRcdFx0Ly8gRGVmZXJlbmNlIHRoZSBPYmplY3RcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBHYW1lIE9iamVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gIGNhbnZhc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkcmF3R2FtZU9iamVjdHMoY2FudmFzKSB7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBHYW1lIE9iamVjdHNcclxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbihvYmplY3QpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIE9iamVjdFxyXG5cdFx0XHRvYmplY3QuZHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCkpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RlcHMgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RlcEdhbWVPYmplY3RzKCkge1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIFN0ZXAgRXZlbnRzIGluIEJlZm9yZSAvIFN0ZXAgLyBBZnRlciBvcmRlclxyXG5cdFx0dGhpcy5maXJlQmVmb3JlU3RlcEV2ZW50cygpXHJcblx0XHRcdC5maXJlU3RlcEV2ZW50cygpXHJcblx0XHRcdC5maXJlQWZ0ZXJTdGVwRXZlbnRzKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyB0aGUgJ0JlZm9yZSBTdGVwJyBFdmVudCBmb3IgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZmlyZUJlZm9yZVN0ZXBFdmVudHMoKSB7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBHYW1lIE9iamVjdHNcclxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbihvYmplY3QpIHtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIEJlZm9yZSBTdGVwIEV2ZW50XHJcblx0XHRcdG9iamVjdC5maXJlQmVmb3JlU3RlcEV2ZW50KCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyB0aGUgJ1N0ZXAnIEV2ZW50IGZvciB0aGUgR2FtZSBPYmplY3RzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRmaXJlU3RlcEV2ZW50cygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEdhbWUgT2JqZWN0c1xyXG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgU3RlcCBFdmVudFxyXG5cdFx0XHRvYmplY3QuZmlyZVN0ZXBFdmVudCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgdGhlICdBZnRlciBTdGVwJyBFdmVudCBmb3IgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZmlyZUFmdGVyU3RlcEV2ZW50cygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEdhbWUgT2JqZWN0c1xyXG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgQWZ0ZXIgU3RlcCBFdmVudFxyXG5cdFx0XHRvYmplY3QuZmlyZUFmdGVyU3RlcEV2ZW50KCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnZva2VzIGEgQ2FsbGJhY2sgb24gZWFjaCBHYW1lIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZWFjaChjYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgR2FtZSBPYmplY3RzXHJcblx0XHRmb3IodmFyIGlkIGluIHRoaXMuX29iamVjdHNCeUlkKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIFByb3BlcnR5IGV4aXN0c1xyXG5cdFx0XHRpZighdGhpcy5fb2JqZWN0c0J5SWQuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgY3VycmVudCBHYW1lIE9iamVjdFxyXG5cdFx0XHR2YXIgb2JqZWN0ID0gdGhpcy5fb2JqZWN0c0J5SWRbaWRdO1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgQ2FsbGJhY2tcclxuXHRcdFx0Y2FsbGJhY2sob2JqZWN0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIEdhbWUgT2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBJRC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGlkXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdHxudWxsfVxyXG5cdCAqL1xyXG5cdGdldE9iamVjdEJ5SWQoaWQpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fb2JqZWN0c0J5SWRbaWRdIHx8IG51bGw7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGZpcnN0IEdhbWUgT2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBDbGFzcyBOYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7R2FtZS5PYmplY3RzLkdhbWVPYmplY3R8bnVsbH1cclxuXHQgKi9cclxuXHRnZXRPYmplY3RCeUNsYXNzKG5hbWUpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSB8fCBudWxsO1xyXG5cclxuXHR9O1xyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLk1hbmFnZXIgPSBNYW5hZ2VyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL09iamVjdHMvTWFuYWdlci5qcyIsIlxuLyoqXG4gKiBGaXJzdCB3ZSB3aWxsIGxvYWQgYWxsIG9mIHRoaXMgcHJvamVjdCdzIEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHdoaWNoXG4gKiBpbmNsdWRlcyBWdWUgYW5kIG90aGVyIGxpYnJhcmllcy4gSXQgaXMgYSBncmVhdCBzdGFydGluZyBwb2ludCB3aGVuXG4gKiBidWlsZGluZyByb2J1c3QsIHBvd2VyZnVsIHdlYiBhcHBsaWNhdGlvbnMgdXNpbmcgVnVlIGFuZCBMYXJhdmVsLlxuICovXG5cbnJlcXVpcmUoJy4vZW5naW5lL2luZGV4Jyk7XG5yZXF1aXJlKCcuL2dhbWUvaW5kZXgnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIi8qKlxyXG4gKiBGaXJzdCB3ZSB3aWxsIGxvYWQgYWxsIG9mIHRoaXMgcHJvamVjdCdzIEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHdoaWNoXHJcbiAqIGluY2x1ZGVzIFZ1ZSBhbmQgb3RoZXIgbGlicmFyaWVzLiBJdCBpcyBhIGdyZWF0IHN0YXJ0aW5nIHBvaW50IHdoZW5cclxuICogYnVpbGRpbmcgcm9idXN0LCBwb3dlcmZ1bCB3ZWIgYXBwbGljYXRpb25zIHVzaW5nIFZ1ZSBhbmQgTGFyYXZlbC5cclxuICovXHJcblxyXG5yZXF1aXJlKCcuL1N1cHBvcnQvaGVscGVycycpO1xyXG5yZXF1aXJlKCcuL0ZvdW5kYXRpb24vaGVscGVycycpO1xyXG5cclxucmVxdWlyZSgnLi9Db25maWcvQ29uZmlnJyk7XHJcbnJlcXVpcmUoJy4vRXZlbnRzL0Rpc3BhdGNoZXInKTtcclxucmVxdWlyZSgnLi9EZWJ1Zy9EZWJ1ZycpO1xyXG5yZXF1aXJlKCcuL0dyYXBoaWNzL0dyYXBoaWNzJyk7XHJcbnJlcXVpcmUoJy4vR3JhcGhpY3MvQ2FudmFzQ29udGV4dCcpO1xyXG5yZXF1aXJlKCcuL0dyYXBoaWNzL0NhbnZhcycpO1xyXG5yZXF1aXJlKCcuL0lucHV0L0lucHV0Jyk7XHJcbnJlcXVpcmUoJy4vT2JqZWN0cy9PYmplY3RzJyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvaW5kZXguanMiLCJpbXBvcnQgTmFtZXNwYWNlIGZyb20gJy4vTmFtZXNwYWNlLmpzJ1xyXG5cclxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5cclxuaWYodHlwZW9mIHdpbmRvd1snYWJzdHJhY3QnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhyb3dzIGFuIEFic3RyYWN0IGltcGxlbWVudGF0aW9uIGVycm9yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgVGhlIGNhbGxpbmcgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfVxyXG5cdCAqL1xyXG5cdHdpbmRvd1snYWJzdHJhY3QnXSA9IGZ1bmN0aW9uIGFic3RyYWN0KG9iamVjdCkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgQ2FsbGVyXHJcblx0XHR2YXIgY2FsbGVyID0gYWJzdHJhY3QuY2FsbGVyIHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyO1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgTWV0aG9kIE5hbWVcclxuXHRcdHZhciBtZXRob2ROYW1lID0gY2FsbGVyLm5hbWU7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBPYmplY3QgQ2xhc3MgTmFtZVxyXG5cdFx0dmFyIGNsYXNzTmFtZSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgU3VwZXIgQ2xhc3MgTmFtZVxyXG5cdFx0dmFyIHN1cGVyTmFtZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QuY29uc3RydWN0b3IpLm5hbWU7XHJcblxyXG5cdFx0Ly8gVGhyb3cgYSBuZXcgRXJyb3JcclxuXHRcdHRocm93IG5ldyBFcnJvcihgTXVzdCBpbmhlcml0IGFic3RyYWN0IGZ1bmN0aW9uICR7Y2xhc3NOYW1lfTo6JHttZXRob2ROYW1lfSgpIChwcmV2aW91c2x5IGRlY2xhcmVkIGFic3RyYWN0IGluICR7c3VwZXJOYW1lfSlgKTtcclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbmlmKHR5cGVvZiB3aW5kb3dbJ2ZpbGVFeGlzdHNTeW5jJ10gPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRocm93cyBhbiBBYnN0cmFjdCBpbXBsZW1lbnRhdGlvbiBlcnJvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIFRoZSBuYW1lIG9mIHRoZSBuYW1lc3BhY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtvYmplY3R9XHJcblx0ICpcclxuXHQgKiBAdGhyb3dzIHtFcnJvcn1cclxuXHQgKi9cclxuXHR3aW5kb3dbJ2ZpbGVFeGlzdHNTeW5jJ10gPSBmdW5jdGlvbiBmaWxlRXhpc3RzU3luYyhwYXRoKSB7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZnMuYWNjZXNzU3luYyhwYXRoKTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9IGNhdGNoKGV4KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbmlmKHR5cGVvZiB3aW5kb3dbJ25hbWVzcGFjZSddID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaHJvd3MgYW4gQWJzdHJhY3QgaW1wbGVtZW50YXRpb24gZXJyb3IuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBUaGUgbmFtZSBvZiB0aGUgbmFtZXNwYWNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqXHJcblx0ICogQHRocm93cyB7RXJyb3J9XHJcblx0ICovXHJcblx0d2luZG93WyduYW1lc3BhY2UnXSA9IGZ1bmN0aW9uIG5hbWVzcGFjZShwYXRoKSB7XHJcblx0XHRyZXR1cm4gbmV3IE5hbWVzcGFjZShwYXRoKTtcclxuXHR9O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvaGVscGVycy5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hbWVzcGFjZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgTmFtZXNwYWNlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIHBhdGhcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSAgYXV0b0Fzc2lnblxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihwYXRoLCBhdXRvQXNzaWduID0gdHJ1ZSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWVzcGFjZSBwYXRoLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge3N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fcGF0aCA9IHBhdGg7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIGF1dG8gYXNzaWduXHJcblx0XHRpZihhdXRvQXNzaWduKSB7XHJcblxyXG5cdFx0XHQvLyBBc3NpZ24gdGhlIE5hbWVzcGFjZSB0byB0aGUgV2luZG93XHJcblx0XHRcdHRoaXMuYXNzaWduVG9XaW5kb3coKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXNzaWduIHRvIHN0YXRpYyBjb250YWluZXJcclxuXHRcdGlmKHR5cGVvZiB0aGlzLmNvbnN0cnVjdG9yLl9uYW1lc3BhY2VzW3BhdGhdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmNvbnN0cnVjdG9yLl9uYW1lc3BhY2VzW3BhdGhdID0gdGhpcztcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBc3NpZ25zIHRoaXMgTmFtZXNwYWNlIHRvIHRoZSBXaW5kb3cgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRhc3NpZ25Ub1dpbmRvdygpIHtcclxuXHJcblx0XHR0aGlzLl9zZXQod2luZG93KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc3BlY2lmaWVkIG1hcCBpdGVtIHRvIHRoZSBnaXZlbiB2YWx1ZSB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxyXG5cdCAqIElmIG5vIGtleSBpcyBwcm92aWRlZCwgdGhlIGVudGlyZSBtYXAgd2lsbCBiZSByZXBsYWNlZC4gU2luY2Ugd2VcclxuXHQgKiBjYW4ndCBwYXNzIGJ5IHJlZmVyZW5jZSBpbiBKYXZhU2NyaXB0LCB3ZSdsbCByZXR1cm4gYSBjb3B5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgb2JqZWN0XHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgdmFsdWVcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBwcmVmaXhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0X3NldChvYmplY3QsIGtleSA9IG51bGwsIHZhbHVlID0gbnVsbCwgcHJlZml4ID0gJycpIHtcclxuXHJcblx0XHQvLyBJZiBubyBrZXkgaXMgcHJvdmlkZWQsIHRoZW4gdXNlIHRoZSBwYXRoXHJcblx0XHRpZihrZXkgPT09IG51bGwpIHtcclxuXHRcdFx0a2V5ID0gdGhpcy5fcGF0aDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiBubyB2YWx1ZSBpcyBwcm92aWRlZCwgdGhlbiB1c2UgdGhlIHRoaXNcclxuXHRcdGlmKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdHZhbHVlID0gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiBhIGtleSBpcyBzdGlsbCBub3QgcHJvdmlkZWQsIHRoZW4gcmV0dXJuIGZhaWx1cmVcclxuXHRcdGlmKGtleSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBLZXkgU2VnbWVudHNcclxuXHRcdHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3Mgb25seSBvbmUgc2VnbWVudCwgdGhlbiB3ZSd2ZSByZWFjaGVkIG91ciBiYXNlIGNhc2VcclxuXHRcdC8vIGluIHRoZSByZWN1cnNpb24gKG9yIHdlIHN0YXJ0ZWQgb2ZmIGluIGEgYmFzZSBjYXNlKSwgc28gd2VcclxuXHRcdC8vIHNob3VsZCBkaXJlY3RseSBzZXQgdGhlIGtleWVkIHZhbHVlIGFuZCByZXR1cm4gdGhlIG1hcC5cclxuXHJcblx0XHQvLyBDaGVjayBmb3IgYSBzaW5nbGUgU2VnbWVudFxyXG5cdFx0aWYoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgbm90aGluZyBleGlzdHMgYXQgdGhlIG9mZnNldFxyXG5cdFx0XHRpZih0eXBlb2Ygb2JqZWN0W3NlZ21lbnRzWzBdXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldCB0aGUga2V5ZWQgdmFsdWVcclxuXHRcdFx0b2JqZWN0W3NlZ21lbnRzWzBdXSA9IHZhbHVlO1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIFN1Y2Nlc3NcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3MgbXVsdGlwbGUgc2VnbWVudHMsIHRoZW4gd2UgaGF2ZSB0byBkbyBzb21lIHRyaWNreVxyXG5cdFx0Ly8gcmVjdXJzaW9uLiBKYXZhU2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBwYXNzIGJ5IHJlZmVyZW5jZSxcclxuXHRcdC8vIHNvIHdlIG11c3QgcmVjdXJzaXZlbHkgc2V0IGVhY2ggaW5kZXggd2l0aGluIHRoZSBtYXAuXHJcblxyXG5cdFx0Ly8gU3BsaWNlIG9mZiB0aGUgZmlyc3QgU2VnbWVudFxyXG5cdFx0dmFyIHNlZ21lbnQgPSBzZWdtZW50cy5zcGxpY2UoMCwgMSlbMF07XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBuZXN0ZWQgUGF0aFxyXG5cdFx0dmFyIHBhdGggPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBzZWdtZW50IDogc2VnbWVudDtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBuZXN0ZWQgTmFtZXNwYWNlLCBpZiBuZWVkZWRcclxuXHRcdGlmKHR5cGVvZiBvYmplY3Rbc2VnbWVudF0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdG9iamVjdFtzZWdtZW50XSA9IG5ldyBOYW1lc3BhY2UocGF0aCwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlY3Vyc2l2ZWx5IHNldCB0aGUgVmFsdWVcclxuXHRcdHRoaXMuX3NldChvYmplY3Rbc2VnbWVudF0sIHNlZ21lbnRzLmpvaW4oJy4nKSwgdGhpcywgcGF0aCk7XHJcblxyXG5cdFx0Ly8gUmV0dXJuIFN1Y2Nlc3NcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmaW5lZCBOYW1lc3BhY2VzLlxyXG4gKlxyXG4gKiBAdmFyIHtvYmplY3R9XHJcbiAqL1xyXG5OYW1lc3BhY2UuX25hbWVzcGFjZXMgPSB7fTtcclxuXHJcbi8vIEFzc2lnbiBjb25zdHJ1Y3RvciB0byB3aW5kb3dcclxud2luZG93Lk5hbWVzcGFjZSA9IE5hbWVzcGFjZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L05hbWVzcGFjZS5qcyIsImltcG9ydCBDb250YWluZXIgZnJvbSAnRW5naW5lL0NvbnRhaW5lci9Db250YWluZXIuanMnO1xyXG5cclxuaWYodHlwZW9mIHdpbmRvdy5hcHAgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGF2YWlsYWJsZSBjb250YWluZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8bnVsbH0gIGFic3RyYWN0XHJcblx0ICogQHBhcmFtICB7YXJyYXl9ICAgICAgICBwYXJhbWV0ZXJzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHR3aW5kb3cuYXBwID0gZnVuY3Rpb24oYWJzdHJhY3QgPSBudWxsLCBwYXJhbWV0ZXJzID0gW10pIHtcclxuXHJcblx0XHQvLyBDaGVjayBpZiBubyBhYnN0cmFjdCB0eXBlIHdhcyBwcm92aWRlZFxyXG5cdFx0aWYoYWJzdHJhY3QgPT09IG51bGwpIHtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgQ29udGFpbmVyIEluc3RhbmNlXHJcblx0XHRcdHJldHVybiBDb250YWluZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIGFuIGluc3RhbmNlIG9mIHRoZSBhYnN0cmFjdCB0eXBlXHJcblx0XHRyZXR1cm4gQ29udGFpbmVyLmdldEluc3RhbmNlKCkubWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyk7XHJcblxyXG5cdH07XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9oZWxwZXJzLmpzIiwiLy8gTG9hZCB0aGUgc2NyaXB0cyB3aXRoaW4gdGhlIE5hbWVzcGFjZVxyXG5yZXF1aXJlKCcuL1JlcG9zaXRvcnknKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Db25maWcvQ29uZmlnLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLlN1cHBvcnQnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIHZhbHVlIGlzIGFycmF5IGFjY2Vzc2libGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhY2Nlc3NpYmxlKHZhbHVlKSB7XHJcblx0XHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JztcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIHNwZWNpZmllZCBlbGVtZW50IHRvIHRoZSBnaXZlbiBtYXAgdXNpbmcgXCJkb3RcIiBub3RhdGlvbiBpZiBpdCBkb2Vzbid0IGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgbWFwXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICogQHBhcmFtICB7dmFsdWV9ICAgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge29iamVjdH1cclxuXHQgKi9cclxuXHRzdGF0aWMgYWRkKG1hcCwga2V5LCB2YWx1ZSkge1xyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBkb2VzIG5vdCBleGlzdFxyXG5cdFx0aWYodGhpcy5nZXQobWFwLCBrZXkpID09PSBudWxsKSB7XHJcblx0XHRcdHRoaXMuc2V0KG1hcCwga2V5LCB2YWx1ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoIGVNYXBcclxuXHRcdHJldHVybiBtYXA7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBrZXkgZXhpc3RzIGluIHRoZSBnaXZlbiBtYXAuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICBtYXBcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c3RhdGljIGV4aXN0cyhtYXAsIGtleSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiBtYXBba2V5XSAhPT0gJ3VuZGVmaW5lZCc7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyBhbiBpdGVtIGZyb20gdGhlIGdpdmVuIG1hcCB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgbWFwXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgZmFsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge21peGVkfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXQobWFwLCBrZXksIGZhbGxiYWNrID0gbnVsbCkge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgbWFwIGlzIGFjY2Vzc2libGVcclxuXHRcdGlmKCF0aGlzLmFjY2Vzc2libGUobWFwKSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsbGJhY2s7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBtYXAgaWYgdGhlIGtleSBpcyBudWxsXHJcblx0XHRpZihrZXkgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIG1hcDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgS2V5IGV4cGxpY2l0bHkgZXhpc3RzXHJcblx0XHRpZih0aGlzLmV4aXN0cyhtYXAsIGtleSkpIHtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgZXhwbGljdCB2YWx1ZVxyXG5cdFx0XHRyZXR1cm4gbWFwW2tleV07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBrZXkgZG9lc24ndCB1c2UgXCJkb3RcIiBub3RhdGlvblxyXG5cdFx0aWYoa2V5LmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIHRoZSBrZXkgaXMgZGVmaW5lZFxyXG5cdFx0XHRpZih0eXBlb2YgbWFwW2tleV0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJldHVybiB0aGUgdmFsdWVcclxuXHRcdFx0XHRyZXR1cm4gbWFwW2tleV07XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBSZXR1cm4gdGhlIGZhbGxiYWNrIHZhbHVlXHJcblx0XHRcdHJldHVybiBmYWxsYmFjaztcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBLZXkgU2VnbWVudHNcclxuXHRcdHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xyXG5cclxuXHRcdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgU2VnbWVudHNcclxuXHRcdGZvcihsZXQgaW5kZXggaW4gc2VnbWVudHMpIHtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgU2VnbWVudFxyXG5cdFx0XHRsZXQgc2VnbWVudCA9IHNlZ21lbnRzW2luZGV4XTtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIHRoZSBtYXAgaXMgc3RpbGwgYWNjZXNzaWJsZSwgYW5kIHRoYXQgdGhlIGtleSBleGlzdHNcclxuXHRcdFx0aWYodGhpcy5hY2Nlc3NpYmxlKG1hcCkgJiYgdGhpcy5leGlzdHMobWFwLCBzZWdtZW50KSkge1xyXG5cclxuXHRcdFx0XHQvLyBTdGVwIGRvd24gaW50byB0aGUgbWFwXHJcblx0XHRcdFx0bWFwID0gbWFwW3NlZ21lbnRdO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRmFpbGVkIHRvIGZpbmQgdGhlIGtleVxyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsbGJhY2s7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgYWxsIG9mIHRoZSBrZXkncyBzZWdtZW50cyB3ZXJlIGl0ZXJhdGVkIHRocm91Z2gsIHRoZW4gdGhlXHJcblx0XHQvLyBtYXAgaXRzZWxmIHNob3VsZCBiZSB0aGUgZmluYWwgcmVzdWx0LiBPdGhlcndpc2UsIHdlIHdvdWxkXHJcblx0XHQvLyBoYXZlIHJldHVybmVkIHRoZSBmYWxsYmFjayB2YWx1ZSBieSBub3cuIEFuZCBhd2F5IHdlIGdvIVxyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgdmFsdWVcclxuXHRcdHJldHVybiBtYXA7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBpdGVtKHMpIGV4aXN0IGluIHRoZSBnaXZlbiBtYXAgdXNpbmcgXCJkb3RcIiBub3RhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gICAgICAgIG1hcFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xhcnJheX0gIGtleXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c3RhdGljIGhhcyhtYXAsIGtleXMpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhhdCBrZXlzIGhhdmUgYmVlbiBzcGVjaWZpZWRcclxuXHRcdGlmKGtleXMgPT09IG51bGwpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvbnZlcnQgS2V5cyBpbnRvIGFuIEFycmF5XHJcblx0XHRpZih0eXBlb2Yga2V5cyAhPT0gJ29iamVjdCcpIHtcclxuXHRcdFx0a2V5cyA9IFtrZXlzXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgS2V5cyBpcyB0cnV0aHlcclxuXHRcdGlmKCFrZXlzKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgYXQgbGVhc3Qgb25lIEtleSB3YXMgcHJvdmlkZWRcclxuXHRcdGlmKGtleXMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBOb3cgdGhhdCB3ZSd2ZSBjaGVja2VkIGFsbCBvZiB0aGUgZWRnZSBjb25kaXRpb25zLCB3ZSdyZSBnb2luZ1xyXG5cdFx0Ly8gdG8gaXRlcmF0ZSB0aHJvdWdoIGFsbCBvZiB0aGUga2V5cywgYW5kIHRyeSB0byBmaW5kIGEgdmFsdWVcclxuXHRcdC8vIHRoYXQgaXNuJ3Qga2V5ZWQgaW4gdGhlIHByb3ZpZGVkIG1hcCwgdGhlbiByZXR1cm4gZmFsc2UuXHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBLZXlzXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IEtleVxyXG5cdFx0XHRsZXQga2V5ID0ga2V5c1tpXTtcclxuXHJcblx0XHRcdC8vIFNraXAgdGhpcyBpdGVyYXRpb24gaWYgdGhlIGtleSBleHBsaWN0bHkgZXhpc3RzXHJcblx0XHRcdGlmKHRoaXMuZXhpc3RzKG1hcCwga2V5KSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBJbml0aWFsaXplIHRoZSBTdWIgTWFwXHJcblx0XHRcdGxldCBzdWJLZXlNYXAgPSBtYXA7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGtleXMgdXNpbmcgXCJkb3RcIiBub3RhdGlvblxyXG5cdFx0XHRsZXQgZG90S2V5cyA9IGtleS5zcGxpdCgnLicpO1xyXG5cclxuXHRcdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRvIGtleXMgaW4gdGhlIFwiZG90XCIgbm90YXRpb25cclxuXHRcdFx0Zm9yKGxldCBqID0gMDsgaiA8IGRvdEtleXMubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IFNlZ21lbnRcclxuXHRcdFx0XHRsZXQgc2VnbWVudCA9IGRvdEtleXNbal07XHJcblxyXG5cdFx0XHRcdC8vIElmIHRoZSBTdWIgS2V5IEFycmF5IGlzIGFjY2Vzc2libGUgYW5kIGV4aXN0cywgdGhlbiBrZWVwIGdvaW5nIGRlZXBlclxyXG5cdFx0XHRcdGlmKHRoaXMuYWNjZXNzaWJsZShzdWJLZXlNYXApICYmIHRoaXMuZXhpc3RzKHN1YktleU1hcCwgc2VnbWVudCkpIHtcclxuXHRcdFx0XHRcdHN1YktleU1hcCA9IHN1YktleU1hcFtzZWdtZW50XTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIE90aGVyd2lzZSwgc3RvcCBoZXJlXHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBXZSBtYW5hZ2VkIHRvIGZpbmQgZXZlcnl0aGluZywgcmV0dXJuIHRydWVcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBzcGVjaWZpZWQgbWFwIGl0ZW0gdG8gdGhlIGdpdmVuIHZhbHVlIHVzaW5nIFwiZG90XCIgbm90YXRpb24uXHJcblx0ICogSWYgbm8ga2V5IGlzIHByb3ZpZGVkLCB0aGUgZW50aXJlIG1hcCB3aWxsIGJlIHJlcGxhY2VkLiBTaW5jZSB3ZVxyXG5cdCAqIGNhbid0IHBhc3MgYnkgcmVmZXJlbmNlIGluIEphdmFTY3JpcHQsIHdlJ2xsIHJldHVybiBhIGNvcHkuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICBtYXBcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gICB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBzZXQobWFwLCBrZXksIHZhbHVlKSB7XHJcblxyXG5cdFx0Ly8gSWYgbm8ga2V5IGlzIHByb3ZpZGVkLCB0aGVuIHJldHVybiB0aGUgdmFsdWVcclxuXHRcdGlmKGtleSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBLZXkgU2VnbWVudHNcclxuXHRcdHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3Mgb25seSBvbmUgc2VnbWVudCwgdGhlbiB3ZSd2ZSByZWFjaGVkIG91ciBiYXNlIGNhc2VcclxuXHRcdC8vIGluIHRoZSByZWN1cnNpb24gKG9yIHdlIHN0YXJ0ZWQgb2ZmIGluIGEgYmFzZSBjYXNlKSwgc28gd2VcclxuXHRcdC8vIHNob3VsZCBkaXJlY3RseSBzZXQgdGhlIGtleWVkIHZhbHVlIGFuZCByZXR1cm4gdGhlIG1hcC5cclxuXHJcblx0XHQvLyBDaGVjayBmb3IgYSBzaW5nbGUgU2VnbWVudFxyXG5cdFx0aWYoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcblxyXG5cdFx0XHQvLyBTZXQgdGhlIGtleWVkIHZhbHVlXHJcblx0XHRcdG1hcFtzZWdtZW50c1swXV0gPSB2YWx1ZTtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgTWFwXHJcblx0XHRcdHJldHVybiBtYXA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3MgbXVsdGlwbGUgc2VnbWVudHMsIHRoZW4gd2UgaGF2ZSB0byBkbyBzb21lIHRyaWNreVxyXG5cdFx0Ly8gcmVjdXJzaW9uLiBKYXZhU2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBwYXNzIGJ5IHJlZmVyZW5jZSxcclxuXHRcdC8vIHNvIHdlIG11c3QgcmVjdXJzaXZlbHkgc2V0IGVhY2ggaW5kZXggd2l0aGluIHRoZSBtYXAuXHJcblxyXG5cdFx0Ly8gU3BsaWNlIG9mZiB0aGUgZmlyc3QgU2VnbWVudFxyXG5cdFx0dmFyIHNlZ21lbnQgPSBzZWdtZW50cy5zcGxpY2UoMCwgMSlbMF07XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgTWFwIFNlZ21lbnQsIGlmIG5lZWRlZFxyXG5cdFx0aWYodHlwZW9mIG1hcFtzZWdtZW50XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0bWFwW3NlZ21lbnRdID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVjdXJzaXZlbHkgc2V0IHRoZSBWYWx1ZVxyXG5cdFx0bWFwW3NlZ21lbnRdID0gdGhpcy5zZXQobWFwW3NlZ21lbnRdLCBzZWdtZW50cy5qb2luKCcuJyksIHZhbHVlKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIE1hcFxyXG5cdFx0cmV0dXJuIG1hcDtcclxuXHJcblx0fTtcclxuXHJcbn07XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLk1hcCA9IE1hcDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hcC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5TdXBwb3J0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBNYW5hZ2VyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZX0gIGdhbWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZ2FtZSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGdhbWUgaW5zdGFuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZX1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fZ2FtZSA9IGdhbWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVnaXN0ZXJlZCBjdXN0b20gZHJpdmVyIGNyZWF0b3JzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fY3VzdG9tQ3JlYXRvcnMgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjcmVhdGVkIFwiZHJpdmVyc1wiLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fZHJpdmVycyA9IHt9O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBEZWZhdWx0IERyaXZlciBOYW1lLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldERlZmF1bHREcml2ZXIoKSB7XHJcblx0XHRyZXR1cm4gYWJzdHJhY3QodGhpcyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc3BlY2lmaWVkIERyaXZlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xudWxsfSAgZHJpdmVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRkcml2ZXIoZHJpdmVyID0gbnVsbCkge1xyXG5cclxuXHRcdC8vIENoZWNrIGZvciBOVUxMIERyaXZlciB3aXRob3V0IERlZmF1bHQgRHJpdmVyIHN1cHBvcnRcclxuXHRcdGlmKGRyaXZlciA9PSBudWxsICYmICF0aGlzLnVzZXNEZWZhdWx0RHJpdmVyKCkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWZhdWx0IGRyaXZlciBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgRHJpdmVyIE5hbWVcclxuXHRcdHZhciBkcml2ZXIgPSBkcml2ZXIgfHwgdGhpcy5nZXREZWZhdWx0RHJpdmVyKCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBnaXZlbiBkcml2ZXIgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgYmVmb3JlLCB3ZSB3aWxsIGNyZWF0ZSB0aGUgaW5zdGFuY2VzXHJcbiAgICAgICAgLy8gaGVyZSBhbmQgY2FjaGUgaXQgc28gd2UgY2FuIHJldHVybiBpdCBuZXh0IHRpbWUgdmVyeSBxdWlja2x5LiBJZiB0aGVyZSBpc1xyXG4gICAgICAgIC8vIGFscmVhZHkgYSBkcml2ZXIgY3JlYXRlZCBieSB0aGlzIG5hbWUsIHdlJ2xsIGp1c3QgcmV0dXJuIHRoYXQgaW5zdGFuY2UuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBEcml2ZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVzb2x2ZWRcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fZHJpdmVyc1tkcml2ZXJdID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICBcdC8vIFJlc29sdmUgdGhlIERyaXZlclxyXG4gICAgICAgIFx0dGhpcy5fZHJpdmVyc1tkcml2ZXJdID0gdGhpcy5fZ2V0KGRyaXZlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBEcml2ZXJcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJpdmVyc1tkcml2ZXJdO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpZWQgRHJpdmVyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0X2dldChuYW1lKSB7XHJcblxyXG5cdFx0Ly8gU29tZSBtYW5hZ2VycyB1c2UgYSBjb25maWd1cmF0aW9uIHNldHVwLCB3aGljaCB1c2UgYWRhcHRlcnMgd2l0aCBkcml2ZXJzLiBJblxyXG5cdFx0Ly8gdGhpcyBjYXNlLCB3ZSdsbCBkZXRlcm1pbmUgdGhlIGNvbmZpZ3VyYXRpb24sIGFuZCBidWlsZCBhIG5ldyBkcml2ZXIgZnJvbVxyXG5cdFx0Ly8gaXQuIFRoZSBhZGFwdGVyIGhlcmUgaXMgZHluYW1pYywgYnV0IHRoZSBkcml2ZXIgaXMgc3RpbGwgaGFyZCBkZWZpbmVkLlxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBDb25maWd1cmFibGUgQWRhcHRlcnNcclxuXHRcdGlmKHRoaXMudXNlc0NvbmZpZ3VyYWJsZUFkYXB0ZXJzKCkpIHtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhbmQgcmV0dXJuIGFuIEFkYXB0ZXJcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUFkYXB0ZXIobmFtZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFVzZSBEcml2ZXIgQ3JlYXRpb25cclxuXHRcdHJldHVybiB0aGlzLl9jcmVhdGVEcml2ZXIobmFtZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgc3BlY2lmaWVkIEFkYXB0ZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRfY3JlYXRlQWRhcHRlcihuYW1lKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBBZGFwdGVyIENvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBjb25maWcgPSB0aGlzLl9nZXRDb25maWcobmFtZSk7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBEcml2ZXJcclxuXHRcdHZhciBkcml2ZXIgPSBjb25maWdbdGhpcy5nZXRDb25maWdEcml2ZXJLZXlOYW1lKCldO1xyXG5cclxuICAgICAgICAvLyBXZSdsbCBjaGVjayB0byBzZWUgaWYgYSBjcmVhdG9yIG1ldGhvZCBleGlzdHMgZm9yIHRoZSBnaXZlbiBkcml2ZXIuIElmIG5vdCB3ZVxyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgZm9yIGEgY3VzdG9tIGRyaXZlciBjcmVhdG9yLCB3aGljaCBhbGxvd3MgZGV2ZWxvcGVycyB0byBjcmVhdGVcclxuICAgICAgICAvLyBkcml2ZXJzIHVzaW5nIHRoZWlyIG93biBjdXN0b21pemVkIGRyaXZlciBjcmVhdG9yIENsb3N1cmUgdG8gY3JlYXRlIGl0LlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSBjcmVhdG9yIGV4aXN0c1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9jdXN0b21DcmVhdG9yc1tkcml2ZXJdICE9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICBcdC8vIENhbGwgdGhlIGN1c3RvbSBjcmVhdG9yXHJcbiAgICAgICAgXHRyZXR1cm4gdGhpcy5fY2FsbEN1c3RvbUNyZWF0b3IoY29uZmlnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBjcmVhdGlvbiBieSBtZXRob2QgaXMgZW5hYmxlZFxyXG4gICAgICAgIGlmKHRoaXMudXNlc0NyZWF0aW9uQnlNZXRob2QoKSkge1xyXG5cclxuICAgICAgICBcdC8vIERldGVybWluZSB0aGUgbmFtZSBvZiB0aGUgY3JlYXRpb24gbWV0aG9kXHJcbiAgICAgICAgXHR2YXIgbWV0aG9kID0gdGhpcy5fZ2V0Q3JlYXRpb25NZXRob2ROYW1lKGRyaXZlcik7XHJcblxyXG4gICAgICAgIFx0Ly8gQ2hlY2sgaWYgdGhlIG1ldGhvZCBleGlzdHNcclxuICAgICAgICBcdGlmKHR5cGVvZiB0aGlzW21ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBcdFx0cmV0dXJuIHRoaXNbbWV0aG9kXShjb25maWcpO1xyXG4gICAgICAgIFx0fVxyXG5cclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBEcml2ZXIgWyR7ZHJpdmVyfV0gaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWRhcHRlciBbJHtuYW1lfV0gY29uc3RydWN0b3IgaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpZWQgRHJpdmVyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgZHJpdmVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfVxyXG5cdCAqL1xyXG5cdF9jcmVhdGVEcml2ZXIoZHJpdmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFdlJ2xsIGNoZWNrIHRvIHNlZSBpZiBhIGNyZWF0b3IgbWV0aG9kIGV4aXN0cyBmb3IgdGhlIGdpdmVuIGRyaXZlci4gSWYgbm90IHdlXHJcbiAgICAgICAgLy8gd2lsbCBjaGVjayBmb3IgYSBjdXN0b20gZHJpdmVyIGNyZWF0b3IsIHdoaWNoIGFsbG93cyBkZXZlbG9wZXJzIHRvIGNyZWF0ZVxyXG4gICAgICAgIC8vIGRyaXZlcnMgdXNpbmcgdGhlaXIgb3duIGN1c3RvbWl6ZWQgZHJpdmVyIGNyZWF0b3IgQ2xvc3VyZSB0byBjcmVhdGUgaXQuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGEgY3VzdG9tIGNyZWF0b3IgZXhpc3RzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2N1c3RvbUNyZWF0b3JzW2RyaXZlcl0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgIFx0Ly8gQ2FsbCB0aGUgY3VzdG9tIGNyZWF0b3JcclxuICAgICAgICBcdHJldHVybiB0aGlzLl9jYWxsQ3VzdG9tQ3JlYXRvcihkcml2ZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGNyZWF0aW9uIGJ5IG1ldGhvZCBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYodGhpcy51c2VzQ3JlYXRpb25CeU1ldGhvZCgpKSB7XHJcblxyXG4gICAgICAgIFx0Ly8gRGV0ZXJtaW5lIHRoZSBuYW1lIG9mIHRoZSBjcmVhdGlvbiBtZXRob2RcclxuICAgICAgICBcdHZhciBtZXRob2QgPSB0aGlzLl9nZXRDcmVhdGlvbk1ldGhvZE5hbWUoZHJpdmVyKTtcclxuXHJcbiAgICAgICAgXHQvLyBDaGVjayBpZiB0aGUgbWV0aG9kIGV4aXN0c1xyXG4gICAgICAgIFx0aWYodHlwZW9mIHRoaXNbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gdGhpcy5tZXRob2QoKTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHQvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIFx0dGhyb3cgbmV3IEVycm9yKGBEcml2ZXIgWyR7ZHJpdmVyfV0gaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRHJpdmVyIFske2RyaXZlcn1dIGNvbnN0cnVjdG9yIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBjdXN0b20gY3JlYXRvciBmb3IgdGhlIHNwZWNpZmllZCBkcml2ZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBkcml2ZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge21peGVkfVxyXG5cdCAqL1xyXG5cdF9jYWxsQ3VzdG9tZXJDcmVhdG9yKGRyaXZlcikge1xyXG5cclxuXHRcdC8vIENhbGwgdGhlIGN1c3RvbSBjcmVhdG9yLCBwYXNzaW5nIGl0IHRoZSBHYW1lXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VzdG9tQ3JlYXRvcnNbZHJpdmVyXS5hcHBseSh0aGlzLCBbdGhpcy5fZ2FtZV0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBDcmVhdGlvbiBNZXRob2QgTmFtZSBmb3IgdGhlIHNwZWNpZmllZCBEcml2ZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBkcml2ZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRfZ2V0Q3JlYXRpb25NZXRob2ROYW1lKGRyaXZlcikge1xyXG5cclxuXHRcdC8vIENvbnZlcnQgJy0nIGFuZCAnXycgdG8gc3BhY2VzXHJcblx0XHR2YXIgZHJpdmVyID0gZHJpdmVyLnJlcGxhY2UoL1stX10vZywgJyAnKTtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIHdvcmRzXHJcblx0XHR2YXIgd29yZHMgPSBkcml2ZXIuc3BsaXQoJyAnKTtcclxuXHJcblx0XHQvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkXHJcblx0XHR3b3JkcyA9IHdvcmRzLm1hcChmdW5jdGlvbih3b3JkKSB7XHJcblx0XHRcdHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvbmNhdGVuYXRlIHRoZSBXb3JkcyB0b2dldGhlclxyXG5cdFx0dmFyIG1ldGhvZCA9IHdvcmRzLmpvaW4oKTtcclxuXHJcblx0XHQvLyBXcmFwIHRoZSBNZXRob2QgTmFtZVxyXG5cdFx0bWV0aG9kID0gJ2NyZWF0ZScgKyBtZXRob2QgKyAnRHJpdmVyJztcclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIE1ldGhvZCBOYW1lXHJcblx0XHRyZXR1cm4gbWV0aG9kO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgTWFuYWdlciBzdXBwb3J0cyBkcml2ZXIgY3JlYXRpb25cclxuXHQgKiBmcm9tIG1ldGhvZHMgZGVmaW5lZCBieSBhbiBpbmhlcml0aW5nIGNoaWxkIGluc3RhbmNlLiBUaGVcclxuXHQgKiBuYW1lIG9mIHRoZSBkcml2ZXIgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBtZXRob2QgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0dXNlc0NyZWF0aW9uQnlNZXRob2QoKSB7XHJcblxyXG5cdFx0Ly8gU3VwcG9ydGVkIGJ5IERlZmF1bHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgTWFuYWdlciBzdXBwb3J0cyBhZGFwdGVyIGNyZWF0aW9uXHJcblx0ICogZnJvbSBjb25maWd1cmF0aW9uIHNldHRpbmdzLCB3aGVyZSBhbiB1bmRlcmx5aW5nIGRyaXZlciBpc1xyXG5cdCAqIHR5cGljYWxseSBzcGVjaWZpZWQuIFRoZSBkcml2ZXIgaXMgY3JlYXRlZCBzZXBhcmF0ZWx5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHR1c2VzQ29uZmlndXJhYmxlQWRhcHRlcnMoKSB7XHJcblxyXG5cdFx0Ly8gTm90IHN1cHBvcnRlZCBieSBEZWZhdWx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBNYW5hZ2VyIHN1cHBvcnRzIGEgZGVmYXVsdCBkcml2ZXJcclxuXHQgKiBpbXBsZW1lbnRhdGlvbi4gVGhpcyBhbGxvd3MgYW4gXCJpbmZlcnJlZFwiIGRyaXZlciwgYW5kIHNvbWVcclxuXHQgKiBwcm94aWVzIG1heSB0YWtlIGFkdmFudGFnZSBvZiB0aGlzIHRvIGJ1YmJsZSBkb3duIGNvZGUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHVzZXNEZWZhdWx0RHJpdmVyKCkge1xyXG5cclxuXHRcdC8vIFN1cHBvcnRlZCBieSBEZWZhdWx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUga2V5IHRoYXQgaG9sZHMgdGhlIG5hbWUgb2YgdGhlIGRyaXZlclxyXG5cdCAqIGZvciBhbnkgY29uZmlndXJlZCBhZGFwdGVyIGZvciB0aGlzIG1hbmFnZXIuIE1vc3QgY2FsbCBpdFxyXG5cdCAqICdkcml2ZXInLCBidXQgb3RoZXIgaW1wbGVtZW50YXRpb25zIG1heSBiZSBkaWZmZXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0Q29uZmlnRHJpdmVyS2V5TmFtZSgpIHtcclxuXHJcblx0XHQvLyBVc2UgJ2RyaXZlcicgYnkgRGVmYXVsdFxyXG5cdFx0cmV0dXJuICdkcml2ZXInO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBjdXN0b20gY3JlYXRvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgZHJpdmVyXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRleHRlbmQoZHJpdmVyLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIHRoZSBjdXN0b20gY3JlYXRvclxyXG5cdFx0dGhpcy5fY3VzdG9tQ3JlYXRvcnNbZHJpdmVyXSA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNyZWF0ZWQgXCJkcml2ZXJzXCIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXREcml2ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kcml2ZXJzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzcGVjaWZpZWQgQWRhcHRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlnKG5hbWUpIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuX2dhbWUubWFrZSgnY29uZmlnJykuZ2V0KHRoaXMuX2dldENvbmZpZ3VyYXRpb25Sb290KCkgKyAnLicgKyBuYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDb25maWd1cmF0aW9uIFJvb3QgZm9yIHRoaXMgTWFuYWdlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlndXJhdGlvblJvb3QobmFtZSkge1xyXG4gICAgXHRyZXR1cm4gYWJzdHJhY3QodGhpcyk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5NYW5hZ2VyID0gTWFuYWdlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hbmFnZXIuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuR3JhcGhpY3MnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhc0NvbnRleHQge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IENhbnZhcyBDb250ZXh0IGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSAgY29udGV4dFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB0aGlzXHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoY29udGV4dCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIHVuZGVybHlpbmcgQ29udGV4dC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBiYXNlIENvbnRleHQgb2YgdGhpcyBDb250ZXh0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG5cdCAqL1xyXG5cdGdldENvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGV4dDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3cyBhIG5ldyBQYXRoIHVzaW5nIHRoZSBzcGVjaWZpZWQgQ2FsbGJhY2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtDbG9zdXJlfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge21peGVkfVxyXG5cdCAqL1xyXG5cdGRyYXcoY2FsbGJhY2spIHtcclxuXHJcblx0XHQvLyBCZWdpbiB0aGUgUGF0aFxyXG5cdFx0dGhpcy5fY29udGV4dC5iZWdpblBhdGgoKTtcclxuXHJcblx0XHQvLyBDYWxsIHRoZSBDYWxsYmFja1xyXG5cdFx0dmFyIHJlc3VsdCA9IGNhbGxiYWNrKHRoaXMuX2NvbnRleHQpO1xyXG5cclxuXHRcdC8vIENsb3NlIHRoZSBQYXRoXHJcblx0XHR0aGlzLl9jb250ZXh0LmNsb3NlUGF0aCgpO1xyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgUmVzdWx0XHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEcmF3cyB0aGUgc3BlY2lmaWVkIENpcmNsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgeFxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgeVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgcmFkaXVzXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGJvb2xlYW59ICBmaWxsXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGJvb2xlYW59ICBvdXRsaW5lXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICBsaW5lV2lkdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZHJhd0NpcmNsZSh4LCB5LCByYWRpdXMsIGZpbGwgPSAnYmxhY2snLCBvdXRsaW5lID0gZmFsc2UsIGxpbmVXaWR0aCA9IDEpIHtcclxuXHJcblx0XHQvLyBEcmF3IHRoZSBDaXJjbGVcclxuXHRcdHJldHVybiB0aGlzLmRyYXcoZnVuY3Rpb24oY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gRHJhdyB0aGUgQ2lyY2xlXHJcblx0XHRcdGNvbnRleHQuYXJjKHgsIHksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpXHJcblxyXG5cdFx0XHQvLyBDaGVjayBmb3IgYSBGaWxsXHJcblx0XHRcdGlmKGZpbGwpIHtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRmlsbCBTdHlsZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBmaWxsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRmlsbCB0aGUgQ2lyY2xlXHJcblx0XHRcdFx0Y29udGV4dC5maWxsKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBmb3IgYW4gT3V0bGluZVxyXG5cdFx0XHRpZihvdXRsaW5lKSB7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGZvciBhbiBPdXRsaW5lIFN0eWxlXHJcblx0XHRcdFx0aWYodHlwZW9mIG91dGxpbmUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRjb250ZXh0LnN0b2tlU3R5bGUgPSBvdXRsaW5lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU2V0IHRoZSBMaW5lIFdpZHRoXHJcblx0XHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcblxyXG5cdFx0XHRcdC8vIE91dGxpbmUgdGhlIENpcmNsZVxyXG5cdFx0XHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgdGhlIHNwZWNpZmllZCBSZWN0YW5nbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHhcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHlcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHdpZHRoXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICBoZWlnaHRcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8Ym9vbGVhbn0gIGZpbGxcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8Ym9vbGVhbn0gIG91dGxpbmVcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIGxpbmVXaWR0aFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkcmF3UmVjdGFuZ2xlKHgsIHksIHdpZHRoLCBoZWlnaHQsIGZpbGwgPSAnYmxhY2snLCBvdXRsaW5lID0gZmFsc2UsIGxpbmVXaWR0aCA9IDEpIHtcclxuXHJcblx0XHQvLyBEcmF3IHRoZSBSZWN0YW5nbGVcclxuXHRcdHJldHVybiB0aGlzLmRyYXcoZnVuY3Rpb24oY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gRHJhdyB0aGUgUmVjdGFuZ2xlXHJcblx0XHRcdGNvbnRleHQucmVjdCh4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBhIEZpbGxcclxuXHRcdFx0aWYoZmlsbCkge1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBmb3IgYSBGaWxsIFN0eWxlXHJcblx0XHRcdFx0aWYodHlwZW9mIGZpbGwgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGZpbGw7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBGaWxsIHRoZSBSZWN0YW5nbGVcclxuXHRcdFx0XHRjb250ZXh0LmZpbGwoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBhbiBPdXRsaW5lXHJcblx0XHRcdGlmKG91dGxpbmUpIHtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGFuIE91dGxpbmUgU3R5bGVcclxuXHRcdFx0XHRpZih0eXBlb2Ygb3V0bGluZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdGNvbnRleHQuc3Rva2VTdHlsZSA9IG91dGxpbmU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBTZXQgdGhlIExpbmUgV2lkdGhcclxuXHRcdFx0XHRjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuXHJcblx0XHRcdFx0Ly8gT3V0bGluZSB0aGUgUmVjdGFuZ2xlXHJcblx0XHRcdFx0Y29udGV4dC5zdHJva2UoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgdGhlIHNwZWNpZmllZCBSZWN0YW5nbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICB4MVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgIHkxXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgeDJcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICB5MlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGNvbG9yXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgbGluZVdpZHRoXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGRyYXdMaW5lKHgxLCB5MSwgeDIsIHkyLCBjb2xvciA9ICdibGFjaycsIGxpbmVXaWR0aCA9IDEpIHtcclxuXHJcblx0XHQvLyBEcmF3IHRoZSBSZWN0YW5nbGVcclxuXHRcdHJldHVybiB0aGlzLmRyYXcoZnVuY3Rpb24oY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gTW92ZSB0byB0aGUgZmlyc3QgUG9pbnRcclxuXHRcdFx0Y29udGV4dC5tb3ZlVG8oeDEsIHkxKTtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhIExpbmUgdG8gdGhlIHNlY29uZCBQb2ludFxyXG5cdFx0XHRjb250ZXh0LmxpbmVUbyh4MiwgeTIpO1xyXG5cclxuXHRcdFx0Ly8gU2V0IHRoZSBMaW5lIENvbG9yXHJcblx0XHRcdGNvbnRleHQuc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuXHJcblx0XHRcdC8vIFNldCB0aGUgTGluZSBXaWR0aFxyXG5cdFx0XHRjb250ZXh0LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIExpbmVcclxuXHRcdFx0Y29udGV4dC5zdHJva2UoKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgdGhlIHNwZWNpZmllZCBUZXh0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICB4XHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICB5XHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGJvb2xlYW59ICBjb2xvclxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xib29sZWFufSAgZm9udFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkcmF3VGV4dCh0ZXh0LCB4LCB5LCBjb2xvciA9ICdibGFjaycsIGZvbnQgPSAnMjBweCBBcmlhbCBCb2xkJykge1xyXG5cclxuXHRcdC8vIERyYXcgdGhlIFRleHRcclxuXHRcdHJldHVybiB0aGlzLmRyYXcoZnVuY3Rpb24oY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGEgQ29sb3JcclxuXHRcdFx0aWYoY29sb3IpIHtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRmlsbCBTdHlsZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gY29sb3I7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRm9udFxyXG5cdFx0XHRpZihmb250KSB7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGZvciBhbiBPdXRsaW5lIFN0eWxlXHJcblx0XHRcdFx0aWYodHlwZW9mIGZvbnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRjb250ZXh0LmZvbnQgPSBmb250O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIFRleHRcclxuXHRcdFx0Y29udGV4dC5maWxsVGV4dCh0ZXh0LCB4LCB5KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcbn07XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkNhbnZhc0NvbnRleHQgPSBDYW52YXNDb250ZXh0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0dyYXBoaWNzL0NhbnZhc0NvbnRleHQuanMiLCJjbGFzcyBDYW52YXMge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IENhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSAgZWxlbWVudFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgY29udGV4dFR5cGVcclxuXHQgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgICAgIGZwc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihlbGVtZW50LCBjb250ZXh0VHlwZSA9ICcyZCcsIGZwcyA9IDYwKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgSFRNTCBFbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIENhbnZhcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtIVE1MRWxlbWVudH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBDb250ZXh0IElkZW50aWZpZXIgZm9yIHRoZSBEcmF3aW5nIENvbnRleHQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7c3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNvbnRleHRUeXBlID0gY29udGV4dFR5cGU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgUmVuZGVyaW5nIENvbnRleHQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7bWl4ZWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuY29udGV4dCA9IG5ldyB3aW5kb3cuR2FtZS5HcmFwaGljcy5DYW52YXNDb250ZXh0KHRoaXMuZWxlbWVudC5nZXRDb250ZXh0KHRoaXMuY29udGV4dFR5cGUpKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBEcmF3aW5nIFN0YWNrLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIgYXJyYXlcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kcmF3U3RhY2sgPSBbXTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBudW1iZXIgb2YgRHJhd2luZyB1cGRhdGVzIHBlciBTZWNvbmQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciBpbnRcclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5mcHMgPSBmcHM7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgRHJhdyBMb29wLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge0dhbWUuU3VwcG9ydC5Mb29wfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmRyYXdMb29wID0gbmV3IEdhbWUuU3VwcG9ydC5Mb29wKHtcclxuXHRcdFx0J2JlZm9yZSc6IHRoaXMuYmVmb3JlRHJhd2luZ0xvb3AuYmluZCh0aGlzKSxcclxuXHRcdFx0J2xvb3AnOiB0aGlzLmludm9rZURyYXdTdGFjay5iaW5kKHRoaXMpLFxyXG5cdFx0XHQnYWZ0ZXInOiB0aGlzLmFmdGVyRHJhd2luZ0xvb3AuYmluZCh0aGlzKSxcclxuXHRcdFx0J2ludGVydmFsJzogMSAvIHRoaXMuZnBzXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgSFRNTCBFbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIENhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxyXG5cdCAqL1xyXG5cdGdldEVsZW1lbnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIENvbnRleHQgb2YgdGhpcyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtDYW52YXNDb250ZXh0fVxyXG5cdCAqL1xyXG5cdGdldENvbnRleHQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZXh0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZHMgdGhlIHNwZWNpZmllZCBDYWxsYmFjayB0byB0aGUgRHJhdyBTdGFjay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0Nsb3N1cmV9ICBjYWxsYmFja1xyXG5cdCAqIEBwYXJhbSAge2ludGVnZXJ9ICBwcmlvcml0eVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkcmF3KGNhbGxiYWNrLCBwcmlvcml0eSkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgUHJpb3JpdHlcclxuXHRcdHZhciBwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBQcmlvcml0eSBpbiB0aGUgRHJhdyBTdGFjayBleGlzdHNcclxuXHRcdGlmKHR5cGVvZiB0aGlzLmRyYXdTdGFja1twcmlvcml0eV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRoaXMuZHJhd1N0YWNrW3ByaW9yaXR5XSA9IFtdO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFkZCB0aGUgQ2FsbGJhY2sgdG8gdGhlIERyYXcgU3RhY2tcclxuXHRcdHRoaXMuZHJhd1N0YWNrW3ByaW9yaXR5XS5wdXNoKGNhbGxiYWNrKTtcclxuXHJcblx0XHQvLyBBbGxvdyBDaGFpbmluZ1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENsZWFycyB0aGlzIENhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y2xlYXIoKSB7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIENhbnZhc1xyXG5cdFx0dGhpcy5jb250ZXh0LmdldENvbnRleHQoKS5jbGVhclJlY3QoMCwgMCwgdGhpcy5nZXRXaWR0aCgpLCB0aGlzLmdldEhlaWdodCgpKTtcclxuXHJcblx0XHQvLyBBbGxvdyBDaGFpbmluZ1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJlZ2lucyB0aGUgRHJhd2luZyBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiZWdpbkRyYXdpbmdMb29wKCkge1xyXG5cclxuXHRcdC8vIFN0YXJ0IHRoZSBEcmF3aW5nIExvb3BcclxuXHRcdHRoaXMuZHJhd0xvb3Auc3RhcnQoKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgdmFyaW91cyBhY3Rpb25zIGJlZm9yZSB0aGUgRHJhd2luZyBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiZWZvcmVEcmF3aW5nTG9vcCgpIHtcclxuXHJcblx0XHQvLyBDbGVhciB0aGUgQ2FudmFzXHJcblx0XHR0aGlzLmNsZWFyKCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEludm9rZXMgdGhlIERyYXdpbmcgU3RhY2suXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGludm9rZURyYXdTdGFjaygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIFByaW9yaXRpZXMgaW4gdGhlIERyYXcgU3RhY2tcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmRyYXdTdGFjay5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IERyYXdpbmcgUHJpb3JpdHlcclxuXHRcdFx0dmFyIHByaW9yaXR5ID0gdGhpcy5kcmF3U3RhY2tbaV07XHJcblxyXG5cdFx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIERyYXdpbmcgQ2FsbGJhY2tzIGluIHRoZSBEcmF3aW5nIFByaW9yaXR5XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCB0aGlzLmRyYXdTdGFja1tpXS5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgRHJhd2luZyBDYWxsYmFja1xyXG5cdFx0XHRcdHZhciBjYWxsYmFjayA9IHRoaXMuZHJhd1N0YWNrW2ldW2pdO1xyXG5cclxuXHRcdFx0XHQvLyBDYWxsIHRoZSBEcmF3aW5nIENhbGxiYWNrXHJcblx0XHRcdFx0dmFyIHJlc3VsdCA9IGNhbGxiYWNrKHRoaXMuY29udGV4dCwgcHJpb3JpdHkpO1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBmb3IgYSBGYWxzZSBSZXN1bHRcclxuXHRcdFx0XHRpZihyZXN1bHQgPT09IGZhbHNlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgdmFyaW91cyBhY3Rpb25zIGFmdGVyIHRoZSBEcmF3aW5nIExvb3AuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGFmdGVyRHJhd2luZ0xvb3AoKSB7XHJcblxyXG5cdFx0Ly9cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5kcyB0aGUgRHJhd2luZyBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRlbmREcmF3aW5nTG9vcCgpIHtcclxuXHJcblx0XHQvLyBTdG9wIHRoZSBEcmF3aW5nIExvb3BcclxuXHRcdHRoaXMuZHJhd0xvb3Auc3RvcCgpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBXaWR0aCBvZiB0aGlzIENhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gZmxvYXRcclxuXHQgKi9cclxuXHRnZXRXaWR0aCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQud2lkdGg7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgSGVpZ2h0IG9mIHRoaXMgQ2FudmFzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiBmbG9hdFxyXG5cdCAqL1xyXG5cdGdldEhlaWdodCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQuaGVpZ2h0O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIFggUG9zaXRpb24gb2YgdGhlIENhbnZhcyBFbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7ZmxvYXR9XHJcblx0ICovXHJcblx0Z2V0WCgpIHtcclxuXHRcdHJldHVybiB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBZIFBvc2l0aW9uIG9mIHRoZSBDYW52YXMgRWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Zsb2F0fVxyXG5cdCAqL1xyXG5cdGdldFkoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgTW91c2UgWCBQb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgQ2FudmFzIEVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtmbG9hdH1cclxuXHQgKi9cclxuXHRnZXRNb3VzZVgoKSB7XHJcblx0XHRyZXR1cm4gZ2FtZSgpLm1ha2UoJ21vdXNlJykuZ2V0WCgpIC0gdGhpcy5nZXRYKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgTW91c2UgWSBQb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgQ2FudmFzIEVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtmbG9hdH1cclxuXHQgKi9cclxuXHRnZXRNb3VzZVkoKSB7XHJcblx0XHRyZXR1cm4gZ2FtZSgpLm1ha2UoJ21vdXNlJykuZ2V0WSgpIC0gdGhpcy5nZXRZKCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgTW91c2UgUG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIENhbnZhcyBFbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdGdldE1vdXNlUG9zaXRpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0J3gnOiB0aGlzLmdldE1vdXNlWCgpLFxyXG5cdFx0XHQneSc6IHRoaXMuZ2V0TW91c2VZKClcclxuXHRcdH1cclxuXHJcblx0fTtcclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIFdpbmRvd1xyXG53aW5kb3cuR2FtZS5HcmFwaGljcy5DYW52YXMgPSBDYW52YXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvR3JhcGhpY3MvQ2FudmFzLmpzIiwiLy8gTG9hZCB0aGUgc2NyaXB0cyB3aXRoaW4gdGhlIE5hbWVzcGFjZVxyXG5yZXF1aXJlKCcuL0tleWJvYXJkJyk7XHJcbnJlcXVpcmUoJy4vTW91c2UnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9JbnB1dC9JbnB1dC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5JbnB1dCcpO1xyXG5cclxuY2xhc3MgS2V5Ym9hcmQge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBLZXlib2FyZCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdGF0aWN9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgcHJldmlvdXMgS2V5Ym9hcmQgRXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtLZXlib2FyZEV2ZW50fG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0tleWJvYXJkRXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgS2V5IFN0YXRlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmtleVN0YXRlcyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbml0aWFsaXplIHRoZSBLZXkgU3RhdGUgVHlwZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmtleVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEXSA9IHt9O1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdID0ge307XHJcbiAgICAgICAgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBLZXkgQ29kZSBTdGF0ZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5rZXlDb2RlU3RhdGVzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYWxpemUgdGhlIEtleSBTdGF0ZSBUeXBlc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEXSA9IHt9O1xyXG4gICAgICAgIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9IT0xEXSA9IHt9O1xyXG4gICAgICAgIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRF0gPSB7fTtcclxuXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIEtleWJvYXJkIExpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJLZXlib2FyZExpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIEtleWJvYXJkIEV2ZW50IExpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZWdpc3RlcktleWJvYXJkTGlzdGVuZXJzKCkge1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciB0aGUgS2V5IERvd24gTGlzdGVuZXJcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5RG93bkxpc3RlbmVyKCk7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBLZXkgVXAgTGlzdGVuZXJcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5VXBMaXN0ZW5lcigpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIEtleSBEb3duIExpc3RlbmVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyS2V5RG93bkxpc3RlbmVyKCkge1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIEtleSBEb3duIEV2ZW50IHVzaW5nIHRoaXMua2V5RG93bkhhbmRsZXIoKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBLZXkgVXAgTGlzdGVuZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJLZXlVcExpc3RlbmVyKCkge1xyXG5cclxuICAgICAgICAvLyBMaXN0ZW4gdG8gdGhlIEtleSBVcCBFdmVudCB1c2luZyB0aGlzLmtleVVwSGFuZGxlcigpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLmtleVVwSGFuZGxlci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIEtleSBEb3duIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIEtleSBIb2xkIEV2ZW50XHJcbiAgICAgICAgaWYoZXZlbnQucmVwZWF0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgYXMgYSBLZXkgSG9sZCBFdmVudFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5rZXlIb2xkSGFuZGxlcihldmVudCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGFzIGEgS2V5IFByZXNzZWQgRXZlbnRcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlQcmVzc2VkSGFuZGxlcihldmVudCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIEtleSBQcmVzc2VkIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGtleVByZXNzZWRIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgS2V5Ym9hcmQgU3RhdGVcclxuICAgICAgICB0aGlzLl91cGRhdGVLZXlib2FyZFN0YXRlcyhLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VELCBldmVudCk7XHJcblxyXG4gICAgICAgIC8vIEZpcmUgdGhlIEtleSBQcmVzc2VkIEV2ZW50XHJcbiAgICAgICAgS2V5Ym9hcmQuZGlzcGF0Y2hlci5maXJlKCdLZXlib2FyZC5QcmVzc2VkJywge1xyXG4gICAgICAgICAgICAna2V5Ym9hcmQnOiB0aGlzLFxyXG4gICAgICAgICAgICAnZXZlbnQnOiBldmVudFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgS2V5Ym9hcmQgRXZlbnRcclxuICAgICAgICB0aGlzLnByZXZpb3VzS2V5Ym9hcmRFdmVudCA9IGV2ZW50O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBLZXkgSG9sZCBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBrZXlIb2xkSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleWJvYXJkIFN0YXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2V5Ym9hcmRTdGF0ZXMoS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRCwgZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBLZXkgSG9sZCBFdmVudFxyXG4gICAgICAgIEtleWJvYXJkLmRpc3BhdGNoZXIuZmlyZSgnS2V5Ym9hcmQuSG9sZCcsIHtcclxuICAgICAgICAgICAgJ2tleWJvYXJkJzogdGhpcyxcclxuICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIEtleWJvYXJkIEV2ZW50XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0tleWJvYXJkRXZlbnQgPSBldmVudDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgS2V5IFVwIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGtleVVwSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICAvLyBIYW5kbGUgYXMgYSBLZXkgUmVsZWFzZWQgRXZlbnRcclxuICAgICAgICByZXR1cm4gdGhpcy5rZXlSZWxlYXNlZEhhbmRsZXIoZXZlbnQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBLZXkgUmVsZWFzZWQgRXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7S2V5Ym9hcmRFdmVudH0gIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAga2V5UmVsZWFzZWRIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgS2V5Ym9hcmQgU3RhdGVcclxuICAgICAgICB0aGlzLl91cGRhdGVLZXlib2FyZFN0YXRlcyhLZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRCwgZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBLZXkgUmVsZWFzZWQgRXZlbnRcclxuICAgICAgICBLZXlib2FyZC5kaXNwYXRjaGVyLmZpcmUoJ0tleWJvYXJkLlJlbGVhc2VkJywge1xyXG4gICAgICAgICAgICAna2V5Ym9hcmQnOiB0aGlzLFxyXG4gICAgICAgICAgICAnZXZlbnQnOiBldmVudFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZW1lbWJlciB0aGUgS2V5Ym9hcmQgRXZlbnRcclxuICAgICAgICB0aGlzLnByZXZpb3VzS2V5Ym9hcmRFdmVudCA9IGV2ZW50O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBLZXkgU3RhdGUgYW5kIEtleSBDb2RlIFN0YXRlIHVzaW5nIHRoZSBzcGVjaWZpZWQgS2V5Ym9hcmQgRXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBfdXBkYXRlS2V5Ym9hcmRTdGF0ZXMoc3RhdGUsIGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgS2V5IFN0YXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2V5U3RhdGUoZXZlbnQua2V5LCBzdGF0ZSwgZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleSBDb2RlIFN0YXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2V5Q29kZVN0YXRlKGV2ZW50LmNvZGUsIHN0YXRlLCBldmVudCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVwZGF0ZXMgdGhlIHNwZWNpZmllZCBLZXkgU3RhdGUgdXNpbmcgdGhlIGdpdmVuIEtleWJvYXJkIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBrZXlcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBzdGF0ZVxyXG4gICAgICogQHBhcmFtICB7S2V5Ym9hcmRFdmVudH0gIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX3VwZGF0ZUtleVN0YXRlKGtleSwgc3RhdGUsIGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIEtleSB0byBVcHBlciBDYXNlXHJcbiAgICAgICAgdmFyIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleSBTdGF0ZVxyXG4gICAgICAgIHRoaXMua2V5U3RhdGVzW3N0YXRlXVtrZXldID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBvdGhlciBTdGF0ZXMgZm9yIHRoZSBLZXlcclxuICAgICAgICBzd2l0Y2goc3RhdGUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEtleSBQcmVzc2VkXHJcbiAgICAgICAgICAgIGNhc2UgS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBSZWxlYXNlZCBhbmQgS2V5IEhvbGQgU3RhdGVzXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdW2tleV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRF1ba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIEtleSBIb2xkXHJcbiAgICAgICAgICAgIGNhc2UgS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBSZWxlYXNlZCBhbmQgS2V5IFByZXNzZWQgU3RhdGVzXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdW2tleV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF1ba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIEtleSBSZWxlYXNlZFxyXG4gICAgICAgICAgICBjYXNlIEtleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEOlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgS2V5IEhvbGQgYW5kIEtleSBQcmVzc2VkIFN0YXRlc1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdW2tleV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF1ba2V5XTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBzcGVjaWZpZWQgS2V5IENvZGUgU3RhdGUgdXNpbmcgdGhlIGdpdmVuIEtleWJvYXJkIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBjb2RlXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgc3RhdGVcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIF91cGRhdGVLZXlDb2RlU3RhdGUoY29kZSwgc3RhdGUsIGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgS2V5IENvZGUgU3RhdGVcclxuICAgICAgICB0aGlzLmtleUNvZGVTdGF0ZXNbc3RhdGVdW2NvZGVdID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBvdGhlciBTdGF0ZXMgZm9yIHRoZSBLZXkgQ29kZVxyXG4gICAgICAgIHN3aXRjaChzdGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gS2V5IFByZXNzZWRcclxuICAgICAgICAgICAgY2FzZSBLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEOlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB0aGUgS2V5IFJlbGVhc2VkIGFuZCBLZXkgSG9sZCBTdGF0ZXNcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9IT0xEXVtjb2RlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIC8vIEtleSBIb2xkXHJcbiAgICAgICAgICAgIGNhc2UgS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBSZWxlYXNlZCBhbmQgS2V5IFByZXNzZWQgU3RhdGVzXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF1bY29kZV07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBLZXkgUmVsZWFzZWRcclxuICAgICAgICAgICAgY2FzZSBLZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBIb2xkIGFuZCBLZXkgUHJlc3NlZCBTdGF0ZXNcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRF1bY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2NvZGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgaXMgcHJlc3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleVByZXNzZWQoa2V5KSB7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIEtleSB0byBVcHBlciBDYXNlXHJcbiAgICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgS2V5IGlzIHByZXNzZWRcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2tleV0gIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgQ29kZSBpcyBwcmVzc2VkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGNvZGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleUNvZGVQcmVzc2VkKGNvZGUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBLZXkgQ29kZSBpcyBwcmVzc2VkXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF1bY29kZV0gIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgaXMgYmVpbmcgaGVsZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleUhlbGQoa2V5KSB7XHJcblxyXG4gICAgICAgIC8vIENvbnZlcnQgdGhlIEtleSB0byBVcHBlciBDYXNlXHJcbiAgICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKCk7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgS2V5IGlzIGJlaW5nIGhlbGRcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdW2tleV0gIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgQ29kZSBpcyBiZWluZyBoZWxkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGNvZGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleUNvZGVIZWxkKGNvZGUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBLZXkgQ29kZSBpcyBiZWluZyBoZWxkXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRF1bY29kZV0gIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgaXMgZG93bi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleURvd24oa2V5KSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgS2V5IGlzIFByZXNzZWQgb3IgSGVsZFxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzS2V5UHJlc3NlZChrZXkpIHx8IHRoaXMuaXNLZXlIZWxkKGtleSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIEtleSBDb2RlIGlzIGRvd24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29kZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzS2V5Q29kZURvd24oY29kZSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBDb2RlIGlzIFByZXNzZWQgb3IgSGVsZFxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzS2V5Q29kZVByZXNzZWQoa2V5KSB8fCB0aGlzLmlzS2V5Q29kZUhlbGQoa2V5KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIEtleSBpcyB1cC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleVJlbGVhc2VkKGtleSkge1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBLZXkgdG8gVXBwZXIgQ2FzZVxyXG4gICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBpcyB1cFxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdW2tleV0gIT09ICd1bmRlZmluZWQnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgQ29kZSBpcyB1cC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlDb2RlUmVsZWFzZWQoY29kZSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBDb2RlIGlzIHVwXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdW2NvZGVdICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBFdmVudCBEaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0dhbWUuRXZlbnRzLkRpc3BhdGNoZXJ9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXREaXNwYXRjaGVyKCkge1xyXG5cclxuICAgICAgICByZXR1cm4gS2V5Ym9hcmQuZGlzcGF0Y2hlcjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBFdmVudCBEaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0dhbWUuRXZlbnRzLkRpc3BhdGNoZXJ9ICBkaXNwYXRjaGVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIHNldERpc3BhdGNoZXIoZGlzcGF0Y2hlcikge1xyXG5cclxuICAgICAgICBLZXlib2FyZC5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBFdmVudCBEaXNwYXRjaGVyLlxyXG4gKlxyXG4gKiBAdmFyIHtHYW1lLkV2ZW50cy5EaXNwYXRjaGVyfVxyXG4gKi9cclxuS2V5Ym9hcmQuZGlzcGF0Y2hlciA9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIFByZXNzZWQgS2V5IFN0YXRlLlxyXG4gKlxyXG4gKiBAdmFyIHtzdHJpbmd9XHJcbiAqL1xyXG5LZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEID0gJ3ByZXNzZWQnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBIb2xkIEtleSBTdGF0ZS5cclxuICpcclxuICogQHZhciB7c3RyaW5nfVxyXG4gKi9cclxuS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRCA9ICdob2xkJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgUmVsZWFzZWQgS2V5IFN0YXRlLlxyXG4gKlxyXG4gKiBAdmFyIHtzdHJpbmd9XHJcbiAqL1xyXG5LZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRCA9ICdyZWxlYXNlZCc7XHJcblxyXG4vKipcclxuICogVGhlIEtleSBDb25zdGFudHMuXHJcbiAqXHJcbiAqIEB2YXIge3N0cmluZ31cclxuICovXHJcbktleWJvYXJkLktFWV9BTFQgPSAnQWx0JztcclxuS2V5Ym9hcmQuS0VZX0JBQ0tTUEFDRSA9ICdCYWNrc3BhY2UnO1xyXG5LZXlib2FyZC5LRVlfQ09OVFJPTCA9ICdDb250cm9sJztcclxuS2V5Ym9hcmQuS0VZX0RFTEVURSA9ICdEZWxldGUnO1xyXG5LZXlib2FyZC5LRVlfRE9XTiA9ICdBcnJvd0Rvd24nO1xyXG5LZXlib2FyZC5LRVlfRU5EID0gJ0VuZCc7XHJcbktleWJvYXJkLktFWV9FU0NBUEUgPSAnRXNjYXBlJztcclxuS2V5Ym9hcmQuS0VZX0hPTUUgPSAnSG9tZSc7XHJcbktleWJvYXJkLktFWV9JTlNFUlQgPSAnSW5zZXJ0JztcclxuS2V5Ym9hcmQuS0VZX0xFRlQgPSAnQXJyb3dMZWZ0JztcclxuS2V5Ym9hcmQuS0VZX01FVEEgPSAnTWV0YSc7XHJcbktleWJvYXJkLktFWV9OVU1MT0NLID0gJ051bUxvY2snO1xyXG5LZXlib2FyZC5LRVlfUEFHRV9ET1dOID0gJ1BhZ2VEb3duJztcclxuS2V5Ym9hcmQuS0VZX1BBR0VfVVAgPSAnUGFnZVVwJztcclxuS2V5Ym9hcmQuS0VZX1JFVFVSTiA9ICdFbnRlcic7XHJcbktleWJvYXJkLktFWV9SSUdIVCA9ICdBcnJvd1JpZ2h0JztcclxuS2V5Ym9hcmQuS0VZX1NDUk9MTCA9ICdTY3JvbGxMb2NrJztcclxuS2V5Ym9hcmQuS0VZX1NISUZUID0gJ1NoaWZ0JztcclxuS2V5Ym9hcmQuS0VZX1NQQUNFID0gJyAnO1xyXG5LZXlib2FyZC5LRVlfVEFCID0gJ1RhYic7XHJcbktleWJvYXJkLktFWV9VUCA9ICdBcnJvd1VwJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgS2V5IENvbnN0YW50cyBhbGlhc2VzLlxyXG4gKlxyXG4gKiBAdmFyIHtzdHJpbmd9XHJcbiAqL1xyXG5LZXlib2FyZC5LRVlfRU5URVIgPSBLZXlib2FyZC5LRVlfUkVUVVJOO1xyXG5LZXlib2FyZC5LRVlfTkVYVCA9IEtleWJvYXJkLktFWV9QQUdFX0RPV047XHJcbktleWJvYXJkLktFWV9QUklPUiA9IEtleWJvYXJkLktFWV9QQUdFX1VQO1xyXG5LZXlib2FyZC5LRVlfU0NST0xMX0xPQ0sgPSBLZXlib2FyZC5LRVlfU0NST0xMO1xyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5LZXlib2FyZCA9IEtleWJvYXJkO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0lucHV0L0tleWJvYXJkLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLklucHV0Jyk7XHJcblxyXG5jbGFzcyBNb3VzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbmV3IE1vdXNlIGluc3RhbmNlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0YXRpY31cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBwcmV2aW91cyBNb3VzZSBFdmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge01vdXNlRXZlbnR8bnVsbH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnByZXZpb3VzTW91c2VNb3ZlRXZlbnQgPSBudWxsO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgTW91c2UgUG9zaXRpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICd4JzogMCxcclxuICAgICAgICAgICAgJ3knOiAwXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIE1vdXNlIExpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb3VzZUxpc3RlbmVycygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIE1vdXNlIEV2ZW50IExpc3RlbmVycy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZWdpc3Rlck1vdXNlTGlzdGVuZXJzKCkge1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciB0aGUgTW91c2UgTW92ZSBMaXN0ZW5lclxyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJNb3VzZU1vdmVMaXN0ZW5lcigpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIE1vdXNlIE1vdmUgTGlzdGVuZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJNb3VzZU1vdmVMaXN0ZW5lcigpIHtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBLZXkgRG93biBFdmVudCB1c2luZyB0aGlzLm1vdXNlTW92ZUhhbmRsZXIoKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIEtleSBEb3duIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge01vdXNlRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBNb3VzZSBQb3NpdGlvbiBmcm9tIHRoZSBFdmVudFxyXG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuX2dldE1vdXNlUG9zaXRpb25Gcm9tRXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIFBvc2l0aW9uXHJcbiAgICAgICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTW91c2UgUG9zaXRpb24gZnJvbSB0aGUgc3BlY2lmaWVkIE1vdXNlIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge01vdXNlRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgX2dldE1vdXNlUG9zaXRpb25Gcm9tRXZlbnQoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgJ3gnOiBldmVudC5jbGllbnRYLFxyXG4gICAgICAgICAgICAneSc6IGV2ZW50LmNsaWVudFlcclxuICAgICAgICB9O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBNb3VzZSBQb3NpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldFBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvbjtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBNb3VzZSBYIFBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Zsb2F0fVxyXG4gICAgICovXHJcbiAgICBnZXRYKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvblsneCddO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIE1vdXNlIFkgUG9zaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7ZmxvYXR9XHJcbiAgICAgKi9cclxuICAgIGdldFkoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uWyd5J107XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuTW91c2UgPSBNb3VzZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9JbnB1dC9Nb3VzZS5qcyIsIi8vIExvYWQgdGhlIHNjcmlwdHMgd2l0aGluIHRoZSBOYW1lc3BhY2VcclxucmVxdWlyZSgnLi9NYW5hZ2VyJyk7XHJcbnJlcXVpcmUoJy4vR2FtZU9iamVjdCcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL09iamVjdHMvT2JqZWN0cy5qcyIsIi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IFR1cm4gT24gVGhlIExpZ2h0c1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IFdlIG5lZWQgdG8gaWxsdW1pbmF0ZSBQSFAgZGV2ZWxvcG1lbnQsIHNvIGxldCB1cyB0dXJuIG9uIHRoZSBsaWdodHMuXHJcbnwgVGhpcyBib290c3RyYXBzIHRoZSBmcmFtZXdvcmsgYW5kIGdldHMgaXQgcmVhZHkgZm9yIHVzZSwgdGhlbiBpdFxyXG58IHdpbGwgbG9hZCB1cCB0aGlzIGFwcGxpY2F0aW9uIHNvIHRoYXQgd2UgY2FuIHJ1biBpdCBhbmQgc2VuZFxyXG58IHRoZSByZXNwb25zZXMgYmFjayB0byB0aGUgYnJvd3NlciBhbmQgZGVsaWdodCBvdXIgdXNlcnMuXHJcbnxcclxuKi9cclxuXHJcbnZhciBhcHAgPSByZXF1aXJlKCcuL2Jvb3RzdHJhcC9hcHAuanMnKS5kZWZhdWx0O1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgUnVuIFRoZSBBcHBsaWNhdGlvblxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IE9uY2Ugd2UgaGF2ZSB0aGUgYXBwbGljYXRpb24sIHdlIGNhbiBoYW5kbGUgdGhlIGluY29taW5nIHJlcXVlc3RcclxufCB0aHJvdWdoIHRoZSBrZXJuZWwsIGFuZCBzZW5kIHRoZSBhc3NvY2lhdGVkIHJlc3BvbnNlIGJhY2sgdG9cclxufCB0aGUgY2xpZW50J3MgYnJvd3NlciBhbGxvd2luZyB0aGVtIHRvIGVuam95IHRoZSBjcmVhdGl2ZVxyXG58IGFuZCB3b25kZXJmdWwgYXBwbGljYXRpb24gd2UgaGF2ZSBwcmVwYXJlZCBmb3IgdGhlbS5cclxufFxyXG4qL1xyXG5cclxudmFyIGtlcm5lbCA9IHJlcXVpcmUoJ0FwcC9HYW1lL0tlcm5lbC5qcycpLmRlZmF1bHQ7XHJcblxyXG5rZXJuZWwgPSBhcHAubWFrZSgnRW5naW5lLkNvbnRyYWN0cy5HYW1lLktlcm5lbCcsIFthcHBdKTtcclxuXHJcbnZhciByZXNwb25zZSA9IGtlcm5lbC5ib290c3RyYXAoKTtcclxuXHJcblxyXG4vKipcclxuICogRmlyc3Qgd2Ugd2lsbCBsb2FkIGFsbCBvZiB0aGlzIHByb2plY3QncyBKYXZhU2NyaXB0IGRlcGVuZGVuY2llcyB3aGljaFxyXG4gKiBpbmNsdWRlcyBWdWUgYW5kIG90aGVyIGxpYnJhcmllcy4gSXQgaXMgYSBncmVhdCBzdGFydGluZyBwb2ludCB3aGVuXHJcbiAqIGJ1aWxkaW5nIHJvYnVzdCwgcG93ZXJmdWwgd2ViIGFwcGxpY2F0aW9ucyB1c2luZyBWdWUgYW5kIExhcmF2ZWwuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEdhbWUgZnJvbSAnRW5naW5lL0ZvdW5kYXRpb24vR2FtZS5qcyc7XHJcblxyXG5yZXF1aXJlKCcuL09iamVjdHMvQmFsbEdhbWVPYmplY3QnKTtcclxucmVxdWlyZSgnLi9PYmplY3RzL0JyaWNrR2FtZU9iamVjdCcpO1xyXG5yZXF1aXJlKCcuL09iamVjdHMvUGFkZGxlR2FtZU9iamVjdCcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9pbmRleC5qcyIsImltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICdFbmdpbmUvRm91bmRhdGlvbi9BcHBsaWNhdGlvbi5qcyc7XHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBDcmVhdGUgVGhlIEFwcGxpY2F0aW9uXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58XHJcbnwgVGhlIGZpcnN0IHRoaW5nIHdlIHdpbGwgZG8gaXMgY3JlYXRlIGEgbmV3IExhcmF2ZWwgYXBwbGljYXRpb24gaW5zdGFuY2VcclxufCB3aGljaCBzZXJ2ZXMgYXMgdGhlIFwiZ2x1ZVwiIGZvciBhbGwgdGhlIGNvbXBvbmVudHMgb2YgTGFyYXZlbCwgYW5kIGlzXHJcbnwgdGhlIElvQyBjb250YWluZXIgZm9yIHRoZSBzeXN0ZW0gYmluZGluZyBhbGwgb2YgdGhlIHZhcmlvdXMgcGFydHMuXHJcbnxcclxuKi9cclxuXHJcbnZhciBhcHAgPSBuZXcgQXBwbGljYXRpb24oJ0FwcCcpO1xyXG5cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IEJpbmQgSW1wb3J0YW50IEludGVyZmFjZXNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBOZXh0LCB3ZSBuZWVkIHRvIGJpbmQgc29tZSBpbXBvcnRhbnQgaW50ZXJmYWNlcyBpbnRvIHRoZSBjb250YWluZXIgc29cclxufCB3ZSB3aWxsIGJlIGFibGUgdG8gcmVzb2x2ZSB0aGVtIHdoZW4gbmVlZGVkLiBUaGUga2VybmVscyBzZXJ2ZSB0aGVcclxufCBpbmNvbWluZyByZXF1ZXN0cyB0byB0aGlzIGFwcGxpY2F0aW9uIGZyb20gYm90aCB0aGUgd2ViIGFuZCBDTEkuXHJcbnxcclxuKi9cclxuXHJcbmFwcC5zaW5nbGV0b24oXHJcbiAgICAnRW5naW5lLkNvbnRyYWN0cy5HYW1lLktlcm5lbCcsXHJcbiAgICAnQXBwLkdhbWUuS2VybmVsJ1xyXG4pO1xyXG5cclxuYXBwLnNpbmdsZXRvbihcclxuICAgICdFbmdpbmUuQ29udHJhY3RzLkNvbnNvbGUuS2VybmVsJyxcclxuICAgICdBcHAuQ29uc29sZS5LZXJuZWwnXHJcbik7XHJcblxyXG5hcHAuc2luZ2xldG9uKFxyXG4gICAgJ0VuZ2luZS5Db250cmFjdHMuRGVidWcuRXhjZXB0aW9uSGFuZGxlcicsXHJcbiAgICAnQXBwLkV4Y2VwdGlvbnMuSGFuZGxlcidcclxuKTtcclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IFJldHVybiBUaGUgQXBwbGljYXRpb25cclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBUaGlzIHNjcmlwdCByZXR1cm5zIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZS4gVGhlIGluc3RhbmNlIGlzIGdpdmVuIHRvXHJcbnwgdGhlIGNhbGxpbmcgc2NyaXB0IHNvIHdlIGNhbiBzZXBhcmF0ZSB0aGUgYnVpbGRpbmcgb2YgdGhlIGluc3RhbmNlc1xyXG58IGZyb20gdGhlIGFjdHVhbCBydW5uaW5nIG9mIHRoZSBhcHBsaWNhdGlvbiBhbmQgc2VuZGluZyByZXNwb25zZXMuXHJcbnxcclxuKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvYm9vdHN0cmFwL2FwcC5qcyIsImltcG9ydCBPYmogZnJvbSAnRW5naW5lL1N1cHBvcnQvT2JqLmpzJztcclxuaW1wb3J0IENvbnRhaW5lciBmcm9tICdFbmdpbmUvQ29udGFpbmVyL0NvbnRhaW5lci5qcyc7XHJcbmltcG9ydCBFdmVudFNlcnZpY2VQcm92aWRlciBmcm9tICdFbmdpbmUvRXZlbnRzL0V2ZW50U2VydmljZVByb3ZpZGVyLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIGV4dGVuZHMgQ29udGFpbmVyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBBcHBsaWNhdGlvbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xudWxsfSAgYmFzZVBhdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoYmFzZVBhdGggPSBudWxsKSB7XHJcblxyXG5cdFx0Ly8gQ2FsbCBwYXJlbnQgY29uc3RydWN0b3JcclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgYmFzZSBwYXRoIGZvciB0aGUgZnJhbWV3b3JrIGluc3RhbGxhdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtzdHJpbmd9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2Jhc2VQYXRoID0gYmFzZVBhdGg7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGJvb3RzdHJhcHBlZCBiZWZvcmUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5faGFzQmVlbkJvb3RzdHJhcHBlZCA9IGZhbHNlO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIEluZGljYXRlcyBpZiB0aGUgYXBwbGljYXRpb24gaGFzIFwiYm9vdGVkXCIuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2Jvb2x9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9ib290ZWQgPSBmYWxzZTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgYXJyYXkgb2YgYm9vdGluZyBjYWxsYmFja3MuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2FycmF5fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fYm9vdGluZ0NhbGxiYWNrcyA9IFtdO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBhcnJheSBvZiBib290ZWQgY2FsbGJhY2tzLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHthcnJheX1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX2Jvb3RlZENhbGxiYWNrcyA9IFtdO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBhcnJheSBvZiB0ZXJtaW5hdGluZyBjYWxsYmFja3MuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2FycmF5fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fdGVybWluYXRpbmdDYWxsYmFja3MgPSBbXTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBBbGwgb2YgdGhlIHJlZ2lzdGVyZWQgc2VydmljZSBwcm92aWRlcnMuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2FycmF5fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fc2VydmljZVByb3ZpZGVycyA9IFtdO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBuYW1lcyBvZiB0aGUgbG9hZGVkIHNlcnZpY2UgcHJvdmlkZXJzLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtvYmplY3R9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9sb2FkZWRQcm92aWRlcnMgPSB7fTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgZGVmZXJyZWQgc2VydmljZXMgYW5kIHRoZWlyIHByb3ZpZGVycy5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7YXJyYXl9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9kZWZlcnJlZFNlcnZpY2VzID0gW107XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogQSBjdXN0b20gY2FsbGJhY2sgdXNlZCB0byBjb25maWd1cmUgTW9ub2xvZy5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7Y2FsbGFibGV8bnVsbH1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX21vbm9sb2dDb25maWd1cmF0b3IgPSBudWxsO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBjdXN0b20gZGF0YWJhc2UgcGF0aCBkZWZpbmVkIGJ5IHRoZSBkZXZlbG9wZXIuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge3N0cmluZ3xudWxsfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fZGF0YWJhc2VQYXRoID0gbnVsbDtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgY3VzdG9tIHN0b3JhZ2UgcGF0aCBkZWZpbmVkIGJ5IHRoZSBkZXZlbG9wZXIuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge3N0cmluZ3xudWxsfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fc3RvcmFnZVBhdGggPSBudWxsO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBjdXN0b20gZW52aXJvbm1lbnQgcGF0aCBkZWZpbmVkIGJ5IHRoZSBkZXZlbG9wZXIuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge3N0cmluZ3xudWxsfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fZW52aXJvbm1lbnRQYXRoID0gbnVsbDtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgZW52aXJvbm1lbnQgZmlsZSB0byBsb2FkIGR1cmluZyBib290c3RyYXBwaW5nLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtzdHJpbmd9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9lbnZpcm9ubWVudEZpbGUgPSAnLmVudic7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGFwcGxpY2F0aW9uIG5hbWVzcGFjZS5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7c3RyaW5nfG51bGx9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9uYW1lc3BhY2UgPSBudWxsO1xyXG5cclxuXHRcdC8vIENoZWNrIGlmIGEgQmFzZSBQYXRoIHdhcyBwcm92aWRlZFxyXG5cdFx0aWYoYmFzZVBhdGggIT09IG51bGwpIHtcclxuXHJcblx0XHRcdC8vIFNldCB0aGUgQmFzZSBQYXRoXHJcblx0XHRcdHRoaXMuc2V0QmFzZVBhdGgoYmFzZVBhdGgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZWdpc3RlciB0aGUgQmFzZSBCaW5kaW5nc1xyXG5cdFx0dGhpcy5fcmVnaXN0ZXJCYXNlQmluZGluZ3MoKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciB0aGUgQmFzZSBTZXJ2aWNlIFByb3ZpZGVyc1xyXG5cdFx0dGhpcy5fcmVnaXN0ZXJCYXNlU2VydmljZVByb3ZpZGVycygpO1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIHRoZSBDb3JlIENvbnRhaW5lciBBbGlhc2VzXHJcblx0XHQvLyB0aGlzLl9yZWdpc3RlckNvcmVDb250YWluZXJBbGlhc2VzKCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgYmFzaWMgYmluZGluZ3MgaW50byB0aGUgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRfcmVnaXN0ZXJCYXNlQmluZGluZ3MoKSB7XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSBDb250YWluZXIgaW5zdGFuY2UgdG8gdGhpcyBBcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5zZXRJbnN0YW5jZSh0aGlzKTtcclxuXHJcblx0XHQvLyBCaW5kIHRoZSAnYXBwJyBrZXl3b3JkIHRvIHRoaXMgQXBwbGljYXRpb25cclxuXHRcdHRoaXMuaW5zdGFuY2UoJ2FwcCcsIHRoaXMpO1xyXG5cclxuXHRcdC8vIEJpbmQgdGhlIENvbnRhaW5lciBDbGFzcyB0byB0aGlzIEFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmluc3RhbmNlKCdGcmFtZXdvcmsuQ29udGFpbmVyJywgdGhpcyk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBAdG9kbyBSZWdpc3RlciBQYWNrYWdlIE1hbmlmZXN0XHJcblx0XHQgKi9cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIGFsbCBvZiB0aGUgYmFzZSBzZXJ2aWNlIHByb3ZpZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0X3JlZ2lzdGVyQmFzZVNlcnZpY2VQcm92aWRlcnMoKSB7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgdGhlIEV2ZW50IFNlcnZpY2UgUHJvdmlkZXJcclxuXHRcdHRoaXMucmVnaXN0ZXIobmV3IEV2ZW50U2VydmljZVByb3ZpZGVyKHRoaXMpKTtcclxuXHJcblx0XHQvLyAvLyBSZWdpc3RlciB0aGUgTG9nIFNlcnZpY2UgUHJvdmlkZXJcclxuXHRcdC8vIHRoaXMucmVnaXN0ZXIobmV3IExvZ1NlcnZpY2VQcm92aWRlcih0aGlzKSk7XHJcblxyXG5cdFx0Ly8gLy8gUmVnaXN0ZXIgdGhlIFJvdXRpbmcgU2VydmljZSBQcm92aWRlclxyXG5cdFx0Ly8gdGhpcy5yZWdpc3RlcihuZXcgUm91dGluZ1NlcnZpY2VQcm92aWRlcih0aGlzKSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvb3RzIHRoZSBhcHBsaWNhdGlvbiB1c2luZyB0aGUgZ2l2ZW4gYm9vdHN0cmFwcGVycy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2FycmF5fSAgYm9vdHN0cmFwcGVyc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRib290c3RyYXBXaXRoKGJvb3RzdHJhcHBlcnMpIHtcclxuXHJcblx0XHQvLyBNYXJrIHRoZSBhcHBsaWNhdGlvbiBoYXMgYm9vdGVkXHJcblx0XHR0aGlzLl9oYXNCZWVuQm9vdHN0cmFwcGVkID0gdHJ1ZTtcclxuXHJcblx0XHQvLyBSdW4gZWFjaCBib290c3RyYXBwZXJcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBib290c3RyYXBwZXJzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgYm9vdHN0cmFwcGVyXHJcblx0XHRcdGxldCBib290c3RyYXBwZXIgPSBib290c3RyYXBwZXJzW2ldO1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgYm9vdHN0cmFwcGluZyBldmVudFxyXG5cdFx0XHR0aGlzLmdldCgnZXZlbnRzJykuZmlyZSgnYm9vdHN0cmFwcGluZzogJyArIGJvb3RzdHJhcHBlciwgW3RoaXNdKTtcclxuXHJcblx0XHRcdC8vIFJ1biB0aGUgYm9vdHN0cmFwcGVyXHJcblx0XHRcdHRoaXMubWFrZShib290c3RyYXBwZXIpLmJvb3RzdHJhcCh0aGlzKTtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIGJvb3RzdHJhcHBlZCBldmVudFxyXG5cdFx0XHR0aGlzLmdldCgnZXZlbnRzJykuZmlyZSgnYm9vdHN0cmFwcGVkOiAnICsgYm9vdHN0cmFwcGVyLCBbdGhpc10pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gcnVuIGJlZm9yZSBhIGJvb3RzdHJhcHBlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgYm9vdHN0cmFwcGVyXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRiZWZvcmVCb290c3RyYXBwaW5nKGJvb3RzdHJhcHBlciwgY2FsbGJhY2spIHtcclxuXHRcdHRoaXMuZ2V0KCdldmVudHMnKS5saXN0ZW4oJ2Jvb3RzdHJhcHBpbmc6ICcgKyBib290c3RyYXBwZXIsIGNhbGxiYWNrKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgYSBjYWxsYmFjayB0byBydW4gYWZ0ZXIgYSBib290c3RyYXBwZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIGJvb3RzdHJhcHBlclxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YWZ0ZXJCb290c3RyYXBwaW5nKGJvb3RzdHJhcHBlciwgY2FsbGJhY2spIHtcclxuXHRcdHRoaXMuZ2V0KCdldmVudHMnKS5saXN0ZW4oJ2Jvb3RzdHJhcHBlZDogJyArIGJvb3RzdHJhcHBlciwgY2FsbGJhY2spO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGFwcGxpY2F0aW9uIGhhcyBiZWVuIGJvb3RzdHJhcHBlZC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0aGFzQmVlbkJvb3RzdHJhcHBlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9oYXNCZWVuQm9vdHN0cmFwcGVkO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGJhc2UgcGF0aCBmb3IgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgYmFzZVBhdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c2V0QmFzZVBhdGgoYmFzZVBhdGgpIHtcclxuXHJcblx0XHQvLyBTZXQgdGhlIGJhc2UgcGF0aFxyXG5cdFx0dGhpcy5fYmFzZVBhdGggPSBiYXNlUGF0aC5yZXBsYWNlKC9bXFxcXFxcL10rJC8sICcnKTtcclxuXHJcblx0XHQvLyBCaW5kIHRoZSBwYXRocyBpbiB0aGUgY29udGFpbmVyXHJcblx0XHR0aGlzLl9iaW5kUGF0aHNJbkNvbnRhaW5lcigpO1xyXG5cclxuXHRcdC8vIEFsbG93IGNoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQmluZHMgYWxsIG9mIHRoZSBhcHBsaWNhdGlvbiBwYXRocyBpbiB0aGUgY29udGFpbmVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRfYmluZFBhdGhzSW5Db250YWluZXIoKSB7XHJcblxyXG5cdFx0dGhpcy5pbnN0YW5jZSgncGF0aCcsIHRoaXMucGF0aCgpKTtcclxuXHRcdHRoaXMuaW5zdGFuY2UoJ3BhdGguYmFzZScsIHRoaXMuYmFzZVBhdGgoKSk7XHJcblx0XHQvLyB0aGlzLmluc3RhbmNlKCdwYXRoLmxhbmcnLCB0aGlzLmxhbmdQYXRoKCkpO1xyXG5cdFx0dGhpcy5pbnN0YW5jZSgncGF0aC5jb25maWcnLCB0aGlzLmNvbmZpZ1BhdGgoKSk7XHJcblx0XHQvLyB0aGlzLmluc3RhbmNlKCdwYXRoLnB1YmxpYycsIHRoaXMucHVibGljUGF0aCgpKTtcclxuXHRcdC8vIHRoaXMuaW5zdGFuY2UoJ3BhdGguc3RvcmFnZScsIHRoaXMuc3RvcmFnZVBhdGgoKSk7XHJcblx0XHQvLyB0aGlzLmluc3RhbmNlKCdwYXRoLmRhdGFiYXNlJywgdGhpcy5kYXRhYmFzZVBhdGgoKSk7XHJcblx0XHQvLyB0aGlzLmluc3RhbmNlKCdwYXRoLnJlc291cmNlcycsIHRoaXMucmVzb3VyY2VzUGF0aCgpKTtcclxuXHRcdHRoaXMuaW5zdGFuY2UoJ3BhdGguYm9vdHN0cmFwJywgdGhpcy5ib290c3RyYXBQYXRoKCkpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBhcHBsaWNhdGlvbiBcImFwcFwiIGRpcmVjdG9yeS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRwYXRoKHBhdGggPSAnJykge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Jhc2VQYXRoICsgJy9hcHAnICsgKHBhdGggPyAnLycgKyBwYXRoIDogJycpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGJhc2UgcGF0aCB0byB0aGUgZnJhbWV3b3JrIGluc3RhbGxhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRiYXNlUGF0aChwYXRoID0gJycpIHtcclxuXHRcdHJldHVybiB0aGlzLl9iYXNlUGF0aCArIChwYXRoID8gJy8nICsgcGF0aCA6ICcnKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBwYXRoIHRvIHRoZSBib290c3RyYXAgZGlyZWN0b3J5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgcGF0aFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGJvb3RzdHJhcFBhdGgocGF0aCA9ICcnKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYmFzZVBhdGggKyAnL2Jvb3RzdHJhcCcgKyAocGF0aCA/ICcvJyArIHBhdGggOiAnJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgYXBwbGljYXRpb24gY29uZmlndXJhdGlvbiBmaWxlcy5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIHBhdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRjb25maWdQYXRoKHBhdGggPSAnJykge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Jhc2VQYXRoICsgJy9jb25maWcnICsgKHBhdGggPyAnLycgKyBwYXRoIDogJycpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgZ2l2ZW4gc2VydmljZSBwcm92aWRlciB3aXRoIHRoZSBhcHBsaWNhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0ZyYW1ld29yay5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcnxzdHJpbmd9ICBwcm92aWRlclxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcblx0ICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ9XHJcblx0ICovXHJcblx0cmVnaXN0ZXIocHJvdmlkZXIsIG9wdGlvbnMgPSB7fSwgZm9yY2UgPSBmYWxzZSkge1xyXG5cclxuXHRcdC8vIERlY2xhcmUgdGhlIHJlZ2lzdGVyZWQgcHJvdmlkZXJcclxuXHRcdHZhciByZWdpc3RlcmVkO1xyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBzZXJ2aWNlIHByb3ZpZGVyIGlzIGFscmVhZHkgcmVnaXN0ZXJlZCwgYW5kIHdlJ3JlIG5vdCBmb3JjaW5nXHJcblx0XHRpZigocmVnaXN0ZXJlZCA9IHRoaXMuZ2V0UHJvdmlkZXIocHJvdmlkZXIpKSAmJiAhZm9yY2UpIHtcclxuXHRcdFx0cmV0dXJuIHJlZ2lzdGVyZWQ7XHJcblx0XHR9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBnaXZlbiBcInByb3ZpZGVyXCIgaXMgYSBzdHJpbmcsIHdlIHdpbGwgcmVzb2x2ZSBpdCwgcGFzc2luZyBpbiB0aGVcclxuICAgICAgICAvLyBhcHBsaWNhdGlvbiBpbnN0YW5jZSBhdXRvbWF0aWNhbGx5IGZvciB0aGUgZGV2ZWxvcGVyLiBUaGlzIGlzIHNpbXBseVxyXG4gICAgICAgIC8vIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiBzcGVjaWZ5aW5nIHlvdXIgc2VydmljZSBwcm92aWRlciBjbGFzc2VzLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgZ2l2ZW4gXCJwcm92aWRlclwiIGlzIGEgc3RyaW5nXHJcbiAgICAgICAgaWYodHlwZW9mIHByb3ZpZGVyID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgICAgICBcdC8vIFJlc29sdmUgdGhlIHByb3ZpZGVyXHJcbiAgICAgICAgXHRwcm92aWRlciA9IHRoaXMucmVzb2x2ZVByb3ZpZGVyKHByb3ZpZGVyKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgcHJvdmlkZXIgdXNlcyBhIHJlZ2lzdGVyIG1ldGhvZFxyXG4gICAgICAgIGlmKHR5cGVvZiBwcm92aWRlci5yZWdpc3RlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuICAgICAgICBcdC8vIFJlZ2lzdGVyIHRoZSBwcm92aWRlclxyXG4gICAgICAgIFx0cHJvdmlkZXIucmVnaXN0ZXIoKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNYXJrIHRoZSBwcm92aWRlciBhcyByZWdpc3RlcmVkXHJcbiAgICAgICAgdGhpcy5fbWFya0FzUmVnaXN0ZXJlZChwcm92aWRlcik7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBhcHBsaWNhdGlvbiBoYXMgYWxyZWFkeSBib290ZWQsIHdlIHdpbGwgY2FsbCB0aGlzIGJvb3QgbWV0aG9kIG9uXHJcbiAgICAgICAgLy8gdGhlIHByb3ZpZGVyIGNsYXNzIHNvIGl0IGhhcyBhbiBvcHBvcnR1bml0eSB0byBkbyBpdHMgYm9vdCBsb2dpYyBhbmRcclxuICAgICAgICAvLyB3aWxsIGJlIHJlYWR5IGZvciBhbnkgdXNhZ2UgYnkgdGhpcyBkZXZlbG9wZXIncyBhcHBsaWNhdGlvbiBsb2dpYy5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGFwcGxpY2F0aW9uIGhhcyBhbHJlYWR5IGJvb3RlZFxyXG4gICAgICAgIGlmKHRoaXMuX2Jvb3RlZCkge1xyXG4gICAgICAgIFx0dGhpcy5fYm9vdFByb3ZpZGVyKHByb3ZpZGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgUHJvdmlkZXJcclxuICAgICAgICByZXR1cm4gcHJvdmlkZXI7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHJlZ2lzdGVyZWQgc2VydmljZSBwcm92aWRlciBpbnN0YW5jZSBpZiBpdCBleGlzdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ8Y2xhc3N9ICBwcm92aWRlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7RnJhbWV3b3JrLlN1cHBvcnQuU2VydmljZVByb3ZpZGVyfG51bGx9XHJcblx0ICovXHJcblx0Z2V0UHJvdmlkZXIocHJvdmlkZXIpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIFByb3ZpZGVycyB0aGF0IGFyZSBhbiBpbnN0YW5jZSBvZiB0aGUgZ2l2ZW4gcHJvdmlkZXJcclxuXHRcdHZhciBwcm92aWRlcnMgPSB0aGlzLmdldFByb3ZpZGVycyhwcm92aWRlcik7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgbm8gcHJvdmlkZXJzIHdlcmUgZm91bmRcclxuXHRcdGlmKHByb3ZpZGVycy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBmaXJzdCBwcm92aWRlclxyXG5cdFx0cmV0dXJuIHByb3ZpZGVyc1swXTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgcmVnaXN0ZXJlZCBzZXJ2aWNlIHByb3ZpZGVyIGluc3RhbmNlcyBpZiBhbnkgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ8Y2xhc3N9ICBwcm92aWRlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7YXJyYXl9XHJcblx0ICovXHJcblx0Z2V0UHJvdmlkZXJzKHByb3ZpZGVyKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBwcm92aWRlciBjbGFzcyBkZWZpbml0aW9uXHJcblx0XHR2YXIgZGVmaW5pdGlvbiA9IE9iai5nZXRDbGFzcyhwcm92aWRlcik7XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBwcm92aWRlcnMgdGhhdCBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIHByb3ZpZGVyIGNsYXNzXHJcblx0XHRyZXR1cm4gdGhpcy5fc2VydmljZVByb3ZpZGVycy5maWx0ZXIoZnVuY3Rpb24odmFsdWUpIHtcclxuXHRcdFx0cmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgZGVmaW5pdGlvbjtcclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXNvbHZlcyB0aGUgZ2l2ZW4gc2VydmljZSBwcm92aWRlciBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2NsYXNzfSAgcHJvdmlkZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0ZyYW1ld29yay5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcn1cclxuXHQgKi9cclxuXHRyZXNvbHZlUHJvdmlkZXIocHJvdmlkZXIpIHtcclxuXHRcdHJldHVybiBuZXcgcHJvdmlkZXIodGhpcyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTWFya3MgdGhlIGdpdmVuIHNlcnZpY2UgcHJvdmlkZXIgYXMgcmVnaXN0ZXJlZC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0ZyYW1ld29yay5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcn0gIHByb3ZpZGVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdF9tYXJrQXNSZWdpc3RlcmVkKHByb3ZpZGVyKSB7XHJcblxyXG5cdFx0Ly8gQXBwZW5kIHRoZSBzZXJ2aWNlIHByb3ZpZGVyIHRvIHRoZSBsaXN0IG9mIHByb3ZpZGVyc1xyXG5cdFx0dGhpcy5fc2VydmljZVByb3ZpZGVycy5wdXNoKHByb3ZpZGVyKTtcclxuXHJcblx0XHQvLyBNYXJrIHRoZSBzZXJ2aWNlIHByb3ZpZGVyIGFzIGxvYWRlZFxyXG5cdFx0dGhpcy5fbG9hZGVkUHJvdmlkZXJzW09iai5nZXRDbGFzc05hbWUocHJvdmlkZXIpXSA9IHRydWU7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExvYWQgYW5kIGJvb3QgYWxsIG9mIHRoZSByZW1haW5pbmcgZGVmZXJyZWQgcHJvdmlkZXJzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRsb2FkRGVmZXJyZWRQcm92aWRlcnMoKSB7XHJcblxyXG4gICAgICAgIC8vIFdlIHdpbGwgc2ltcGx5IHNwaW4gdGhyb3VnaCBlYWNoIG9mIHRoZSBkZWZlcnJlZCBwcm92aWRlcnMgYW5kIHJlZ2lzdGVyIGVhY2hcclxuICAgICAgICAvLyBvbmUgYW5kIGJvb3QgdGhlbSBpZiB0aGUgYXBwbGljYXRpb24gaGFzIGJvb3RlZC4gVGhpcyBzaG91bGQgbWFrZSBlYWNoIG9mXHJcbiAgICAgICAgLy8gdGhlIHJlbWFpbmluZyBzZXJ2aWNlcyBhdmFpbGFibGUgdG8gdGhpcyBhcHBsaWNhdGlvbiBmb3IgaW1tZWRpYXRlIHVzZS5cclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBkZWZlcnJlZCBzZXJ2aWNlIHByb3ZpZGVyc1xyXG4gICAgICAgIGZvcihsZXQgc2VydmljZSBpbiB0aGlzLl9kZWZlcnJlZFNlcnZpY2VzKSB7XHJcblxyXG4gICAgICAgIFx0Ly8gTWFrZSBzdXJlIHRoZSBwcm9wZXJ0eSBleGlzdHNcclxuICAgICAgICBcdGlmKCF0aGlzLl9kZWZlcnJlZFNlcnZpY2VzLmhhc093blByb3BlcnR5KHNlcnZpY2UpKSB7XHJcbiAgICAgICAgXHRcdGNvbnRpbnVlO1xyXG4gICAgICAgIFx0fVxyXG5cclxuICAgICAgICBcdC8vIExvYWQgdGhlIGRlZmVycmVkIHNlcnZpY2UgcHJvdmlkZXJcclxuICAgICAgICBcdHRoaXMubG9hZERlZmVycmVkUHJvdmlkZXIoc2VydmljZSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGRlZmVycmVkIHNlcnZpY2VzXHJcbiAgICAgICAgdGhpcy5fZGVmZXJyZWRTZXJ2aWNlcyA9IHt9O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBkZWZlcnJlZCBwcm92aWRlciBhbmQgc2VydmljZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xjbGFzc30gIHByb3ZpZGVyXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfG51bGx9ICAgc2VydmljZVxyXG5cdCAqXHJcblx0ICogQHJldHJ1biB7dm9pZH1cclxuXHQgKi9cclxuXHRyZWdpc3RlckRlZmVycmVkUHJvdmlkZXIocHJvdmlkZXIsIHNlcnZpY2UgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIE9uY2UgdGhlIHByb3ZpZGVyIHRoYXQgcHJvdmlkZXMgdGhlIGRlZmVycmVkIHNlcnZpY2UgaGFzIGJlZW4gcmVnaXN0ZXJlZCB3ZVxyXG4gICAgICAgIC8vIHdpbGwgcmVtb3ZlIGl0IGZyb20gb3VyIGxvY2FsIGxpc3Qgb2YgdGhlIGRlZmVycmVkIHNlcnZpY2VzIHdpdGggcmVsYXRlZFxyXG4gICAgICAgIC8vIHByb3ZpZGVycyBzbyB0aGF0IHRoaXMgY29udGFpbmVyIGRvZXMgbm90IHRyeSB0byByZXNvbHZlIGl0IG91dCBhZ2Fpbi5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSBzZXJ2aWNlIHdhcyBwcm92aWRlZFxyXG4gICAgICAgIGlmKHNlcnZpY2UpIHtcclxuICAgICAgICBcdHRoaXMuX2RlZmVycmVkU2VydmljZXNbc2VydmljZV0gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgdGhlIHNlcnZpY2UgcHJvdmlkZXJcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgcHJvdmlkZXIodGhpcyk7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBzZXJ2aWNlIHByb3ZpZGVyXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlcihpbnN0YW5jZSk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBhcHBsaWNhdGlvbiBoYXNuJ3QgYm9vdGVkIHlldFxyXG4gICAgICAgIGlmKCF0aGlzLl9ib290ZWQpIHtcclxuXHJcbiAgICAgICAgXHQvLyBCb290IHRoZSBwcm92aWRlciB3aXRoIHRoZSBvdGhlciBwcm92aWRlcnNcclxuICAgICAgICBcdHRoaXMuYm9vdGluZyhmdW5jdGlvbigpIHtcclxuICAgICAgICBcdFx0dGhpcy5ib290UHJvdmlkZXIoaW5zdGFuY2UpO1xyXG4gICAgICAgIFx0fSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgdGhlIHNwZWNpZmllZCBhYnN0cmFjdCB0eXBlIGZyb20gdGhlIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcblx0ICogQHBhcmFtICB7YXJyYXl9ICAgcGFyYW1ldGVyc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0bWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XHJcblxyXG5cdFx0Ly8gUmVzb2x2ZSBhbnkgYWxpYXNlc1xyXG5cdFx0YWJzdHJhY3QgPSB0aGlzLmdldEFsaWFzKGFic3RyYWN0KTtcclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgYWJzdHJhY3QgdHlwZSBpcyBib3VuZCBhcyBhIGRlZmVycmVkIHNlcnZpY2UgcHJvdmlkZXJcclxuXHRcdGlmKHR5cGVvZiB0aGlzLl9kZWZlcnJlZFNlcnZpY2VzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdFx0XHQvLyBMb2FkIHRoZSBkZWZlcnJlZCBzZXJ2aWNlIHByb3ZpZGVyXHJcblx0XHRcdHRoaXMubG9hZERlZmVycmVkUHJvdmlkZXIoYWJzdHJhY3QpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBDYWxsIHRoZSBwYXJlbnQgbWV0aG9kXHJcblx0XHRyZXR1cm4gc3VwZXIubWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBhYnN0cmFjdCB0eXBlIGhhcyBiZWVuIGJvdW5kIHRvIHRoZSBjb250YWluZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRib3VuZChhYnN0cmFjdCkge1xyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBhYnN0cmFjdCB0eXBlIGlzIGJvdW5kIGFzIGEgZGVmZXJyZWQgc2VydmljZSBwcm92aWRlclxyXG5cdFx0aWYodHlwZW9mIHRoaXMuX2RlZmVycmVkU2VydmljZXNbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDYWxsIHRoZSBwYXJlbnQgbWV0aG9kXHJcblx0XHRyZXR1cm4gc3VwZXIuYm91bmQoYWJzdHJhY3QpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBhcHBsaWNhdGlvbiBoYXMgYmVlbiBib290ZWQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGlzQm9vdGVkKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Jvb3RlZDtcclxuXHR9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgcGF0aCB0byB0aGUgY29uZmlndXJhdGlvbiBjYWNoZSBmaWxlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgZ2V0Q2FjaGVkQ29uZmlnUGF0aCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib290c3RyYXBQYXRoKCkgKyAnL2NhY2hlL2NvbmZpZy5qcyc7XHJcbiAgICB9O1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9BcHBsaWNhdGlvbi5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5FdmVudHMnKTtcclxuXHJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJ0VuZ2luZS9FdmVudHMvRGlzcGF0Y2hlci5qcyc7XHJcbmltcG9ydCBTZXJ2aWNlUHJvdmlkZXIgZnJvbSAnRW5naW5lL1N1cHBvcnQvU2VydmljZVByb3ZpZGVyLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50U2VydmljZVByb3ZpZGVyIGV4dGVuZHMgU2VydmljZVByb3ZpZGVyIHtcclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIHRoZSBzZXJ2aWNlIHByb3ZpZGVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRyZWdpc3RlcigpIHtcclxuXHJcblx0XHR0aGlzLl9hcHAuc2luZ2xldG9uKCdldmVudHMnLCBmdW5jdGlvbihhcHApIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBEaXNwYXRjaGVyKCk7XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHRcclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5FdmVudFNlcnZpY2VQcm92aWRlciA9IEV2ZW50U2VydmljZVByb3ZpZGVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0V2ZW50cy9FdmVudFNlcnZpY2VQcm92aWRlci5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5TdXBwb3J0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2aWNlUHJvdmlkZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFNlcnZpY2UgUHJvdmlkZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGcmFtZXdvcmsuQXBwbGljYXRpb259ICBhcHBcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoYXBwKSB7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtGcmFtZXdvcmsuQXBwbGljYXRpb259XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9hcHAgPSBhcHA7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogSW5kaWNhdGVzIGlmIGxvYWRpbmcgb2YgdGhlIHByb3ZpZGVyIGlzIGRlZmVycmVkLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtib29sZWFufVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fZGVmZXIgPSBmYWxzZTtcclxuXHJcblx0fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHNlcnZpY2VzIHByb3ZpZGVkIGJ5IHRoaXMgcHJvdmlkZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHByb3ZpZGVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBldmVudHMgdGhhdCB0cmlnZ2VyIHRoaXMgc2VydmljZSBwcm92aWRlciB0byByZWdpc3Rlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgd2hlbigpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgcHJvdmlkZXIgaXMgZGVmZXJyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNEZWZlcnJlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmZXI7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLlNlcnZpY2VQcm92aWRlciA9IFNlcnZpY2VQcm92aWRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnQXBwLkdhbWUnKTtcclxuXHJcbmltcG9ydCBMb2FkQ29uZmlndXJhdGlvbiBmcm9tICdFbmdpbmUvRm91bmRhdGlvbi9Cb290c3RyYXAvTG9hZENvbmZpZ3VyYXRpb24uanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgS2VybmVsIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBLZXJuZWwgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkNvbnRyYWN0cy5Gb3VuZGF0aW9uLkFwcGxpY2F0aW9ufSAgYXBwXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGFwcCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge0dhbWUuQ29udHJhY3RzLkZvdW5kYXRpb24uQXBwbGljYXRpb259XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2FwcCA9IGFwcDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBib290c3RyYXBwZXJzIGZvciB0aGUgYXBwbGljYXRpb24uXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7YXJyYXl9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2Jvb3RzdHJhcHBlcnMgPSBbXHJcblx0XHRcdC8vICdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLkxvYWRFbnZpcm9ubWVudFZhcmlhYmxlcycsXHJcblx0XHRcdCdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLkxvYWRDb25maWd1cmF0aW9uJyxcclxuXHRcdFx0Ly8gJ0dhbWUuRm91bmRhdGlvbi5Cb290c3RyYXAuSGFuZGxlRXhjZXB0aW9ucycsXHJcblx0XHRcdC8vICdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLlJlZ2lzdGVyRmFjYWRlcycsXHJcblx0XHRcdC8vICdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLlJlZ2lzdGVyUHJvdmlkZXJzJyxcclxuXHRcdFx0Ly8gJ0dhbWUuRm91bmRhdGlvbi5Cb290c3RyYXAuQm9vdFByb3ZpZGVycycsXHJcblx0XHRdO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCb290c3RyYXBzIHRoZSBhcHBsaWNhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0Ym9vdHN0cmFwKCkge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgYXBwbGljYXRpb24gaGFzbid0IGFscmVhZHkgYmVlbiBib290c3RyYXBwZWRcclxuXHRcdGlmKHRoaXMuX2FwcC5oYXNCZWVuQm9vdHN0cmFwcGVkKCkpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIEJvb3RzdHJhcCB0aGUgYXBwbGljYXRpb25cclxuXHRcdHRoaXMuX2FwcC5ib290c3RyYXBXaXRoKHRoaXMuZ2V0Qm9vdHN0cmFwcGVycygpKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgYm9vdHN0cmFwIGNsYXNzZXMgZm9yIHRoZSBhcHBsaWNhdGlvbi5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2FycmF5fVxyXG5cdCAqL1xyXG5cdGdldEJvb3RzdHJhcHBlcnMoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYm9vdHN0cmFwcGVycztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuQ29udHJhY3RzLkZvdW5kYXRpb24uQXBwbGljYXRpb259XHJcblx0ICovXHJcblx0Z2V0QXBwbGljYXRpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fYXBwO1xyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLktlcm5lbCA9IEtlcm5lbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvR2FtZS9LZXJuZWwuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuRm91bmRhdGlvbi5Cb290c3RyYXAnKTtcclxuXHJcbmltcG9ydCBSZXBvc2l0b3J5IGZyb20gJ0VuZ2luZS9Db25maWcvUmVwb3NpdG9yeS5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkQ29uZmlndXJhdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCb290c3RyYXBzIHRoZSBnaXZlbiBhcHBsaWNhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtHYW1lLkNvbnRyYWN0cy5Gb3VuZGF0aW9uLkFwcGxpY2F0aW9ufSAgYXBwXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG5cdGJvb3RzdHJhcChhcHApIHtcclxuXHJcblx0XHQvLyBJbml0aWFsaXplIHRoZSBJdGVtc1xyXG5cdFx0dmFyIGl0ZW1zID0ge307XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgY2FjaGUgZmxhZ1xyXG5cdFx0dmFyIGxvYWRlZEZyb21DYWNoZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBGaXJzdCB3ZSB3aWxsIHNlZSBpZiB3ZSBoYXZlIGEgY2FjaGUgY29uZmlndXJhdGlvbiBmaWxlLiBJZiB3ZSBkbywgd2UnbGwgbG9hZFxyXG4gICAgICAgIC8vIHRoZSBjb25maWd1cmF0aW9uIGl0ZW1zIGZyb20gdGhhdCBmaWxlIHNvIHRoYXQgaXQgaXMgdmVyeSBxdWljay4gT3RoZXJ3aXNlXHJcbiAgICAgICAgLy8gd2Ugd2lsbCBuZWVkIHRvIHNwaW4gdGhyb3VnaCBldmVyeSBjb25maWd1cmF0aW9uIGZpbGUgYW5kIGxvYWQgdGhlbSBhbGwuXHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgY2FjaGVkIGNvbmZpZ3VyYXRpb24gZmlsZSBwYXRoXHJcbiAgICAgICAgdmFyIGNhY2hlZCA9IGFwcC5nZXRDYWNoZWRDb25maWdQYXRoKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIGNhY2hlIGNvbmZpZ3VyYXRpb24gZmlsZVxyXG4gICAgICAgIGlmKGZpbGVFeGlzdHNTeW5jKGNhY2hlZCkpIHtcclxuXHJcbiAgICAgICAgXHQvLyBSZXF1aXJlIHRoZSBjYWNoZWQgY29uZmlndXJhdGlvbiBmaWxlXHJcbiAgICAgICAgXHRpdGVtcyA9IHJlcXVpcmUoY2FjaGVkKTtcclxuXHJcbiAgICAgICAgXHQvLyBGbGFnIHRoYXQgd2UndmUgbG9hZGVkIHRoZSBjb25maWd1cmF0aW9uIGZyb20gYSBjYWNoZSBmaWxlXHJcbiAgICAgICAgXHRsb2FkZWRGcm9tQ2FjaGUgPSB0cnVlO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIG5ldyByZXBvc2l0b3J5XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IG5ldyBSZXBvc2l0b3J5KGl0ZW1zKTtcclxuXHJcbiAgICAgICAgLy8gQmluZCB0aGUgcmVzcG9zaXRvcnkgdG8gdGhlIGFwcGxpY2F0aW9uXHJcblx0XHRhcHAuaW5zdGFuY2UoJ2NvbmZpZycsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIC8vIE5leHQgd2Ugd2lsbCBzcGluIHRocm91Z2ggYWxsIG9mIHRoZSBjb25maWd1cmF0aW9uIGZpbGVzIGluIHRoZSBjb25maWd1cmF0aW9uXHJcbiAgICAgICAgLy8gZGlyZWN0b3J5IGFuZCBsb2FkIGVhY2ggb25lIGludG8gdGhlIHJlcG9zaXRvcnkuIFRoaXMgd2lsbCBtYWtlIGFsbCBvZiB0aGVcclxuICAgICAgICAvLyBvcHRpb25zIGF2YWlsYWJsZSB0byB0aGUgZGV2ZWxvcGVyIGZvciB1c2UgaW4gdmFyaW91cyBwYXJ0cyBvZiB0aGlzIGFwcC5cclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuTG9hZENvbmZpZ3VyYXRpb24gPSBMb2FkQ29uZmlndXJhdGlvbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0Jvb3RzdHJhcC9Mb2FkQ29uZmlndXJhdGlvbi5qcyIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gMzE7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0Jvb3RzdHJhcFxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkZvdW5kYXRpb24nKTtcclxuXHJcbmltcG9ydCBMb29wIGZyb20gJ0VuZ2luZS9TdXBwb3J0L0xvb3AuanMnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdFbmdpbmUvT2JqZWN0cy9NYW5hZ2VyLmpzJztcclxuaW1wb3J0IEdyYXBoaWNzIGZyb20gJ0VuZ2luZS9HcmFwaGljcy9HcmFwaGljcy5qcyc7XHJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJ0VuZ2luZS9FdmVudHMvRGlzcGF0Y2hlci5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBHYW1lIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lJ3MgR3JhcGhpY3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5HcmFwaGljc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ncmFwaGljcyA9IG5ldyBHcmFwaGljcyh0aGlzKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lJ3MgT2JqZWN0IE1hbmFnZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5PYmplY3RzfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9iamVjdHMgPSBuZXcgTWFuYWdlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEV2ZW50IERpc3BhdGNoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5FdmVudHMuRGlzcGF0Y2hlcn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ldmVudHMgPSBuZXcgRGlzcGF0Y2hlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGdsb2JhbCBnYW1lIHZhcmlhYmxlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtvYmplY3R9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX3ZhcmlhYmxlcyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFN0ZXAgTG9vcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtHYW1lLlN1cHBvcnQuTG9vcH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zdGVwTG9vcCA9IG5ldyBMb29wKHtcclxuXHRcdFx0J2xvb3AnOiB0aGlzLmRvU3RlcExvb3AuYmluZCh0aGlzKSxcclxuXHRcdFx0J2ludGVydmFsJzogMSAvIDYwXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnRzIHRoZSBHYW1lLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRzdGFydCgpIHtcclxuXHJcblx0XHQvLyBTdGFydCB0aGUgR3JhcGhpY3NcclxuXHRcdHRoaXMuZ3JhcGhpY3Muc3RhcnQoKTtcclxuXHJcblx0XHR0aGlzLnN0ZXBMb29wLnN0YXJ0KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHRkb1N0ZXBMb29wKCkge1xyXG5cdFx0dGhpcy5vYmplY3RzLnN0ZXBHYW1lT2JqZWN0cygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBHYW1lIE9iamVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gIGNhbnZhc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkcmF3R2FtZU9iamVjdHMoY2FudmFzKSB7XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgR2FtZSBPYmplY3RzXHJcblx0XHR0aGlzLm9iamVjdHMuZHJhd0dhbWVPYmplY3RzKGNhbnZhcyk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGtleVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0Z2V0VmFyaWFibGUoa2V5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmFyaWFibGVzW2tleV07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc3BlY2lmaWVkIEdhbWUgVmFyaWFibGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gICB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzZXRWYXJpYWJsZShrZXksIHZhbHVlKSB7XHJcblx0XHR0aGlzLl92YXJpYWJsZXNba2V5XSA9IHZhbHVlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluY3JlYXNlcyB0aGUgc3BlY2lmaWVkIEdhbWUgVmFyaWFibGUgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICBrZXlcclxuXHQgKiBAcGFyYW0gIHtudW1lcmljfSAgYW1vdW50XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGluY1ZhcmlhYmxlKGtleSwgYW1vdW50KSB7XHJcblx0XHR0aGlzLl92YXJpYWJsZXNba2V5XSArPSBhbW91bnQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGVjcmVhc2VzIHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZSBieSB0aGUgZ2l2ZW4gYW1vdW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIGtleVxyXG5cdCAqIEBwYXJhbSAge251bWVyaWN9ICBhbW91bnRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZGVjVmFyaWFibGUoa2V5LCBhbW91bnQpIHtcclxuXHRcdHRoaXMuX3ZhcmlhYmxlc1trZXldIC09IGFtb3VudDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZSBpcyBkZWZpbmVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGhhc1ZhcmlhYmxlKGtleSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB0aGlzLl92YXJpYWJsZXNba2V5XSA9PT0gJ3VuZGVmaW5lZCc7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgR2FtZSBWYXJpYWJsZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtvYmplY3R9XHJcblx0ICovXHJcblx0Z2V0VmFyaWFibGVzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhcmlhYmxlcztcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5HYW1lID0gR2FtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0dhbWUuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuU3VwcG9ydCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vcCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgTG9vcCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gIG9wdGlvbnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgaW50ZXJ2YWwgdGltZW91dCAoaW4gbWlsbGlzZWNvbmRzKS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtudW1iZXJ9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW50ZXJ2YWxUaW1lb3V0ID0gb3B0aW9ucy5pbnRlcnZhbCB8fCAxMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBMb29wIGlzIHJ1bm5pbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgQmVmb3JlIExvb3AgSGFuZGxlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtmdW5jdGlvbnxudWxsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmJlZm9yZUxvb3BIYW5kbGVyID0gb3B0aW9ucy5iZWZvcmUgfHwgbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBMb29wIEhhbmRsZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7ZnVuY3Rpb258bnVsbH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb29wSGFuZGxlciA9IG9wdGlvbnMubG9vcCB8fCBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEFmdGVyIExvb3AgSGFuZGxlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtmdW5jdGlvbnxudWxsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmFmdGVyTG9vcEhhbmRsZXIgPSBvcHRpb25zLmFmdGVyIHx8IG51bGw7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RhcnQoKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIExvb3AgaXMgYWxyZWFkeSBhY3RpdmVcclxuXHRcdGlmKHRoaXMuaW50ZXJ2YWxJZCAhPSBudWxsKSB7XHJcblxyXG5cdFx0XHQvLyBDbGVhciB0aGUgTG9vcCBJbnRlcnZhbFxyXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0YXJ0IHRoZSBMb29wXHJcblx0XHR0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLmRvTG9vcC5iaW5kKHRoaXMpLCB0aGlzLmludGVydmFsVGltZW91dCk7XHJcblxyXG5cdFx0Ly8gTWFyayB0aGUgTG9vcCBhcyBydW5uaW5nXHJcblx0XHR0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgYW4gaXRlcmF0aW9uIG9mIHRoZSBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkb0xvb3AoKSB7XHJcblxyXG5cdFx0Ly8gUGVyZm9ybSBhbnkgYWN0aW9ucyBiZWZvcmUgdGhlIExvb3BcclxuXHRcdHRoaXMuYmVmb3JlTG9vcEl0ZXJhdGlvbigpO1xyXG5cclxuXHRcdC8vIFBlcmZvcm0gdGhlIExvb3AgaXRlcmF0aW9uXHJcblx0XHR0aGlzLmRvTG9vcEl0ZXJhdGlvbigpO1xyXG5cclxuXHRcdC8vIFBlcmZvcm0gYW55IGFjdGlvbnMgYWZ0ZXIgdGhlIExvb3BcclxuXHRcdHRoaXMuYWZ0ZXJMb29wSXRlcmF0aW9uKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgQmVmb3JlIExvb3AgSGFuZGxlci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YmVmb3JlTG9vcEl0ZXJhdGlvbigpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXIgaXMgZGVmaW5lZFxyXG5cdFx0aWYodHlwZW9mIHRoaXMuYmVmb3JlTG9vcEhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENhbGwgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXJcclxuXHRcdHRoaXMuYmVmb3JlTG9vcEhhbmRsZXIuYXBwbHkodGhpcywgW10pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgTG9vcCBIYW5kbGVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkb0xvb3BJdGVyYXRpb24oKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBMb29wIEhhbmRsZXIgaXMgZGVmaW5lZFxyXG5cdFx0aWYodHlwZW9mIHRoaXMubG9vcEhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENhbGwgdGhlIExvb3AgSGFuZGxlclxyXG5cdFx0dGhpcy5sb29wSGFuZGxlci5hcHBseSh0aGlzLCBbXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBBZnRlciBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGFmdGVyTG9vcEl0ZXJhdGlvbigpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIEFmdGVyIExvb3AgSGFuZGxlciBpcyBkZWZpbmVkXHJcblx0XHRpZih0eXBlb2YgdGhpcy5hZnRlckxvb3BIYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDYWxsIHRoZSBBZnRlciBMb29wIEhhbmRsZXJcclxuXHRcdHRoaXMuYWZ0ZXJMb29wSGFuZGxlci5hcHBseSh0aGlzLCBbXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25CZWZvcmVMb29wKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5iZWZvcmVMb29wSGFuZGxlciA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25Mb29wKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5sb29wSGFuZGxlciA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBBZnRlciBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25BZnRlckxvb3AoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLmFmdGVyTG9vcEhhbmRsZXIgPSBjYWxsYmFjaztcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5kcyB0aGUgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RvcCgpIHtcclxuXHJcblx0XHQvLyBDbGVhciB0aGUgTG9vcCBJbnRlcnZhbFxyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG5cclxuXHRcdC8vIE1hcmsgdGhlIExvb3AgYXMgbm8gbG9uZ2VyIHJ1bm5pbmdcclxuXHRcdHRoaXMucnVubmluZyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkxvb3AgPSBMb29wO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvTG9vcC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnQXBwLk9iamVjdHMnKTtcclxuXHJcbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJ0VuZ2luZS9PYmplY3RzL0dhbWVPYmplY3QuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFsbEdhbWVPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFwiYm9vdGluZ1wiIG1ldGhvZCBvZiB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhdGljIF9ib290KCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQXNzaWduIEluc3RhbmNlIEF0dHJpYnV0ZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLkJhbGxHYW1lT2JqZWN0fSAgYmFsbFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25DcmVhdGUoZnVuY3Rpb24oYmFsbCkge1xyXG5cclxuXHRcdFx0YmFsbC5yYWRpdXMgPSAxMDtcclxuXHRcdFx0YmFsbC5keCA9IDA7XHJcblx0XHRcdGJhbGwuZHkgPSAwO1xyXG5cdFx0XHRiYWxsLnRyYWNraW5nT2JqZWN0ID0gbnVsbDtcclxuXHRcdFx0YmFsbC50cmFja2luZ09mZnNldCA9IG51bGw7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgRHJhdyBFdmVudCBIYW5kbGVyIGZvciB0aGlzIE9iamVjdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQmFsbEdhbWVPYmplY3R9ICBiYWxsXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gICAgICAgICBjYW52YXNcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzQ29udGV4dH0gIGNvbnRleHRcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9uRHJhdyhmdW5jdGlvbihiYWxsLCBjYW52YXMsIGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIEJhbGxcclxuXHRcdFx0Y29udGV4dC5kcmF3Q2lyY2xlKGJhbGwueCwgYmFsbC55LCBiYWxsLnJhZGl1cywgJyMwMDk1REQnKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBTdGVwIEV2ZW50IEhhbmRsZXIgZm9yIHRoaXMgT2JqZWN0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5CYWxsR2FtZU9iamVjdH0gIGJhbGxcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9uU3RlcChmdW5jdGlvbihiYWxsKSB7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBmb3IgYSBUcmFja2luZyBPYmplY3RcclxuXHRcdFx0aWYoYmFsbC50cmFja2luZ09iamVjdCkge1xyXG5cclxuXHRcdFx0XHQvLyBUcmFjayB0aGUgVHJhY2tpbmcgT2JqZWN0XHJcblx0XHRcdFx0YmFsbC54ID0gYmFsbC50cmFja2luZ09iamVjdC54ICsgYmFsbC50cmFja2luZ09mZnNldDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBUb3AgQ29sbGlzaW9uXHJcblx0XHRcdGlmKGJhbGwueSArIGJhbGwuZHkgPCAwICsgYmFsbC5yYWRpdXMpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmV2ZXJzZSB0aGUgVmVydGljYWwgRGlyZWN0aW9uXHJcblx0XHRcdFx0YmFsbC5keSAqPSAtMTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBCb3R0b20gQ29sbGlzaW9uXHJcblx0XHRcdGVsc2UgaWYoYmFsbC55ICsgYmFsbC5keSA+IGdhbWUoKS5ncmFwaGljcy5nZXRDYW52YXMoKS5nZXRIZWlnaHQoKSAtIGJhbGwucmFkaXVzKSB7XHJcblxyXG5cdFx0XHRcdC8vIEZpbmQgdGhlIFBhZGRsZSBPYmplY3RcclxuXHRcdFx0XHR2YXIgcGFkZGxlID0gZ2FtZSgpLm9iamVjdHMuZ2V0T2JqZWN0QnlDbGFzcygnUGFkZGxlR2FtZU9iamVjdCcpO1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBpZiB0aGUgUGFkZGxlIHdvdWxkIHN0b3AgdGhlIEJhbGxcclxuXHRcdFx0XHRpZihwYWRkbGUgIT0gbnVsbCAmJiBiYWxsLnggPiBwYWRkbGUueCAmJiBiYWxsLnggPCBwYWRkbGUueCArIHBhZGRsZS53aWR0aCkge1xyXG5cclxuXHRcdFx0XHRcdC8vIEJvdW5jZSBvZmYgb2YgdGhlIFBhZGRsZVxyXG5cdFx0XHRcdFx0cGFkZGxlLmJvdW5jZShiYWxsKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyBBc3N1bWUgR2FtZSBPdmVyXHJcblx0XHRcdFx0ZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSW5pdGlhdGUgR2FtZSBPdmVyXHJcblx0XHRcdFx0XHRhbGVydCgnR0FNRSBPVkVSJyk7XHJcblxyXG5cdFx0XHRcdFx0YmFsbC54ID0gNTA7XHJcblx0XHRcdFx0XHRiYWxsLnkgPSA1MDtcclxuXHRcdFx0XHRcdGJhbGwuZHggPSAwO1xyXG5cdFx0XHRcdFx0YmFsbC5keSA9IDA7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBMZWZ0IENvbGxpc2lvblxyXG5cdFx0XHRpZihiYWxsLnggKyBiYWxsLmR4IDwgMCArIGJhbGwucmFkaXVzKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJldmVyc2UgdGhlIEhvcml6b250YWwgRGlyZWN0aW9uXHJcblx0XHRcdFx0YmFsbC5keCAqPSAtMTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBSaWdodCBDb2xsaXNpb25cclxuXHRcdFx0ZWxzZSBpZihiYWxsLnggKyBiYWxsLmR5ID4gZ2FtZSgpLmdyYXBoaWNzLmdldENhbnZhcygpLmdldFdpZHRoKCkgLSBiYWxsLnJhZGl1cykge1xyXG5cclxuXHRcdFx0XHQvLyBSZXZlcnNlIHRoZSBIb3Jpem9udGFsIERpcmVjdGlvblxyXG5cdFx0XHRcdGJhbGwuZHggKj0gLTE7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBNb3ZlIHRoZSBCYWxsXHJcblx0XHRcdGJhbGwueCArPSBiYWxsLmR4O1xyXG5cdFx0XHRiYWxsLnkgKz0gYmFsbC5keTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogSGl0cyB0aGUgc3BlY2lmaWVkIEJyaWNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLkJyaWNrR2FtZU9iamVjdH0gIGJyaWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGhpdEJyaWNrKGJyaWNrKSB7XHJcblxyXG5cdFx0Ly8gUmV2ZXJzZSB0aGUgVmVydGljYWwgRGlyZWN0aW9uIG9mIHRoZSBCYWxsXHJcblx0XHR0aGlzLmR5ICo9IC0xO1xyXG5cclxuXHRcdC8vIERhbWFnZSB0aGUgQnJpY2tcclxuXHRcdGJyaWNrLmRhbWFnZSgpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTdG9wcyB0aGlzIEJhbGwncyBNb3ZlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RvcCgpIHtcclxuXHJcblx0XHR0aGlzLmR4ID0gMDtcclxuXHRcdHRoaXMuZHkgPSAwO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMYXVuY2hlcyB0aGlzIEJhbGwgaW4gdGhlIHNwZWNpZmllZCBkaXJlY3Rpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gIGRpcmVjdGlvblxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgc3BlZWRcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gIGFjY3VyYWN5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGxhdW5jaChkaXJlY3Rpb24gPSA5MCwgc3BlZWQgPSAyLCBhY2N1cmFjeSA9IDAuOSkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgc3ByZWFkXHJcblx0XHR2YXIgc3ByZWFkID0gMSAtIGFjY3VyYWN5O1xyXG5cclxuXHRcdC8vIE9mZnNldCB0aGUgRGlyZWN0aW9uXHJcblx0XHRkaXJlY3Rpb24gKj0gMSArIChNYXRoLnJhbmRvbSgpICogc3ByZWFkICogMiAtIHNwcmVhZCk7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBtb3ZlbWVudFxyXG5cdFx0dGhpcy5keCA9IE1hdGguY29zKGRpcmVjdGlvbiAqIE1hdGguUEkgLyAxODApICogc3BlZWQ7XHJcblx0XHR0aGlzLmR5ID0gLU1hdGguc2luKGRpcmVjdGlvbiAqIE1hdGguUEkgLyAxODApICogc3BlZWQ7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ0xhdW5jaDogJyArIHRoaXMuZHggKyAnLCAnICsgdGhpcy5keSk7XHJcblxyXG5cdFx0Ly8gUmVsZWFzZSB0aGUgVHJhY2tpbmcgT2JqZWN0XHJcblx0XHR0aGlzLnRyYWNraW5nT2JqZWN0ID0gbnVsbDtcclxuXHRcdHRoaXMudHJhY2tpbmdPZmZzZXQgPSAwO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBUcmFja2luZyBPYmplY3QgZm9yIHRoaXMgQmFsbC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5HYW1lT2JqZWN0fSAgb2JqZWN0XHJcblx0ICogQHBhcmFtICBpbnRlZ2VyICAgICAgICAgICAgICAgICAgICBvZmZzZXRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c2V0VHJhY2tpbmdPYmplY3Qob2JqZWN0LCBvZmZzZXQgPSAwKSB7XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSBUcmFja2luZyBPYmplY3RcclxuXHRcdHRoaXMudHJhY2tpbmdPYmplY3QgPSBvYmplY3Q7XHJcblxyXG5cdFx0Ly8gU2V0IHRoZSBUcmFja2luZyBPZmZzZXRcclxuXHRcdHRoaXMudHJhY2tpbmdPZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG5cdFx0Ly8gU3RvcCBhbnkgbW92ZW1lbnRcclxuXHRcdHRoaXMuc3RvcCgpO1xyXG5cclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5CYWxsR2FtZU9iamVjdCA9IEJhbGxHYW1lT2JqZWN0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9PYmplY3RzL0JhbGxHYW1lT2JqZWN0LmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdBcHAuT2JqZWN0cycpO1xyXG5cclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnRW5naW5lL09iamVjdHMvR2FtZU9iamVjdC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCcmlja0dhbWVPYmplY3QgZXh0ZW5kcyBHYW1lT2JqZWN0IHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFwiYm9vdGluZ1wiIG1ldGhvZCBvZiB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhdGljIF9ib290KCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQXNzaWduIEluc3RhbmNlIEF0dHJpYnV0ZXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLkJyaWNrR2FtZU9iamVjdH0gIGJyaWNrXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vbkNyZWF0ZShmdW5jdGlvbihicmljaykge1xyXG5cclxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgSGVhbHRoXHJcblx0XHRcdGJyaWNrLmhlYWx0aCA9IGJyaWNrLmhlYWx0aE1heCA9IDE7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgRHJhdyBFdmVudCBIYW5kbGVyIGZvciB0aGlzIE9iamVjdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQnJpY2tHYW1lT2JqZWN0fSAgYnJpY2tcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzfSAgICAgICAgICBjYW52YXNcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzQ29udGV4dH0gICBjb250ZXh0XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vbkRyYXcoZnVuY3Rpb24oYnJpY2ssIGNhbnZhcywgY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gRmluZCB0aGUgQmFsbCBPYmplY3RcclxuXHRcdFx0dmFyIGJhbGwgPSB3aW5kb3cuQXBwLmdhbWUub2JqZWN0cy5nZXRPYmplY3RCeUNsYXNzKCdCYWxsR2FtZU9iamVjdCcpO1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBCYWxsIHdhcyBmb3VuZFxyXG5cdFx0XHRpZihiYWxsICE9IG51bGwpIHtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIEJhbGwgQ29sbGlzaW9uXHJcblx0XHRcdFx0aWYoYnJpY2suaXNCYWxsQ29sbGlkaW5nKGJhbGwpKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gSGl0IHRoZSBCcmlja1xyXG5cdFx0XHRcdFx0YmFsbC5oaXRCcmljayhicmljayk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIEJyaWNrXHJcblx0XHRcdGNvbnRleHQuZHJhd1JlY3RhbmdsZShicmljay54LCBicmljay55LCBicmljay53aWR0aCwgYnJpY2suaGVpZ2h0LCAnIzAwOTVERCcpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgQmFsbCBpcyBjb2xsaWRpbmcgd2l0aCB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0JhbGxHYW1lT2JqZWN0fSAgYmFsbFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRpc0JhbGxDb2xsaWRpbmcoYmFsbCkge1xyXG5cclxuXHRcdHJldHVybiBiYWxsLnggPiB0aGlzLnggICAgICAgICAgICAgICAvLyBDaGVjayBMZWZ0IEVkZ2VcclxuXHRcdFx0JiYgYmFsbC54IDwgdGhpcy54ICsgdGhpcy53aWR0aCAgLy8gQ2hlY2sgUmlnaHQgRWRnZVxyXG5cdFx0XHQmJiBiYWxsLnkgPiB0aGlzLnkgICAgICAgICAgICAgICAvLyBDaGVjayBUb3AgRWRnZVxyXG5cdFx0XHQmJiBiYWxsLnkgPCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvLyBDaGVjayBCb3R0b20gRWRnZVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEYW1hZ2VzIHRoaXMgQnJpY2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgYW1vdW50XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGRhbWFnZShhbW91bnQgPSAxKSB7XHJcblxyXG5cdFx0Ly8gUmVkdWNlIHRoZSBIZWFsdGhcclxuXHRcdHRoaXMuaGVhbHRoIC09IGFtb3VudDtcclxuXHJcblx0XHQvLyBDaGVjayBmb3IgRGVhdGhcclxuXHRcdGlmKHRoaXMuaGVhbHRoIDwgMCkge1xyXG5cdFx0XHR0aGlzLmRpZSgpO1xyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBLaWxscyB0aGlzIEJyaWNrLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkaWUoKSB7XHJcblxyXG5cdFx0Ly8gRGVzdHJveSB0aGUgQnJpY2tcclxuXHRcdHRoaXMuZGVzdHJveSgpO1xyXG5cclxuXHRcdC8vIEluY3JlYXNlIHRoZSBHYW1lIFNjb3JlXHJcblx0XHRnYW1lKCkuaW5jVmFyaWFibGUoJ3Njb3JlJywgMSk7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuQnJpY2tHYW1lT2JqZWN0ID0gQnJpY2tHYW1lT2JqZWN0O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9PYmplY3RzL0JyaWNrR2FtZU9iamVjdC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnQXBwLk9iamVjdHMnKTtcclxuXHJcbmltcG9ydCBHYW1lT2JqZWN0IGZyb20gJ0VuZ2luZS9PYmplY3RzL0dhbWVPYmplY3QuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFkZGxlR2FtZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgXCJib290aW5nXCIgbWV0aG9kIG9mIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgX2Jvb3QoKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3NpZ24gSW5zdGFuY2UgQXR0cmlidXRlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuUGFkZGxlR2FtZU9iamVjdH0gIHBhZGRsZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25DcmVhdGUoZnVuY3Rpb24ocGFkZGxlKSB7XHJcblxyXG5cdFx0XHRwYWRkbGUud2lkdGggPSA3NTtcclxuXHRcdFx0cGFkZGxlLmhlaWdodCA9IDEwO1xyXG5cdFx0XHRwYWRkbGUubW92ZW1lbnRTcGVlZCA9IDI7XHJcblx0XHRcdHBhZGRsZS50cmFja2luZ09iamVjdCA9IG51bGw7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgU3RlcCBFdmVudCBIYW5kbGVyIGZvciB0aGlzIE9iamVjdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuUGFkZGxlR2FtZU9iamVjdH0gIHBhZGRsZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25TdGVwKGZ1bmN0aW9uKHBhZGRsZSkge1xyXG5cclxuXHRcdFx0Ly8gQXBwbHkgTW92ZW1lbnRcclxuXHRcdFx0cGFkZGxlLmFwcGx5TW92ZW1lbnRBY3Rpb25zKCk7XHJcblxyXG5cdFx0XHQvLyBBcHBseSBMYXVuY2hcclxuXHRcdFx0cGFkZGxlLmFwcGx5TGF1bmNoQWN0aW9uKCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgRHJhdyBFdmVudCBIYW5kbGVyIGZvciB0aGlzIE9iamVjdC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuUGFkZGxlR2FtZU9iamVjdH0gIHBhZGRsZVxyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5HcmFwaGljcy5DYW52YXN9ICAgICAgICAgICBjYW52YXNcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzQ29udGV4dH0gICAgY29udGV4dFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25EcmF3KGZ1bmN0aW9uKHBhZGRsZSwgY2FudmFzLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0XHQvLyBEcmF3IHRoZSBQYWRkbGVcclxuXHRcdFx0Y29udGV4dC5kcmF3UmVjdGFuZ2xlKHBhZGRsZS54LCBwYWRkbGUueSwgcGFkZGxlLndpZHRoLCBwYWRkbGUuaGVpZ2h0LCAnIzAwOTVERCcpO1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBCYWxsXHJcblx0XHRcdHZhciBiYWxsID0gZ2FtZSgpLm9iamVjdHMuZ2V0T2JqZWN0QnlDbGFzcygnQmFsbEdhbWVPYmplY3QnKTtcclxuXHJcblx0XHRcdHZhciBhY2N1cmFjeSA9IDAuOTtcclxuXHRcdFx0dmFyIGFjY2VsZXJhdGlvbiA9IDA7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGltcGFjdCBsaW5lXHJcblx0XHRcdHZhciB4MSwgeTEsIHgyLCB5MjtcclxuXHJcblx0XHRcdHgxID0gY2FudmFzLmdldE1vdXNlWCgpO1xyXG5cdFx0XHR5MSA9IGNhbnZhcy5nZXRNb3VzZVkoKTtcclxuXHRcdFx0eDIgPSBwYWRkbGUueCArIHBhZGRsZS53aWR0aCAvIDI7XHJcblx0XHRcdHkyID0gcGFkZGxlLnk7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGxpbmUgZGlyZWN0aW9uXHJcblx0XHRcdHZhciBkaXJlY3Rpb24gPSBHYW1lLlN1cHBvcnQuQ2FsYy5wb2ludERpcmVjdGlvbih4MSwgeTEsIHgyLCB5Mik7XHJcblxyXG5cdFx0XHRjb250ZXh0LmRyYXdMaW5lKHgxLCB5MSwgeDIsIHkyLCAncmVkJyk7XHJcblxyXG5cdFx0XHQvLyBBdmVyYWdlIHRoZSBkaXJlY3Rpb24gd2l0aCBzdHJhaWdodCBkb3duXHJcblx0XHRcdGRpcmVjdGlvbiA9IChkaXJlY3Rpb24gKyAoTWF0aC5QSSAqIDMvMikpLzI7XHJcblxyXG5cdFx0XHRjb250ZXh0LmRyYXdMaW5lKHgyLCB5MiwgeDIgLSBNYXRoLmNvcyhkaXJlY3Rpb24pICogNjAsIHkyICsgTWF0aC5jb3MoZGlyZWN0aW9uKSAqIDYwLCAnZ3JlZW4nKTtcclxuXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdJbml0aWFsOiBEaXI6ICcgKyBkaXJlY3Rpb24gKyAnIChSYWQpICcgKyAoZGlyZWN0aW9uICogMTgwIC8gTWF0aC5QSSkgKyAnIChEZWcpJyk7XHJcblxyXG5cdFx0XHQvLyBUbyBtYWtlIHRoaW5ncyBhIGJpdCBtb3JlIHJhbmRvbSwgd2UncmUgZ29pbmcgdG8gc3ByZWFkIGFyb3VuZFxyXG5cdFx0XHQvLyB0aGUgZGlyZWN0aW9uIGEgYml0LCBtYWtpbmcgb3VyIGdhbWUgYSBiaXQgaGFyZGVyIHRvIGtub3dcclxuXHRcdFx0Ly8gaG93IHRoZSBiYWxsIGlzIGdvaW5nIHRvIGJvdW5jZSBhaGVhZCBvZiB0aW1lLiBOZWF0IVxyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBzcHJlYWRcclxuXHRcdFx0dmFyIHNwcmVhZCA9IGFjY3VyYWN5IC0gMTtcclxuXHJcblx0XHRcdC8vIE9mZnNldCB0aGUgZGlyZWN0aW9uXHJcblx0XHRcdC8vIGRpcmVjdGlvbiAqPSAxICsgKChNYXRoLnJhbmRvbSgpICogc3ByZWFkICogMiAtIHNwcmVhZCkgLyAoMTgwIC8gTWF0aC5QSSkpO1xyXG5cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ1NwcmVhZDogRGlyOiAnICsgZGlyZWN0aW9uICsgJyAoUmFkKSAnICsgKGRpcmVjdGlvbiAqIDE4MCAvIE1hdGguUEkpICsgJyAoRGVnKScpO1xyXG5cclxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBkaXJlY3Rpb24gaXNuJ3QgY29tcGxldGVseSB3YWNrXHJcblx0XHRcdGRpcmVjdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguUEkgKiA5IC8gOCwgZGlyZWN0aW9uKSwgTWF0aC5QSSAqIDE1IC8gOCk7XHJcblxyXG5cdFx0XHRjb250ZXh0LmRyYXdMaW5lKHgyLCB5MiwgeDIgLSBNYXRoLmNvcyhkaXJlY3Rpb24pICogNjAsIHkyICsgTWF0aC5jb3MoZGlyZWN0aW9uKSAqIDYwLCAnb3JhbmdlJyk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnQ2xhbXA6IERpcjogJyArIGRpcmVjdGlvbiArICcgKFJhZCkgJyArIChkaXJlY3Rpb24gKiAxODAgLyBNYXRoLlBJKSArICcgKERlZyknKTtcclxuXHJcblx0XHRcdC8vIEJlZm9yZSB3ZSBkZXRlcm1pbmUgdGhlIG5ldyBkaXJlY3Rpb24gb2YgdGhlIGJhbGwsIHdlIG5lZWRcclxuXHRcdFx0Ly8gdG8gZGV0ZXJtaW5lIGhvdyBmYXN0IHRoZSBiYWxsIHNob3VsZCBiZSB0cmF2ZWxsaW5nLiBXZVxyXG5cdFx0XHQvLyBjYW4gdGFrZSB0aGUgY3VycmVudCBzcGVlZCwgYW5kIGFjY2VsZXJhdGUgdGhlIGJhbGwuXHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgc3BlZWQgb2YgdGhlIGJhbGxcclxuXHRcdFx0dmFyIHNwZWVkID0gMjtcclxuXHRcdFx0Ly8gdmFyIHNwZWVkID0gTWF0aC5zcXJ0KE1hdGgucG93KGJhbGwuZHgsIDIpICsgTWF0aC5wb3coYmFsbC5keSwgMikpO1xyXG5cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ0luaXRpYWw6IFNwZWVkOiAnICsgc3BlZWQpO1xyXG5cclxuXHRcdFx0Ly8gSW5jcmVhc2UgdGhlIHNwZWVkXHJcblx0XHRcdHNwZWVkICo9IGFjY2VsZXJhdGlvbiArIDE7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnQWNjOiBTcGVlZDogJyArIHNwZWVkKTtcclxuXHJcblx0XHRcdC8vIFdoZW4gZGV0ZXJtaW5pbmcgdGhlIGxpbmUgY29tcG9uZW50cywgd2UnZCBub3JtYWxseSBoYXZlXHJcblx0XHRcdC8vIHRvIGZsaXAgZHksIGFzIHdlIHdhbnQgdGhlIGJhbGwgdG8gXCJib3VuY2VcIi4gSG93ZXZlcixcclxuXHRcdFx0Ly8gc2luY2UgdGhlIGF4aXMgaXMgaW52ZXJ0ZWQsIHRoaXMgaXMgZG9uZSBmb3IgdXMuXHJcblxyXG5cdFx0XHQvLyBGbGlwIHRoZSBsaW5lIGRpcmVjdGlvblxyXG5cdFx0XHR2YXIgZHggPSAtTWF0aC5jb3MoZGlyZWN0aW9uKSAqIHNwZWVkICogMzA7XHJcblx0XHRcdHZhciBkeSA9IE1hdGguc2luKGRpcmVjdGlvbikgKiBzcGVlZCAqIDMwO1xyXG5cclxuXHRcdFx0Y29udGV4dC5kcmF3TGluZSh4MSwgeTEsIHgxICsgZHgsIHkxICsgZHksICdibHVlJyk7XHJcblx0XHRcdGNvbnRleHQuZHJhd0xpbmUoeDIsIHkyLCB4MiArIGR4LCB5MiArIGR5LCAnYmx1ZScpO1xyXG5cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ05ldzogU3BlZWQ6ICcgKyBkeCArICcsICcgKyBkeSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgdGhlIE1vdmVtZW50IEFjdGlvbnMgb2YgdGhpcyBQYWRkbGUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGFwcGx5TW92ZW1lbnRBY3Rpb25zKCkge1xyXG5cclxuXHRcdC8vIENoZWNrIGZvciBNb3ZlIFJpZ2h0XHJcblx0XHRpZih3aW5kb3cua2V5Ym9hcmQuaXNLZXlEb3duKHdpbmRvdy5jb250cm9sTWFwLm1vdmVSaWdodCkpIHtcclxuXHJcblx0XHRcdGlmKHRoaXMuY2FuTW92ZVJpZ2h0KCkpIHtcclxuXHRcdFx0XHR0aGlzLm1vdmVSaWdodCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBNb3ZlIExlZnRcclxuXHRcdGVsc2UgaWYod2luZG93LmtleWJvYXJkLmlzS2V5RG93bih3aW5kb3cuY29udHJvbE1hcC5tb3ZlTGVmdCkpIHtcclxuXHJcblx0XHRcdGlmKHRoaXMuY2FuTW92ZUxlZnQoKSkge1xyXG5cdFx0XHRcdHRoaXMubW92ZUxlZnQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIFBhZGRsZSBjYW4gbW92ZSB0byB0aGUgTGVmdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y2FuTW92ZUxlZnQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy54ID4gMDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGlzIFBhZGRsZSB0byB0aGUgTGVmdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0bW92ZUxlZnQoKSB7XHJcblx0XHR0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFNwZWVkO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIFBhZGRsZSBjYW4gbW92ZSB0byB0aGUgUmlnaHQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGNhbk1vdmVSaWdodCgpIHtcclxuXHRcdHJldHVybiB0aGlzLnggPCBnYW1lKCkuZ3JhcGhpY3MuZ2V0Q2FudmFzKCkuZ2V0V2lkdGgoKSAtIHRoaXMud2lkdGg7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTW92ZXMgdGhpcyBQYWRkbGUgdG8gdGhlIFJpZ2h0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRtb3ZlUmlnaHQoKSB7XHJcblx0XHR0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFNwZWVkO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpZXMgdGhlIExhdW5jaCBBY3Rpb24gb2YgdGhpcyBQYWRkbGUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGFwcGx5TGF1bmNoQWN0aW9uKCkge1xyXG5cclxuXHRcdC8vIENoZWNrIGZvciBMYXVuY2ggQWN0aW9uXHJcblx0XHRpZih3aW5kb3cua2V5Ym9hcmQuaXNLZXlQcmVzc2VkKHdpbmRvdy5jb250cm9sTWFwLmxhdW5jaCkpIHtcclxuXHJcblx0XHRcdC8vIE1ha2Ugc3VyZSB0aGUgUGFkZGxlIGNhbiBsYXVuY2ggdGhlIFRyYWNraW5nIE9iamVjdFxyXG5cdFx0XHRpZih0aGlzLmNhbkxhdW5jaFRyYWNraW5nT2JqZWN0KCkpIHtcclxuXHJcblx0XHRcdFx0Ly8gTGF1bmNoIHRoZSBUcmFja2luZyBPYmplY3RcclxuXHRcdFx0XHR0aGlzLmxhdW5jaFRyYWNraW5nT2JqZWN0KCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgUGFkZGxlIGNhbiBsYXVuY2guXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGNhbkxhdW5jaFRyYWNraW5nT2JqZWN0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaGFzVHJhY2tpbmdPYmplY3QoKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgUGFkZGxlIGhhcyBhIFRyYWNraW5nIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0aGFzVHJhY2tpbmdPYmplY3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy50cmFja2luZ09iamVjdCAhPSBudWxsO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIFRyYWNraW5nIE9iamVjdCBmb3IgdGhpcyBQYWRkbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdH0gIG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzZXRUcmFja2luZ09iamVjdChvYmplY3QpIHtcclxuXHRcdHRoaXMudHJhY2tpbmdPYmplY3QgPSBvYmplY3Q7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogTGF1bmNoZXMgdGhlIFRyYWNraW5nIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0bGF1bmNoVHJhY2tpbmdPYmplY3QoKSB7XHJcblxyXG5cdFx0Ly8gTGF1bmNoIHRoZSBCYWxsXHJcblx0XHR0aGlzLnRyYWNraW5nT2JqZWN0LmxhdW5jaCg5MCk7XHJcblxyXG5cdFx0Ly8gUmVsZWFzZSB0aGUgVHJhY2tpbmcgT2JqZWN0XHJcblx0XHR0aGlzLnRyYWNraW5nT2JqZWN0ID0gbnVsbDtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBUcmFja2luZyBCYWxsLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7R2FtZS5PYmplY3RzLkJhbGxHYW1lT2JqZWN0fVxyXG5cdCAqL1xyXG5cdGNyZWF0ZVRyYWNraW5nQmFsbCgpIHtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBuZXcgQmFsbFxyXG5cdFx0dmFyIGJhbGwgPSBnYW1lKCkub2JqZWN0cy5jcmVhdGVJbnN0YW5jZSgnQmFsbEdhbWVPYmplY3QnLCB0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55IC0gMTApO1xyXG5cclxuXHRcdC8vIEZvcmNlIHRoZSBCYWxsIHRvIHRyYWNrIHRoaXMgUGFkZGxlXHJcblx0XHRiYWxsLnNldFRyYWNraW5nT2JqZWN0KHRoaXMsIHRoaXMud2lkdGggLyAyKTtcclxuXHJcblx0XHQvLyBTZXQgdGhlIFRyYWNraW5nIE9iamVjdCB0byB0aGUgQmFsbFxyXG5cdFx0dGhpcy5zZXRUcmFja2luZ09iamVjdChiYWxsKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIEJhbGxcclxuXHRcdHJldHVybiBiYWxsO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCb3VuY2VzIHRoZSBzcGVjaWZpZWQgQmFsbCBvZmYgb2YgdGhpcyBQYWRkbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQmFsbEdhbWVPYmplY3R9ICBiYWxsXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICAgICAgICAgICAgICAgYWNjZWxlcmF0aW9uXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICAgICAgICAgICAgICAgYWNjdXJhY3lcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0Ym91bmNlKGJhbGwsIGFjY2VsZXJhdGlvbiA9IDAsIGFjY3VyYWN5ID0gMC45KSB7XHJcblxyXG5cdFx0Ly8gRm9yIGRldGVybWluaW5nIHRoZSBib3VuY2UgZGlyZWN0aW9uLCB3ZSB3YW50IHRoaXMgdG8gZHJvcCBmcm9tXHJcblx0XHQvLyB0aGUgYmFsbCwgY29tcGFyZSB0aGUgaW1wYWN0IHRvIHRoZSBjZW50ZXIgYW5kIGJvdW5jZSBhd2F5XHJcblx0XHQvLyBmcm9tIHRoZSBkaXJlY3Rpb24uIFRoaXMgY3JlYXRlcyBhIHJlYWwgcGFkZGxlIGVmZmVjdC5cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIGltcGFjdCBsaW5lXHJcblx0XHR2YXIgeDEsIHkxLCB4MiwgeTI7XHJcblxyXG5cdFx0eDEgPSBnYW1lKCkuZ3JhcGhpY3MuZ2V0Q2FudmFzKCkuZ2V0TW91c2VYKCk7XHJcblx0XHR5MSA9IHRoaXMueTtcclxuXHRcdHgyID0gdGhpcy54ICsgdGhpcy53aWR0aCAvIDI7XHJcblx0XHR5MiA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMjtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIGxpbmUgZGlyZWN0aW9uXHJcblx0XHR2YXIgZGlyZWN0aW9uID0gR2FtZS5TdXBwb3J0LkNhbGMucG9pbnREaXJlY3Rpb24oeDEsIHkxLCB4MiwgeTIpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdJbml0aWFsOiBEaXI6ICcgKyBkaXJlY3Rpb24gKyAnIChSYWQpICcgKyAoZGlyZWN0aW9uICogMTgwIC8gTWF0aC5QSSkgKyAnIChEZWcpJyk7XHJcblxyXG5cdFx0Ly8gVG8gbWFrZSB0aGluZ3MgYSBiaXQgbW9yZSByYW5kb20sIHdlJ3JlIGdvaW5nIHRvIHNwcmVhZCBhcm91bmRcclxuXHRcdC8vIHRoZSBkaXJlY3Rpb24gYSBiaXQsIG1ha2luZyBvdXIgZ2FtZSBhIGJpdCBoYXJkZXIgdG8ga25vd1xyXG5cdFx0Ly8gaG93IHRoZSBiYWxsIGlzIGdvaW5nIHRvIGJvdW5jZSBhaGVhZCBvZiB0aW1lLiBOZWF0IVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgc3ByZWFkXHJcblx0XHR2YXIgc3ByZWFkID0gYWNjdXJhY3kgLSAxO1xyXG5cclxuXHRcdC8vIE9mZnNldCB0aGUgZGlyZWN0aW9uXHJcblx0XHQvLyBkaXJlY3Rpb24gKj0gMSArICgoTWF0aC5yYW5kb20oKSAqIHNwcmVhZCAqIDIgLSBzcHJlYWQpIC8gKDE4MCAvIE1hdGguUEkpKTtcclxuXHJcblx0XHRjb25zb2xlLmxvZygnU3ByZWFkOiBEaXI6ICcgKyBkaXJlY3Rpb24gKyAnIChSYWQpICcgKyAoZGlyZWN0aW9uICogMTgwIC8gTWF0aC5QSSkgKyAnIChEZWcpJyk7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBkaXJlY3Rpb24gaXNuJ3QgY29tcGxldGVseSB3YWNrXHJcblx0XHRkaXJlY3Rpb24gPSBNYXRoLm1pbihNYXRoLm1heChNYXRoLlBJICogOSAvIDgsIGRpcmVjdGlvbiksIE1hdGguUEkgKiAxNSAvIDgpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdDbGFtcDogRGlyOiAnICsgZGlyZWN0aW9uICsgJyAoUmFkKSAnICsgKGRpcmVjdGlvbiAqIDE4MCAvIE1hdGguUEkpICsgJyAoRGVnKScpO1xyXG5cclxuXHRcdC8vIEJlZm9yZSB3ZSBkZXRlcm1pbmUgdGhlIG5ldyBkaXJlY3Rpb24gb2YgdGhlIGJhbGwsIHdlIG5lZWRcclxuXHRcdC8vIHRvIGRldGVybWluZSBob3cgZmFzdCB0aGUgYmFsbCBzaG91bGQgYmUgdHJhdmVsbGluZy4gV2VcclxuXHRcdC8vIGNhbiB0YWtlIHRoZSBjdXJyZW50IHNwZWVkLCBhbmQgYWNjZWxlcmF0ZSB0aGUgYmFsbC5cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgc3BlZWQgb2YgdGhlIGJhbGxcclxuXHRcdHZhciBzcGVlZCA9IE1hdGguc3FydChNYXRoLnBvdyhiYWxsLmR4LCAyKSArIE1hdGgucG93KGJhbGwuZHksIDIpKTtcclxuXHJcblx0XHRjb25zb2xlLmxvZygnSW5pdGlhbDogU3BlZWQ6ICcgKyBzcGVlZCk7XHJcblxyXG5cdFx0Ly8gSW5jcmVhc2UgdGhlIHNwZWVkXHJcblx0XHRzcGVlZCAqPSBhY2NlbGVyYXRpb24gKyAxO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdBY2M6IFNwZWVkOiAnICsgc3BlZWQpO1xyXG5cclxuXHRcdC8vIFdoZW4gZGV0ZXJtaW5pbmcgdGhlIGxpbmUgY29tcG9uZW50cywgd2UnZCBub3JtYWxseSBoYXZlXHJcblx0XHQvLyB0byBmbGlwIGR5LCBhcyB3ZSB3YW50IHRoZSBiYWxsIHRvIFwiYm91bmNlXCIuIEhvd2V2ZXIsXHJcblx0XHQvLyBzaW5jZSB0aGUgYXhpcyBpcyBpbnZlcnRlZCwgdGhpcyBpcyBkb25lIGZvciB1cy5cclxuXHJcblx0XHQvLyBGbGlwIHRoZSBsaW5lIGRpcmVjdGlvblxyXG5cdFx0dmFyIGR4ID0gLU1hdGguY29zKGRpcmVjdGlvbikgKiBzcGVlZDtcclxuXHRcdHZhciBkeSA9IE1hdGguc2luKGRpcmVjdGlvbikgKiBzcGVlZDtcclxuXHJcblx0XHRjb25zb2xlLmxvZygnTmV3OiBTcGVlZDogJyArIGR4ICsgJywgJyArIGR5KTtcclxuXHJcblx0XHQvLyBTZXQgdGhlIHNwZWVkIG9mIHRoZSBiYWxsXHJcblx0XHRiYWxsLmR4ID0gZHg7XHJcblx0XHRiYWxsLmR5ID0gZHk7XHJcblxyXG5cdFx0Ly8gTW92ZSB0aGUgQmFsbCBvbmNlIHRvIHByZXZlbnQgYWRkaXRpb25hbCBjb2xsaXNpb25zXHJcblx0XHRiYWxsLnggKz0gYmFsbC5keDtcclxuXHRcdGJhbGwueSArPSBiYWxsLmR5O1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuUGFkZGxlR2FtZU9iamVjdCA9IFBhZGRsZUdhbWVPYmplY3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvUGFkZGxlR2FtZU9iamVjdC5qcyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL3Nhc3MvYXBwLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=