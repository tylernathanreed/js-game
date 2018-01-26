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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Support_Manager_js__ = __webpack_require__(10);
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
/* 2 */
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
module.exports = __webpack_require__(33);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(6);
__webpack_require__(23);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__(7);
__webpack_require__(39);

__webpack_require__(12);
__webpack_require__(0);
__webpack_require__(15);
__webpack_require__(1);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(21);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Namespace_js__ = __webpack_require__(8);


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
/* 8 */
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
/* 9 */,
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(13);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Map_js__ = __webpack_require__(14);
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {



/***/ }),
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(19);
__webpack_require__(20);

/***/ }),
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// Load the scripts within the Namespace
__webpack_require__(2);
__webpack_require__(22);

/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Game_js__ = __webpack_require__(40);
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

var app = __webpack_require__(24).default;

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



__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Application_js__ = __webpack_require__(25);


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

var app = new __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Application_js__["a" /* default */]();

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
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Obj_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Engine_Container_Container_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Engine_Events_EventServiceProvider_js__ = __webpack_require__(27);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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


		_this._basePath = null;

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
	}]);

	return Application;
}(__WEBPACK_IMPORTED_MODULE_1_Engine_Container_Container_js__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Application);

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Events_Dispatcher_js__ = __webpack_require__(0);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Foundation_Bootstrap_LoadConfiguration_js__ = __webpack_require__(38);
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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(22);
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
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(22);
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Objects_GameObject_js__ = __webpack_require__(22);
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
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    value: function bootstrap(app) {}
  }]);

  return LoadConfiguration;
}();

// Assign Constructor to Namespace


/* unused harmony default export */ var _unused_webpack_default_export = (LoadConfiguration);
ns.LoadConfiguration = LoadConfiguration;

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Container_Container_js__ = __webpack_require__(26);


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
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_Engine_Support_Loop_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_Engine_Objects_Manager_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_Engine_Graphics_Graphics_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_Engine_Events_Dispatcher_js__ = __webpack_require__(0);
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWU2ZGEzOGFjMjI1ZTBlYjg1MmEiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRXZlbnRzL0Rpc3BhdGNoZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvR3JhcGhpY3MvR3JhcGhpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvT2JqZWN0cy9NYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvT2JqLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvYXBwLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL2luZGV4LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L05hbWVzcGFjZS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvU3VwcG9ydC9Mb29wLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0NvbmZpZy9Db25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvQ29uZmlnL1JlcG9zaXRvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvU3VwcG9ydC9NYXAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvR3JhcGhpY3MvQ2FudmFzQ29udGV4dC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9HcmFwaGljcy9DYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvSW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvS2V5Ym9hcmQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvTW91c2UuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvT2JqZWN0cy9PYmplY3RzLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL09iamVjdHMvR2FtZU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL2Jvb3RzdHJhcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9BcHBsaWNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Db250YWluZXIvQ29udGFpbmVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0V2ZW50cy9FdmVudFNlcnZpY2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvR2FtZS9LZXJuZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvQmFsbEdhbWVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvQnJpY2tHYW1lT2JqZWN0LmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9PYmplY3RzL1BhZGRsZUdhbWVPYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9zYXNzL2FwcC5zY3NzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0ZvdW5kYXRpb24vQm9vdHN0cmFwL0xvYWRDb25maWd1cmF0aW9uLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0ZvdW5kYXRpb24vaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0dhbWUuanMiXSwibmFtZXMiOlsibnMiLCJuYW1lc3BhY2UiLCJEaXNwYXRjaGVyIiwibGlzdGVuZXJzIiwic29ydGVkIiwiZmlyaW5nIiwiZXZlbnRzIiwibGlzdGVuZXIiLCJwcmlvcml0eSIsImkiLCJsZW5ndGgiLCJldmVudCIsInVuZGVmaW5lZCIsInB1c2giLCJtYWtlTGlzdGVuZXIiLCJwYXlsb2FkIiwiZmlyZSIsImhhbHQiLCJkaXNwYXRjaCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibmFtZSIsInJlc3BvbnNlcyIsIk9iamVjdCIsInZhbHVlcyIsImdldExpc3RlbmVycyIsInJlc3BvbnNlIiwiYXBwbHkiLCJldmVudE5hbWUiLCJfc29ydExpc3RlbmVycyIsInByaW9yaXRpZXMiLCJrZXlzIiwic29ydCIsInJldmVyc2UiLCJjb25jYXQiLCJ3aWxkY2FyZCIsImNyZWF0ZUNsYXNzTGlzdGVuZXIiLCJoYW5kbGUiLCJHcmFwaGljcyIsIl9nYW1lIiwibWFrZSIsImdldCIsImNvbmZpZyIsInNlbGVjdG9yIiwiZnBzIiwiX2NyZWF0ZUNhbnZhcyIsImNvbnRleHQiLCJlbGVtZW50IiwiX2dldEVsZW1lbnRGcm9tU2VsZWN0b3IiLCJFcnJvciIsIndpbmRvdyIsIkdhbWUiLCJDYW52YXMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0RWxlbWVudEJ5SWQiLCJzcGxpdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJiZWdpbkRyYXdpbmdMb29wcyIsIl9kcml2ZXJzIiwiaGFzT3duUHJvcGVydHkiLCJjYW52YXMiLCJiZWdpbkRyYXdpbmdMb29wIiwiZHJpdmVyIiwiTWFuYWdlciIsIl9vYmplY3RzQnlJZCIsIl9vYmplY3RzQnlDbGFzcyIsIl9vYmplY3RCeUNsYXNzIiwieCIsInkiLCJpbnN0YW5jZSIsIk9iamVjdHMiLCJpZCIsIm9iamVjdCIsImdldENsYXNzTmFtZSIsImVhY2giLCJkcmF3IiwiZ2V0Q29udGV4dCIsImZpcmVCZWZvcmVTdGVwRXZlbnRzIiwiZmlyZVN0ZXBFdmVudHMiLCJmaXJlQWZ0ZXJTdGVwRXZlbnRzIiwiZmlyZUJlZm9yZVN0ZXBFdmVudCIsImZpcmVTdGVwRXZlbnQiLCJmaXJlQWZ0ZXJTdGVwRXZlbnQiLCJjYWxsYmFjayIsIk9iaiIsInZhbHVlIiwidGVzdCIsInRvU3RyaW5nIiwiaXNDbGFzcyIsInJlcXVpcmUiLCJhYnN0cmFjdCIsImNhbGxlciIsImFyZ3VtZW50cyIsImNhbGxlZSIsIm1ldGhvZE5hbWUiLCJjbGFzc05hbWUiLCJzdXBlck5hbWUiLCJnZXRQcm90b3R5cGVPZiIsInBhdGgiLCJOYW1lc3BhY2UiLCJhdXRvQXNzaWduIiwiX3BhdGgiLCJhc3NpZ25Ub1dpbmRvdyIsIl9uYW1lc3BhY2VzIiwiX3NldCIsImtleSIsInByZWZpeCIsInNlZ21lbnRzIiwic2VnbWVudCIsInNwbGljZSIsImpvaW4iLCJnYW1lIiwiX2N1c3RvbUNyZWF0b3JzIiwidXNlc0RlZmF1bHREcml2ZXIiLCJnZXREZWZhdWx0RHJpdmVyIiwiX2dldCIsInVzZXNDb25maWd1cmFibGVBZGFwdGVycyIsIl9jcmVhdGVBZGFwdGVyIiwiX2NyZWF0ZURyaXZlciIsIl9nZXRDb25maWciLCJnZXRDb25maWdEcml2ZXJLZXlOYW1lIiwiX2NhbGxDdXN0b21DcmVhdG9yIiwidXNlc0NyZWF0aW9uQnlNZXRob2QiLCJtZXRob2QiLCJfZ2V0Q3JlYXRpb25NZXRob2ROYW1lIiwicmVwbGFjZSIsIndvcmRzIiwibWFwIiwid29yZCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJfZ2V0Q29uZmlndXJhdGlvblJvb3QiLCJMb29wIiwib3B0aW9ucyIsImludGVydmFsVGltZW91dCIsImludGVydmFsIiwicnVubmluZyIsImJlZm9yZUxvb3BIYW5kbGVyIiwiYmVmb3JlIiwibG9vcEhhbmRsZXIiLCJsb29wIiwiYWZ0ZXJMb29wSGFuZGxlciIsImFmdGVyIiwiaW50ZXJ2YWxJZCIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImRvTG9vcCIsImJpbmQiLCJiZWZvcmVMb29wSXRlcmF0aW9uIiwiZG9Mb29wSXRlcmF0aW9uIiwiYWZ0ZXJMb29wSXRlcmF0aW9uIiwiUmVwb3NpdG9yeSIsIml0ZW1zIiwiX2l0ZW1zIiwiTWFwIiwiaGFzIiwiZmFsbGJhY2siLCJBcnJheSIsImlzQXJyYXkiLCJfZ2V0TWFueSIsImluZGV4Iiwic2V0IiwiYXJyYXkiLCJhY2Nlc3NpYmxlIiwiZXhpc3RzIiwiaW5kZXhPZiIsInN1YktleU1hcCIsImRvdEtleXMiLCJqIiwiQ2FudmFzQ29udGV4dCIsIl9jb250ZXh0IiwiYmVnaW5QYXRoIiwicmVzdWx0IiwiY2xvc2VQYXRoIiwicmFkaXVzIiwiZmlsbCIsIm91dGxpbmUiLCJsaW5lV2lkdGgiLCJhcmMiLCJNYXRoIiwiUEkiLCJmaWxsU3R5bGUiLCJzdG9rZVN0eWxlIiwic3Ryb2tlIiwid2lkdGgiLCJoZWlnaHQiLCJyZWN0IiwieDEiLCJ5MSIsIngyIiwieTIiLCJjb2xvciIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZVN0eWxlIiwidGV4dCIsImZvbnQiLCJmaWxsVGV4dCIsImNvbnRleHRUeXBlIiwiZHJhd1N0YWNrIiwiZHJhd0xvb3AiLCJTdXBwb3J0IiwiYmVmb3JlRHJhd2luZ0xvb3AiLCJpbnZva2VEcmF3U3RhY2siLCJhZnRlckRyYXdpbmdMb29wIiwiY2xlYXJSZWN0IiwiZ2V0V2lkdGgiLCJnZXRIZWlnaHQiLCJzdGFydCIsImNsZWFyIiwic3RvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImdldFgiLCJnZXRZIiwiZ2V0TW91c2VYIiwiZ2V0TW91c2VZIiwiS2V5Ym9hcmQiLCJwcmV2aW91c0tleWJvYXJkRXZlbnQiLCJrZXlTdGF0ZXMiLCJLRVlTVEFURV9QUkVTU0VEIiwiS0VZU1RBVEVfSE9MRCIsIktFWVNUQVRFX1JFTEVBU0VEIiwia2V5Q29kZVN0YXRlcyIsInJlZ2lzdGVyS2V5Ym9hcmRMaXN0ZW5lcnMiLCJyZWdpc3RlcktleURvd25MaXN0ZW5lciIsInJlZ2lzdGVyS2V5VXBMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJrZXlEb3duSGFuZGxlciIsImtleVVwSGFuZGxlciIsInJlcGVhdCIsImtleUhvbGRIYW5kbGVyIiwia2V5UHJlc3NlZEhhbmRsZXIiLCJfdXBkYXRlS2V5Ym9hcmRTdGF0ZXMiLCJkaXNwYXRjaGVyIiwia2V5UmVsZWFzZWRIYW5kbGVyIiwic3RhdGUiLCJfdXBkYXRlS2V5U3RhdGUiLCJfdXBkYXRlS2V5Q29kZVN0YXRlIiwiY29kZSIsImlzS2V5UHJlc3NlZCIsImlzS2V5SGVsZCIsImlzS2V5Q29kZVByZXNzZWQiLCJpc0tleUNvZGVIZWxkIiwiS0VZX0FMVCIsIktFWV9CQUNLU1BBQ0UiLCJLRVlfQ09OVFJPTCIsIktFWV9ERUxFVEUiLCJLRVlfRE9XTiIsIktFWV9FTkQiLCJLRVlfRVNDQVBFIiwiS0VZX0hPTUUiLCJLRVlfSU5TRVJUIiwiS0VZX0xFRlQiLCJLRVlfTUVUQSIsIktFWV9OVU1MT0NLIiwiS0VZX1BBR0VfRE9XTiIsIktFWV9QQUdFX1VQIiwiS0VZX1JFVFVSTiIsIktFWV9SSUdIVCIsIktFWV9TQ1JPTEwiLCJLRVlfU0hJRlQiLCJLRVlfU1BBQ0UiLCJLRVlfVEFCIiwiS0VZX1VQIiwiS0VZX0VOVEVSIiwiS0VZX05FWFQiLCJLRVlfUFJJT1IiLCJLRVlfU0NST0xMX0xPQ0siLCJNb3VzZSIsInByZXZpb3VzTW91c2VNb3ZlRXZlbnQiLCJfcG9zaXRpb24iLCJyZWdpc3Rlck1vdXNlTGlzdGVuZXJzIiwicmVnaXN0ZXJNb3VzZU1vdmVMaXN0ZW5lciIsIm1vdXNlTW92ZUhhbmRsZXIiLCJwb3NpdGlvbiIsIl9nZXRNb3VzZVBvc2l0aW9uRnJvbUV2ZW50IiwiY2xpZW50WCIsImNsaWVudFkiLCJHYW1lT2JqZWN0IiwibWF4SW5zdGFuY2VJZCIsInZpc2libGUiLCJfYm9vdElmTm90Qm9vdGVkIiwiZmlyZU9iamVjdEV2ZW50IiwiX2Jvb3RlZCIsIl9ib290IiwicGFyYW1ldGVycyIsImRyYXdMaW5lIiwiX3BlcmZvcm1EZWxldGVPbk9iamVjdCIsImdldE1hbmFnZXIiLCJkZWxldGVJbnN0YW5jZSIsIm1hbmFnZXIiLCJsaXN0ZW4iLCJyZWdpc3Rlck9iamVjdEV2ZW50IiwiYXBwIiwiZGVmYXVsdCIsImtlcm5lbCIsImJvb3RzdHJhcCIsInNpbmdsZXRvbiIsIkFwcGxpY2F0aW9uIiwiYmFzZVBhdGgiLCJfYmFzZVBhdGgiLCJfaGFzQmVlbkJvb3RzdHJhcHBlZCIsIl9ib290aW5nQ2FsbGJhY2tzIiwiX2Jvb3RlZENhbGxiYWNrcyIsIl90ZXJtaW5hdGluZ0NhbGxiYWNrcyIsIl9zZXJ2aWNlUHJvdmlkZXJzIiwiX2xvYWRlZFByb3ZpZGVycyIsIl9kZWZlcnJlZFNlcnZpY2VzIiwiX21vbm9sb2dDb25maWd1cmF0b3IiLCJfZGF0YWJhc2VQYXRoIiwiX3N0b3JhZ2VQYXRoIiwiX2Vudmlyb25tZW50UGF0aCIsIl9lbnZpcm9ubWVudEZpbGUiLCJfbmFtZXNwYWNlIiwic2V0QmFzZVBhdGgiLCJfcmVnaXN0ZXJCYXNlQmluZGluZ3MiLCJfcmVnaXN0ZXJCYXNlU2VydmljZVByb3ZpZGVycyIsInNldEluc3RhbmNlIiwicmVnaXN0ZXIiLCJib290c3RyYXBwZXJzIiwiYm9vdHN0cmFwcGVyIiwicHJvdmlkZXIiLCJmb3JjZSIsInJlZ2lzdGVyZWQiLCJnZXRQcm92aWRlciIsInJlc29sdmVQcm92aWRlciIsIl9tYXJrQXNSZWdpc3RlcmVkIiwiX2Jvb3RQcm92aWRlciIsInByb3ZpZGVycyIsImdldFByb3ZpZGVycyIsImRlZmluaXRpb24iLCJnZXRDbGFzcyIsImZpbHRlciIsInNlcnZpY2UiLCJsb2FkRGVmZXJyZWRQcm92aWRlciIsIkNvbnRhaW5lciIsIl9yZXNvbHZlZCIsIl9iaW5kaW5ncyIsIl9tZXRob2RCaW5kaW5ncyIsIl9pbnN0YW5jZXMiLCJfYWxpYXNlcyIsIl9hYnN0cmFjdEFsaWFzZXMiLCJfZXh0ZW5kZXJzIiwiX3RhZ3MiLCJfYnVpbGRTdGFjayIsIl93aXRoIiwiY29udGV4dHVhbCIsIl9yZWJvdW5kQ2FsbGJhY2tzIiwiX2dsb2JhbFJlc29sdmluZ0NhbGxiYWNrcyIsIl9nbG9iYWxBZnRlclJlc29sdmluZ0NhbGxiYWNrcyIsIl9yZXNvbHZpbmdDYWxsYmFja3MiLCJfYWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MiLCJjb25jcmV0ZSIsImlzQWxpYXMiLCJib3VuZCIsImdldEFsaWFzIiwic2hhcmVkIiwiX2Ryb3BTdGFsZUluc3RhbmNlcyIsIl9nZXRDbG9zdXJlIiwicmVzb2x2ZWQiLCJfcmVib3VuZCIsImNvbnRhaW5lciIsImJ1aWxkIiwiaW1wbGVtZW50YXRpb24iLCJfcmVtb3ZlQWJzdHJhY3RBbGlhcyIsImlzQm91bmQiLCJfcmVib3VkIiwic2VhcmNoIiwiYWxpYXNlcyIsImFsaWFzIiwiYWJzdHJhY3RzIiwidGFncyIsInRhZyIsInJlc3VsdHMiLCJ0YXJnZXQiLCJyZWJpbmRpbmciLCJfZ2V0UmVib3VuZENhbGxiYWNrcyIsImNhbGwiLCJkZWZhdWx0TWV0aG9kIiwiRnJhbWV3b3JrIiwiQm91bmRNZXRob2QiLCJyZXNvbHZlIiwibmVlZHNDb250ZXh0dWFsQnVpbGQiLCJfZ2V0Q29udGV4dHVhbENvbmNyZXRlIiwiX2dldENvbmNyZXRlIiwiX2lzQnVpbGRhYmxlIiwiX2dldEV4dGVuZGVycyIsImV4dGVuZGVyIiwiaXNTaGFyZWQiLCJfZmlyZVJlc29sdmluZ0NhbGxiYWNrcyIsInBvcCIsImJpbmRpbmciLCJfZmluZEluQ29udGV4dHVhbEJpbmRpbmdzIiwiX2dldExhc3RQYXJhbWV0ZXJPdmVycmlkZSIsIl9yZXNvbHZlQ2xhc3NOYW1lc3BhY2UiLCJfbm90SW5zdGFudGlhYmxlIiwiY291bnQiLCJwcmV2aW91cyIsIm1lc3NhZ2UiLCJfZmlyZUNhbGxiYWNrQXJyYXkiLCJfZ2V0Q2FsbGJhY2tzRm9yVHlwZSIsIl9maXJlQWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MiLCJjYWxsYmFja3NQZXJUeXBlIiwidHlwZSIsImNhbGxiYWNrcyIsImZvcmdldEluc3RhbmNlcyIsIl9pbnN0YW5jZSIsIkV2ZW50U2VydmljZVByb3ZpZGVyIiwiX2FwcCIsIlNlcnZpY2VQcm92aWRlciIsIl9kZWZlciIsIktlcm5lbCIsIl9ib290c3RyYXBwZXJzIiwiaGFzQmVlbkJvb3RzdHJhcHBlZCIsImJvb3RzdHJhcFdpdGgiLCJnZXRCb290c3RyYXBwZXJzIiwiQmFsbEdhbWVPYmplY3QiLCJicmljayIsImR5IiwiZGFtYWdlIiwiZHgiLCJkaXJlY3Rpb24iLCJzcGVlZCIsImFjY3VyYWN5Iiwic3ByZWFkIiwicmFuZG9tIiwiY29zIiwic2luIiwiY29uc29sZSIsImxvZyIsInRyYWNraW5nT2JqZWN0IiwidHJhY2tpbmdPZmZzZXQiLCJvZmZzZXQiLCJvbkNyZWF0ZSIsImJhbGwiLCJvbkRyYXciLCJkcmF3Q2lyY2xlIiwib25TdGVwIiwiZ3JhcGhpY3MiLCJnZXRDYW52YXMiLCJwYWRkbGUiLCJvYmplY3RzIiwiZ2V0T2JqZWN0QnlDbGFzcyIsImJvdW5jZSIsImFsZXJ0IiwiQnJpY2tHYW1lT2JqZWN0IiwiYW1vdW50IiwiaGVhbHRoIiwiZGllIiwiZGVzdHJveSIsImluY1ZhcmlhYmxlIiwiaGVhbHRoTWF4IiwiQXBwIiwiaXNCYWxsQ29sbGlkaW5nIiwiaGl0QnJpY2siLCJkcmF3UmVjdGFuZ2xlIiwiUGFkZGxlR2FtZU9iamVjdCIsImtleWJvYXJkIiwiaXNLZXlEb3duIiwiY29udHJvbE1hcCIsIm1vdmVSaWdodCIsImNhbk1vdmVSaWdodCIsIm1vdmVMZWZ0IiwiY2FuTW92ZUxlZnQiLCJtb3ZlbWVudFNwZWVkIiwibGF1bmNoIiwiY2FuTGF1bmNoVHJhY2tpbmdPYmplY3QiLCJsYXVuY2hUcmFja2luZ09iamVjdCIsImhhc1RyYWNraW5nT2JqZWN0IiwiY3JlYXRlSW5zdGFuY2UiLCJzZXRUcmFja2luZ09iamVjdCIsImFjY2VsZXJhdGlvbiIsIkNhbGMiLCJwb2ludERpcmVjdGlvbiIsIm1pbiIsIm1heCIsInNxcnQiLCJwb3ciLCJhcHBseU1vdmVtZW50QWN0aW9ucyIsImFwcGx5TGF1bmNoQWN0aW9uIiwiTG9hZENvbmZpZ3VyYXRpb24iLCJnZXRJbnN0YW5jZSIsIl92YXJpYWJsZXMiLCJzdGVwTG9vcCIsImRvU3RlcExvb3AiLCJzdGVwR2FtZU9iamVjdHMiLCJkcmF3R2FtZU9iamVjdHMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REEsSUFBSUEsS0FBS0MsVUFBVSxhQUFWLENBQVQ7O0lBRXFCQyxVOztBQUVqQjs7O0FBR0EsOEJBQWM7QUFBQTs7QUFFWDs7Ozs7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O0FBRUQ7Ozs7Ozs7OzhCQVFZQSxHLEVBQUtwQixLLEVBQU87QUFDdkIsUUFBSzhZLFVBQUwsQ0FBZ0IxWCxHQUFoQixJQUF1QnBCLEtBQXZCO0FBQ0E7Ozs7O0FBRUQ7Ozs7Ozs7OzhCQVFZb0IsRyxFQUFLc1YsTSxFQUFRO0FBQ3hCLFFBQUtvQyxVQUFMLENBQWdCMVgsR0FBaEIsS0FBd0JzVixNQUF4QjtBQUNBOzs7OztBQUVEOzs7Ozs7Ozs4QkFRWXRWLEcsRUFBS3NWLE0sRUFBUTtBQUN4QixRQUFLb0MsVUFBTCxDQUFnQjFYLEdBQWhCLEtBQXdCc1YsTUFBeEI7QUFDQTs7Ozs7QUFFRDs7Ozs7Ozs4QkFPWXRWLEcsRUFBSztBQUNoQixVQUFPLE9BQU8sS0FBSzBYLFVBQUwsQ0FBZ0IxWCxHQUFoQixDQUFQLEtBQWdDLFdBQXZDO0FBQ0E7Ozs7O0FBRUQ7Ozs7O2lDQUtlO0FBQ2QsVUFBTyxLQUFLMFgsVUFBWjtBQUNBOzs7Ozs7QUFJRjs7OzBFQTVKcUJsYixJO0FBNkpyQm5ELEdBQUdtRCxJQUFILEdBQVVBLElBQVYsQyIsImZpbGUiOiJcXGpzXFxhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxZTZkYTM4YWMyMjVlMGViODUyYSIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5FdmVudHMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBFdmVudCBEaXNwYXRjaGVyIGluc3RhbmNlLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAvKipcclxuICAgICAgICAqIFRoZSByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICAgICAqXHJcbiAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgc29ydGVkIGV2ZW50IGxpc3RlbmVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc29ydGVkID0gW107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBldmVudCBmaXJpbmcgc3RhY2suXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHthcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmZpcmluZyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVyIGFuIGV2ZW50IGxpc3RlbmVyIHdpdGggdGhlIGRpc3BhdGNoZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSAgZXZlbnRzXHJcbiAgICAgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICBsaXN0ZW5lclxyXG4gICAgICogQHBhcmFtICB7aW50fSAgICAgICAgICAgcHJpb3JpdHlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBsaXN0ZW4oZXZlbnRzLCBsaXN0ZW5lciwgcHJpb3JpdHkpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgUHJpb3JpdHlcclxuICAgICAgICB2YXIgcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xyXG5cclxuICAgICAgICAvLyBDYXN0IEV2ZW50cyB0byBhbiBBcnJheVxyXG4gICAgICAgIGlmKHR5cGVvZiBldmVudHMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGV2ZW50cyA9IFtldmVudHNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBFdmVudHMgQXJyYXlcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIEV2ZW50XHJcbiAgICAgICAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBFdmVudCAvIExpc3RlbmVyIE9iamVjdFxyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbZXZlbnRdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluc3RhbnRpYXRlIHRoZSBQcmlvcml0eSBBcnJheVxyXG4gICAgICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudF1bcHJpb3JpdHldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50XVtwcmlvcml0eV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIExpc3RlbmVyIHRvIHRoZSBFdmVudFxyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tldmVudF1bcHJpb3JpdHldLnB1c2goXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1ha2VMaXN0ZW5lcihsaXN0ZW5lcilcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFVubWFyayB0aGUgRXZlbnQgLyBMaXN0ZW5lciBwYWlyaW5nIGFzIFNvcnRlZFxyXG4gICAgICAgICAgICB0aGlzLnNvcnRlZFtldmVudF0gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIHNwZWNpZmllZCBFdmVudCB1bnRpbCB0aGUgZmlyc3Qgbm9uLW51bGwgcmVzcG9uc2UgaXMgcmV0dXJuZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG9iamVjdH0gIGV2ZW50XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICAgICAgICAgcGF5bG9hZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fG51bGx9XHJcbiAgICAgKi9cclxuICAgIHVudGlsKGV2ZW50LCBwYXlsb2FkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlyZShldmVudCwgcGF5bG9hZCwgdHJ1ZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCB0aGUgZGlzcGF0Y2hlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd8b2JqZWN0fSAgZXZlbnRcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgICAgICAgICBwYXlsb2FkXHJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgICAgICAgaGFsdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fG51bGx9XHJcbiAgICAgKi9cclxuICAgIGZpcmUoZXZlbnQsIHBheWxvYWQsIGhhbHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kaXNwYXRjaChldmVudCwgcGF5bG9hZCwgaGFsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9ICBldmVudFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgICAgICAgIHBheWxvYWRcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICBoYWx0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7YXJyYXl8bnVsbH1cclxuICAgICAqL1xyXG4gICAgZGlzcGF0Y2goZXZlbnQsIHBheWxvYWQgPSBbXSwgaGFsdCA9IGZhbHNlKSB7XHJcblxyXG4gICAgICAgIC8vIFdoZW4gdGhlIGdpdmVuIFwiZXZlbnRcIiBpcyBhY3R1YWxseSBhbiBvYmplY3Qgd2Ugd2lsbCBhc3N1bWUgaXQgaXMgYW4gZXZlbnRcclxuICAgICAgICAvLyBvYmplY3QgYW5kIHVzZSB0aGUgY2xhc3MgYXMgdGhlIGV2ZW50IG5hbWUgYW5kIHRoaXMgZXZlbnQgaXRzZWxmIGFzIHRoZVxyXG4gICAgICAgIC8vIHBheWxvYWQgdG8gdGhlIGhhbmRsZXIsIHdoaWNoIG1ha2VzIG9iamVjdCBiYXNlZCBldmVudHMgcXVpdGUgc2ltcGxlLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYW4gRXZlbnQgT2JqZWN0XHJcbiAgICAgICAgaWYodHlwZW9mIGV2ZW50ID09PSAnb2JqZWN0Jykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBQYXlsb2FkXHJcbiAgICAgICAgICAgIHBheWxvYWQgPSBbZXZlbnRdO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBFdmVudFxyXG4gICAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZXNwb25zZXNcclxuICAgICAgICB2YXIgcmVzcG9uc2VzID0gW107XHJcblxyXG4gICAgICAgIC8vIElmIGFuIGFycmF5IGlzIG5vdCBnaXZlbiB0byB1cyBhcyB0aGUgcGF5bG9hZCwgd2Ugd2lsbCB0dXJuIGl0IGludG8gb25lIHNvXHJcbiAgICAgICAgLy8gd2UgY2FuIGVhc2lseSB1c2UgZnVuY3Rpb24uYXBwbHkodGhpcykgb24gdGhlIGxpc3RlbmVycywgcGFzc2luZyBpbiB0aGVcclxuICAgICAgICAvLyBwYXlsb2FkIHRvIGVhY2ggb2YgdGhlbSBzbyB0aGF0IHRoZXkgcmVjZWl2ZSBlYWNoIG9mIHRoZXNlIGFyZ3VtZW50cy5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGEgTm9uLUFycmF5IFBheWxvYWRcclxuICAgICAgICBpZih0eXBlb2YgcGF5bG9hZCAhPT0gJ2FycmF5Jykge1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGFuIE9iamVjdCBQYXlsb2FkXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwYXlsb2FkID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IE9iamVjdC52YWx1ZXMocGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFRyZWF0IHRoZSBQYXlsb2FkIGFzIGEgU2NhbGFyXHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGF5bG9hZCA9IFtwYXlsb2FkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgTGlzdGVuZXJzIHRvIHRoZSBFdmVudFxyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldmVudCk7XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIExpc3RlbmVyXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IExpc3RlbmVyXHJcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgTGlzdGVuZXIgcmVzcG9uc2VcclxuICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gbGlzdGVuZXIuYXBwbHkobnVsbCwgW2V2ZW50LCBwYXlsb2FkXSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBhIHJlc3BvbnNlIGlzIHJldHVybmVkIGZyb20gdGhlIGxpc3RlbmVyIGFuZCBldmVudCBoYWx0aW5nIGlzIGVuYWJsZWRcclxuICAgICAgICAgICAgLy8gd2Ugd2lsbCBqdXN0IHJldHVybiB0aGlzIHJlc3BvbnNlLCBhbmQgbm90IGNhbGwgdGhlIHJlc3Qgb2YgdGhlIGV2ZW50XHJcbiAgICAgICAgICAgIC8vIGxpc3RlbmVycy4gT3RoZXJ3aXNlIHdlIHdpbGwgYWRkIHRoZSByZXNwb25zZSBvbiB0aGUgcmVzcG9uc2UgbGlzdC5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBhIHJlc3BvbnNlIHdpdGggaGFsdGluZyBlbmFibGVkXHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiByZXNwb25zZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFsdCkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgUmVzcG9uc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIElmIGEgYm9vbGVhbiBmYWxzZSBpcyByZXR1cm5lZCBmcm9tIGEgbGlzdGVuZXIsIHdlIHdpbGwgc3RvcCBwcm9wYWdhdGluZ1xyXG4gICAgICAgICAgICAvLyB0aGUgZXZlbnQgdG8gYW55IGZ1cnRoZXIgbGlzdGVuZXJzIGRvd24gaW4gdGhlIGNoYWluLCBlbHNlIHdlIGtlZXAgb25cclxuICAgICAgICAgICAgLy8gbG9vcGluZyB0aHJvdWdoIHRoZSBsaXN0ZW5lcnMgYW5kIGZpcmluZyBldmVyeSBvbmUgaW4gb3VyIHNlcXVlbmNlLlxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGEgZmFsc2UgcmVzcG9uc2VcclxuICAgICAgICAgICAgaWYocmVzcG9uc2UgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBSZXNwb25zZSB0byB0aGUgbGlzdCBvZiBSZXNwb25zZXNcclxuICAgICAgICAgICAgcmVzcG9uc2VzLnB1c2gocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBOVUxMIGluIEhhbHRpbmcgbW9kZSwgZWxzZSB0aGUgUmVzcG9uc2VzXHJcbiAgICAgICAgcmV0dXJuIGhhbHQgPyBudWxsIDogcmVzcG9uc2VzO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGV2ZW50TmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBnZXRMaXN0ZW5lcnMoZXZlbnROYW1lKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBMaXN0ZW5lcnMgZm9yIHRoZSBFdmVudCByZXF1aXJlIHNvcnRpbmdcclxuICAgICAgICBpZih0aGlzLnNvcnRlZFtldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3J0ZWRbZXZlbnROYW1lXSA9IHRoaXMuX3NvcnRMaXN0ZW5lcnMoZXZlbnROYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgc29ydGVkIEV2ZW50IExpc3RlbmVyc1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNvcnRlZFtldmVudE5hbWVdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBkaXNwYXRjaGVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGV2ZW50TmFtZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBfc29ydExpc3RlbmVycyhldmVudE5hbWUpIHtcclxuXHJcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgbGlzdCBvZiBMaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLnNvcnRlZFtldmVudE5hbWVdID0gW107XHJcblxyXG4gICAgICAgIC8vIEZpcnN0LCBtYWtlIHN1cmUgbGlzdGVuZXJzIGZvciB0aGUgRXZlbnQgYWN0dWFsbHkgZXhpc3RcclxuICAgICAgICBpZih0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIGxpc3RlbmVycyBhcmUgZ3JvdXBlZCBieSBwcmlvcml0eSwgd2hpY2ggd2UnbGwgd2FudCBpblxyXG4gICAgICAgIC8vIGRlc2NlbmRpbmcgb3JkZXIgKHNvIHRoYXQgaGlnaGVzdCBwcmlvcml0eSBnb2VzIGZpcnN0KS5cclxuICAgICAgICAvLyBXZSBzaG91bGQgYWxzbyB0cnkgdG8gcmV0YWluIHRoZSBpbnRlcm5hbCBvcmRlcmluZy5cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBQcmlvcml0aWVzXHJcbiAgICAgICAgdmFyIHByaW9yaXRpZXMgPSBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdKTtcclxuXHJcbiAgICAgICAgLy8gU29ydCB0aGUgUHJpb3JpdGllc1xyXG4gICAgICAgIHByaW9yaXRpZXMuc29ydCgpO1xyXG5cclxuICAgICAgICAvLyBSZXZlcnNlIHRoZSBQcmlvcnRpZXMgdG8gZ2V0IHRoZW0gaW50byBEZXNjZW5kaW5nIE9yZGVyXHJcbiAgICAgICAgcHJpb3JpdGllcy5yZXZlcnNlKCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIExpc3RlbmVyc1xyXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBQcmlvcml0aWVzXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHByaW9yaXRpZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgY3VycmVudCBQcmlvcml0eVxyXG4gICAgICAgICAgICB2YXIgcHJpb3JpdHkgPSBwcmlvcml0aWVzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBMaXN0ZW5lcnMgb2YgdGhlIGN1cnJlbnQgUHJpb3JpdHkgdG8gdGhlIGxpc3Qgb2YgTGlzdGVuZXJzXHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5jb25jYXQodGhpcy5saXN0ZW5lcnNbZXZlbnROYW1lXVtwcmlvcml0eV0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgTGlzdGVuZXJzXHJcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVycztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgSGFuZGxlciBmb3IgdGhlIHNwZWNpZmllZCBMaXN0ZW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICAgbGlzdGVuZXJcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICB3aWxkY2FyZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBtYWtlTGlzdGVuZXIobGlzdGVuZXIsIHdpbGRjYXJkID0gZmFsc2UpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIFN0cmluZ1xyXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQ2xhc3NMaXN0ZW5lcihsaXN0ZW5lciwgd2lsZGNhcmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXNlIHRoZSBMaXN0ZW5lciBhcyBhIEZ1bmN0aW9uXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50LCBwYXlsb2FkKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgTGlzdGVuZXIgd2FzIGEgV2lsZGNhcmRcclxuICAgICAgICAgICAgaWYod2lsZGNhcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lcihldmVudCwgcGF5bG9hZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEludm9rZSB0aGUgTGlzdGVuZXIgdXNpbmcgdGhlIFBhcmFtZXRlcnNcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyKC4uLnBheWxvYWQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgSGFuZGxlciBvZiB0aGUgTGlzdGVuZXJcclxuICAgICAgICByZXR1cm4gbGlzdGVuZXIuaGFuZGxlO1xyXG5cclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5EaXNwYXRjaGVyID0gRGlzcGF0Y2hlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9FdmVudHMvRGlzcGF0Y2hlci5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5HcmFwaGljcycpO1xyXG5cclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnLi4vU3VwcG9ydC9NYW5hZ2VyLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyYXBoaWNzIGV4dGVuZHMgTWFuYWdlciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIERlZmF1bHQgRHJpdmVyIE5hbWUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0RGVmYXVsdERyaXZlcigpIHtcclxuXHRcdHJldHVybiB0aGlzLl9nYW1lLm1ha2UoJ2NvbmZpZycpLmdldCgnZ3JhcGhpY3MuZGVmYXVsdCcpO1xyXG5cdH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDb25maWd1cmF0aW9uIFJvb3QgZm9yIHRoaXMgTWFuYWdlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlndXJhdGlvblJvb3QobmFtZSkge1xyXG4gICAgXHRyZXR1cm4gJ2dyYXBoaWNzLmNhbnZhc2VzJztcclxuICAgIH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBNYW5hZ2VyIHN1cHBvcnRzIGFkYXB0ZXIgY3JlYXRpb25cclxuXHQgKiBmcm9tIGNvbmZpZ3VyYXRpb24gc2V0dGluZ3MsIHdoZXJlIGFuIHVuZGVybHlpbmcgZHJpdmVyIGlzXHJcblx0ICogdHlwaWNhbGx5IHNwZWNpZmllZC4gVGhlIGRyaXZlciBpcyBjcmVhdGVkIHNlcGFyYXRlbHkuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHVzZXNDb25maWd1cmFibGVBZGFwdGVycygpIHtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIG5hbWUgb2YgdGhlIGtleSB0aGF0IGhvbGRzIHRoZSBuYW1lIG9mIHRoZSBkcml2ZXJcclxuXHQgKiBmb3IgYW55IGNvbmZpZ3VyZWQgYWRhcHRlciBmb3IgdGhpcyBtYW5hZ2VyLiBNb3N0IGNhbGwgaXRcclxuXHQgKiAnZHJpdmVyJywgYnV0IG90aGVyIGltcGxlbWVudGF0aW9ucyBtYXkgYmUgZGlmZmVyZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldENvbmZpZ0RyaXZlcktleU5hbWUoKSB7XHJcblxyXG5cdFx0Ly8gQ2FudmFzZXMgYXJlIG1hZGUgZGlzdGluY3QgYnkgdGhlaXIgY29udGV4dC4gRXZlcnl0aGluZ1xyXG5cdFx0Ly8gZWxzZSBpcyBwcmV0dHkgbXVjaCB0aGUgc2FtZS4gVGhlcmVmb3JlLCB3ZSdyZSBnb2luZ1xyXG5cdFx0Ly8gdG8gdXNlIHRoZSBjb250ZXh0IGFzIHRoZSBkcml2ZXIgZm9yIHRoZSBhZGFwdGVyLlxyXG5cclxuXHRcdC8vIFVzZSAnY29udGV4dCcgYXMgdGhlIERyaXZlciBrZXkgbmFtZVxyXG5cdFx0cmV0dXJuICdjb250ZXh0JztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyAyRCBEcml2ZXIgdXNpbmcgdGhlIHNwZWNpZmllZCBDb25maWd1cmF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgY29uZmlnXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLkdyYXBoaWNzLkNhbnZhc31cclxuXHQgKi9cclxuXHRjcmVhdGUyZERyaXZlcihjb25maWcpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIENhbnZhcyBQYXJhbWV0ZXJzXHJcblx0XHR2YXIgc2VsZWN0b3IgPSBjb25maWdbJ2VsZW1lbnQnXTtcclxuXHRcdHZhciBmcHMgPSBjb25maWdbJ2ZwcyddIHx8IDYwO1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IENhbnZhc1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUNhbnZhcyhzZWxlY3RvciwgJzJkJywgZnBzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgc2VsZWN0b3JcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgY29udGV4dFxyXG5cdCAqIEBwYXJhbSAge251bWVyaWN9ICBmcHNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuR3JhcGhpY3MuQ2FudmFzfVxyXG5cdCAqXHJcblx0ICogQHRocm93cyB7RXJyb3J9XHJcblx0ICovXHJcblx0X2NyZWF0ZUNhbnZhcyhzZWxlY3RvciwgY29udGV4dCwgZnBzKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBFbGVtZW50IGZyb20gdGhlIFNlbGVjdG9yXHJcblx0XHR2YXIgZWxlbWVudCA9IHRoaXMuX2dldEVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSBhbiBFbGVtZW50IHdhcyBmb3VuZFxyXG5cdFx0aWYoZWxlbWVudCA9PT0gbnVsbCB8fCBlbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBDYW52YXMgWyR7c2VsZWN0b3J9XSBjb3VsZCBub3QgYmUgZm91bmQuYCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIGEgcmV0dXJuIGEgbmV3IENhbnZhc1xyXG5cdFx0cmV0dXJuIG5ldyB3aW5kb3cuR2FtZS5HcmFwaGljcy5DYW52YXMoZWxlbWVudCwgJzJkJywgZnBzKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgZWxlbWVudCBkZXNjcmliZWQgYnkgdGhlIHNwZWNpZmllZCBzZWxlY3Rvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIHNlbGVjdG9yXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudHxudWxsfVxyXG5cdCAqL1xyXG5cdF9nZXRFbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XHJcblxyXG5cdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXHJcblx0XHRcdHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdXHJcblx0XHRcdHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnNwbGl0KCcjJylbMF0gPT09ICcnICYmIHNlbGVjdG9yLnNwbGl0KCcjJylbMV0pXHJcblx0XHRcdHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc3BsaXQoJy4nKVswXSA9PT0gJycgJiYgc2VsZWN0b3Iuc3BsaXQoJy4nKVsxXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgR3JhcGhpY3MuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdHN0YXJ0KCkge1xyXG5cclxuXHRcdC8vIEJlZ2luIHRoZSBEcmF3aW5nIExvb3BzXHJcblx0XHR0aGlzLmJlZ2luRHJhd2luZ0xvb3BzKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCZWdpbnMgdGhlIERyYXdpbmcgTG9vcHMgZm9yIGVhY2ggQ2FudmFzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRiZWdpbkRyYXdpbmdMb29wcygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBDYW52YXNcclxuXHRcdGZvcihsZXQgaSBpbiB0aGlzLl9kcml2ZXJzKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhhdCB0aGUgaXRlcmF0b3IgaXMgYSBwcm9wZXJ0eVxyXG5cdFx0XHRpZighdGhpcy5fZHJpdmVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgQ2FudmFzXHJcblx0XHRcdHZhciBjYW52YXMgPSB0aGlzLl9kcml2ZXJzW2ldO1xyXG5cclxuXHRcdFx0Ly8gQmVnaW4gdGhlIERyYXdpbmcgTG9vcFxyXG5cdFx0XHRjYW52YXMuYmVnaW5EcmF3aW5nTG9vcCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBBbGxvdyBDaGFpbmluZ1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFsaWFzIG9mIHtAc2VlIHRoaXMuZHJpdmVyKCl9LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfG51bGx9ICBjYW52YXNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0dhbWUuR3JhcGhpY3MuQ2FudmFzfVxyXG5cdCAqL1xyXG5cdGdldENhbnZhcyhjYW52YXMgPSBudWxsKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5kcml2ZXIoY2FudmFzKTtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5HcmFwaGljcyA9IEdyYXBoaWNzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0dyYXBoaWNzL0dyYXBoaWNzLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLk9iamVjdHMnKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hbmFnZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hbmFnZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdGF0aWN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgR2FtZSBPYmplY3RzIGtleWVkIGJ5IHRoZWlyIElELlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fb2JqZWN0c0J5SWQgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lIE9iamVjdHMga2V5ZWQgYnkgdGhlaXIgQ2xhc3MsIHRoZW4gdGhlaXIgSUQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7b2JqZWN0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9vYmplY3RzQnlDbGFzcyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEdhbWUgT2JqZWN0IHdpdGggdGhlIGxvd2VzdCBJRCBwZXIgQ2xhc3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7b2JqZWN0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9vYmplY3RCeUNsYXNzID0ge307XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgT2JqZWN0IEluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgIHhcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICB5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdH1cclxuXHQgKi9cclxuXHRjcmVhdGVJbnN0YW5jZShuYW1lLCB4LCB5KSB7XHJcblxyXG5cdFx0Ly8gQ3JlYXRlIHRoZSBJbnN0YW5jZVxyXG5cdFx0dmFyIGluc3RhbmNlID0gbmV3IEdhbWUuT2JqZWN0c1tuYW1lXSgpO1xyXG5cclxuXHRcdC8vIEFzc2lnbiB0aGUgQ29vcmRpbmF0ZXNcclxuXHRcdGluc3RhbmNlLnggPSB4O1xyXG5cdFx0aW5zdGFuY2UueSA9IHk7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIG5vIE9iamVjdCBieSBDbGFzc1xyXG5cdFx0aWYodHlwZW9mIHRoaXMuX29iamVjdEJ5Q2xhc3NbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdFx0XHQvLyBUaGlzIGluZGljYXRlcyB0aGF0IHRoaXMgdHlwZSBvZiBvYmplY3QgaGFzIG5ldmVyIGJlZW5cclxuXHRcdFx0Ly8gY3JlYXRlZCBiZWZvcmUsIG9yIGFsbCBwcmV2aW91cyBvYmplY3RzIHdlcmUgcmVtb3ZlZFxyXG5cdFx0XHQvLyBmcm9tIHRoZSBzY2VuZS4gV2UgY2FuIHV0aWxpemUgdGhpcyBhc3N1bXB0aW9uLlxyXG5cclxuXHRcdFx0Ly8gQXNzaWduIHRoZSBPYmplY3QgYnkgQ2xhc3NcclxuXHRcdFx0dGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSA9IGluc3RhbmNlO1xyXG5cclxuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgT2JqZWN0cyBieSBDbGFzc1xyXG5cdFx0XHR0aGlzLl9vYmplY3RzQnlDbGFzc1tuYW1lXSA9IHt9O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZW1lbWJlciB0aGUgSW5zdGFuY2VcclxuXHRcdHRoaXMuX29iamVjdHNCeUlkW2luc3RhbmNlLmlkXSA9IGluc3RhbmNlO1xyXG5cdFx0dGhpcy5fb2JqZWN0c0J5Q2xhc3NbbmFtZV1baW5zdGFuY2UuaWRdID0gaW5zdGFuY2U7XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSBJbnN0YW5jZVxyXG5cdFx0cmV0dXJuIGluc3RhbmNlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEZWxldGVzIHRoZSBzcGVjaWZpZWQgR2FtZSBPYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdH0gIG9iamVjdFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkZWxldGVJbnN0YW5jZShvYmplY3QpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIE9iamVjdCdzIENsYXNzIE5hbWVcclxuXHRcdHZhciBuYW1lID0gb2JqZWN0LmdldENsYXNzTmFtZSgpO1xyXG5cclxuXHRcdC8vIERlcmVmZXJlbmNlIHRoZSBPYmplY3RcclxuXHRcdGRlbGV0ZSB0aGlzLl9vYmplY3RzQnlJZFtvYmplY3QuaWRdO1xyXG5cdFx0ZGVsZXRlIHRoaXMuX29iamVjdHNCeUNsYXNzW25hbWVdW29iamVjdC5pZF07XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIGFuIE9iamVjdCBieSBDbGFzcyBOYW1lXHJcblx0XHRpZih0eXBlb2YgdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGlmIHRoZSB0aGUgT2JqZWN0IHdhcyB0aGUgT2JqZWN0IGZvciB0aGUgQ2xhc3NcclxuXHRcdFx0aWYodGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXS5pZCA9PSBvYmplY3QuaWQpIHtcclxuXHJcblx0XHRcdFx0Ly8gRGVmZXJlbmNlIHRoZSBPYmplY3RcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBHYW1lIE9iamVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gIGNhbnZhc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkcmF3R2FtZU9iamVjdHMoY2FudmFzKSB7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBHYW1lIE9iamVjdHNcclxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbihvYmplY3QpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIE9iamVjdFxyXG5cdFx0XHRvYmplY3QuZHJhdyhjYW52YXMsIGNhbnZhcy5nZXRDb250ZXh0KCkpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RlcHMgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RlcEdhbWVPYmplY3RzKCkge1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIFN0ZXAgRXZlbnRzIGluIEJlZm9yZSAvIFN0ZXAgLyBBZnRlciBvcmRlclxyXG5cdFx0dGhpcy5maXJlQmVmb3JlU3RlcEV2ZW50cygpXHJcblx0XHRcdC5maXJlU3RlcEV2ZW50cygpXHJcblx0XHRcdC5maXJlQWZ0ZXJTdGVwRXZlbnRzKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyB0aGUgJ0JlZm9yZSBTdGVwJyBFdmVudCBmb3IgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZmlyZUJlZm9yZVN0ZXBFdmVudHMoKSB7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBHYW1lIE9iamVjdHNcclxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbihvYmplY3QpIHtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIEJlZm9yZSBTdGVwIEV2ZW50XHJcblx0XHRcdG9iamVjdC5maXJlQmVmb3JlU3RlcEV2ZW50KCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBGaXJlcyB0aGUgJ1N0ZXAnIEV2ZW50IGZvciB0aGUgR2FtZSBPYmplY3RzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRmaXJlU3RlcEV2ZW50cygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEdhbWUgT2JqZWN0c1xyXG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgU3RlcCBFdmVudFxyXG5cdFx0XHRvYmplY3QuZmlyZVN0ZXBFdmVudCgpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRmlyZXMgdGhlICdBZnRlciBTdGVwJyBFdmVudCBmb3IgdGhlIEdhbWUgT2JqZWN0cy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZmlyZUFmdGVyU3RlcEV2ZW50cygpIHtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEdhbWUgT2JqZWN0c1xyXG5cdFx0dGhpcy5lYWNoKGZ1bmN0aW9uKG9iamVjdCkge1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgQWZ0ZXIgU3RlcCBFdmVudFxyXG5cdFx0XHRvYmplY3QuZmlyZUFmdGVyU3RlcEV2ZW50KCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnZva2VzIGEgQ2FsbGJhY2sgb24gZWFjaCBHYW1lIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZWFjaChjYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgR2FtZSBPYmplY3RzXHJcblx0XHRmb3IodmFyIGlkIGluIHRoaXMuX29iamVjdHNCeUlkKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIFByb3BlcnR5IGV4aXN0c1xyXG5cdFx0XHRpZighdGhpcy5fb2JqZWN0c0J5SWQuaGFzT3duUHJvcGVydHkoaWQpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgY3VycmVudCBHYW1lIE9iamVjdFxyXG5cdFx0XHR2YXIgb2JqZWN0ID0gdGhpcy5fb2JqZWN0c0J5SWRbaWRdO1xyXG5cclxuXHRcdFx0Ly8gRmlyZSB0aGUgQ2FsbGJhY2tcclxuXHRcdFx0Y2FsbGJhY2sob2JqZWN0KTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIEdhbWUgT2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBJRC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge251bWJlcn0gIGlkXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuR2FtZU9iamVjdHxudWxsfVxyXG5cdCAqL1xyXG5cdGdldE9iamVjdEJ5SWQoaWQpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fb2JqZWN0c0J5SWRbaWRdIHx8IG51bGw7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGZpcnN0IEdhbWUgT2JqZWN0IHdpdGggdGhlIHNwZWNpZmllZCBDbGFzcyBOYW1lLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7R2FtZS5PYmplY3RzLkdhbWVPYmplY3R8bnVsbH1cclxuXHQgKi9cclxuXHRnZXRPYmplY3RCeUNsYXNzKG5hbWUpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fb2JqZWN0QnlDbGFzc1tuYW1lXSB8fCBudWxsO1xyXG5cclxuXHR9O1xyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLk1hbmFnZXIgPSBNYW5hZ2VyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL09iamVjdHMvTWFuYWdlci5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5TdXBwb3J0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYmoge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIFZhbHVlIGlzIGEgQ2xhc3MuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0NsYXNzKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpXHJcbiAgICAgICAgICAgICYmICF2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnYXJndW1lbnRzJylcclxuICAgICAgICAgICAgJiYgL15cXHMqY2xhc3NcXHMrLy50ZXN0KHZhbHVlLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDbGFzcyBOYW1lIG9mIHRoZSBzcGVjaWZpZWQgVmFsdWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3N0cmluZ3xudWxsfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0Q2xhc3NOYW1lKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIENsYXNzXHJcbiAgICAgICAgaWYodGhpcy5pc0NsYXNzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhbiBPYmplY3RcclxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHZhbHVlIGlzIGEgU3RyaW5nXHJcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmtub3duIENsYXNzIE5hbWVcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgQ2xhc3Mgb2YgdGhlIHNwZWNpZmllZCBWYWx1ZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gIHZhbHVlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Y2xhc3N8bnVsbH1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldENsYXNzKHZhbHVlKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIENsYXNzXHJcbiAgICAgICAgaWYodGhpcy5pc0NsYXNzKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdmFsdWUgaXMgYW4gT2JqZWN0XHJcbiAgICAgICAgaWYodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmtub3duIENsYXNzXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLk9iaiA9IE9iajtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L09iai5qcyIsIlxuLyoqXG4gKiBGaXJzdCB3ZSB3aWxsIGxvYWQgYWxsIG9mIHRoaXMgcHJvamVjdCdzIEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHdoaWNoXG4gKiBpbmNsdWRlcyBWdWUgYW5kIG90aGVyIGxpYnJhcmllcy4gSXQgaXMgYSBncmVhdCBzdGFydGluZyBwb2ludCB3aGVuXG4gKiBidWlsZGluZyByb2J1c3QsIHBvd2VyZnVsIHdlYiBhcHBsaWNhdGlvbnMgdXNpbmcgVnVlIGFuZCBMYXJhdmVsLlxuICovXG5cbnJlcXVpcmUoJy4vZW5naW5lL2luZGV4Jyk7XG5yZXF1aXJlKCcuL2dhbWUvaW5kZXgnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIi8qKlxyXG4gKiBGaXJzdCB3ZSB3aWxsIGxvYWQgYWxsIG9mIHRoaXMgcHJvamVjdCdzIEphdmFTY3JpcHQgZGVwZW5kZW5jaWVzIHdoaWNoXHJcbiAqIGluY2x1ZGVzIFZ1ZSBhbmQgb3RoZXIgbGlicmFyaWVzLiBJdCBpcyBhIGdyZWF0IHN0YXJ0aW5nIHBvaW50IHdoZW5cclxuICogYnVpbGRpbmcgcm9idXN0LCBwb3dlcmZ1bCB3ZWIgYXBwbGljYXRpb25zIHVzaW5nIFZ1ZSBhbmQgTGFyYXZlbC5cclxuICovXHJcblxyXG5yZXF1aXJlKCcuL1N1cHBvcnQvaGVscGVycycpO1xyXG5yZXF1aXJlKCcuL0ZvdW5kYXRpb24vaGVscGVycycpO1xyXG5cclxucmVxdWlyZSgnLi9Db25maWcvQ29uZmlnJyk7XHJcbnJlcXVpcmUoJy4vRXZlbnRzL0Rpc3BhdGNoZXInKTtcclxucmVxdWlyZSgnLi9EZWJ1Zy9EZWJ1ZycpO1xyXG5yZXF1aXJlKCcuL0dyYXBoaWNzL0dyYXBoaWNzJyk7XHJcbnJlcXVpcmUoJy4vR3JhcGhpY3MvQ2FudmFzQ29udGV4dCcpO1xyXG5yZXF1aXJlKCcuL0dyYXBoaWNzL0NhbnZhcycpO1xyXG5yZXF1aXJlKCcuL0lucHV0L0lucHV0Jyk7XHJcbnJlcXVpcmUoJy4vT2JqZWN0cy9PYmplY3RzJyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvaW5kZXguanMiLCJpbXBvcnQgTmFtZXNwYWNlIGZyb20gJy4vTmFtZXNwYWNlLmpzJ1xyXG5cclxuaWYodHlwZW9mIHdpbmRvd1snYWJzdHJhY3QnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcblx0LyoqXHJcblx0ICogVGhyb3dzIGFuIEFic3RyYWN0IGltcGxlbWVudGF0aW9uIGVycm9yLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgVGhlIGNhbGxpbmcgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfVxyXG5cdCAqL1xyXG5cdHdpbmRvd1snYWJzdHJhY3QnXSA9IGZ1bmN0aW9uIGFic3RyYWN0KG9iamVjdCkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgQ2FsbGVyXHJcblx0XHR2YXIgY2FsbGVyID0gYWJzdHJhY3QuY2FsbGVyIHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyO1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgTWV0aG9kIE5hbWVcclxuXHRcdHZhciBtZXRob2ROYW1lID0gY2FsbGVyLm5hbWU7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBPYmplY3QgQ2xhc3MgTmFtZVxyXG5cdFx0dmFyIGNsYXNzTmFtZSA9IG9iamVjdC5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgU3VwZXIgQ2xhc3MgTmFtZVxyXG5cdFx0dmFyIHN1cGVyTmFtZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QuY29uc3RydWN0b3IpLm5hbWU7XHJcblxyXG5cdFx0Ly8gVGhyb3cgYSBuZXcgRXJyb3JcclxuXHRcdHRocm93IG5ldyBFcnJvcihgTXVzdCBpbmhlcml0IGFic3RyYWN0IGZ1bmN0aW9uICR7Y2xhc3NOYW1lfTo6JHttZXRob2ROYW1lfSgpIChwcmV2aW91c2x5IGRlY2xhcmVkIGFic3RyYWN0IGluICR7c3VwZXJOYW1lfSlgKTtcclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbmlmKHR5cGVvZiB3aW5kb3dbJ25hbWVzcGFjZSddID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaHJvd3MgYW4gQWJzdHJhY3QgaW1wbGVtZW50YXRpb24gZXJyb3IuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBUaGUgbmFtZSBvZiB0aGUgbmFtZXNwYWNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqXHJcblx0ICogQHRocm93cyB7RXJyb3J9XHJcblx0ICovXHJcblx0d2luZG93WyduYW1lc3BhY2UnXSA9IGZ1bmN0aW9uIG5hbWVzcGFjZShwYXRoKSB7XHJcblx0XHRyZXR1cm4gbmV3IE5hbWVzcGFjZShwYXRoKTtcclxuXHR9O1xyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvaGVscGVycy5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hbWVzcGFjZSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgTmFtZXNwYWNlIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIHBhdGhcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSAgYXV0b0Fzc2lnblxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihwYXRoLCBhdXRvQXNzaWduID0gdHJ1ZSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIG5hbWVzcGFjZSBwYXRoLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge3N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fcGF0aCA9IHBhdGg7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIGF1dG8gYXNzaWduXHJcblx0XHRpZihhdXRvQXNzaWduKSB7XHJcblxyXG5cdFx0XHQvLyBBc3NpZ24gdGhlIE5hbWVzcGFjZSB0byB0aGUgV2luZG93XHJcblx0XHRcdHRoaXMuYXNzaWduVG9XaW5kb3coKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQXNzaWduIHRvIHN0YXRpYyBjb250YWluZXJcclxuXHRcdGlmKHR5cGVvZiB0aGlzLmNvbnN0cnVjdG9yLl9uYW1lc3BhY2VzW3BhdGhdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmNvbnN0cnVjdG9yLl9uYW1lc3BhY2VzW3BhdGhdID0gdGhpcztcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBc3NpZ25zIHRoaXMgTmFtZXNwYWNlIHRvIHRoZSBXaW5kb3cgb2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRhc3NpZ25Ub1dpbmRvdygpIHtcclxuXHJcblx0XHR0aGlzLl9zZXQod2luZG93KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc3BlY2lmaWVkIG1hcCBpdGVtIHRvIHRoZSBnaXZlbiB2YWx1ZSB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxyXG5cdCAqIElmIG5vIGtleSBpcyBwcm92aWRlZCwgdGhlIGVudGlyZSBtYXAgd2lsbCBiZSByZXBsYWNlZC4gU2luY2Ugd2VcclxuXHQgKiBjYW4ndCBwYXNzIGJ5IHJlZmVyZW5jZSBpbiBKYXZhU2NyaXB0LCB3ZSdsbCByZXR1cm4gYSBjb3B5LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgb2JqZWN0XHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgdmFsdWVcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBwcmVmaXhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0X3NldChvYmplY3QsIGtleSA9IG51bGwsIHZhbHVlID0gbnVsbCwgcHJlZml4ID0gJycpIHtcclxuXHJcblx0XHQvLyBJZiBubyBrZXkgaXMgcHJvdmlkZWQsIHRoZW4gdXNlIHRoZSBwYXRoXHJcblx0XHRpZihrZXkgPT09IG51bGwpIHtcclxuXHRcdFx0a2V5ID0gdGhpcy5fcGF0aDtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiBubyB2YWx1ZSBpcyBwcm92aWRlZCwgdGhlbiB1c2UgdGhlIHRoaXNcclxuXHRcdGlmKHZhbHVlID09PSBudWxsKSB7XHJcblx0XHRcdHZhbHVlID0gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiBhIGtleSBpcyBzdGlsbCBub3QgcHJvdmlkZWQsIHRoZW4gcmV0dXJuIGZhaWx1cmVcclxuXHRcdGlmKGtleSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBLZXkgU2VnbWVudHNcclxuXHRcdHZhciBzZWdtZW50cyA9IGtleS5zcGxpdCgnLicpO1xyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3Mgb25seSBvbmUgc2VnbWVudCwgdGhlbiB3ZSd2ZSByZWFjaGVkIG91ciBiYXNlIGNhc2VcclxuXHRcdC8vIGluIHRoZSByZWN1cnNpb24gKG9yIHdlIHN0YXJ0ZWQgb2ZmIGluIGEgYmFzZSBjYXNlKSwgc28gd2VcclxuXHRcdC8vIHNob3VsZCBkaXJlY3RseSBzZXQgdGhlIGtleWVkIHZhbHVlIGFuZCByZXR1cm4gdGhlIG1hcC5cclxuXHJcblx0XHQvLyBDaGVjayBmb3IgYSBzaW5nbGUgU2VnbWVudFxyXG5cdFx0aWYoc2VnbWVudHMubGVuZ3RoID09PSAxKSB7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgbm90aGluZyBleGlzdHMgYXQgdGhlIG9mZnNldFxyXG5cdFx0XHRpZih0eXBlb2Ygb2JqZWN0W3NlZ21lbnRzWzBdXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldCB0aGUga2V5ZWQgdmFsdWVcclxuXHRcdFx0b2JqZWN0W3NlZ21lbnRzWzBdXSA9IHZhbHVlO1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIFN1Y2Nlc3NcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIElmIHRoZXJlJ3MgbXVsdGlwbGUgc2VnbWVudHMsIHRoZW4gd2UgaGF2ZSB0byBkbyBzb21lIHRyaWNreVxyXG5cdFx0Ly8gcmVjdXJzaW9uLiBKYXZhU2NyaXB0IGRvZXNuJ3Qgc3VwcG9ydCBwYXNzIGJ5IHJlZmVyZW5jZSxcclxuXHRcdC8vIHNvIHdlIG11c3QgcmVjdXJzaXZlbHkgc2V0IGVhY2ggaW5kZXggd2l0aGluIHRoZSBtYXAuXHJcblxyXG5cdFx0Ly8gU3BsaWNlIG9mZiB0aGUgZmlyc3QgU2VnbWVudFxyXG5cdFx0dmFyIHNlZ21lbnQgPSBzZWdtZW50cy5zcGxpY2UoMCwgMSlbMF07XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBuZXN0ZWQgUGF0aFxyXG5cdFx0dmFyIHBhdGggPSBwcmVmaXggPyBwcmVmaXggKyAnLicgKyBzZWdtZW50IDogc2VnbWVudDtcclxuXHJcblx0XHQvLyBDcmVhdGUgYSBuZXN0ZWQgTmFtZXNwYWNlLCBpZiBuZWVkZWRcclxuXHRcdGlmKHR5cGVvZiBvYmplY3Rbc2VnbWVudF0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdG9iamVjdFtzZWdtZW50XSA9IG5ldyBOYW1lc3BhY2UocGF0aCwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJlY3Vyc2l2ZWx5IHNldCB0aGUgVmFsdWVcclxuXHRcdHRoaXMuX3NldChvYmplY3Rbc2VnbWVudF0sIHNlZ21lbnRzLmpvaW4oJy4nKSwgdGhpcywgcGF0aCk7XHJcblxyXG5cdFx0Ly8gUmV0dXJuIFN1Y2Nlc3NcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmaW5lZCBOYW1lc3BhY2VzLlxyXG4gKlxyXG4gKiBAdmFyIHtvYmplY3R9XHJcbiAqL1xyXG5OYW1lc3BhY2UuX25hbWVzcGFjZXMgPSB7fTtcclxuXHJcbi8vIEFzc2lnbiBjb25zdHJ1Y3RvciB0byB3aW5kb3dcclxud2luZG93Lk5hbWVzcGFjZSA9IE5hbWVzcGFjZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L05hbWVzcGFjZS5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5TdXBwb3J0Jyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW5hZ2VyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBNYW5hZ2VyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZX0gIGdhbWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZ2FtZSkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGdhbWUgaW5zdGFuY2UuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZX1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fZ2FtZSA9IGdhbWU7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgcmVnaXN0ZXJlZCBjdXN0b20gZHJpdmVyIGNyZWF0b3JzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fY3VzdG9tQ3JlYXRvcnMgPSB7fTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBjcmVhdGVkIFwiZHJpdmVyc1wiLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge29iamVjdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fZHJpdmVycyA9IHt9O1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBEZWZhdWx0IERyaXZlciBOYW1lLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7c3RyaW5nfVxyXG5cdCAqL1xyXG5cdGdldERlZmF1bHREcml2ZXIoKSB7XHJcblx0XHRyZXR1cm4gYWJzdHJhY3QodGhpcyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgc3BlY2lmaWVkIERyaXZlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xudWxsfSAgZHJpdmVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRkcml2ZXIoZHJpdmVyID0gbnVsbCkge1xyXG5cclxuXHRcdC8vIENoZWNrIGZvciBOVUxMIERyaXZlciB3aXRob3V0IERlZmF1bHQgRHJpdmVyIHN1cHBvcnRcclxuXHRcdGlmKGRyaXZlciA9PSBudWxsICYmICF0aGlzLnVzZXNEZWZhdWx0RHJpdmVyKCkpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEZWZhdWx0IGRyaXZlciBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgRHJpdmVyIE5hbWVcclxuXHRcdHZhciBkcml2ZXIgPSBkcml2ZXIgfHwgdGhpcy5nZXREZWZhdWx0RHJpdmVyKCk7XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSBnaXZlbiBkcml2ZXIgaGFzIG5vdCBiZWVuIGNyZWF0ZWQgYmVmb3JlLCB3ZSB3aWxsIGNyZWF0ZSB0aGUgaW5zdGFuY2VzXHJcbiAgICAgICAgLy8gaGVyZSBhbmQgY2FjaGUgaXQgc28gd2UgY2FuIHJldHVybiBpdCBuZXh0IHRpbWUgdmVyeSBxdWlja2x5LiBJZiB0aGVyZSBpc1xyXG4gICAgICAgIC8vIGFscmVhZHkgYSBkcml2ZXIgY3JlYXRlZCBieSB0aGlzIG5hbWUsIHdlJ2xsIGp1c3QgcmV0dXJuIHRoYXQgaW5zdGFuY2UuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBEcml2ZXIgaGFzIG5vdCBhbHJlYWR5IGJlZW4gcmVzb2x2ZWRcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fZHJpdmVyc1tkcml2ZXJdID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICBcdC8vIFJlc29sdmUgdGhlIERyaXZlclxyXG4gICAgICAgIFx0dGhpcy5fZHJpdmVyc1tkcml2ZXJdID0gdGhpcy5fZ2V0KGRyaXZlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBEcml2ZXJcclxuICAgICAgICByZXR1cm4gdGhpcy5fZHJpdmVyc1tkcml2ZXJdO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpZWQgRHJpdmVyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgbmFtZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0X2dldChuYW1lKSB7XHJcblxyXG5cdFx0Ly8gU29tZSBtYW5hZ2VycyB1c2UgYSBjb25maWd1cmF0aW9uIHNldHVwLCB3aGljaCB1c2UgYWRhcHRlcnMgd2l0aCBkcml2ZXJzLiBJblxyXG5cdFx0Ly8gdGhpcyBjYXNlLCB3ZSdsbCBkZXRlcm1pbmUgdGhlIGNvbmZpZ3VyYXRpb24sIGFuZCBidWlsZCBhIG5ldyBkcml2ZXIgZnJvbVxyXG5cdFx0Ly8gaXQuIFRoZSBhZGFwdGVyIGhlcmUgaXMgZHluYW1pYywgYnV0IHRoZSBkcml2ZXIgaXMgc3RpbGwgaGFyZCBkZWZpbmVkLlxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBDb25maWd1cmFibGUgQWRhcHRlcnNcclxuXHRcdGlmKHRoaXMudXNlc0NvbmZpZ3VyYWJsZUFkYXB0ZXJzKCkpIHtcclxuXHJcblx0XHRcdC8vIENyZWF0ZSBhbmQgcmV0dXJuIGFuIEFkYXB0ZXJcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2NyZWF0ZUFkYXB0ZXIobmFtZSk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFVzZSBEcml2ZXIgQ3JlYXRpb25cclxuXHRcdHJldHVybiB0aGlzLl9jcmVhdGVEcml2ZXIobmFtZSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyB0aGUgc3BlY2lmaWVkIEFkYXB0ZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRfY3JlYXRlQWRhcHRlcihuYW1lKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBBZGFwdGVyIENvbmZpZ3VyYXRpb25cclxuXHRcdHZhciBjb25maWcgPSB0aGlzLl9nZXRDb25maWcobmFtZSk7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBEcml2ZXJcclxuXHRcdHZhciBkcml2ZXIgPSBjb25maWdbdGhpcy5nZXRDb25maWdEcml2ZXJLZXlOYW1lKCldO1xyXG5cclxuICAgICAgICAvLyBXZSdsbCBjaGVjayB0byBzZWUgaWYgYSBjcmVhdG9yIG1ldGhvZCBleGlzdHMgZm9yIHRoZSBnaXZlbiBkcml2ZXIuIElmIG5vdCB3ZVxyXG4gICAgICAgIC8vIHdpbGwgY2hlY2sgZm9yIGEgY3VzdG9tIGRyaXZlciBjcmVhdG9yLCB3aGljaCBhbGxvd3MgZGV2ZWxvcGVycyB0byBjcmVhdGVcclxuICAgICAgICAvLyBkcml2ZXJzIHVzaW5nIHRoZWlyIG93biBjdXN0b21pemVkIGRyaXZlciBjcmVhdG9yIENsb3N1cmUgdG8gY3JlYXRlIGl0LlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBhIGN1c3RvbSBjcmVhdG9yIGV4aXN0c1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9jdXN0b21DcmVhdG9yc1tkcml2ZXJdICE9PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICBcdC8vIENhbGwgdGhlIGN1c3RvbSBjcmVhdG9yXHJcbiAgICAgICAgXHRyZXR1cm4gdGhpcy5fY2FsbEN1c3RvbUNyZWF0b3IoY29uZmlnKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBjcmVhdGlvbiBieSBtZXRob2QgaXMgZW5hYmxlZFxyXG4gICAgICAgIGlmKHRoaXMudXNlc0NyZWF0aW9uQnlNZXRob2QoKSkge1xyXG5cclxuICAgICAgICBcdC8vIERldGVybWluZSB0aGUgbmFtZSBvZiB0aGUgY3JlYXRpb24gbWV0aG9kXHJcbiAgICAgICAgXHR2YXIgbWV0aG9kID0gdGhpcy5fZ2V0Q3JlYXRpb25NZXRob2ROYW1lKGRyaXZlcik7XHJcblxyXG4gICAgICAgIFx0Ly8gQ2hlY2sgaWYgdGhlIG1ldGhvZCBleGlzdHNcclxuICAgICAgICBcdGlmKHR5cGVvZiB0aGlzW21ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBcdFx0cmV0dXJuIHRoaXNbbWV0aG9kXShjb25maWcpO1xyXG4gICAgICAgIFx0fVxyXG5cclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBEcml2ZXIgWyR7ZHJpdmVyfV0gaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgQWRhcHRlciBbJHtuYW1lfV0gY29uc3RydWN0b3IgaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIHRoZSBzcGVjaWZpZWQgRHJpdmVyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgZHJpdmVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKlxyXG5cdCAqIEB0aHJvd3Mge0Vycm9yfVxyXG5cdCAqL1xyXG5cdF9jcmVhdGVEcml2ZXIoZHJpdmVyKSB7XHJcblxyXG4gICAgICAgIC8vIFdlJ2xsIGNoZWNrIHRvIHNlZSBpZiBhIGNyZWF0b3IgbWV0aG9kIGV4aXN0cyBmb3IgdGhlIGdpdmVuIGRyaXZlci4gSWYgbm90IHdlXHJcbiAgICAgICAgLy8gd2lsbCBjaGVjayBmb3IgYSBjdXN0b20gZHJpdmVyIGNyZWF0b3IsIHdoaWNoIGFsbG93cyBkZXZlbG9wZXJzIHRvIGNyZWF0ZVxyXG4gICAgICAgIC8vIGRyaXZlcnMgdXNpbmcgdGhlaXIgb3duIGN1c3RvbWl6ZWQgZHJpdmVyIGNyZWF0b3IgQ2xvc3VyZSB0byBjcmVhdGUgaXQuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGEgY3VzdG9tIGNyZWF0b3IgZXhpc3RzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2N1c3RvbUNyZWF0b3JzW2RyaXZlcl0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgIFx0Ly8gQ2FsbCB0aGUgY3VzdG9tIGNyZWF0b3JcclxuICAgICAgICBcdHJldHVybiB0aGlzLl9jYWxsQ3VzdG9tQ3JlYXRvcihkcml2ZXIpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGNyZWF0aW9uIGJ5IG1ldGhvZCBpcyBlbmFibGVkXHJcbiAgICAgICAgaWYodGhpcy51c2VzQ3JlYXRpb25CeU1ldGhvZCgpKSB7XHJcblxyXG4gICAgICAgIFx0Ly8gRGV0ZXJtaW5lIHRoZSBuYW1lIG9mIHRoZSBjcmVhdGlvbiBtZXRob2RcclxuICAgICAgICBcdHZhciBtZXRob2QgPSB0aGlzLl9nZXRDcmVhdGlvbk1ldGhvZE5hbWUoZHJpdmVyKTtcclxuXHJcbiAgICAgICAgXHQvLyBDaGVjayBpZiB0aGUgbWV0aG9kIGV4aXN0c1xyXG4gICAgICAgIFx0aWYodHlwZW9mIHRoaXNbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIFx0XHRyZXR1cm4gdGhpcy5tZXRob2QoKTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHQvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIFx0dGhyb3cgbmV3IEVycm9yKGBEcml2ZXIgWyR7ZHJpdmVyfV0gaXMgbm90IHN1cHBvcnRlZC5gKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaHJvdyBhbiBFcnJvclxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgRHJpdmVyIFske2RyaXZlcn1dIGNvbnN0cnVjdG9yIGlzIG5vdCBzdXBwb3J0ZWQuYCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBjdXN0b20gY3JlYXRvciBmb3IgdGhlIHNwZWNpZmllZCBkcml2ZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBkcml2ZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge21peGVkfVxyXG5cdCAqL1xyXG5cdF9jYWxsQ3VzdG9tZXJDcmVhdG9yKGRyaXZlcikge1xyXG5cclxuXHRcdC8vIENhbGwgdGhlIGN1c3RvbSBjcmVhdG9yLCBwYXNzaW5nIGl0IHRoZSBHYW1lXHJcblx0XHRyZXR1cm4gdGhpcy5fY3VzdG9tQ3JlYXRvcnNbZHJpdmVyXS5hcHBseSh0aGlzLCBbdGhpcy5fZ2FtZV0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBDcmVhdGlvbiBNZXRob2QgTmFtZSBmb3IgdGhlIHNwZWNpZmllZCBEcml2ZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBkcml2ZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cclxuXHQgKi9cclxuXHRfZ2V0Q3JlYXRpb25NZXRob2ROYW1lKGRyaXZlcikge1xyXG5cclxuXHRcdC8vIENvbnZlcnQgJy0nIGFuZCAnXycgdG8gc3BhY2VzXHJcblx0XHR2YXIgZHJpdmVyID0gZHJpdmVyLnJlcGxhY2UoL1stX10vZywgJyAnKTtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIHdvcmRzXHJcblx0XHR2YXIgd29yZHMgPSBkcml2ZXIuc3BsaXQoJyAnKTtcclxuXHJcblx0XHQvLyBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgZWFjaCB3b3JkXHJcblx0XHR3b3JkcyA9IHdvcmRzLm1hcChmdW5jdGlvbih3b3JkKSB7XHJcblx0XHRcdHJldHVybiB3b3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgd29yZC5zbGljZSgxKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIENvbmNhdGVuYXRlIHRoZSBXb3JkcyB0b2dldGhlclxyXG5cdFx0dmFyIG1ldGhvZCA9IHdvcmRzLmpvaW4oKTtcclxuXHJcblx0XHQvLyBXcmFwIHRoZSBNZXRob2QgTmFtZVxyXG5cdFx0bWV0aG9kID0gJ2NyZWF0ZScgKyBtZXRob2QgKyAnRHJpdmVyJztcclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIE1ldGhvZCBOYW1lXHJcblx0XHRyZXR1cm4gbWV0aG9kO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgTWFuYWdlciBzdXBwb3J0cyBkcml2ZXIgY3JlYXRpb25cclxuXHQgKiBmcm9tIG1ldGhvZHMgZGVmaW5lZCBieSBhbiBpbmhlcml0aW5nIGNoaWxkIGluc3RhbmNlLiBUaGVcclxuXHQgKiBuYW1lIG9mIHRoZSBkcml2ZXIgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gYSBtZXRob2QgbmFtZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0dXNlc0NyZWF0aW9uQnlNZXRob2QoKSB7XHJcblxyXG5cdFx0Ly8gU3VwcG9ydGVkIGJ5IERlZmF1bHRcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoaXMgTWFuYWdlciBzdXBwb3J0cyBhZGFwdGVyIGNyZWF0aW9uXHJcblx0ICogZnJvbSBjb25maWd1cmF0aW9uIHNldHRpbmdzLCB3aGVyZSBhbiB1bmRlcmx5aW5nIGRyaXZlciBpc1xyXG5cdCAqIHR5cGljYWxseSBzcGVjaWZpZWQuIFRoZSBkcml2ZXIgaXMgY3JlYXRlZCBzZXBhcmF0ZWx5LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHR1c2VzQ29uZmlndXJhYmxlQWRhcHRlcnMoKSB7XHJcblxyXG5cdFx0Ly8gTm90IHN1cHBvcnRlZCBieSBEZWZhdWx0XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBNYW5hZ2VyIHN1cHBvcnRzIGEgZGVmYXVsdCBkcml2ZXJcclxuXHQgKiBpbXBsZW1lbnRhdGlvbi4gVGhpcyBhbGxvd3MgYW4gXCJpbmZlcnJlZFwiIGRyaXZlciwgYW5kIHNvbWVcclxuXHQgKiBwcm94aWVzIG1heSB0YWtlIGFkdmFudGFnZSBvZiB0aGlzIHRvIGJ1YmJsZSBkb3duIGNvZGUuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdHVzZXNEZWZhdWx0RHJpdmVyKCkge1xyXG5cclxuXHRcdC8vIFN1cHBvcnRlZCBieSBEZWZhdWx0XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgbmFtZSBvZiB0aGUga2V5IHRoYXQgaG9sZHMgdGhlIG5hbWUgb2YgdGhlIGRyaXZlclxyXG5cdCAqIGZvciBhbnkgY29uZmlndXJlZCBhZGFwdGVyIGZvciB0aGlzIG1hbmFnZXIuIE1vc3QgY2FsbCBpdFxyXG5cdCAqICdkcml2ZXInLCBidXQgb3RoZXIgaW1wbGVtZW50YXRpb25zIG1heSBiZSBkaWZmZXJlbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0Q29uZmlnRHJpdmVyS2V5TmFtZSgpIHtcclxuXHJcblx0XHQvLyBVc2UgJ2RyaXZlcicgYnkgRGVmYXVsdFxyXG5cdFx0cmV0dXJuICdkcml2ZXInO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBjdXN0b20gY3JlYXRvci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgZHJpdmVyXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRleHRlbmQoZHJpdmVyLCBjYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIHRoZSBjdXN0b20gY3JlYXRvclxyXG5cdFx0dGhpcy5fY3VzdG9tQ3JlYXRvcnNbZHJpdmVyXSA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNyZWF0ZWQgXCJkcml2ZXJzXCIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXREcml2ZXJzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kcml2ZXJzO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIENvbmZpZ3VyYXRpb24gZm9yIHRoZSBzcGVjaWZpZWQgQWRhcHRlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlnKG5hbWUpIHtcclxuICAgIFx0cmV0dXJuIHRoaXMuX2dhbWUubWFrZSgnY29uZmlnJykuZ2V0KHRoaXMuX2dldENvbmZpZ3VyYXRpb25Sb290KCkgKyAnLicgKyBuYW1lKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDb25maWd1cmF0aW9uIFJvb3QgZm9yIHRoaXMgTWFuYWdlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBuYW1lXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uZmlndXJhdGlvblJvb3QobmFtZSkge1xyXG4gICAgXHRyZXR1cm4gYWJzdHJhY3QodGhpcyk7XHJcbiAgICB9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5NYW5hZ2VyID0gTWFuYWdlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9TdXBwb3J0L01hbmFnZXIuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuU3VwcG9ydCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vcCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgTG9vcCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gIG9wdGlvbnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgaW50ZXJ2YWwgdGltZW91dCAoaW4gbWlsbGlzZWNvbmRzKS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtudW1iZXJ9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuaW50ZXJ2YWxUaW1lb3V0ID0gb3B0aW9ucy5pbnRlcnZhbCB8fCAxMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoZSBMb29wIGlzIHJ1bm5pbmcuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ydW5uaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgQmVmb3JlIExvb3AgSGFuZGxlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtmdW5jdGlvbnxudWxsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmJlZm9yZUxvb3BIYW5kbGVyID0gb3B0aW9ucy5iZWZvcmUgfHwgbnVsbDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBMb29wIEhhbmRsZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7ZnVuY3Rpb258bnVsbH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5sb29wSGFuZGxlciA9IG9wdGlvbnMubG9vcCB8fCBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEFmdGVyIExvb3AgSGFuZGxlci5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtmdW5jdGlvbnxudWxsfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmFmdGVyTG9vcEhhbmRsZXIgPSBvcHRpb25zLmFmdGVyIHx8IG51bGw7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0cyB0aGUgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RhcnQoKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIExvb3AgaXMgYWxyZWFkeSBhY3RpdmVcclxuXHRcdGlmKHRoaXMuaW50ZXJ2YWxJZCAhPSBudWxsKSB7XHJcblxyXG5cdFx0XHQvLyBDbGVhciB0aGUgTG9vcCBJbnRlcnZhbFxyXG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxJZCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFN0YXJ0IHRoZSBMb29wXHJcblx0XHR0aGlzLmludGVydmFsSWQgPSBzZXRJbnRlcnZhbCh0aGlzLmRvTG9vcC5iaW5kKHRoaXMpLCB0aGlzLmludGVydmFsVGltZW91dCk7XHJcblxyXG5cdFx0Ly8gTWFyayB0aGUgTG9vcCBhcyBydW5uaW5nXHJcblx0XHR0aGlzLnJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuXHRcdC8vIEFsbG93IENoYWluaW5nXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUGVyZm9ybXMgYW4gaXRlcmF0aW9uIG9mIHRoZSBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkb0xvb3AoKSB7XHJcblxyXG5cdFx0Ly8gUGVyZm9ybSBhbnkgYWN0aW9ucyBiZWZvcmUgdGhlIExvb3BcclxuXHRcdHRoaXMuYmVmb3JlTG9vcEl0ZXJhdGlvbigpO1xyXG5cclxuXHRcdC8vIFBlcmZvcm0gdGhlIExvb3AgaXRlcmF0aW9uXHJcblx0XHR0aGlzLmRvTG9vcEl0ZXJhdGlvbigpO1xyXG5cclxuXHRcdC8vIFBlcmZvcm0gYW55IGFjdGlvbnMgYWZ0ZXIgdGhlIExvb3BcclxuXHRcdHRoaXMuYWZ0ZXJMb29wSXRlcmF0aW9uKCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgQmVmb3JlIExvb3AgSGFuZGxlci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YmVmb3JlTG9vcEl0ZXJhdGlvbigpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXIgaXMgZGVmaW5lZFxyXG5cdFx0aWYodHlwZW9mIHRoaXMuYmVmb3JlTG9vcEhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENhbGwgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXJcclxuXHRcdHRoaXMuYmVmb3JlTG9vcEhhbmRsZXIuYXBwbHkodGhpcywgW10pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDYWxscyB0aGUgTG9vcCBIYW5kbGVyLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkb0xvb3BJdGVyYXRpb24oKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBMb29wIEhhbmRsZXIgaXMgZGVmaW5lZFxyXG5cdFx0aWYodHlwZW9mIHRoaXMubG9vcEhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENhbGwgdGhlIExvb3AgSGFuZGxlclxyXG5cdFx0dGhpcy5sb29wSGFuZGxlci5hcHBseSh0aGlzLCBbXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIENhbGxzIHRoZSBBZnRlciBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGFmdGVyTG9vcEl0ZXJhdGlvbigpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIEFmdGVyIExvb3AgSGFuZGxlciBpcyBkZWZpbmVkXHJcblx0XHRpZih0eXBlb2YgdGhpcy5hZnRlckxvb3BIYW5kbGVyICE9PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBDYWxsIHRoZSBBZnRlciBMb29wIEhhbmRsZXJcclxuXHRcdHRoaXMuYWZ0ZXJMb29wSGFuZGxlci5hcHBseSh0aGlzLCBbXSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIEJlZm9yZSBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25CZWZvcmVMb29wKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5iZWZvcmVMb29wSGFuZGxlciA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25Mb29wKGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0dGhpcy5sb29wSGFuZGxlciA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBBZnRlciBMb29wIEhhbmRsZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbnxudWxsfSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0b25BZnRlckxvb3AoY2FsbGJhY2spIHtcclxuXHJcblx0XHR0aGlzLmFmdGVyTG9vcEhhbmRsZXIgPSBjYWxsYmFjaztcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRW5kcyB0aGUgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0c3RvcCgpIHtcclxuXHJcblx0XHQvLyBDbGVhciB0aGUgTG9vcCBJbnRlcnZhbFxyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsSWQpO1xyXG5cclxuXHRcdC8vIE1hcmsgdGhlIExvb3AgYXMgbm8gbG9uZ2VyIHJ1bm5pbmdcclxuXHRcdHRoaXMucnVubmluZyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9XHJcblxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkxvb3AgPSBMb29wO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvTG9vcC5qcyIsIi8vIExvYWQgdGhlIHNjcmlwdHMgd2l0aGluIHRoZSBOYW1lc3BhY2VcclxucmVxdWlyZSgnLi9SZXBvc2l0b3J5Jyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvQ29uZmlnL0NvbmZpZy5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5Db25maWcnKTtcclxuXHJcbmltcG9ydCBNYXAgZnJvbSAnRW5naW5lL1N1cHBvcnQvTWFwLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVwb3NpdG9yeSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgUmVwb3NpdG9yeSBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gIGl0ZW1zXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGl0ZW1zID0ge30pIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFsbCBvZiB0aGUgY29uZmlndXJhdGlvbiBpdGVtcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtvYmplY3R9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2l0ZW1zID0gaXRlbXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGNvbmZpZ3VyYXRpb24gdmFsdWUgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGhhcyhrZXkpIHtcclxuXHRcdHJldHVybiBNYXAuaGFzKHRoaXMuX2l0ZW1zLCBrZXkpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHNwZWNpZmllZCBjb25maWd1cmF0aW9uIHZhbHVlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGFycmF5fG9iamVjdH0gIGtleVxyXG5cdCAqIEBwYXJhbSAge21peGVkfSAgICAgICAgICAgICAgICBmYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0Z2V0KGtleSwgZmFsbGJhY2sgPSBudWxsKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIEtleSBpcyBhbiBBcnJheSBvciBPYmplY3RcclxuXHRcdGlmKEFycmF5LmlzQXJyYXkoa2V5KSB8fCB0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fZ2V0TWFueShrZXkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZVxyXG5cdFx0cmV0dXJuIE1hcC5nZXQodGhpcy5faXRlbXMsIGtleSwgZmFsbGJhY2spO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBzcGVjaWZpZWQgY29uZmlndXJhdGlvbiB2YWx1ZXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHthcnJheXxvYmplY3R9ICBrZXlzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtvYmplY3R9XHJcblx0ICovXHJcblx0Z2V0TWFueShrZXlzKSB7XHJcblxyXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgcmVzdWx0XHJcblx0XHR2YXIgY29uZmlnID0ge307XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBLZXlzXHJcblx0XHRmb3IobGV0IGluZGV4IGluIGtleXMpIHtcclxuXHJcblx0XHRcdC8vIElmIHRoZSBrZXlzIHZhcmlhYmxlIGlzIGFuIGFycmF5LCB0aGVuIHRoZSBpbmRleCBpc1xyXG5cdFx0XHQvLyBudW1lcmljYWwsIGFuZCB0aGUgdmFsdWUgaXMgdGhlIG5hbWUgb2YgdGhlIGtleS5cclxuXHRcdFx0Ly8gT3RoZXJ3aXNlLCB0aGUgaW5kZXggaXMgdGhlIG5hbWUgb2YgdGhlIGtleS5cclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgS2V5XHJcblx0XHRcdGxldCBrZXkgPSBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5c1tpbmRleF0gOiBpbmRleDtcclxuXHJcblx0XHRcdC8vIElmIHRoZSBrZXlzIHZhcmlhYmxlIGlzIGFuIGFycmF5LCB0aGVuIHRoZXJlIGlzIG5vXHJcblx0XHRcdC8vIGZhbGxiYWNrLiBPdGhlcndpc2UsIHdlIGNhbiB1c2UgdGhlIGtleSBvbiB0aGVcclxuXHRcdFx0Ly8gb2JqZWN0IHRvIGdldCB0aGUgZmFsbGJhY2sgdmFsdWUuIFVzZWZ1bCFcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgRmFsbGJhY2tcclxuXHRcdFx0bGV0IGZhbGxiYWNrID0gQXJyYXkuaXNBcnJheShrZXlzKSA/IG51bGwgOiBrZXlzW2tleV07XHJcblxyXG5cdFx0XHQvLyBBcHBlbmQgdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWVcclxuXHRcdFx0Y29uZmlnW2tleV0gPSBNYXAuZ2V0KHRoaXMuX2l0ZW1zLCBrZXksIGZhbGxiYWNrKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSByZXN1bHRcclxuXHRcdHJldHVybiBjb25maWc7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIGdpdmVuIGNvbmZpZ3VyYXRpb24gdmFsdWUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8b2JqZWN0fSAga2V5XHJcblx0ICogQHBhcmFtICB7bWl4ZWR9ICAgICAgICAgIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHNldChrZXksIHZhbHVlID0gbnVsbCkge1xyXG5cclxuXHRcdC8vIENvbnZlcnQgc2luZ2xlIGtleSB0byBvYmplY3RcclxuXHRcdHZhciBrZXlzID0gdHlwZW9mIGtleSA9PT0gJ3N0cmluZycgPyB7W2tleV06IHZhbHVlfSA6IGtleTtcclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEtleXNcclxuXHRcdGZvcihsZXQga2V5IGluIGtleXMpIHtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgVmFsdWVcclxuXHRcdFx0bGV0IHZhbHVlID0ga2V5c1trZXldO1xyXG5cclxuXHRcdFx0Ly8gU2V0IHRoZSBjb25maWd1cmF0aW9uIHZhbHVlXHJcblx0XHRcdE1hcC5zZXQodGhpcy5faXRlbXMsIGtleSwgdmFsdWUpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUHVzaCB0aGUgc3BlY2lmaWVkIHZhbHVlIG9udG8gYW4gYXJyYXkgY29uZmlndXJhdGlvbiB2YWx1ZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGtleVxyXG5cdCAqIEBwYXJhbSAge21peGVkfSAgIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHB1c2goa2V5LCB2YWx1ZSkge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgYXJyYXlcclxuXHRcdHZhciBhcnJheSA9IHRoaXMuZ2V0KGtleSk7XHJcblxyXG5cdFx0Ly8gUHVzaCB0aGUgVmFsdWVcclxuXHRcdGFycmF5LnB1c2godmFsdWUpO1xyXG5cclxuXHRcdC8vIFNldCB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSB0byB0aGUgdXBkYXRlZCBhcnJheVxyXG5cdFx0dGhpcy5zZXQoa2V5LCBhcnJheSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgYWxsIG9mIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge29iamVjdH1cclxuXHQgKi9cclxuXHRhbGwoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faXRlbXM7XHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuUmVwb3NpdG9yeSA9IFJlcG9zaXRvcnk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvQ29uZmlnL1JlcG9zaXRvcnkuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuU3VwcG9ydCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIHtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gdmFsdWUgaXMgYXJyYXkgYWNjZXNzaWJsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge21peGVkfSAgdmFsdWVcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0c3RhdGljIGFjY2Vzc2libGUodmFsdWUpIHtcclxuXHRcdHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkcyB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgdG8gdGhlIGdpdmVuIG1hcCB1c2luZyBcImRvdFwiIG5vdGF0aW9uIGlmIGl0IGRvZXNuJ3QgZXhpc3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICBtYXBcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHt2YWx1ZX0gICB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7b2JqZWN0fVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBhZGQobWFwLCBrZXksIHZhbHVlKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XHJcblx0XHRpZih0aGlzLmdldChtYXAsIGtleSkgPT09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5zZXQobWFwLCBrZXksIHZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXR1cm4gdGggZU1hcFxyXG5cdFx0cmV0dXJuIG1hcDtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIGtleSBleGlzdHMgaW4gdGhlIGdpdmVuIG1hcC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gIG1hcFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGtleVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzdGF0aWMgZXhpc3RzKG1hcCwga2V5KSB7XHJcblx0XHRyZXR1cm4gdHlwZW9mIG1hcFtrZXldICE9PSAndW5kZWZpbmVkJztcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIGFuIGl0ZW0gZnJvbSB0aGUgZ2l2ZW4gbWFwIHVzaW5nIFwiZG90XCIgbm90YXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICBtYXBcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gICBmYWxsYmFja1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0c3RhdGljIGdldChtYXAsIGtleSwgZmFsbGJhY2sgPSBudWxsKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBtYXAgaXMgYWNjZXNzaWJsZVxyXG5cdFx0aWYoIXRoaXMuYWNjZXNzaWJsZShtYXApKSB7XHJcblx0XHRcdHJldHVybiBmYWxsYmFjaztcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIG1hcCBpZiB0aGUga2V5IGlzIG51bGxcclxuXHRcdGlmKGtleSA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gbWFwO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGlmIHRoZSBLZXkgZXhwbGljaXRseSBleGlzdHNcclxuXHRcdGlmKHRoaXMuZXhpc3RzKG1hcCwga2V5KSkge1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIHRoZSBleHBsaWN0IHZhbHVlXHJcblx0XHRcdHJldHVybiBtYXBba2V5XTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGtleSBkb2Vzbid0IHVzZSBcImRvdFwiIG5vdGF0aW9uXHJcblx0XHRpZihrZXkuaW5kZXhPZignLicpID09PSAtMSkge1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIGtleSBpcyBkZWZpbmVkXHJcblx0XHRcdGlmKHR5cGVvZiBtYXBba2V5XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmV0dXJuIHRoZSB2YWx1ZVxyXG5cdFx0XHRcdHJldHVybiBtYXBba2V5XTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgZmFsbGJhY2sgdmFsdWVcclxuXHRcdFx0cmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIEtleSBTZWdtZW50c1xyXG5cdFx0dmFyIHNlZ21lbnRzID0ga2V5LnNwbGl0KCcuJyk7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBTZWdtZW50c1xyXG5cdFx0Zm9yKGxldCBpbmRleCBpbiBzZWdtZW50cykge1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBTZWdtZW50XHJcblx0XHRcdGxldCBzZWdtZW50ID0gc2VnbWVudHNbaW5kZXhdO1xyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIG1hcCBpcyBzdGlsbCBhY2Nlc3NpYmxlLCBhbmQgdGhhdCB0aGUga2V5IGV4aXN0c1xyXG5cdFx0XHRpZih0aGlzLmFjY2Vzc2libGUobWFwKSAmJiB0aGlzLmV4aXN0cyhtYXAsIHNlZ21lbnQpKSB7XHJcblxyXG5cdFx0XHRcdC8vIFN0ZXAgZG93biBpbnRvIHRoZSBtYXBcclxuXHRcdFx0XHRtYXAgPSBtYXBbc2VnbWVudF07XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBGYWlsZWQgdG8gZmluZCB0aGUga2V5XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBmYWxsYmFjaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBJZiBhbGwgb2YgdGhlIGtleSdzIHNlZ21lbnRzIHdlcmUgaXRlcmF0ZWQgdGhyb3VnaCwgdGhlbiB0aGVcclxuXHRcdC8vIG1hcCBpdHNlbGYgc2hvdWxkIGJlIHRoZSBmaW5hbCByZXN1bHQuIE90aGVyd2lzZSwgd2Ugd291bGRcclxuXHRcdC8vIGhhdmUgcmV0dXJuZWQgdGhlIGZhbGxiYWNrIHZhbHVlIGJ5IG5vdy4gQW5kIGF3YXkgd2UgZ28hXHJcblxyXG5cdFx0Ly8gUmV0dXJuIHRoZSB2YWx1ZVxyXG5cdFx0cmV0dXJuIG1hcDtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIGl0ZW0ocykgZXhpc3QgaW4gdGhlIGdpdmVuIG1hcCB1c2luZyBcImRvdFwiIG5vdGF0aW9uLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgICAgICAgbWFwXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSAga2V5c1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRzdGF0aWMgaGFzKG1hcCwga2V5cykge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGF0IGtleXMgaGF2ZSBiZWVuIHNwZWNpZmllZFxyXG5cdFx0aWYoa2V5cyA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ29udmVydCBLZXlzIGludG8gYW4gQXJyYXlcclxuXHRcdGlmKHR5cGVvZiBrZXlzICE9PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRrZXlzID0gW2tleXNdO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSBLZXlzIGlzIHRydXRoeVxyXG5cdFx0aWYoIWtleXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSBhdCBsZWFzdCBvbmUgS2V5IHdhcyBwcm92aWRlZFxyXG5cdFx0aWYoa2V5cy5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE5vdyB0aGF0IHdlJ3ZlIGNoZWNrZWQgYWxsIG9mIHRoZSBlZGdlIGNvbmRpdGlvbnMsIHdlJ3JlIGdvaW5nXHJcblx0XHQvLyB0byBpdGVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBrZXlzLCBhbmQgdHJ5IHRvIGZpbmQgYSB2YWx1ZVxyXG5cdFx0Ly8gdGhhdCBpc24ndCBrZXllZCBpbiB0aGUgcHJvdmlkZWQgbWFwLCB0aGVuIHJldHVybiBmYWxzZS5cclxuXHJcblx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEtleXNcclxuXHRcdGZvcihsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgS2V5XHJcblx0XHRcdGxldCBrZXkgPSBrZXlzW2ldO1xyXG5cclxuXHRcdFx0Ly8gU2tpcCB0aGlzIGl0ZXJhdGlvbiBpZiB0aGUga2V5IGV4cGxpY3RseSBleGlzdHNcclxuXHRcdFx0aWYodGhpcy5leGlzdHMobWFwLCBrZXkpKSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIEluaXRpYWxpemUgdGhlIFN1YiBNYXBcclxuXHRcdFx0bGV0IHN1YktleU1hcCA9IG1hcDtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUga2V5cyB1c2luZyBcImRvdFwiIG5vdGF0aW9uXHJcblx0XHRcdGxldCBkb3RLZXlzID0ga2V5LnNwbGl0KCcuJyk7XHJcblxyXG5cdFx0XHQvLyBJdGVyYXRlIHRocm91Z2ggdG8ga2V5cyBpbiB0aGUgXCJkb3RcIiBub3RhdGlvblxyXG5cdFx0XHRmb3IobGV0IGogPSAwOyBqIDwgZG90S2V5cy5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHQvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgU2VnbWVudFxyXG5cdFx0XHRcdGxldCBzZWdtZW50ID0gZG90S2V5c1tqXTtcclxuXHJcblx0XHRcdFx0Ly8gSWYgdGhlIFN1YiBLZXkgQXJyYXkgaXMgYWNjZXNzaWJsZSBhbmQgZXhpc3RzLCB0aGVuIGtlZXAgZ29pbmcgZGVlcGVyXHJcblx0XHRcdFx0aWYodGhpcy5hY2Nlc3NpYmxlKHN1YktleU1hcCkgJiYgdGhpcy5leGlzdHMoc3ViS2V5TWFwLCBzZWdtZW50KSkge1xyXG5cdFx0XHRcdFx0c3ViS2V5TWFwID0gc3ViS2V5TWFwW3NlZ21lbnRdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gT3RoZXJ3aXNlLCBzdG9wIGhlcmVcclxuXHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFdlIG1hbmFnZWQgdG8gZmluZCBldmVyeXRoaW5nLCByZXR1cm4gdHJ1ZVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIHNwZWNpZmllZCBtYXAgaXRlbSB0byB0aGUgZ2l2ZW4gdmFsdWUgdXNpbmcgXCJkb3RcIiBub3RhdGlvbi5cclxuXHQgKiBJZiBubyBrZXkgaXMgcHJvdmlkZWQsIHRoZSBlbnRpcmUgbWFwIHdpbGwgYmUgcmVwbGFjZWQuIFNpbmNlIHdlXHJcblx0ICogY2FuJ3QgcGFzcyBieSByZWZlcmVuY2UgaW4gSmF2YVNjcmlwdCwgd2UnbGwgcmV0dXJuIGEgY29weS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge29iamVjdH0gIG1hcFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGtleVxyXG5cdCAqIEBwYXJhbSAge21peGVkfSAgIHZhbHVlXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtvYmplY3R9XHJcblx0ICovXHJcblx0c3RhdGljIHNldChtYXAsIGtleSwgdmFsdWUpIHtcclxuXHJcblx0XHQvLyBJZiBubyBrZXkgaXMgcHJvdmlkZWQsIHRoZW4gcmV0dXJuIHRoZSB2YWx1ZVxyXG5cdFx0aWYoa2V5ID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIEtleSBTZWdtZW50c1xyXG5cdFx0dmFyIHNlZ21lbnRzID0ga2V5LnNwbGl0KCcuJyk7XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUncyBvbmx5IG9uZSBzZWdtZW50LCB0aGVuIHdlJ3ZlIHJlYWNoZWQgb3VyIGJhc2UgY2FzZVxyXG5cdFx0Ly8gaW4gdGhlIHJlY3Vyc2lvbiAob3Igd2Ugc3RhcnRlZCBvZmYgaW4gYSBiYXNlIGNhc2UpLCBzbyB3ZVxyXG5cdFx0Ly8gc2hvdWxkIGRpcmVjdGx5IHNldCB0aGUga2V5ZWQgdmFsdWUgYW5kIHJldHVybiB0aGUgbWFwLlxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBhIHNpbmdsZSBTZWdtZW50XHJcblx0XHRpZihzZWdtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHJcblx0XHRcdC8vIFNldCB0aGUga2V5ZWQgdmFsdWVcclxuXHRcdFx0bWFwW3NlZ21lbnRzWzBdXSA9IHZhbHVlO1xyXG5cclxuXHRcdFx0Ly8gUmV0dXJuIHRoZSBNYXBcclxuXHRcdFx0cmV0dXJuIG1hcDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gSWYgdGhlcmUncyBtdWx0aXBsZSBzZWdtZW50cywgdGhlbiB3ZSBoYXZlIHRvIGRvIHNvbWUgdHJpY2t5XHJcblx0XHQvLyByZWN1cnNpb24uIEphdmFTY3JpcHQgZG9lc24ndCBzdXBwb3J0IHBhc3MgYnkgcmVmZXJlbmNlLFxyXG5cdFx0Ly8gc28gd2UgbXVzdCByZWN1cnNpdmVseSBzZXQgZWFjaCBpbmRleCB3aXRoaW4gdGhlIG1hcC5cclxuXHJcblx0XHQvLyBTcGxpY2Ugb2ZmIHRoZSBmaXJzdCBTZWdtZW50XHJcblx0XHR2YXIgc2VnbWVudCA9IHNlZ21lbnRzLnNwbGljZSgwLCAxKVswXTtcclxuXHJcblx0XHQvLyBJbml0aWFsaXplIHRoZSBNYXAgU2VnbWVudCwgaWYgbmVlZGVkXHJcblx0XHRpZih0eXBlb2YgbWFwW3NlZ21lbnRdID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRtYXBbc2VnbWVudF0gPSB7fTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBSZWN1cnNpdmVseSBzZXQgdGhlIFZhbHVlXHJcblx0XHRtYXBbc2VnbWVudF0gPSB0aGlzLnNldChtYXBbc2VnbWVudF0sIHNlZ21lbnRzLmpvaW4oJy4nKSwgdmFsdWUpO1xyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgTWFwXHJcblx0XHRyZXR1cm4gbWFwO1xyXG5cclxuXHR9O1xyXG5cclxufTtcclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuTWFwID0gTWFwO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL1N1cHBvcnQvTWFwLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkdyYXBoaWNzJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXNDb250ZXh0IHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDYW52YXMgQ29udGV4dCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gIGNvbnRleHRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gdGhpc1xyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSB1bmRlcmx5aW5nIENvbnRleHQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9jb250ZXh0ID0gY29udGV4dDtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgYmFzZSBDb250ZXh0IG9mIHRoaXMgQ29udGV4dC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuXHQgKi9cclxuXHRnZXRDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRleHQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgYSBuZXcgUGF0aCB1c2luZyB0aGUgc3BlY2lmaWVkIENhbGxiYWNrLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7Q2xvc3VyZX0gIGNhbGxiYWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHRkcmF3KGNhbGxiYWNrKSB7XHJcblxyXG5cdFx0Ly8gQmVnaW4gdGhlIFBhdGhcclxuXHRcdHRoaXMuX2NvbnRleHQuYmVnaW5QYXRoKCk7XHJcblxyXG5cdFx0Ly8gQ2FsbCB0aGUgQ2FsbGJhY2tcclxuXHRcdHZhciByZXN1bHQgPSBjYWxsYmFjayh0aGlzLl9jb250ZXh0KTtcclxuXHJcblx0XHQvLyBDbG9zZSB0aGUgUGF0aFxyXG5cdFx0dGhpcy5fY29udGV4dC5jbG9zZVBhdGgoKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gdGhlIFJlc3VsdFxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRHJhd3MgdGhlIHNwZWNpZmllZCBDaXJjbGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHhcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHlcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgIHJhZGl1c1xyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xib29sZWFufSAgZmlsbFxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xib29sZWFufSAgb3V0bGluZVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgbGluZVdpZHRoXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGRyYXdDaXJjbGUoeCwgeSwgcmFkaXVzLCBmaWxsID0gJ2JsYWNrJywgb3V0bGluZSA9IGZhbHNlLCBsaW5lV2lkdGggPSAxKSB7XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgQ2lyY2xlXHJcblx0XHRyZXR1cm4gdGhpcy5kcmF3KGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIENpcmNsZVxyXG5cdFx0XHRjb250ZXh0LmFyYyh4LCB5LCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRmlsbFxyXG5cdFx0XHRpZihmaWxsKSB7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGZvciBhIEZpbGwgU3R5bGVcclxuXHRcdFx0XHRpZih0eXBlb2YgZmlsbCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRcdGNvbnRleHQuZmlsbFN0eWxlID0gZmlsbDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEZpbGwgdGhlIENpcmNsZVxyXG5cdFx0XHRcdGNvbnRleHQuZmlsbCgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIGFuIE91dGxpbmVcclxuXHRcdFx0aWYob3V0bGluZSkge1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBmb3IgYW4gT3V0bGluZSBTdHlsZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBvdXRsaW5lID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0Y29udGV4dC5zdG9rZVN0eWxlID0gb3V0bGluZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIFNldCB0aGUgTGluZSBXaWR0aFxyXG5cdFx0XHRcdGNvbnRleHQubGluZVdpZHRoID0gbGluZVdpZHRoO1xyXG5cclxuXHRcdFx0XHQvLyBPdXRsaW5lIHRoZSBDaXJjbGVcclxuXHRcdFx0XHRjb250ZXh0LnN0cm9rZSgpO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBzcGVjaWZpZWQgUmVjdGFuZ2xlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICB4XHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICB5XHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICB3aWR0aFxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgaGVpZ2h0XHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGJvb2xlYW59ICBmaWxsXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfGJvb2xlYW59ICBvdXRsaW5lXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgICAgICAgICBsaW5lV2lkdGhcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZHJhd1JlY3RhbmdsZSh4LCB5LCB3aWR0aCwgaGVpZ2h0LCBmaWxsID0gJ2JsYWNrJywgb3V0bGluZSA9IGZhbHNlLCBsaW5lV2lkdGggPSAxKSB7XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgUmVjdGFuZ2xlXHJcblx0XHRyZXR1cm4gdGhpcy5kcmF3KGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIFJlY3RhbmdsZVxyXG5cdFx0XHRjb250ZXh0LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBmb3IgYSBGaWxsXHJcblx0XHRcdGlmKGZpbGwpIHtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRmlsbCBTdHlsZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBmaWxsID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0Y29udGV4dC5maWxsU3R5bGUgPSBmaWxsO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gRmlsbCB0aGUgUmVjdGFuZ2xlXHJcblx0XHRcdFx0Y29udGV4dC5maWxsKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBDaGVjayBmb3IgYW4gT3V0bGluZVxyXG5cdFx0XHRpZihvdXRsaW5lKSB7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGZvciBhbiBPdXRsaW5lIFN0eWxlXHJcblx0XHRcdFx0aWYodHlwZW9mIG91dGxpbmUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRjb250ZXh0LnN0b2tlU3R5bGUgPSBvdXRsaW5lO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gU2V0IHRoZSBMaW5lIFdpZHRoXHJcblx0XHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcblxyXG5cdFx0XHRcdC8vIE91dGxpbmUgdGhlIFJlY3RhbmdsZVxyXG5cdFx0XHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBzcGVjaWZpZWQgUmVjdGFuZ2xlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgeDFcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICB5MVxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgIHgyXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICAgeTJcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb2xvclxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgIGxpbmVXaWR0aFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRkcmF3TGluZSh4MSwgeTEsIHgyLCB5MiwgY29sb3IgPSAnYmxhY2snLCBsaW5lV2lkdGggPSAxKSB7XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgUmVjdGFuZ2xlXHJcblx0XHRyZXR1cm4gdGhpcy5kcmF3KGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIE1vdmUgdG8gdGhlIGZpcnN0IFBvaW50XHJcblx0XHRcdGNvbnRleHQubW92ZVRvKHgxLCB5MSk7XHJcblxyXG5cdFx0XHQvLyBDcmVhdGUgYSBMaW5lIHRvIHRoZSBzZWNvbmQgUG9pbnRcclxuXHRcdFx0Y29udGV4dC5saW5lVG8oeDIsIHkyKTtcclxuXHJcblx0XHRcdC8vIFNldCB0aGUgTGluZSBDb2xvclxyXG5cdFx0XHRjb250ZXh0LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcblxyXG5cdFx0XHQvLyBTZXQgdGhlIExpbmUgV2lkdGhcclxuXHRcdFx0Y29udGV4dC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XHJcblxyXG5cdFx0XHQvLyBEcmF3IHRoZSBMaW5lXHJcblx0XHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBzcGVjaWZpZWQgVGV4dC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgeFxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgICAgICAgICAgeVxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ3xib29sZWFufSAgY29sb3JcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8Ym9vbGVhbn0gIGZvbnRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZHJhd1RleHQodGV4dCwgeCwgeSwgY29sb3IgPSAnYmxhY2snLCBmb250ID0gJzIwcHggQXJpYWwgQm9sZCcpIHtcclxuXHJcblx0XHQvLyBEcmF3IHRoZSBUZXh0XHJcblx0XHRyZXR1cm4gdGhpcy5kcmF3KGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBhIENvbG9yXHJcblx0XHRcdGlmKGNvbG9yKSB7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGZvciBhIEZpbGwgU3R5bGVcclxuXHRcdFx0XHRpZih0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0XHRjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBhIEZvbnRcclxuXHRcdFx0aWYoZm9udCkge1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBmb3IgYW4gT3V0bGluZSBTdHlsZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBmb250ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdFx0Y29udGV4dC5mb250ID0gZm9udDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBEcmF3IHRoZSBUZXh0XHJcblx0XHRcdGNvbnRleHQuZmlsbFRleHQodGV4dCwgeCwgeSk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG59O1xyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5DYW52YXNDb250ZXh0ID0gQ2FudmFzQ29udGV4dDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9HcmFwaGljcy9DYW52YXNDb250ZXh0LmpzIiwiY2xhc3MgQ2FudmFzIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gIGVsZW1lbnRcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgIGNvbnRleHRUeXBlXHJcblx0ICogQHBhcmFtICB7aW50ZWdlcn0gICAgICBmcHNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0Y29uc3RydWN0b3IoZWxlbWVudCwgY29udGV4dFR5cGUgPSAnMmQnLCBmcHMgPSA2MCkge1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEhUTUwgRWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBDYW52YXMuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7SFRNTEVsZW1lbnR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgQ29udGV4dCBJZGVudGlmaWVyIGZvciB0aGUgRHJhd2luZyBDb250ZXh0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge3N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5jb250ZXh0VHlwZSA9IGNvbnRleHRUeXBlO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFJlbmRlcmluZyBDb250ZXh0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge21peGVkfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmNvbnRleHQgPSBuZXcgd2luZG93LkdhbWUuR3JhcGhpY3MuQ2FudmFzQ29udGV4dCh0aGlzLmVsZW1lbnQuZ2V0Q29udGV4dCh0aGlzLmNvbnRleHRUeXBlKSk7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgRHJhd2luZyBTdGFjay5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIGFycmF5XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZHJhd1N0YWNrID0gW107XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgbnVtYmVyIG9mIERyYXdpbmcgdXBkYXRlcyBwZXIgU2Vjb25kLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIgaW50XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuZnBzID0gZnBzO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIERyYXcgTG9vcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtHYW1lLlN1cHBvcnQuTG9vcH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5kcmF3TG9vcCA9IG5ldyBHYW1lLlN1cHBvcnQuTG9vcCh7XHJcblx0XHRcdCdiZWZvcmUnOiB0aGlzLmJlZm9yZURyYXdpbmdMb29wLmJpbmQodGhpcyksXHJcblx0XHRcdCdsb29wJzogdGhpcy5pbnZva2VEcmF3U3RhY2suYmluZCh0aGlzKSxcclxuXHRcdFx0J2FmdGVyJzogdGhpcy5hZnRlckRyYXdpbmdMb29wLmJpbmQodGhpcyksXHJcblx0XHRcdCdpbnRlcnZhbCc6IDEgLyB0aGlzLmZwc1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIEhUTUwgRWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cclxuXHQgKi9cclxuXHRnZXRFbGVtZW50KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBDb250ZXh0IG9mIHRoaXMgQ2FudmFzLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Q2FudmFzQ29udGV4dH1cclxuXHQgKi9cclxuXHRnZXRDb250ZXh0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGV4dDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBBZGRzIHRoZSBzcGVjaWZpZWQgQ2FsbGJhY2sgdG8gdGhlIERyYXcgU3RhY2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtDbG9zdXJlfSAgY2FsbGJhY2tcclxuXHQgKiBAcGFyYW0gIHtpbnRlZ2VyfSAgcHJpb3JpdHlcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZHJhdyhjYWxsYmFjaywgcHJpb3JpdHkpIHtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIFByaW9yaXR5XHJcblx0XHR2YXIgcHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgUHJpb3JpdHkgaW4gdGhlIERyYXcgU3RhY2sgZXhpc3RzXHJcblx0XHRpZih0eXBlb2YgdGhpcy5kcmF3U3RhY2tbcHJpb3JpdHldID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHR0aGlzLmRyYXdTdGFja1twcmlvcml0eV0gPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBBZGQgdGhlIENhbGxiYWNrIHRvIHRoZSBEcmF3IFN0YWNrXHJcblx0XHR0aGlzLmRyYXdTdGFja1twcmlvcml0eV0ucHVzaChjYWxsYmFjayk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDbGVhcnMgdGhpcyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGNsZWFyKCkge1xyXG5cclxuXHRcdC8vIENsZWFyIHRoZSBDYW52YXNcclxuXHRcdHRoaXMuY29udGV4dC5nZXRDb250ZXh0KCkuY2xlYXJSZWN0KDAsIDAsIHRoaXMuZ2V0V2lkdGgoKSwgdGhpcy5nZXRIZWlnaHQoKSk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCZWdpbnMgdGhlIERyYXdpbmcgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmVnaW5EcmF3aW5nTG9vcCgpIHtcclxuXHJcblx0XHQvLyBTdGFydCB0aGUgRHJhd2luZyBMb29wXHJcblx0XHR0aGlzLmRyYXdMb29wLnN0YXJ0KCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIHZhcmlvdXMgYWN0aW9ucyBiZWZvcmUgdGhlIERyYXdpbmcgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0YmVmb3JlRHJhd2luZ0xvb3AoKSB7XHJcblxyXG5cdFx0Ly8gQ2xlYXIgdGhlIENhbnZhc1xyXG5cdFx0dGhpcy5jbGVhcigpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBJbnZva2VzIHRoZSBEcmF3aW5nIFN0YWNrLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRpbnZva2VEcmF3U3RhY2soKSB7XHJcblxyXG5cdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBQcmlvcml0aWVzIGluIHRoZSBEcmF3IFN0YWNrXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5kcmF3U3RhY2subGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgY3VycmVudCBEcmF3aW5nIFByaW9yaXR5XHJcblx0XHRcdHZhciBwcmlvcml0eSA9IHRoaXMuZHJhd1N0YWNrW2ldO1xyXG5cclxuXHRcdFx0Ly8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBEcmF3aW5nIENhbGxiYWNrcyBpbiB0aGUgRHJhd2luZyBQcmlvcml0eVxyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgdGhpcy5kcmF3U3RhY2tbaV0ubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IERyYXdpbmcgQ2FsbGJhY2tcclxuXHRcdFx0XHR2YXIgY2FsbGJhY2sgPSB0aGlzLmRyYXdTdGFja1tpXVtqXTtcclxuXHJcblx0XHRcdFx0Ly8gQ2FsbCB0aGUgRHJhd2luZyBDYWxsYmFja1xyXG5cdFx0XHRcdHZhciByZXN1bHQgPSBjYWxsYmFjayh0aGlzLmNvbnRleHQsIHByaW9yaXR5KTtcclxuXHJcblx0XHRcdFx0Ly8gQ2hlY2sgZm9yIGEgRmFsc2UgUmVzdWx0XHJcblx0XHRcdFx0aWYocmVzdWx0ID09PSBmYWxzZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvLyBBbGxvdyBDaGFpbmluZ1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIHZhcmlvdXMgYWN0aW9ucyBhZnRlciB0aGUgRHJhd2luZyBMb29wLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRhZnRlckRyYXdpbmdMb29wKCkge1xyXG5cclxuXHRcdC8vXHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEVuZHMgdGhlIERyYXdpbmcgTG9vcC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3RoaXN9XHJcblx0ICovXHJcblx0ZW5kRHJhd2luZ0xvb3AoKSB7XHJcblxyXG5cdFx0Ly8gU3RvcCB0aGUgRHJhd2luZyBMb29wXHJcblx0XHR0aGlzLmRyYXdMb29wLnN0b3AoKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgV2lkdGggb2YgdGhpcyBDYW52YXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIGZsb2F0XHJcblx0ICovXHJcblx0Z2V0V2lkdGgoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LndpZHRoO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIEhlaWdodCBvZiB0aGlzIENhbnZhcy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4gZmxvYXRcclxuXHQgKi9cclxuXHRnZXRIZWlnaHQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmhlaWdodDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBYIFBvc2l0aW9uIG9mIHRoZSBDYW52YXMgRWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Zsb2F0fVxyXG5cdCAqL1xyXG5cdGdldFgoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLng7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgWSBQb3NpdGlvbiBvZiB0aGUgQ2FudmFzIEVsZW1lbnQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtmbG9hdH1cclxuXHQgKi9cclxuXHRnZXRZKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS55O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIE1vdXNlIFggUG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIENhbnZhcyBFbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7ZmxvYXR9XHJcblx0ICovXHJcblx0Z2V0TW91c2VYKCkge1xyXG5cdFx0cmV0dXJuIGdhbWUoKS5tYWtlKCdtb3VzZScpLmdldFgoKSAtIHRoaXMuZ2V0WCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIE1vdXNlIFkgUG9zaXRpb24gcmVsYXRpdmUgdG8gdGhlIENhbnZhcyBFbGVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7ZmxvYXR9XHJcblx0ICovXHJcblx0Z2V0TW91c2VZKCkge1xyXG5cdFx0cmV0dXJuIGdhbWUoKS5tYWtlKCdtb3VzZScpLmdldFkoKSAtIHRoaXMuZ2V0WSgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIE1vdXNlIFBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBDYW52YXMgRWxlbWVudC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge29iamVjdH1cclxuXHQgKi9cclxuXHRnZXRNb3VzZVBvc2l0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdCd4JzogdGhpcy5nZXRNb3VzZVgoKSxcclxuXHRcdFx0J3knOiB0aGlzLmdldE1vdXNlWSgpXHJcblx0XHR9XHJcblxyXG5cdH07XHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBXaW5kb3dcclxud2luZG93LkdhbWUuR3JhcGhpY3MuQ2FudmFzID0gQ2FudmFzO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0dyYXBoaWNzL0NhbnZhcy5qcyIsIi8vIExvYWQgdGhlIHNjcmlwdHMgd2l0aGluIHRoZSBOYW1lc3BhY2VcclxucmVxdWlyZSgnLi9LZXlib2FyZCcpO1xyXG5yZXF1aXJlKCcuL01vdXNlJyk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvSW5wdXQuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuSW5wdXQnKTtcclxuXHJcbmNsYXNzIEtleWJvYXJkIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBuZXcgS2V5Ym9hcmQgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RhdGljfVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHByZXZpb3VzIEtleWJvYXJkIEV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7S2V5Ym9hcmRFdmVudHxudWxsfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucHJldmlvdXNLZXlib2FyZEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIEtleSBTdGF0ZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5rZXlTdGF0ZXMgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5pdGlhbGl6ZSB0aGUgS2V5IFN0YXRlIFR5cGVzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5rZXlTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF0gPSB7fTtcclxuICAgICAgICB0aGlzLmtleVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9IT0xEXSA9IHt9O1xyXG4gICAgICAgIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXSA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgS2V5IENvZGUgU3RhdGVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMua2V5Q29kZVN0YXRlcyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbml0aWFsaXplIHRoZSBLZXkgU3RhdGUgVHlwZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRF0gPSB7fTtcclxuICAgICAgICB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRF0gPSB7fTtcclxuICAgICAgICB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRURdID0ge307XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBLZXlib2FyZCBMaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyS2V5Ym9hcmRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBLZXlib2FyZCBFdmVudCBMaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJLZXlib2FyZExpc3RlbmVycygpIHtcclxuXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIEtleSBEb3duIExpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlcktleURvd25MaXN0ZW5lcigpO1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciB0aGUgS2V5IFVwIExpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlcktleVVwTGlzdGVuZXIoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBLZXkgRG93biBMaXN0ZW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICByZWdpc3RlcktleURvd25MaXN0ZW5lcigpIHtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBLZXkgRG93biBFdmVudCB1c2luZyB0aGlzLmtleURvd25IYW5kbGVyKClcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgS2V5IFVwIExpc3RlbmVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyS2V5VXBMaXN0ZW5lcigpIHtcclxuXHJcbiAgICAgICAgLy8gTGlzdGVuIHRvIHRoZSBLZXkgVXAgRXZlbnQgdXNpbmcgdGhpcy5rZXlVcEhhbmRsZXIoKVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5rZXlVcEhhbmRsZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBLZXkgRG93biBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBrZXlEb3duSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBLZXkgSG9sZCBFdmVudFxyXG4gICAgICAgIGlmKGV2ZW50LnJlcGVhdCkge1xyXG5cclxuICAgICAgICAgICAgLy8gSGFuZGxlIGFzIGEgS2V5IEhvbGQgRXZlbnRcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMua2V5SG9sZEhhbmRsZXIoZXZlbnQpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEhhbmRsZSBhcyBhIEtleSBQcmVzc2VkIEV2ZW50XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5UHJlc3NlZEhhbmRsZXIoZXZlbnQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBLZXkgUHJlc3NlZCBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBrZXlQcmVzc2VkSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleWJvYXJkIFN0YXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2V5Ym9hcmRTdGF0ZXMoS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRCwgZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBLZXkgUHJlc3NlZCBFdmVudFxyXG4gICAgICAgIEtleWJvYXJkLmRpc3BhdGNoZXIuZmlyZSgnS2V5Ym9hcmQuUHJlc3NlZCcsIHtcclxuICAgICAgICAgICAgJ2tleWJvYXJkJzogdGhpcyxcclxuICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIEtleWJvYXJkIEV2ZW50XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0tleWJvYXJkRXZlbnQgPSBldmVudDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgS2V5IEhvbGQgRXZlbnQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7S2V5Ym9hcmRFdmVudH0gIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAga2V5SG9sZEhhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBLZXlib2FyZCBTdGF0ZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUtleWJvYXJkU3RhdGVzKEtleWJvYXJkLktFWVNUQVRFX0hPTEQsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gRmlyZSB0aGUgS2V5IEhvbGQgRXZlbnRcclxuICAgICAgICBLZXlib2FyZC5kaXNwYXRjaGVyLmZpcmUoJ0tleWJvYXJkLkhvbGQnLCB7XHJcbiAgICAgICAgICAgICdrZXlib2FyZCc6IHRoaXMsXHJcbiAgICAgICAgICAgICdldmVudCc6IGV2ZW50XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBLZXlib2FyZCBFdmVudFxyXG4gICAgICAgIHRoaXMucHJldmlvdXNLZXlib2FyZEV2ZW50ID0gZXZlbnQ7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIEtleSBVcCBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBrZXlVcEhhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSGFuZGxlIGFzIGEgS2V5IFJlbGVhc2VkIEV2ZW50XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5UmVsZWFzZWRIYW5kbGVyKGV2ZW50KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgS2V5IFJlbGVhc2VkIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGtleVJlbGVhc2VkSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleWJvYXJkIFN0YXRlXHJcbiAgICAgICAgdGhpcy5fdXBkYXRlS2V5Ym9hcmRTdGF0ZXMoS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRUQsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gRmlyZSB0aGUgS2V5IFJlbGVhc2VkIEV2ZW50XHJcbiAgICAgICAgS2V5Ym9hcmQuZGlzcGF0Y2hlci5maXJlKCdLZXlib2FyZC5SZWxlYXNlZCcsIHtcclxuICAgICAgICAgICAgJ2tleWJvYXJkJzogdGhpcyxcclxuICAgICAgICAgICAgJ2V2ZW50JzogZXZlbnRcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIEtleWJvYXJkIEV2ZW50XHJcbiAgICAgICAgdGhpcy5wcmV2aW91c0tleWJvYXJkRXZlbnQgPSBldmVudDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgS2V5IFN0YXRlIGFuZCBLZXkgQ29kZSBTdGF0ZSB1c2luZyB0aGUgc3BlY2lmaWVkIEtleWJvYXJkIEV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICBzdGF0ZVxyXG4gICAgICogQHBhcmFtICB7S2V5Ym9hcmRFdmVudH0gIGV2ZW50XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX3VwZGF0ZUtleWJvYXJkU3RhdGVzKHN0YXRlLCBldmVudCkge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleSBTdGF0ZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUtleVN0YXRlKGV2ZW50LmtleSwgc3RhdGUsIGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBLZXkgQ29kZSBTdGF0ZVxyXG4gICAgICAgIHRoaXMuX3VwZGF0ZUtleUNvZGVTdGF0ZShldmVudC5jb2RlLCBzdGF0ZSwgZXZlbnQpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBVcGRhdGVzIHRoZSBzcGVjaWZpZWQgS2V5IFN0YXRlIHVzaW5nIHRoZSBnaXZlbiBLZXlib2FyZCBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAga2V5XHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgc3RhdGVcclxuICAgICAqIEBwYXJhbSAge0tleWJvYXJkRXZlbnR9ICBldmVudFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIF91cGRhdGVLZXlTdGF0ZShrZXksIHN0YXRlLCBldmVudCkge1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBLZXkgdG8gVXBwZXIgQ2FzZVxyXG4gICAgICAgIHZhciBrZXkgPSBrZXkudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBLZXkgU3RhdGVcclxuICAgICAgICB0aGlzLmtleVN0YXRlc1tzdGF0ZV1ba2V5XSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAvLyBDbGVhciB0aGUgb3RoZXIgU3RhdGVzIGZvciB0aGUgS2V5XHJcbiAgICAgICAgc3dpdGNoKHN0YXRlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBLZXkgUHJlc3NlZFxyXG4gICAgICAgICAgICBjYXNlIEtleWJvYXJkLktFWVNUQVRFX1BSRVNTRUQ6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBLZXkgUmVsZWFzZWQgYW5kIEtleSBIb2xkIFN0YXRlc1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtrZXldO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdW2tleV07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBLZXkgSG9sZFxyXG4gICAgICAgICAgICBjYXNlIEtleWJvYXJkLktFWVNUQVRFX0hPTEQ6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBLZXkgUmVsZWFzZWQgYW5kIEtleSBQcmVzc2VkIFN0YXRlc1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtrZXldO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2tleV07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBLZXkgUmVsZWFzZWRcclxuICAgICAgICAgICAgY2FzZSBLZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBIb2xkIGFuZCBLZXkgUHJlc3NlZCBTdGF0ZXNcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9IT0xEXVtrZXldO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2tleV07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVXBkYXRlcyB0aGUgc3BlY2lmaWVkIEtleSBDb2RlIFN0YXRlIHVzaW5nIHRoZSBnaXZlbiBLZXlib2FyZCBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgY29kZVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgIHN0YXRlXHJcbiAgICAgKiBAcGFyYW0gIHtLZXlib2FyZEV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBfdXBkYXRlS2V5Q29kZVN0YXRlKGNvZGUsIHN0YXRlLCBldmVudCkge1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIEtleSBDb2RlIFN0YXRlXHJcbiAgICAgICAgdGhpcy5rZXlDb2RlU3RhdGVzW3N0YXRlXVtjb2RlXSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAvLyBDbGVhciB0aGUgb3RoZXIgU3RhdGVzIGZvciB0aGUgS2V5IENvZGVcclxuICAgICAgICBzd2l0Y2goc3RhdGUpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEtleSBQcmVzc2VkXHJcbiAgICAgICAgICAgIGNhc2UgS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRDpcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZWxldGUgdGhlIEtleSBSZWxlYXNlZCBhbmQgS2V5IEhvbGQgU3RhdGVzXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtjb2RlXTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmtleUNvZGVTdGF0ZXNbS2V5Ym9hcmQuS0VZU1RBVEVfSE9MRF1bY29kZV07XHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAvLyBLZXkgSG9sZFxyXG4gICAgICAgICAgICBjYXNlIEtleWJvYXJkLktFWVNUQVRFX0hPTEQ6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBLZXkgUmVsZWFzZWQgYW5kIEtleSBQcmVzc2VkIFN0YXRlc1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9SRUxFQVNFRF1bY29kZV07XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2NvZGVdO1xyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgLy8gS2V5IFJlbGVhc2VkXHJcbiAgICAgICAgICAgIGNhc2UgS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRUQ6XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIHRoZSBLZXkgSG9sZCBhbmQgS2V5IFByZXNzZWQgU3RhdGVzXHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdW2NvZGVdO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMua2V5Q29kZVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEXVtjb2RlXTtcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IGlzIHByZXNzZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlQcmVzc2VkKGtleSkge1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBLZXkgdG8gVXBwZXIgQ2FzZVxyXG4gICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBpcyBwcmVzc2VkXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9QUkVTU0VEXVtrZXldICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IENvZGUgaXMgcHJlc3NlZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlDb2RlUHJlc3NlZChjb2RlKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgS2V5IENvZGUgaXMgcHJlc3NlZFxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1BSRVNTRURdW2NvZGVdICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IGlzIGJlaW5nIGhlbGQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlIZWxkKGtleSkge1xyXG5cclxuICAgICAgICAvLyBDb252ZXJ0IHRoZSBLZXkgdG8gVXBwZXIgQ2FzZVxyXG4gICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBpcyBiZWluZyBoZWxkXHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLmtleVN0YXRlc1tLZXlib2FyZC5LRVlTVEFURV9IT0xEXVtrZXldICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IENvZGUgaXMgYmVpbmcgaGVsZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb2RlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlDb2RlSGVsZChjb2RlKSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB3aGV0aGVyIG9yIG5vdCB0aGUgS2V5IENvZGUgaXMgYmVpbmcgaGVsZFxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX0hPTERdW2NvZGVdICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IGlzIGRvd24uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlEb3duKGtleSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIEtleSBpcyBQcmVzc2VkIG9yIEhlbGRcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0tleVByZXNzZWQoa2V5KSB8fCB0aGlzLmlzS2V5SGVsZChrZXkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgQ29kZSBpcyBkb3duLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGNvZGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0tleUNvZGVEb3duKGNvZGUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBLZXkgQ29kZSBpcyBQcmVzc2VkIG9yIEhlbGRcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0tleUNvZGVQcmVzc2VkKGtleSkgfHwgdGhpcy5pc0tleUNvZGVIZWxkKGtleSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBLZXkgaXMgdXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgaXNLZXlSZWxlYXNlZChrZXkpIHtcclxuXHJcbiAgICAgICAgLy8gQ29udmVydCB0aGUgS2V5IHRvIFVwcGVyIENhc2VcclxuICAgICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBLZXkgaXMgdXBcclxuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMua2V5U3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtrZXldICE9PSAndW5kZWZpbmVkJztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgS2V5IENvZGUgaXMgdXAuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29kZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzS2V5Q29kZVJlbGVhc2VkKGNvZGUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBLZXkgQ29kZSBpcyB1cFxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5rZXlDb2RlU3RhdGVzW0tleWJvYXJkLktFWVNUQVRFX1JFTEVBU0VEXVtjb2RlXSAhPT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtHYW1lLkV2ZW50cy5EaXNwYXRjaGVyfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0RGlzcGF0Y2hlcigpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIEtleWJvYXJkLmRpc3BhdGNoZXI7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyB0aGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtHYW1lLkV2ZW50cy5EaXNwYXRjaGVyfSAgZGlzcGF0Y2hlclxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXREaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcclxuXHJcbiAgICAgICAgS2V5Ym9hcmQuZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XHJcblxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRXZlbnQgRGlzcGF0Y2hlci5cclxuICpcclxuICogQHZhciB7R2FtZS5FdmVudHMuRGlzcGF0Y2hlcn1cclxuICovXHJcbktleWJvYXJkLmRpc3BhdGNoZXIgPSBudWxsO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBQcmVzc2VkIEtleSBTdGF0ZS5cclxuICpcclxuICogQHZhciB7c3RyaW5nfVxyXG4gKi9cclxuS2V5Ym9hcmQuS0VZU1RBVEVfUFJFU1NFRCA9ICdwcmVzc2VkJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgSG9sZCBLZXkgU3RhdGUuXHJcbiAqXHJcbiAqIEB2YXIge3N0cmluZ31cclxuICovXHJcbktleWJvYXJkLktFWVNUQVRFX0hPTEQgPSAnaG9sZCc7XHJcblxyXG4vKipcclxuICogVGhlIFJlbGVhc2VkIEtleSBTdGF0ZS5cclxuICpcclxuICogQHZhciB7c3RyaW5nfVxyXG4gKi9cclxuS2V5Ym9hcmQuS0VZU1RBVEVfUkVMRUFTRUQgPSAncmVsZWFzZWQnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBLZXkgQ29uc3RhbnRzLlxyXG4gKlxyXG4gKiBAdmFyIHtzdHJpbmd9XHJcbiAqL1xyXG5LZXlib2FyZC5LRVlfQUxUID0gJ0FsdCc7XHJcbktleWJvYXJkLktFWV9CQUNLU1BBQ0UgPSAnQmFja3NwYWNlJztcclxuS2V5Ym9hcmQuS0VZX0NPTlRST0wgPSAnQ29udHJvbCc7XHJcbktleWJvYXJkLktFWV9ERUxFVEUgPSAnRGVsZXRlJztcclxuS2V5Ym9hcmQuS0VZX0RPV04gPSAnQXJyb3dEb3duJztcclxuS2V5Ym9hcmQuS0VZX0VORCA9ICdFbmQnO1xyXG5LZXlib2FyZC5LRVlfRVNDQVBFID0gJ0VzY2FwZSc7XHJcbktleWJvYXJkLktFWV9IT01FID0gJ0hvbWUnO1xyXG5LZXlib2FyZC5LRVlfSU5TRVJUID0gJ0luc2VydCc7XHJcbktleWJvYXJkLktFWV9MRUZUID0gJ0Fycm93TGVmdCc7XHJcbktleWJvYXJkLktFWV9NRVRBID0gJ01ldGEnO1xyXG5LZXlib2FyZC5LRVlfTlVNTE9DSyA9ICdOdW1Mb2NrJztcclxuS2V5Ym9hcmQuS0VZX1BBR0VfRE9XTiA9ICdQYWdlRG93bic7XHJcbktleWJvYXJkLktFWV9QQUdFX1VQID0gJ1BhZ2VVcCc7XHJcbktleWJvYXJkLktFWV9SRVRVUk4gPSAnRW50ZXInO1xyXG5LZXlib2FyZC5LRVlfUklHSFQgPSAnQXJyb3dSaWdodCc7XHJcbktleWJvYXJkLktFWV9TQ1JPTEwgPSAnU2Nyb2xsTG9jayc7XHJcbktleWJvYXJkLktFWV9TSElGVCA9ICdTaGlmdCc7XHJcbktleWJvYXJkLktFWV9TUEFDRSA9ICcgJztcclxuS2V5Ym9hcmQuS0VZX1RBQiA9ICdUYWInO1xyXG5LZXlib2FyZC5LRVlfVVAgPSAnQXJyb3dVcCc7XHJcblxyXG4vKipcclxuICogVGhlIEtleSBDb25zdGFudHMgYWxpYXNlcy5cclxuICpcclxuICogQHZhciB7c3RyaW5nfVxyXG4gKi9cclxuS2V5Ym9hcmQuS0VZX0VOVEVSID0gS2V5Ym9hcmQuS0VZX1JFVFVSTjtcclxuS2V5Ym9hcmQuS0VZX05FWFQgPSBLZXlib2FyZC5LRVlfUEFHRV9ET1dOO1xyXG5LZXlib2FyZC5LRVlfUFJJT1IgPSBLZXlib2FyZC5LRVlfUEFHRV9VUDtcclxuS2V5Ym9hcmQuS0VZX1NDUk9MTF9MT0NLID0gS2V5Ym9hcmQuS0VZX1NDUk9MTDtcclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuS2V5Ym9hcmQgPSBLZXlib2FyZDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9JbnB1dC9LZXlib2FyZC5qcyIsInZhciBucyA9IG5hbWVzcGFjZSgnR2FtZS5JbnB1dCcpO1xyXG5cclxuY2xhc3MgTW91c2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyBhIG5ldyBNb3VzZSBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdGF0aWN9XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgcHJldmlvdXMgTW91c2UgRXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtNb3VzZUV2ZW50fG51bGx9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5wcmV2aW91c01vdXNlTW92ZUV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIE1vdXNlIFBvc2l0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAneCc6IDAsXHJcbiAgICAgICAgICAgICd5JzogMFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBNb3VzZSBMaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTW91c2VMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBNb3VzZSBFdmVudCBMaXN0ZW5lcnMuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJNb3VzZUxpc3RlbmVycygpIHtcclxuXHJcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIE1vdXNlIE1vdmUgTGlzdGVuZXJcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyTW91c2VNb3ZlTGlzdGVuZXIoKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBNb3VzZSBNb3ZlIExpc3RlbmVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlZ2lzdGVyTW91c2VNb3ZlTGlzdGVuZXIoKSB7XHJcblxyXG4gICAgICAgIC8vIExpc3RlbiB0byB0aGUgS2V5IERvd24gRXZlbnQgdXNpbmcgdGhpcy5tb3VzZU1vdmVIYW5kbGVyKClcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBLZXkgRG93biBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtNb3VzZUV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgTW91c2UgUG9zaXRpb24gZnJvbSB0aGUgRXZlbnRcclxuICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLl9nZXRNb3VzZVBvc2l0aW9uRnJvbUV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBQb3NpdGlvblxyXG4gICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIE1vdXNlIFBvc2l0aW9uIGZyb20gdGhlIHNwZWNpZmllZCBNb3VzZSBFdmVudC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtNb3VzZUV2ZW50fSAgZXZlbnRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIF9nZXRNb3VzZVBvc2l0aW9uRnJvbUV2ZW50KGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICd4JzogZXZlbnQuY2xpZW50WCxcclxuICAgICAgICAgICAgJ3knOiBldmVudC5jbGllbnRZXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTW91c2UgUG9zaXRpb24uXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICBnZXRQb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb247XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgTW91c2UgWCBQb3NpdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtmbG9hdH1cclxuICAgICAqL1xyXG4gICAgZ2V0WCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcG9zaXRpb25bJ3gnXTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBNb3VzZSBZIFBvc2l0aW9uLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Zsb2F0fVxyXG4gICAgICovXHJcbiAgICBnZXRZKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wb3NpdGlvblsneSddO1xyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLk1vdXNlID0gTW91c2U7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvSW5wdXQvTW91c2UuanMiLCIvLyBMb2FkIHRoZSBzY3JpcHRzIHdpdGhpbiB0aGUgTmFtZXNwYWNlXHJcbnJlcXVpcmUoJy4vTWFuYWdlcicpO1xyXG5yZXF1aXJlKCcuL0dhbWVPYmplY3QnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9PYmplY3RzL09iamVjdHMuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuT2JqZWN0cycpO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYSBuZXcgR2FtZSBPYmplY3QuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3RoaXN9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT2JqZWN0IHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBHYW1lIE9iamVjdCBpbnN0YW5jZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3N0YXRpY31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBJbnN0YW5jZSBJRC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtpbnRlZ2VyfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmlkID0gR2FtZU9iamVjdC5tYXhJbnN0YW5jZUlkKys7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgWCBQb3NpdGlvbi5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtmbG9hdH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy54ID0gMDtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBZIFBvc2l0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2Zsb2F0fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLnkgPSAwO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogV2hldGhlciBvciBub3QgdGhpcyBPYmplY3Qgc2hvdWxkIGJlIHZpc2libGUuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7Ym9vbGVhbn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoaXMgT2JqZWN0IGV4aXN0cy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtib29sZWFufVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLmV4aXN0cyA9IHRydWU7XHJcblxyXG5cdFx0Ly8gQm9vdCBpZiBub3QgQm9vdGVkXHJcblx0XHR0aGlzLl9ib290SWZOb3RCb290ZWQoKTtcclxuXHJcblx0XHQvLyBGaXJlIHRoZSBDcmVhdGVkIEV2ZW50XHJcblx0XHR0aGlzLmZpcmVPYmplY3RFdmVudCgnY3JlYXRlZCcsIHsnb2JqZWN0JzogdGhpc30sIGZhbHNlKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2sgaWYgdGhpcyBPYmplY3QgbmVlZHMgdG8gYmUgYm9vdGVkLCBhbmQgaWYgc28sIGRvIGl0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRfYm9vdElmTm90Qm9vdGVkKCkge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB0aGlzIE9iamVjdCBoYXMgbm90IGJlZW4gYm9vdGVkXHJcblx0XHRpZih0eXBlb2YgR2FtZU9iamVjdC5fYm9vdGVkW3RoaXMuZ2V0Q2xhc3NOYW1lKCldICE9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gTWFyayB0aGlzIE9iamVjdCBhcyBCb290ZWRcclxuXHRcdEdhbWVPYmplY3QuX2Jvb3RlZFt0aGlzLmdldENsYXNzTmFtZSgpXSA9IHRydWU7XHJcblxyXG5cdFx0Ly8gRmlyZSB0aGUgQm9vdGluZyBFdmVudFxyXG5cdFx0dGhpcy5maXJlT2JqZWN0RXZlbnQoJ2Jvb3RpbmcnLCB7J29iamVjdCc6IHRoaXN9LCBmYWxzZSk7XHJcblxyXG5cdFx0Ly8gQm9vdCB0aGlzIE9iamVjdFxyXG5cdFx0dGhpcy5jb25zdHJ1Y3Rvci5fYm9vdCgpO1xyXG5cclxuXHRcdC8vIEZpcmUgdGhlIEJvb3RlZCBFdmVudFxyXG5cdFx0dGhpcy5maXJlT2JqZWN0RXZlbnQoJ2Jvb3RlZCcsIHsnb2JqZWN0JzogdGhpc30sIGZhbHNlKTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIFwiYm9vdGluZ1wiIG1ldGhvZCBvZiB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhdGljIF9ib290KCkge1xyXG5cclxuXHRcdC8vIE92ZXJyaWRlIGJ5IENoaWxkXHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIEV2ZW50IERpc3BhdGNoZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLkV2ZW50cy5EaXNwYXRjaGVyfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBnZXREaXNwYXRjaGVyKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmRpc3BhdGNoZXI7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIEV2ZW50IERpc3BhdGNoZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkV2ZW50cy5EaXNwYXRjaGVyfSAgZGlzcGF0Y2hlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0RGlzcGF0Y2hlcihkaXNwYXRjaGVyKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgT2JqZWN0IE1hbmFnZXIuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuTWFuYWdlcn1cclxuXHQgKi9cclxuXHRzdGF0aWMgZ2V0TWFuYWdlcigpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5tYW5hZ2VyO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIHRoZSBPYmplY3QgTWFuYWdlci5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5NYW5hZ2VyfSAgbWFuYWdlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgc2V0TWFuYWdlcihtYW5hZ2VyKSB7XHJcblxyXG5cdFx0dGhpcy5tYW5hZ2VyID0gbWFuYWdlcjtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogVGhlIERyYXcgRXZlbnQgSGFuZGxlciBmb3IgdGhpcyBPYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gICAgICAgICBjYW52YXNcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc0NvbnRleHR9ICBjb250ZXh0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGRyYXcoY2FudmFzLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIHRoZSBPYmplY3QgaXMgVmlzaWJsZVxyXG5cdFx0aWYoIXRoaXMudmlzaWJsZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBFdmVudCBQYXJhbWV0ZXJzXHJcblx0XHR2YXIgcGFyYW1ldGVycyA9IHtcclxuXHRcdFx0J29iamVjdCc6IHRoaXMsXHJcblx0XHRcdCdjYW52YXMnOiBjYW52YXMsXHJcblx0XHRcdCdjb250ZXh0JzogY29udGV4dFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSB3ZSdyZSBhbGxvd2VkIHRvIERyYXdcclxuXHRcdGlmKHRoaXMuZmlyZU9iamVjdEV2ZW50KCdkcmF3aW5nJywgcGFyYW1ldGVycykgIT09IGZhbHNlKSB7XHJcblxyXG5cdFx0XHQvLyBGaXJlIHRoZSBEcmF3IEV2ZW50XHJcblx0XHRcdHRoaXMuZmlyZU9iamVjdEV2ZW50KCdkcmF3JywgcGFyYW1ldGVycyk7XHJcblxyXG5cdFx0XHQvLyBGaXJlIHRoZSBQb3N0IERyYXcgRXZlbnRcclxuXHRcdFx0dGhpcy5maXJlT2JqZWN0RXZlbnQoJ2RyYXduJywgcGFyYW1ldGVycyk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnRleHQuZHJhd0xpbmUodGhpcy54LCB0aGlzLnksIHRoaXMueCArIDEwLCB0aGlzLnksICdncmVlbicpO1xyXG5cdFx0Y29udGV4dC5kcmF3TGluZSh0aGlzLngsIHRoaXMueSwgdGhpcy54LCB0aGlzLnkgKyAxMCwgJ3JlZCcpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBEZXN0cm95cyB0aGlzIE9iamVjdC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0ZGVzdHJveSgpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgd2UncmUgYWxsb3dlZCB0byBkZWxldGVcclxuXHRcdGlmKHRoaXMuZmlyZU9iamVjdEV2ZW50KCdkZWxldGluZycpID09PSBmYWxzZSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUGVyZm9ybSB0aGUgRGVsZXRpb25cclxuXHRcdHRoaXMuX3BlcmZvcm1EZWxldGVPbk9iamVjdCgpO1xyXG5cclxuXHRcdC8vIE9uY2UgdGhlIE9iamVjdCBoYXMgYmVlbiBkZWxldGVkLCB3ZSdsbCBmaXJlIG9mZiB0aGUgZGVsZXRlZFxyXG5cdFx0Ly8gZXZlbnQgc28gdGhhdCBsaXN0ZW5lcnMgY2FuIGRlZmluZSBwb3N0LWRlbGV0ZSBvcGVyYXRpb25zLlxyXG5cdFx0Ly8gRmluYWxseSwgd2UnbGwgcmV0dXJuIGJvb2xlYW4gdHJ1ZSB0byBpbmRpY2F0ZSBzdWNjZXNzLlxyXG5cclxuXHRcdC8vIEZpcmUgdGhlIERlbGV0ZWQgRXZlbnRcclxuXHRcdHRoaXMuZmlyZU9iamVjdEV2ZW50KCdkZWxldGVkJywge30sIGZhbHNlKTtcclxuXHJcblx0XHQvLyBSZXR1cm4gU3VjY2Vzc1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBlcmZvcm1zIHRoZSBwc2V1ZG8gZGVsZXRlIG9wdGlvbnMgb24gdGhpcyBPYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdF9wZXJmb3JtRGVsZXRlT25PYmplY3QoKSB7XHJcblxyXG5cdFx0Ly8gU3RyYWlnaHQgdXAgZGVsZXRpbmcgdGhpcyBvYmplY3Qgd29uJ3Qgc3VmZmljZSwgYXMgdGhlXHJcblx0XHQvLyBPYmplY3QgTWFuYWdlciBpcyByZWZlcmluZyB0aGlzIE9iamVjdC4gV2UgbmVlZCB0b1xyXG5cdFx0Ly8gdGVsbCB0aGUgTWFuYWdlciB0byBkZWxldGUgdGhpcyBvYmplY3QgZW50aXJlbHkuXHJcblxyXG5cdFx0Ly8gVGVsbCB0aGUgT2JqZWN0IE1hbmFnZXIgdG8gZGVsZXRlIHRoaXMgT2JqZWN0XHJcblx0XHR0aGlzLmNvbnN0cnVjdG9yLmdldE1hbmFnZXIoKS5kZWxldGVJbnN0YW5jZSh0aGlzKTtcclxuXHJcblx0XHQvLyBXZSBjYW4ndCBhY3R1YWxseSBkZWxldGUgdGhpcyBvYmplY3QsIGFzIG9uZTogamF2YXNjcmlwdFxyXG5cdFx0Ly8gd29uJ3QgYWN0dWFsbHkgbGV0IHVzIGRvIHRoYXQgaGVyZSwgYW5kIHR3bzogd2Ugc3RpbGxcclxuXHRcdC8vIG5lZWQgdGhlIG9iamVjdCBmb3IgdGhlIGRlbGV0ZWQgZXZlbnQuIFdvcmthcm91bmQhXHJcblxyXG5cdFx0Ly8gRmxhZyB0aGlzIE9iamVjdCBhcyBub24tZXhpc3RhbnRcclxuXHRcdHRoaXMuZXhpc3RzID0gZmFsc2U7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIE9iamVjdCBFdmVudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICAgZXZlbnRcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIGNhbGxiYWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyByZWdpc3Rlck9iamVjdEV2ZW50KGV2ZW50LCBjYWxsYmFjaykge1xyXG5cclxuXHRcdC8vIE1ha2Ugc3VyZSBhIERpc3BhdGNoZXIgaXMgc2V0XHJcblx0XHRpZih0aGlzLmRpc3BhdGNoZXIgPT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjYWxsaW5nIENsYXNzXHJcblx0XHR2YXIgbmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKCk7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgdGhlIENhbGxiYWNrIGFzIGEgTGlzdGVuZXJcclxuXHRcdHRoaXMuZGlzcGF0Y2hlci5saXN0ZW4oYG9iamVjdHMuJHtldmVudH06ICR7bmFtZX1gLCBjYWxsYmFjayk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhcmlhbnRzIG9mIHtAc2VlIHN0YXRpYzo6cmVnaXN0ZXJPYmplY3RFdmVudCgpfS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhdGljIG9uQ3JlYXRlKGNhbGxiYWNrKSAgICAgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ2NyZWF0ZWQnLCAgICBjYWxsYmFjayk7IH07XHJcblx0c3RhdGljIG9uUHJlRHJhdyhjYWxsYmFjaykgICAgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ2RyYXdpbmcnLCAgICBjYWxsYmFjayk7IH07XHJcblx0c3RhdGljIG9uRHJhdyhjYWxsYmFjaykgICAgICAgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ2RyYXcnLCAgICAgICBjYWxsYmFjayk7IH07XHJcblx0c3RhdGljIG9uUG9zdERyYXcoY2FsbGJhY2spICAgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ2RyYXduJywgICAgICBjYWxsYmFjayk7IH07XHJcblx0c3RhdGljIG9uQmVmb3JlU3RlcChjYWxsYmFjaykgeyB0aGlzLnJlZ2lzdGVyT2JqZWN0RXZlbnQoJ3N0ZXBwaW5nJywgY2FsbGJhY2spOyB9O1xyXG5cdHN0YXRpYyBvblN0ZXAoY2FsbGJhY2spICAgICAgIHsgdGhpcy5yZWdpc3Rlck9iamVjdEV2ZW50KCdzdGVwJywgICAgIGNhbGxiYWNrKTsgfTtcclxuXHRzdGF0aWMgb25BZnRlclN0ZXAoY2FsbGJhY2spICB7IHRoaXMucmVnaXN0ZXJPYmplY3RFdmVudCgnc3RlcHBlZCcsICBjYWxsYmFjayk7IH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZpcmVzIHRoZSBzcGVjaWZpZWQgT2JqZWN0IEV2ZW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIGV2ZW50XHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSAgIHBhcmFtZXRlcnNcclxuXHQgKiBAcGFyYW0gIHtib29sZWFufSAgaGFsdFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0ZmlyZU9iamVjdEV2ZW50KGV2ZW50LCBwYXJhbWV0ZXJzID0ge30sIGhhbHQgPSB0cnVlKSB7XHJcblxyXG5cdFx0Ly8gTWFrZSBzdXJlIGEgRGlzcGF0Y2hlciBpcyBzZXRcclxuXHRcdGlmKEdhbWVPYmplY3QuZGlzcGF0Y2hlciA9PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgRXZlbnQgbWV0aG9kXHJcblx0XHR2YXIgbWV0aG9kID0gaGFsdCA/ICd1bnRpbCcgOiAnZmlyZSc7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjYWxsaW5nIENsYXNzXHJcblx0XHR2YXIgbmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKCk7XHJcblxyXG5cdFx0Ly8gQ2FsbCB0aGUgRGlzcGF0Y2hlclxyXG5cdFx0cmV0dXJuIEdhbWVPYmplY3QuZGlzcGF0Y2hlclttZXRob2RdKGBvYmplY3RzLiR7ZXZlbnR9OiAke25hbWV9YCwgcGFyYW1ldGVycyk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZhcmlhbnRzIG9mIHtAc2VlIHRoaXMuZmlyZU9iamVjdEV2ZW50KCl9LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRmaXJlQmVmb3JlU3RlcEV2ZW50KCkgeyB0aGlzLmZpcmVPYmplY3RFdmVudCgnc3RlcHBpbmcnLCB7J29iamVjdCc6IHRoaXN9KTsgfTtcclxuXHRmaXJlU3RlcEV2ZW50KCkgICAgICAgeyB0aGlzLmZpcmVPYmplY3RFdmVudCgnc3RlcCcsICAgICB7J29iamVjdCc6IHRoaXN9KTsgfTtcclxuXHRmaXJlQWZ0ZXJTdGVwRXZlbnQoKSAgeyB0aGlzLmZpcmVPYmplY3RFdmVudCgnc3RlcHBlZCcsICB7J29iamVjdCc6IHRoaXN9KTsgfTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgQ2xhc3MgTmFtZSBvZiB0aGlzIE9iamVjdCBmcm9tIGEgU3RhdGljIENvbnRleHQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0c3RhdGljIGdldENsYXNzTmFtZSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy50b1N0cmluZygpLnNwbGl0ICgnKCcgfHwgL3MrLylbMF0uc3BsaXQgKCcgJyB8fCAvcysvKVsxXTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgQ2xhc3MgTmFtZSBvZiB0aGlzIE9iamVjdCBmcm9tIGFuIEluc3RhbmNlIENvbnRleHQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtzdHJpbmd9XHJcblx0ICovXHJcblx0Z2V0Q2xhc3NOYW1lKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcblxyXG5cdH07XHJcblxyXG59XHJcblxyXG4vKipcclxuICogVGhlIE1heCBJbnN0YW5jZSBJRC5cclxuICpcclxuICogQHZhciB7aW50ZWdlcn1cclxuICovXHJcbkdhbWVPYmplY3QubWF4SW5zdGFuY2VJZCA9IDE7XHJcblxyXG4vKipcclxuICogVGhlIEV2ZW50IERpc3BhdGNoZXIuXHJcbiAqXHJcbiAqIEB2YXIge0dhbWUuRXZlbnRzLkRpc3BhdGNoZXJ8bnVsbH1cclxuICovXHJcbkdhbWVPYmplY3QuZGlzcGF0Y2hlciA9IG51bGw7XHJcblxyXG4vKipcclxuICogVGhlIGJvb3RlZCBPYmplY3RzLlxyXG4gKlxyXG4gKiBAdmFyIHtvYmplY3R9XHJcbiAqL1xyXG5HYW1lT2JqZWN0Ll9ib290ZWQgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgT2JqZWN0IE1hbmFnZXIuXHJcbiAqXHJcbiAqIEB2YXIge0dhbWUuT2JqZWN0cy5NYW5hZ2VyfG51bGx9XHJcbiAqL1xyXG5HYW1lT2JqZWN0Lm1hbmFnZXIgPSBudWxsO1xyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5HYW1lT2JqZWN0ID0gR2FtZU9iamVjdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9PYmplY3RzL0dhbWVPYmplY3QuanMiLCIvKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBUdXJuIE9uIFRoZSBMaWdodHNcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBXZSBuZWVkIHRvIGlsbHVtaW5hdGUgUEhQIGRldmVsb3BtZW50LCBzbyBsZXQgdXMgdHVybiBvbiB0aGUgbGlnaHRzLlxyXG58IFRoaXMgYm9vdHN0cmFwcyB0aGUgZnJhbWV3b3JrIGFuZCBnZXRzIGl0IHJlYWR5IGZvciB1c2UsIHRoZW4gaXRcclxufCB3aWxsIGxvYWQgdXAgdGhpcyBhcHBsaWNhdGlvbiBzbyB0aGF0IHdlIGNhbiBydW4gaXQgYW5kIHNlbmRcclxufCB0aGUgcmVzcG9uc2VzIGJhY2sgdG8gdGhlIGJyb3dzZXIgYW5kIGRlbGlnaHQgb3VyIHVzZXJzLlxyXG58XHJcbiovXHJcblxyXG52YXIgYXBwID0gcmVxdWlyZSgnLi9ib290c3RyYXAvYXBwLmpzJykuZGVmYXVsdDtcclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IFJ1biBUaGUgQXBwbGljYXRpb25cclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnxcclxufCBPbmNlIHdlIGhhdmUgdGhlIGFwcGxpY2F0aW9uLCB3ZSBjYW4gaGFuZGxlIHRoZSBpbmNvbWluZyByZXF1ZXN0XHJcbnwgdGhyb3VnaCB0aGUga2VybmVsLCBhbmQgc2VuZCB0aGUgYXNzb2NpYXRlZCByZXNwb25zZSBiYWNrIHRvXHJcbnwgdGhlIGNsaWVudCdzIGJyb3dzZXIgYWxsb3dpbmcgdGhlbSB0byBlbmpveSB0aGUgY3JlYXRpdmVcclxufCBhbmQgd29uZGVyZnVsIGFwcGxpY2F0aW9uIHdlIGhhdmUgcHJlcGFyZWQgZm9yIHRoZW0uXHJcbnxcclxuKi9cclxuXHJcbnZhciBrZXJuZWwgPSByZXF1aXJlKCdBcHAvR2FtZS9LZXJuZWwuanMnKS5kZWZhdWx0O1xyXG5cclxua2VybmVsID0gYXBwLm1ha2UoJ0VuZ2luZS5Db250cmFjdHMuR2FtZS5LZXJuZWwnLCBbYXBwXSk7XHJcblxyXG52YXIgcmVzcG9uc2UgPSBrZXJuZWwuYm9vdHN0cmFwKCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIEZpcnN0IHdlIHdpbGwgbG9hZCBhbGwgb2YgdGhpcyBwcm9qZWN0J3MgSmF2YVNjcmlwdCBkZXBlbmRlbmNpZXMgd2hpY2hcclxuICogaW5jbHVkZXMgVnVlIGFuZCBvdGhlciBsaWJyYXJpZXMuIEl0IGlzIGEgZ3JlYXQgc3RhcnRpbmcgcG9pbnQgd2hlblxyXG4gKiBidWlsZGluZyByb2J1c3QsIHBvd2VyZnVsIHdlYiBhcHBsaWNhdGlvbnMgdXNpbmcgVnVlIGFuZCBMYXJhdmVsLlxyXG4gKi9cclxuXHJcbmltcG9ydCBHYW1lIGZyb20gJ0VuZ2luZS9Gb3VuZGF0aW9uL0dhbWUuanMnO1xyXG5cclxucmVxdWlyZSgnLi9PYmplY3RzL0JhbGxHYW1lT2JqZWN0Jyk7XHJcbnJlcXVpcmUoJy4vT2JqZWN0cy9Ccmlja0dhbWVPYmplY3QnKTtcclxucmVxdWlyZSgnLi9PYmplY3RzL1BhZGRsZUdhbWVPYmplY3QnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvaW5kZXguanMiLCJpbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnRW5naW5lL0ZvdW5kYXRpb24vQXBwbGljYXRpb24uanMnO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgQ3JlYXRlIFRoZSBBcHBsaWNhdGlvblxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IFRoZSBmaXJzdCB0aGluZyB3ZSB3aWxsIGRvIGlzIGNyZWF0ZSBhIG5ldyBMYXJhdmVsIGFwcGxpY2F0aW9uIGluc3RhbmNlXHJcbnwgd2hpY2ggc2VydmVzIGFzIHRoZSBcImdsdWVcIiBmb3IgYWxsIHRoZSBjb21wb25lbnRzIG9mIExhcmF2ZWwsIGFuZCBpc1xyXG58IHRoZSBJb0MgY29udGFpbmVyIGZvciB0aGUgc3lzdGVtIGJpbmRpbmcgYWxsIG9mIHRoZSB2YXJpb3VzIHBhcnRzLlxyXG58XHJcbiovXHJcblxyXG52YXIgYXBwID0gbmV3IEFwcGxpY2F0aW9uKCk7XHJcblxyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgQmluZCBJbXBvcnRhbnQgSW50ZXJmYWNlc1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IE5leHQsIHdlIG5lZWQgdG8gYmluZCBzb21lIGltcG9ydGFudCBpbnRlcmZhY2VzIGludG8gdGhlIGNvbnRhaW5lciBzb1xyXG58IHdlIHdpbGwgYmUgYWJsZSB0byByZXNvbHZlIHRoZW0gd2hlbiBuZWVkZWQuIFRoZSBrZXJuZWxzIHNlcnZlIHRoZVxyXG58IGluY29taW5nIHJlcXVlc3RzIHRvIHRoaXMgYXBwbGljYXRpb24gZnJvbSBib3RoIHRoZSB3ZWIgYW5kIENMSS5cclxufFxyXG4qL1xyXG5cclxuYXBwLnNpbmdsZXRvbihcclxuICAgICdFbmdpbmUuQ29udHJhY3RzLkdhbWUuS2VybmVsJyxcclxuICAgICdBcHAuR2FtZS5LZXJuZWwnXHJcbik7XHJcblxyXG5hcHAuc2luZ2xldG9uKFxyXG4gICAgJ0VuZ2luZS5Db250cmFjdHMuQ29uc29sZS5LZXJuZWwnLFxyXG4gICAgJ0FwcC5Db25zb2xlLktlcm5lbCdcclxuKTtcclxuXHJcbmFwcC5zaW5nbGV0b24oXHJcbiAgICAnRW5naW5lLkNvbnRyYWN0cy5EZWJ1Zy5FeGNlcHRpb25IYW5kbGVyJyxcclxuICAgICdBcHAuRXhjZXB0aW9ucy5IYW5kbGVyJ1xyXG4pO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgUmV0dXJuIFRoZSBBcHBsaWNhdGlvblxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufFxyXG58IFRoaXMgc2NyaXB0IHJldHVybnMgdGhlIGFwcGxpY2F0aW9uIGluc3RhbmNlLiBUaGUgaW5zdGFuY2UgaXMgZ2l2ZW4gdG9cclxufCB0aGUgY2FsbGluZyBzY3JpcHQgc28gd2UgY2FuIHNlcGFyYXRlIHRoZSBidWlsZGluZyBvZiB0aGUgaW5zdGFuY2VzXHJcbnwgZnJvbSB0aGUgYWN0dWFsIHJ1bm5pbmcgb2YgdGhlIGFwcGxpY2F0aW9uIGFuZCBzZW5kaW5nIHJlc3BvbnNlcy5cclxufFxyXG4qL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZ2FtZS9ib290c3RyYXAvYXBwLmpzIiwiaW1wb3J0IE9iaiBmcm9tICdFbmdpbmUvU3VwcG9ydC9PYmouanMnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ0VuZ2luZS9Db250YWluZXIvQ29udGFpbmVyLmpzJztcclxuaW1wb3J0IEV2ZW50U2VydmljZVByb3ZpZGVyIGZyb20gJ0VuZ2luZS9FdmVudHMvRXZlbnRTZXJ2aWNlUHJvdmlkZXIuanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24gZXh0ZW5kcyBDb250YWluZXIge1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IEFwcGxpY2F0aW9uIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfG51bGx9ICBiYXNlUGF0aFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihiYXNlUGF0aCA9IG51bGwpIHtcclxuXHJcblx0XHQvLyBDYWxsIHBhcmVudCBjb25zdHJ1Y3RvclxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBiYXNlIHBhdGggZm9yIHRoZSBmcmFtZXdvcmsgaW5zdGFsbGF0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge3N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5fYmFzZVBhdGggPSBudWxsO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogSW5kaWNhdGVzIGlmIHRoZSBhcHBsaWNhdGlvbiBoYXMgYmVlbiBib290c3RyYXBwZWQgYmVmb3JlLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2Jvb2xlYW59XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX2hhc0JlZW5Cb290c3RyYXBwZWQgPSBmYWxzZTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBJbmRpY2F0ZXMgaWYgdGhlIGFwcGxpY2F0aW9uIGhhcyBcImJvb3RlZFwiLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtib29sfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fYm9vdGVkID0gZmFsc2U7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGFycmF5IG9mIGJvb3RpbmcgY2FsbGJhY2tzLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHthcnJheX1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX2Jvb3RpbmdDYWxsYmFja3MgPSBbXTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgYXJyYXkgb2YgYm9vdGVkIGNhbGxiYWNrcy5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7YXJyYXl9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9ib290ZWRDYWxsYmFja3MgPSBbXTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgYXJyYXkgb2YgdGVybWluYXRpbmcgY2FsbGJhY2tzLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHthcnJheX1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX3Rlcm1pbmF0aW5nQ2FsbGJhY2tzID0gW107XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogQWxsIG9mIHRoZSByZWdpc3RlcmVkIHNlcnZpY2UgcHJvdmlkZXJzLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHthcnJheX1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX3NlcnZpY2VQcm92aWRlcnMgPSBbXTtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgbmFtZXMgb2YgdGhlIGxvYWRlZCBzZXJ2aWNlIHByb3ZpZGVycy5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7b2JqZWN0fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fbG9hZGVkUHJvdmlkZXJzID0ge307XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGRlZmVycmVkIHNlcnZpY2VzIGFuZCB0aGVpciBwcm92aWRlcnMuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2FycmF5fVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fZGVmZXJyZWRTZXJ2aWNlcyA9IFtdO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIEEgY3VzdG9tIGNhbGxiYWNrIHVzZWQgdG8gY29uZmlndXJlIE1vbm9sb2cuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge2NhbGxhYmxlfG51bGx9XHJcblx0ICAgICAqL1xyXG5cdCAgICB0aGlzLl9tb25vbG9nQ29uZmlndXJhdG9yID0gbnVsbDtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgY3VzdG9tIGRhdGFiYXNlIHBhdGggZGVmaW5lZCBieSB0aGUgZGV2ZWxvcGVyLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtzdHJpbmd8bnVsbH1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX2RhdGFiYXNlUGF0aCA9IG51bGw7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGN1c3RvbSBzdG9yYWdlIHBhdGggZGVmaW5lZCBieSB0aGUgZGV2ZWxvcGVyLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtzdHJpbmd8bnVsbH1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX3N0b3JhZ2VQYXRoID0gbnVsbDtcclxuXHJcblx0ICAgIC8qKlxyXG5cdCAgICAgKiBUaGUgY3VzdG9tIGVudmlyb25tZW50IHBhdGggZGVmaW5lZCBieSB0aGUgZGV2ZWxvcGVyLlxyXG5cdCAgICAgKlxyXG5cdCAgICAgKiBAdmFyIHtzdHJpbmd8bnVsbH1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX2Vudmlyb25tZW50UGF0aCA9IG51bGw7XHJcblxyXG5cdCAgICAvKipcclxuXHQgICAgICogVGhlIGVudmlyb25tZW50IGZpbGUgdG8gbG9hZCBkdXJpbmcgYm9vdHN0cmFwcGluZy5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7c3RyaW5nfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fZW52aXJvbm1lbnRGaWxlID0gJy5lbnYnO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBhcHBsaWNhdGlvbiBuYW1lc3BhY2UuXHJcblx0ICAgICAqXHJcblx0ICAgICAqIEB2YXIge3N0cmluZ3xudWxsfVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fbmFtZXNwYWNlID0gbnVsbDtcclxuXHJcblx0XHQvLyBDaGVjayBpZiBhIEJhc2UgUGF0aCB3YXMgcHJvdmlkZWRcclxuXHRcdGlmKGJhc2VQYXRoICE9PSBudWxsKSB7XHJcblxyXG5cdFx0XHQvLyBTZXQgdGhlIEJhc2UgUGF0aFxyXG5cdFx0XHR0aGlzLnNldEJhc2VQYXRoKGJhc2VQYXRoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgdGhlIEJhc2UgQmluZGluZ3NcclxuXHRcdHRoaXMuX3JlZ2lzdGVyQmFzZUJpbmRpbmdzKCk7XHJcblxyXG5cdFx0Ly8gUmVnaXN0ZXIgdGhlIEJhc2UgU2VydmljZSBQcm92aWRlcnNcclxuXHRcdHRoaXMuX3JlZ2lzdGVyQmFzZVNlcnZpY2VQcm92aWRlcnMoKTtcclxuXHJcblx0XHQvLyBSZWdpc3RlciB0aGUgQ29yZSBDb250YWluZXIgQWxpYXNlc1xyXG5cdFx0Ly8gdGhpcy5fcmVnaXN0ZXJDb3JlQ29udGFpbmVyQWxpYXNlcygpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIGJhc2ljIGJpbmRpbmdzIGludG8gdGhlIGNvbnRhaW5lci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0X3JlZ2lzdGVyQmFzZUJpbmRpbmdzKCkge1xyXG5cclxuXHRcdC8vIFNldCB0aGUgQ29udGFpbmVyIGluc3RhbmNlIHRvIHRoaXMgQXBwbGljYXRpb25cclxuXHRcdHRoaXMuY29uc3RydWN0b3Iuc2V0SW5zdGFuY2UodGhpcyk7XHJcblxyXG5cdFx0Ly8gQmluZCB0aGUgJ2FwcCcga2V5d29yZCB0byB0aGlzIEFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLmluc3RhbmNlKCdhcHAnLCB0aGlzKTtcclxuXHJcblx0XHQvLyBCaW5kIHRoZSBDb250YWluZXIgQ2xhc3MgdG8gdGhpcyBBcHBsaWNhdGlvblxyXG5cdFx0dGhpcy5pbnN0YW5jZSgnRnJhbWV3b3JrLkNvbnRhaW5lcicsIHRoaXMpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQHRvZG8gUmVnaXN0ZXIgUGFja2FnZSBNYW5pZmVzdFxyXG5cdFx0ICovXHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhbGwgb2YgdGhlIGJhc2Ugc2VydmljZSBwcm92aWRlcnMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdF9yZWdpc3RlckJhc2VTZXJ2aWNlUHJvdmlkZXJzKCkge1xyXG5cclxuXHRcdC8vIFJlZ2lzdGVyIHRoZSBFdmVudCBTZXJ2aWNlIFByb3ZpZGVyXHJcblx0XHR0aGlzLnJlZ2lzdGVyKG5ldyBFdmVudFNlcnZpY2VQcm92aWRlcih0aGlzKSk7XHJcblxyXG5cdFx0Ly8gLy8gUmVnaXN0ZXIgdGhlIExvZyBTZXJ2aWNlIFByb3ZpZGVyXHJcblx0XHQvLyB0aGlzLnJlZ2lzdGVyKG5ldyBMb2dTZXJ2aWNlUHJvdmlkZXIodGhpcykpO1xyXG5cclxuXHRcdC8vIC8vIFJlZ2lzdGVyIHRoZSBSb3V0aW5nIFNlcnZpY2UgUHJvdmlkZXJcclxuXHRcdC8vIHRoaXMucmVnaXN0ZXIobmV3IFJvdXRpbmdTZXJ2aWNlUHJvdmlkZXIodGhpcykpO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBCb290cyB0aGUgYXBwbGljYXRpb24gdXNpbmcgdGhlIGdpdmVuIGJvb3RzdHJhcHBlcnMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHthcnJheX0gIGJvb3RzdHJhcHBlcnNcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0Ym9vdHN0cmFwV2l0aChib290c3RyYXBwZXJzKSB7XHJcblxyXG5cdFx0Ly8gTWFyayB0aGUgYXBwbGljYXRpb24gaGFzIGJvb3RlZFxyXG5cdFx0dGhpcy5faGFzQmVlbkJvb3RzdHJhcHBlZCA9IHRydWU7XHJcblxyXG5cdFx0Ly8gUnVuIGVhY2ggYm9vdHN0cmFwcGVyXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgYm9vdHN0cmFwcGVycy5sZW5ndGg7IGkrKykge1xyXG5cclxuXHRcdFx0Ly8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IGJvb3RzdHJhcHBlclxyXG5cdFx0XHRsZXQgYm9vdHN0cmFwcGVyID0gYm9vdHN0cmFwcGVyc1tpXTtcclxuXHJcblx0XHRcdC8vIEZpcmUgdGhlIGJvb3RzdHJhcHBpbmcgZXZlbnRcclxuXHRcdFx0dGhpcy5nZXQoJ2V2ZW50cycpLmZpcmUoJ2Jvb3RzdHJhcHBpbmc6ICcgKyBib290c3RyYXBwZXIsIFt0aGlzXSk7XHJcblxyXG5cdFx0XHQvLyBSdW4gdGhlIGJvb3RzdHJhcHBlclxyXG5cdFx0XHR0aGlzLm1ha2UoYm9vdHN0cmFwcGVyKS5ib290c3RyYXAodGhpcyk7XHJcblxyXG5cdFx0XHQvLyBGaXJlIHRoZSBib290c3RyYXBwZWQgZXZlbnRcclxuXHRcdFx0dGhpcy5nZXQoJ2V2ZW50cycpLmZpcmUoJ2Jvb3RzdHJhcHBlZDogJyArIGJvb3RzdHJhcHBlciwgW3RoaXNdKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIHRvIHJ1biBiZWZvcmUgYSBib290c3RyYXBwZXIuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICAgIGJvb3RzdHJhcHBlclxyXG5cdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YmVmb3JlQm9vdHN0cmFwcGluZyhib290c3RyYXBwZXIsIGNhbGxiYWNrKSB7XHJcblx0XHR0aGlzLmdldCgnZXZlbnRzJykubGlzdGVuKCdib290c3RyYXBwaW5nOiAnICsgYm9vdHN0cmFwcGVyLCBjYWxsYmFjayk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVnaXN0ZXJzIGEgY2FsbGJhY2sgdG8gcnVuIGFmdGVyIGEgYm9vdHN0cmFwcGVyLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgICBib290c3RyYXBwZXJcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIGNhbGxiYWNrXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGFmdGVyQm9vdHN0cmFwcGluZyhib290c3RyYXBwZXIsIGNhbGxiYWNrKSB7XHJcblx0XHR0aGlzLmdldCgnZXZlbnRzJykubGlzdGVuKCdib290c3RyYXBwZWQ6ICcgKyBib290c3RyYXBwZXIsIGNhbGxiYWNrKTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBhcHBsaWNhdGlvbiBoYXMgYmVlbiBib290c3RyYXBwZWQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGhhc0JlZW5Cb290c3RyYXBwZWQoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5faGFzQmVlbkJvb3RzdHJhcHBlZDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZWdpc3RlcnMgdGhlIGdpdmVuIHNlcnZpY2UgcHJvdmlkZXIgd2l0aCB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ8c3RyaW5nfSAgcHJvdmlkZXJcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG5cdCAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JjZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7RnJhbWV3b3JrLlN1cHBvcnQuU2VydmljZVByb3ZpZGVyfVxyXG5cdCAqL1xyXG5cdHJlZ2lzdGVyKHByb3ZpZGVyLCBvcHRpb25zID0ge30sIGZvcmNlID0gZmFsc2UpIHtcclxuXHJcblx0XHQvLyBEZWNsYXJlIHRoZSByZWdpc3RlcmVkIHByb3ZpZGVyXHJcblx0XHR2YXIgcmVnaXN0ZXJlZDtcclxuXHJcblx0XHQvLyBDaGVjayBpZiB0aGUgc2VydmljZSBwcm92aWRlciBpcyBhbHJlYWR5IHJlZ2lzdGVyZWQsIGFuZCB3ZSdyZSBub3QgZm9yY2luZ1xyXG5cdFx0aWYoKHJlZ2lzdGVyZWQgPSB0aGlzLmdldFByb3ZpZGVyKHByb3ZpZGVyKSkgJiYgIWZvcmNlKSB7XHJcblx0XHRcdHJldHVybiByZWdpc3RlcmVkO1xyXG5cdFx0fVxyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZ2l2ZW4gXCJwcm92aWRlclwiIGlzIGEgc3RyaW5nLCB3ZSB3aWxsIHJlc29sdmUgaXQsIHBhc3NpbmcgaW4gdGhlXHJcbiAgICAgICAgLy8gYXBwbGljYXRpb24gaW5zdGFuY2UgYXV0b21hdGljYWxseSBmb3IgdGhlIGRldmVsb3Blci4gVGhpcyBpcyBzaW1wbHlcclxuICAgICAgICAvLyBhIG1vcmUgY29udmVuaWVudCB3YXkgb2Ygc3BlY2lmeWluZyB5b3VyIHNlcnZpY2UgcHJvdmlkZXIgY2xhc3Nlcy5cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGdpdmVuIFwicHJvdmlkZXJcIiBpcyBhIHN0cmluZ1xyXG4gICAgICAgIGlmKHR5cGVvZiBwcm92aWRlciA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgXHQvLyBSZXNvbHZlIHRoZSBwcm92aWRlclxyXG4gICAgICAgIFx0cHJvdmlkZXIgPSB0aGlzLnJlc29sdmVQcm92aWRlcihwcm92aWRlcik7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByb3ZpZGVyIHVzZXMgYSByZWdpc3RlciBtZXRob2RcclxuICAgICAgICBpZih0eXBlb2YgcHJvdmlkZXIucmVnaXN0ZXIgPT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgXHQvLyBSZWdpc3RlciB0aGUgcHJvdmlkZXJcclxuICAgICAgICBcdHByb3ZpZGVyLnJlZ2lzdGVyKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFyayB0aGUgcHJvdmlkZXIgYXMgcmVnaXN0ZXJlZFxyXG4gICAgICAgIHRoaXMuX21hcmtBc1JlZ2lzdGVyZWQocHJvdmlkZXIpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgYXBwbGljYXRpb24gaGFzIGFscmVhZHkgYm9vdGVkLCB3ZSB3aWxsIGNhbGwgdGhpcyBib290IG1ldGhvZCBvblxyXG4gICAgICAgIC8vIHRoZSBwcm92aWRlciBjbGFzcyBzbyBpdCBoYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZG8gaXRzIGJvb3QgbG9naWMgYW5kXHJcbiAgICAgICAgLy8gd2lsbCBiZSByZWFkeSBmb3IgYW55IHVzYWdlIGJ5IHRoaXMgZGV2ZWxvcGVyJ3MgYXBwbGljYXRpb24gbG9naWMuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBhcHBsaWNhdGlvbiBoYXMgYWxyZWFkeSBib290ZWRcclxuICAgICAgICBpZih0aGlzLl9ib290ZWQpIHtcclxuICAgICAgICBcdHRoaXMuX2Jvb3RQcm92aWRlcihwcm92aWRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIFByb3ZpZGVyXHJcbiAgICAgICAgcmV0dXJuIHByb3ZpZGVyO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSByZWdpc3RlcmVkIHNlcnZpY2UgcHJvdmlkZXIgaW5zdGFuY2UgaWYgaXQgZXhpc3RzLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnJhbWV3b3JrLlN1cHBvcnQuU2VydmljZVByb3ZpZGVyfGNsYXNzfSAgcHJvdmlkZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge0ZyYW1ld29yay5TdXBwb3J0LlNlcnZpY2VQcm92aWRlcnxudWxsfVxyXG5cdCAqL1xyXG5cdGdldFByb3ZpZGVyKHByb3ZpZGVyKSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBQcm92aWRlcnMgdGhhdCBhcmUgYW4gaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIHByb3ZpZGVyXHJcblx0XHR2YXIgcHJvdmlkZXJzID0gdGhpcy5nZXRQcm92aWRlcnMocHJvdmlkZXIpO1xyXG5cclxuXHRcdC8vIENoZWNrIGlmIG5vIHByb3ZpZGVycyB3ZXJlIGZvdW5kXHJcblx0XHRpZihwcm92aWRlcnMubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgZmlyc3QgcHJvdmlkZXJcclxuXHRcdHJldHVybiBwcm92aWRlcnNbMF07XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIHJlZ2lzdGVyZWQgc2VydmljZSBwcm92aWRlciBpbnN0YW5jZXMgaWYgYW55IGV4aXN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnJhbWV3b3JrLlN1cHBvcnQuU2VydmljZVByb3ZpZGVyfGNsYXNzfSAgcHJvdmlkZXJcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2FycmF5fVxyXG5cdCAqL1xyXG5cdGdldFByb3ZpZGVycyhwcm92aWRlcikge1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgcHJvdmlkZXIgY2xhc3MgZGVmaW5pdGlvblxyXG5cdFx0dmFyIGRlZmluaXRpb24gPSBPYmouZ2V0Q2xhc3MocHJvdmlkZXIpO1xyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgcHJvdmlkZXJzIHRoYXQgYXJlIGFuIGluc3RhbmNlIG9mIHRoZSBwcm92aWRlciBjbGFzc1xyXG5cdFx0cmV0dXJuIHRoaXMuX3NlcnZpY2VQcm92aWRlcnMuZmlsdGVyKGZ1bmN0aW9uKHZhbHVlKSB7XHJcblx0XHRcdHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIGRlZmluaXRpb247XHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmVzb2x2ZXMgdGhlIGdpdmVuIHNlcnZpY2UgcHJvdmlkZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtjbGFzc30gIHByb3ZpZGVyXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ9XHJcblx0ICovXHJcblx0cmVzb2x2ZVByb3ZpZGVyKHByb3ZpZGVyKSB7XHJcblx0XHRyZXR1cm4gbmV3IHByb3ZpZGVyKHRoaXMpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1hcmtzIHRoZSBnaXZlbiBzZXJ2aWNlIHByb3ZpZGVyIGFzIHJlZ2lzdGVyZWQuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtGcmFtZXdvcmsuU3VwcG9ydC5TZXJ2aWNlUHJvdmlkZXJ9ICBwcm92aWRlclxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRfbWFya0FzUmVnaXN0ZXJlZChwcm92aWRlcikge1xyXG5cclxuXHRcdC8vIEFwcGVuZCB0aGUgc2VydmljZSBwcm92aWRlciB0byB0aGUgbGlzdCBvZiBwcm92aWRlcnNcclxuXHRcdHRoaXMuX3NlcnZpY2VQcm92aWRlcnMucHVzaChwcm92aWRlcik7XHJcblxyXG5cdFx0Ly8gTWFyayB0aGUgc2VydmljZSBwcm92aWRlciBhcyBsb2FkZWRcclxuXHRcdHRoaXMuX2xvYWRlZFByb3ZpZGVyc1tPYmouZ2V0Q2xhc3NOYW1lKHByb3ZpZGVyKV0gPSB0cnVlO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMb2FkIGFuZCBib290IGFsbCBvZiB0aGUgcmVtYWluaW5nIGRlZmVycmVkIHByb3ZpZGVycy5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0bG9hZERlZmVycmVkUHJvdmlkZXJzKCkge1xyXG5cclxuICAgICAgICAvLyBXZSB3aWxsIHNpbXBseSBzcGluIHRocm91Z2ggZWFjaCBvZiB0aGUgZGVmZXJyZWQgcHJvdmlkZXJzIGFuZCByZWdpc3RlciBlYWNoXHJcbiAgICAgICAgLy8gb25lIGFuZCBib290IHRoZW0gaWYgdGhlIGFwcGxpY2F0aW9uIGhhcyBib290ZWQuIFRoaXMgc2hvdWxkIG1ha2UgZWFjaCBvZlxyXG4gICAgICAgIC8vIHRoZSByZW1haW5pbmcgc2VydmljZXMgYXZhaWxhYmxlIHRvIHRoaXMgYXBwbGljYXRpb24gZm9yIGltbWVkaWF0ZSB1c2UuXHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgZGVmZXJyZWQgc2VydmljZSBwcm92aWRlcnNcclxuICAgICAgICBmb3IobGV0IHNlcnZpY2UgaW4gdGhpcy5fZGVmZXJyZWRTZXJ2aWNlcykge1xyXG5cclxuICAgICAgICBcdC8vIE1ha2Ugc3VyZSB0aGUgcHJvcGVydHkgZXhpc3RzXHJcbiAgICAgICAgXHRpZighdGhpcy5fZGVmZXJyZWRTZXJ2aWNlcy5oYXNPd25Qcm9wZXJ0eShzZXJ2aWNlKSkge1xyXG4gICAgICAgIFx0XHRjb250aW51ZTtcclxuICAgICAgICBcdH1cclxuXHJcbiAgICAgICAgXHQvLyBMb2FkIHRoZSBkZWZlcnJlZCBzZXJ2aWNlIHByb3ZpZGVyXHJcbiAgICAgICAgXHR0aGlzLmxvYWREZWZlcnJlZFByb3ZpZGVyKHNlcnZpY2UpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsZWFyIHRoZSBkZWZlcnJlZCBzZXJ2aWNlc1xyXG4gICAgICAgIHRoaXMuX2RlZmVycmVkU2VydmljZXMgPSB7fTtcclxuXHJcblx0fTtcclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0FwcGxpY2F0aW9uLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkNvbnRhaW5lcicpO1xyXG5cclxuaW1wb3J0IE9iaiBmcm9tICdFbmdpbmUvU3VwcG9ydC9PYmouanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udGFpbmVyIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYSBDb250YWluZXIgaW5zdGFuY2UuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dGhpc31cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIGFycmF5IG9mIHRoZSB0eXBlcyB0aGF0IGhhdmUgYmVlbiByZXNvbHZlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9yZXNvbHZlZCA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgY29udGFpbmVyJ3MgYmluZGluZ3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fYmluZGluZ3MgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGNvbnRhaW5lcidzIG1ldGhvZCBiaW5kaW5ncy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9tZXRob2RCaW5kaW5ncyA9IHt9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgY29udGFpbmVyJ3Mgc2hhcmVkIGluc3RhbmNlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9pbnN0YW5jZXMgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHJlZ2lzdGVyZWQgdHlwZSBhbGlhc2VzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2FsaWFzZXMgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHJlZ2lzdGVyZWQgYWxpYXNlcyBrZXllZCBieSB0aGUgYWJzdHJhY3QgbmFtZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9hYnN0cmFjdEFsaWFzZXMgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIGV4dGVuc2lvbiBjbG9zdXJlcyBmb3Igc2VydmljZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHtvYmplY3R9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fZXh0ZW5kZXJzID0ge307XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBvZiB0aGUgcmVnaXN0ZXJlZCB0YWdzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fdGFncyA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgc3RhY2sgb2YgY29uY3JldGlvbnMgY3VycmVudGx5IGJlaW5nIGJ1aWx0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fYnVpbGRTdGFjayA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgcGFyYW1ldGVyIG92ZXJyaWRlIHN0YWNrLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fd2l0aCA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgY29udGV4dHVhbCBiaW5kaW5nIG1hcC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge29iamVjdH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmNvbnRleHR1YWwgPSB7fTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWxsIG9mIHRoZSByZWdpc3RlcmVkIHJlYm91bmQgY2FsbGJhY2tzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fcmVib3VuZENhbGxiYWNrcyA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgb2YgdGhlIGdsb2JhbCByZXNvbHZpbmcgY2FsbGJhY2tzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHZhciB7YXJyYXl9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsUmVzb2x2aW5nQ2FsbGJhY2tzID0gW107XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFsbCBvZiB0aGUgZ2xvYmFsIGFmdGVyIHJlc29sdmluZyBjYWxsYmFja3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAdmFyIHthcnJheX1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLl9nbG9iYWxBZnRlclJlc29sdmluZ0NhbGxiYWNrcyA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgb2YgdGhlIGFmdGVyIHJlc29sdmluZyBjYWxsYmFja3MgYnkgY2xhc3MgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX3Jlc29sdmluZ0NhbGxiYWNrcyA9IFtdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbGwgb2YgdGhlIGFmdGVyIHJlc29sdmluZyBjYWxsYmFja3MgYnkgY2xhc3MgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEB2YXIge2FycmF5fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuX2FmdGVyUmVzb2x2aW5nQ2FsbGJhY2tzID0gW107XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgYSBjb250ZXh0dWFsIGJpbmRpbmcuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29uY3JldGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgd2hlbihjb25jcmV0ZSkge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdG9kbyBJbXBsZW1lbnRhdGlvblxyXG4gICAgICAgICAqL1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgQWJzdHJhY3QgVHlwZSBoYXMgYmVlbiBib3VuZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGJvdW5kKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIHJldHVybiAodHlwZW9mIHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIHx8ICh0eXBlb2YgdGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICAgICAgIHx8IHRoaXMuaXNBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsaWFzIG9mIHtAc2VlICR0aGlzLT5ib3VuZCgpfS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGhhcyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZChhYnN0cmFjdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBBYnN0cmFjdCBUeXBlIGhhcyBiZWVuIHJlc29sdmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgcmVzb2x2ZWQoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFic3RyYWN0IGlzIGFuIEFsaWFzXHJcbiAgICAgICAgaWYodGhpcy5pc0FsaWFzKGFic3RyYWN0KSkge1xyXG5cclxuICAgICAgICAgICAgLy8gUmVzb2x2ZSB0aGUgQWxpYXNcclxuICAgICAgICAgICAgdmFyIGFic3RyYWN0ID0gdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHdoZXRoZXIgb3Igbm90IHRoZSBJbnN0YW5jZSBoYXMgYmVlbiByZXNvbHZlZCBvciBzaGFyZWRcclxuICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLl9yZXNvbHZlZFthYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKVxyXG4gICAgICAgICAgICB8fCAodHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gVHlwZSBpcyBzaGFyZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc1NoYXJlZChhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgSW5zdGFuY2UgaXMgc2hhcmVkXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEJpbmRpbmcgaXMgU2hhcmVkXHJcbiAgICAgICAgaWYodGhpcy5fYmluZGluZ3NbYWJzdHJhY3RdID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIFR5cGUgaXMgbm90IHNoYXJlZFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIHN0cmluZyBpcyByZWdpc3RlcmVkIGFzIGFuIEFsaWFzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIG5hbWVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBpc0FsaWFzKG5hbWUpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGhpcy5fYWxpYXNlc1tuYW1lXSAhPT0gJ3VuZGVmaW5lZCcpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCBCaW5kaW5nIHdpdGggdGhpcyBDb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb258c3RyaW5nfG51bGx9ICBjb25jcmV0ZVxyXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICAgICAgICBzaGFyZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBiaW5kKGFic3RyYWN0LCBjb25jcmV0ZSwgc2hhcmVkKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIEFyZ3VtZW50c1xyXG4gICAgICAgIHZhciBjb25jcmV0ZSA9IGNvbmNyZXRlIHx8IG51bGw7XHJcbiAgICAgICAgdmFyIHNoYXJlZCA9IHNoYXJlZCB8fCBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gSWYgbm8gY29uY3JldGUgdHlwZSB3YXMgZ2l2ZW4sIHdlIHdpbGwgc2ltcGx5IHNldCB0aGUgY29uY3JldGUgdHlwZSB0byB0aGVcclxuICAgICAgICAvLyBhYnN0cmFjdCB0eXBlLiBBZnRlciB0aGF0LCB0aGUgY29uY3JldGUgdHlwZSB0byBiZSByZWdpc3RlcmVkIGFzIHNoYXJlZFxyXG4gICAgICAgIC8vIHdpdGhvdXQgYmVpbmcgZm9yY2VkIHRvIHN0YXRlIHRoZWlyIGNsYXNzZXMgaW4gYm90aCBvZiB0aGUgcGFyYW1ldGVycy5cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHNoYXJlZCBhbmQgYWxpYXNlZCBpbnN0YW5jZXNcclxuICAgICAgICB0aGlzLl9kcm9wU3RhbGVJbnN0YW5jZXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBhIENvbmNyZXRlIGRlZmluaXRpb24gd2Fzbid0IHByb3ZpZGVkXHJcbiAgICAgICAgaWYoY29uY3JldGUgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gRGVmaW5lIHRoZSBDb25jcmV0ZSBhcyB0aGUgQWJzdHJhY3RcclxuICAgICAgICAgICAgY29uY3JldGUgPSBhYnN0cmFjdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB0aGUgZmFjdG9yeSBpcyBub3QgYSBDbG9zdXJlLCBpdCBtZWFucyBpdCBpcyBqdXN0IGEgY2xhc3MgbmFtZSB3aGljaCBpc1xyXG4gICAgICAgIC8vIGJvdW5kIGludG8gdGhpcyBjb250YWluZXIgdG8gdGhlIGFic3RyYWN0IHR5cGUgYW5kIHdlIHdpbGwganVzdCB3cmFwIGl0XHJcbiAgICAgICAgLy8gdXAgaW5zaWRlIGl0cyBvd24gQ2xvc3VyZSB0byBnaXZlIHVzIG1vcmUgY29udmVuaWVuY2Ugd2hlbiBleHRlbmRpbmcuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBjb25jcmV0ZSBpc24ndCBhIENsb3N1cmVcclxuICAgICAgICBpZih0eXBlb2YgY29uY3JldGUgIT09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNsb3N1cmUgZnJvbSB0aGUgQWJzdHJhY3QgYW5kIENvbmNyZXRlXHJcbiAgICAgICAgICAgIGNvbmNyZXRlID0gdGhpcy5fZ2V0Q2xvc3VyZShhYnN0cmFjdCwgY29uY3JldGUpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlZmluZSB0aGUgQmluZGluZ1xyXG4gICAgICAgIHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XSA9IHtcclxuICAgICAgICAgICAgJ2NvbmNyZXRlJzogY29uY3JldGUsXHJcbiAgICAgICAgICAgICdzaGFyZWQnOiBzaGFyZWRcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgYWJzdHJhY3QgdHlwZSB3YXMgYWxyZWFkeSByZXNvbHZlZCBpbiB0aGlzIGNvbnRhaW5lciB3ZSdsbCBmaXJlIHRoZVxyXG4gICAgICAgIC8vIHJlYm91bmQgbGlzdGVuZXIgc28gdGhhdCBhbnkgb2JqZWN0cyB3aGljaCBoYXZlIGFscmVhZHkgZ290dGVuIHJlc29sdmVkXHJcbiAgICAgICAgLy8gY2FuIGhhdmUgdGhlaXIgY29weSBvZiB0aGUgb2JqZWN0IHVwZGF0ZWQgdmlhIHRoZSBsaXN0ZW5lciBjYWxsYmFja3MuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBBYnN0cmFjdCBUeXBlIHdhcyBhbHJlYWR5IHJlc29sdmVkXHJcbiAgICAgICAgaWYodGhpcy5yZXNvbHZlZChhYnN0cmFjdCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcmUgdGhlIFJlYm91bmQgRXZlbnRcclxuICAgICAgICAgICAgdGhpcy5fcmVib3VuZChhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgQmluZGluZyB3aXRoIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb25jcmV0ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q2xvc3VyZShhYnN0cmFjdCwgY29uY3JldGUpIHtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBDbG9zdXJlXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgcGFyYW1ldGVycykge1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgUGFyYW1ldGVyc1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwgW107XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgQWJzdHJhY3QgaXMgdGhlIENvbmNyZXRlXHJcbiAgICAgICAgICAgIGlmKGFic3RyYWN0ID09IGNvbmNyZXRlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgdGhlIENvbmNyZXRlIGluc3RhbmNlIHdpdGhvdXQgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5idWlsZChjb25jcmV0ZSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBDb25jcmV0ZSBpbnN0YW5jZSB3aXRoIHBhcm1hZXRlcnNcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5tYWtlKGNvbmNyZXRlLCBwYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgc3BlY2lmaWVkIE1ldGhvZCBCaW5kaW5nIGV4aXN0cy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBtZXRob2RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBoYXNNZXRob2RCaW5kaW5nKG1ldGhvZCkge1xyXG5cclxuICAgICAgICByZXR1cm4gKHR5cGVvZiB0aGlzLl9tZXRob2RCaW5kaW5nc1ttZXRob2RdICE9PSAndW5kZWZpbmVkJyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEJpbmRzIHRoZSBzcGVjaWZpZWQgQ2FsbGJhY2sgdG8gdGhlIGdpdmVuIG1ldGhvZCBzbyB0aGF0IGl0IG1heSByZXNvbHZlIHVzaW5nIHtAc2VlIENvbnRhaW5lci5jYWxsKCl9LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbn0gIGNhbGxiYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYmluZE1ldGhvZChtZXRob2QsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX21ldGhvZEJpbmRpbmdzW21ldGhvZF0gPSBjYWxsYmFjaztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbHMgdGhlIHNwZWNpZmllZCBNZXRob2QgQmluZGluZy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBtZXRob2RcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgIGluc3RhbmNlXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKi9cclxuICAgIGNhbGxNZXRob2RCaW5kaW5nKG1ldGhvZCwgaW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBDYWxsYmFja1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuX21ldGhvZEJpbmRpbmdzW21ldGhvZF07XHJcblxyXG4gICAgICAgIC8vIEludm9rZSB0aGUgQ2FsbGJhY2tcclxuICAgICAgICByZXR1cm4gY2FsbGJhY2soaW5zdGFuY2UsIHRoaXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIHRoZSBzcGVjaWZpZWQgQ29udGV4dHVhbCBCaW5kaW5nIHRvIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgIGNvbmNyZXRlXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb258c3RyaW5nfSAgaW1wbGVtZW50YXRpb25cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBhZGRDb250ZXh0dWFsQmluZGluZyhjb25jcmV0ZSwgYWJzdHJhY3QsIGltcGxlbWVudGF0aW9uKSB7XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dHVhbFtjb25jcmV0ZV1bdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCldID0gaW1wbGVtZW50YXRpb247XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIEJpbmRpbmcgaWYgaXQgaGFzbid0IGFscmVhZHkgYmVlbiByZWdpc3RlcmVkLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgICAgICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufHN0cmluZ3xudWxsfSAgY29uY3JldGVcclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgICAgICAgICAgICAgc2hhcmVkXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYmluZElmKGFic3RyYWN0LCBjb25jcmV0ZSwgc2hhcmVkKSB7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgQmluZGluZyBoYXNuJ3QgYWxyZWFkeSBiZWVuIHJlZ2lzdGVyZWRcclxuICAgICAgICBpZighdGhpcy5ib3VuZChhYnN0cmFjdCkpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBCaW5kaW5nXHJcbiAgICAgICAgICAgIHRoaXMuYmluZChhYnN0cmFjdCwgY29uY3JldGUsIHNoYXJlZCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXJzIHRoZSBzcGVjaWZpZWQgc2hhcmVkIGJpbmRpbmcgdG8gdGhpcyBDb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgICAgICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb258c3RyaW5nfG51bGx9ICBjb25jcmV0ZVxyXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gICAgICAgICAgICAgICBzaGFyZWRcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBiaW5kSWYoYWJzdHJhY3QsIGNvbmNyZXRlLCBzaGFyZWQgPSBmYWxzZSkge1xyXG5cclxuICAgICAgICAvLyBSZWdpc3RlciB0aGUgQmluZGluZ1xyXG4gICAgICAgIHRoaXMuYmluZChhYnN0cmFjdCwgY29uY3JldGUsIHNoYXJlZCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlZ2lzdGVycyB0aGUgc3BlY2lmaWVkIHNoYXJlZCBiaW5kaW5nIHRvIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICovXHJcbiAgICBzaW5nbGV0b24oYWJzdHJhY3QsIGNvbmNyZXRlID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMuYmluZChhYnN0cmFjdCwgY29uY3JldGUsIHRydWUpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEV4dGVuZCB0aGUgc3BlY2lmaWVkIEFic3RyYWN0IFR5cGUgaW4gdGhpcyBDb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGV4dGVuZChhYnN0cmFjdCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgLy8gUmVzb2x2ZSBhbnkgYWxpYXNlc1xyXG4gICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgQWJzdHJhY3QgVHlwZSBpcyBzaGFyZWRcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlYmluZCB0aGUgU2hhcmVkIEluc3RhbmNlXHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gPSBjYWxsYmFjayh0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEZpcmUgdGhlIFJlYm91bmQgRXZlbnRcclxuICAgICAgICAgICAgdGhpcy5fcmVib3VuZChhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXNzdW1lIHRoZSBBYnN0cmFjdCBUeXBlIGlzbid0IHNoYXJlZFxyXG4gICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgRXh0ZW5kZXJzIGlmIHRoZXkgZG9uJ3QgZXhpc3RcclxuICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMuX2V4dGVuZGVyc1thYnN0cmFjdF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9leHRlbmRlcnNbYWJzdHJhY3RdID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBFeHRlbmRlclxyXG4gICAgICAgICAgICB0aGlzLl9leHRlbmRlcnNbYWJzdHJhY3RdLnB1c2goY2FsbGJhY2spO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFic3RyYWN0IFR5cGUgaGFzIGJlZW4gcmVzb2x2ZWRcclxuICAgICAgICAgICAgaWYodGhpcy5yZXNvbHZlZChhYnN0cmFjdCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBGaXJlIHRoZSBSZWJvdW5kIEV2ZW50XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWJvdW5kKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgYW4gZXhpc3RpbmcgSW5zdGFuY2UgYXMgc2hhcmVkIGluIHRoaXMgQ29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICBpbnN0YW5jZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBpbnN0YW5jZShhYnN0cmFjdCwgaW5zdGFuY2UpIHtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFueSBBYnN0cmFjdCBBbGlhc2VzXHJcbiAgICAgICAgdGhpcy5fcmVtb3ZlQWJzdHJhY3RBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIFdlJ2xsIGNoZWNrIHRvIGRldGVybWluZSBpZiB0aGlzIHR5cGUgaGFzIGJlZW4gYm91bmQgYmVmb3JlLCBhbmQgaWYgaXQgaGFzXHJcbiAgICAgICAgLy8gd2Ugd2lsbCBmaXJlIHRoZSByZWJvdW5kIGNhbGxiYWNrcyByZWdpc3RlcmVkIHdpdGggdGhlIGNvbnRhaW5lciBhbmQgaXRcclxuICAgICAgICAvLyBjYW4gYmUgdXBkYXRlZCB3aXRoIGNvbnN1bWluZyBjbGFzc2VzIHRoYXQgaGF2ZSBnb3R0ZW4gcmVzb2x2ZWQgaGVyZS5cclxuXHJcbiAgICAgICAgLy8gUmVtZW1iZXIgd2hldGhlciBvciBub3QgdGhlIGluc3RhbmNlIHdhcyBib3VuZFxyXG4gICAgICAgIHZhciBpc0JvdW5kID0gdGhpcy5ib3VuZChhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZmluYWwgQWxpYXNcclxuICAgICAgICBkZWxldGUgdGhpcy5fYWxpYXNlc1thYnN0cmFjdF07XHJcblxyXG4gICAgICAgIC8vIEJpbmQgdGhlIEluc3RhbmNlIGFzIHNoYXJlZFxyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gPSBpbnN0YW5jZTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEluc3RhbmNlIHdhcyBvcmlnaW5hbGx5IGJvdW5kXHJcbiAgICAgICAgaWYoaXNCb3VuZCkge1xyXG5cclxuICAgICAgICAgICAgLy8gRmlyZSB0aGUgUmVib3VuZCBFdmVudFxyXG4gICAgICAgICAgICB0aGlzLl9yZWJvdWQoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgSW5zdGFuY2VcclxuICAgICAgICByZXR1cm4gaW5zdGFuY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBBbGlhcyBmb3IgdGhlIENvbnRleHR1YWwgQmluZGluZyBBbGlhcyBDYWNoZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBzZWFyY2hcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBfcmVtb3ZlQWJzdHJhY3RBbGlhcyhzZWFyY2gpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIFNlYXJjaCBpc24ndCBhbiBBbGlhcywgdGhlbiBkb24ndCBib3RoZXJcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fYWxpYXNlc1tzZWFyY2hdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEFic3RyYWN0IEFsaWFzZXNcclxuICAgICAgICBmb3IodmFyIGFic3RyYWN0IGluIHRoaXMuX2Fic3RyYWN0QWxpYXNlcykge1xyXG5cclxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBQcm9wZXJ0eSBleGlzdHNcclxuICAgICAgICAgICAgaWYoIXRoaXMuX2Fic3RyYWN0QWxpYXNlcy5oYXNPd25Qcm9wZXJ0eShhYnN0cmFjdCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIEFsaWFzZXNcclxuICAgICAgICAgICAgdmFyIGFsaWFzZXMgPSB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBBbGlhc2VzXHJcbiAgICAgICAgICAgIGZvcih2YXIgaW5kZXggPSAwOyBpbmRleCA8IGFsaWFzZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBBbGlhc1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsaWFzID0gYWxpYXNlc1tpbmRleF07XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFsaWFzIGlzIHRoZSBTZWFyY2ggS2V5XHJcbiAgICAgICAgICAgICAgICBpZihhbGlhcyA9PSBzZWFyY2gpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBBYnN0cmFjdCBBbGlhc1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgQWxpYXMgZm9yIHRoZSBDb250ZXh0dWFsIEJpbmRpbmcgQWxpYXMgQ2FjaGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfGFycmF5fSAgYWJzdHJhY3RzXHJcbiAgICAgKiBAcGFyYW0gIHsuLi5zdHJpbmd9ICAgICAuLi50YWdzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgdGFnKGFic3RyYWN0cywgLi4udGFncykge1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIEFic3RyYWN0c1xyXG4gICAgICAgIGlmKHR5cGVvZiBhYnN0cmFjdHMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciBhYnN0cmFjdHMgPSBbYWJzdHJhY3RzXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIFRhZ1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0YWdzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgVGFnXHJcbiAgICAgICAgICAgIHZhciB0YWcgPSB0YWdzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIFRhZyBoYXNuJ3QgYmVlbiBpbml0aWFsaXplZFxyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5fdGFnc1t0YWddID09PSAndW5kZWZpbmVkJykge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFRhZ3NcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhZ3NbdGFnXSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSB0aGUgQWJzdHJhY3RzXHJcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBhYnN0cmFjdHMubGVuZ3RoOyBqKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgQWJzdHJhY3RcclxuICAgICAgICAgICAgICAgIHZhciBhYnN0cmFjdCA9IGFic3RyYWN0c1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgZWFjaCBBYnN0cmFjdFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGFnc1t0YWddLnB1c2goYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbGwgb2YgdGhlIHRhZ3MgZm9yIHRoZSBnaXZlbiBiaW5kaW5nLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIHRhZ1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICB0YWdnZWQodGFnKSB7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFJlc3VsdHNcclxuICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHRhZyBleGlzdHNcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5fdGFnc1t0YWddID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgdGFnc1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLl90YWdzW3RhZ10ubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgY3VycmVudCBhYnN0cmFjdCBiaW5kaW5nXHJcbiAgICAgICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuX3RhZ3NbdGFnXVtpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgdGhlIGJpbmRpbmcgYW5kIGFwcGVuZCBpdCB0byB0aGUgcmVzdWx0c1xyXG4gICAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5tYWtlKGFic3RyYWN0KSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBSZXN1bHRzXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsaWFzZXMgdGhlIHNwZWNpZmllZCB0eXBlIHRvIGEgZGlmZmVyZW50IG5hbWUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFsaWFzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgYWxpYXMoYWJzdHJhY3QsIGFsaWFzKSB7XHJcblxyXG4gICAgICAgIC8vIEFzc2lnbiB0aGUgQWxpYXNcclxuICAgICAgICB0aGlzLl9hbGlhc2VzW2FsaWFzXSA9IGFic3RyYWN0O1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBBYnN0cmFjdCBBbGlhc2VzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2Fic3RyYWN0QWxpYXNlc1thYnN0cmFjdF0gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Fic3RyYWN0QWxpYXNlc1thYnN0cmFjdF0gPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgQWJzdHJhY3QgQWxpYXNcclxuICAgICAgICB0aGlzLl9hYnN0cmFjdEFsaWFzZXNbYWJzdHJhY3RdLnB1c2goYWxpYXMpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCaW5kcyB0aGUgc3BlY2lmaWVkIGNhbGxiYWNrIHRvIGFuIGFic3RyYWN0J3MgcmViaW5kIGV2ZW50LlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge2Z1bmN0aW9ufSAgY2FsbGJhY2tcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqL1xyXG4gICAgcmViaW5kaW5nKGFic3RyYWN0LCBjYWxsYmFjaykge1xyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIGFueSBhbGlhc2VzXHJcbiAgICAgICAgdmFyIGFic3RyYWN0ID0gdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFJlYm91bmQgQ2FsbGJhY2tzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX3JlYm91bmRDYWxsYmFja3NbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICB0aGlzLl9yZWJvdW5kQ2FsbGJhY2tzW2Fic3RyYWN0XSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXBwZW5kIHRoZSByZWJpbmQgY2FsbGJhY2tcclxuICAgICAgICB0aGlzLl9yZWJvdW5kQ2FsbGJhY2tzW2Fic3RyYWN0XS5wdXNoKGNhbGxiYWNrKTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIEFic3RyYWN0IGFzIGFscmVhZHkgYmVlbiBib3VuZFxyXG4gICAgICAgIGlmKHRoaXMuYm91bmQoYWJzdHJhY3QpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2UoYWJzdHJhY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIE5VTExcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVmcmVzaCBhbiBpbnN0YW5jZSB1c2luZyB0aGUgZ2l2ZW4gdGFyZ2V0IGFuZCBtZXRob2QuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqIEBwYXJhbSAge21peGVkfSAgIHRhcmdldFxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgbWV0aG9kXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKi9cclxuICAgIHJlZnJlc2goYWJzdHJhY3QsIHRhcmdldCwgbWV0aG9kKSB7XHJcblxyXG4gICAgICAgIC8vIFJlZ2lzdGVyIGEgUmViaW5kaW5nIENhbGxiYWNrXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmViaW5kaW5nKGFic3RyYWN0LCBmdW5jdGlvbihhcHAsIGluc3RhbmNlKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWxsIHRoZSBUYXJnZXQncyBNZXRob2RcclxuICAgICAgICAgICAgdGFyZ2V0W21ldGhvZF0oaW5zdGFuY2UpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSW52b2tlIHRoZSBcInJlYm91bmRcIiBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX3JlYm91bmQoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gUmVzb2x2ZSB0aGUgaW5zdGFuY2VcclxuICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLm1ha2UoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHJlYm91bmQgY2FsbGJhY2tzXHJcbiAgICAgICAgZm9yKGxldCBjYWxsYmFjayBvZiB0aGlzLl9nZXRSZWJvdW5kQ2FsbGJhY2tzKGFic3RyYWN0KSkge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShudWxsLCBbdGhpcywgaW5zdGFuY2VdKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIHJlYm91bmQgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBfZ2V0UmVib3VuZENhbGxiYWNrcyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHJlYm91bmQgY2FsbGJhY2tzIGV4aXN0XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX3JlYm91bmRDYWxsYmFja3NbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHJlYm91bmQgY2FsbGJhY2tzXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlYm91bmRDYWxsYmFja3NbYWJzdHJhY3RdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyB0aGUgZ2l2ZW4gY2xvc3VyZSBzdWNoIHRoYXQgaXRzIGRlcGVuZGVuY2llcyB3aWxsIGJlIGluamVjdGVkIHdoZW4gZXhlY3V0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb259ICBjYWxsYmFja1xyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICBwYXJhbWV0ZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7ZnVuY3Rpb259XHJcbiAgICAgKi9cclxuICAgIHdyYXAoY2FsbGJhY2ssIHBhcmFtZXRlcnMgPSBbXSkge1xyXG5cclxuICAgICAgICAvLyBSZXR1cm4gYSB3cmFwcGluZyBjbG9zdXJlXHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbChjYWxsYmFjaywgcGFyYW1ldGVycyk7XHJcbiAgICAgICAgfSkuYmluZCh0aGlzKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FsbHMgdGhlIGdpdmVuIENsb3N1cmUgLyBjbGFzc0BtZXRob2QgYW5kIGluamVjdHMgaXRzIGRlcGVuZGVuY2llcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtmdW5jdGlvbnxzdHJpbmd9ICBjYWxsYmFja1xyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICAgICAgICAgcGFyYW1ldGVyc1xyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfG51bGx9ICAgICAgZGVmYXVsdE1ldGhvZFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBjYWxsKGNhbGxiYWNrLCBwYXJhbWV0ZXJzID0gW10sIGRlZmF1bHRNZXRob2QgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIHJldHVybiBGcmFtZXdvcmsuQm91bmRNZXRob2QuY2FsbCh0aGlzLCBjYWxsYmFjaywgcGFyYW1ldGVycywgZGVmYXVsdE1ldGhvZCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSBjbG9zdXJlIHRvIHJlc29sdmUgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUgZnJvbSB0aGlzIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxyXG4gICAgICovXHJcbiAgICBmYWN0b3J5KGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgY2xvc3VyZVxyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1ha2UoYWJzdHJhY3QpO1xyXG4gICAgICAgIH0pLmJpbmQodGhpcyk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFsaWFzIG9mIHtAc2VlIHRoaXMubWFrZSgpfS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBtYWtlV2l0aChhYnN0cmFjdCwgcGFyYW1ldGVycyA9IFtdKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXMgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUgZnJvbSB0aGlzIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBtYWtlKGFic3RyYWN0LCBwYXJhbWV0ZXJzID0gW10pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZXNvbHZlKGFic3RyYWN0LCBwYXJhbWV0ZXJzKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXNvbHZlcyB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZSBmb3JtIHRoaXMgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7bWl4ZWR9XHJcbiAgICAgKlxyXG4gICAgICogQHRocm93cyB7RXJyb3J9XHJcbiAgICAgKi9cclxuICAgIGdldChhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIEFic3RyYWN0IHR5cGUgaXMgZGVmaW5lZFxyXG4gICAgICAgIGlmKCF0aGlzLmhhcyhhYnN0cmFjdCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBBYnN0cmFjdCB0eXBlIFske2Fic3RyYWN0fV0gaXMgbm90IGJvdW5kIHRvIHRoZSBjb250YWluZXIuYCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXNvbHZlIHRoZSBBYnN0cmFjdCB0eXBlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzb2x2ZShhYnN0cmFjdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVzb2x2ZXMgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUgZnJvbSB0aGlzIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgcGFyYW1ldGVyc1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICByZXNvbHZlKGFic3RyYWN0LCBwYXJhbWV0ZXJzID0gW10pIHtcclxuXHJcbiAgICAgICAgLy8gUmVzb2x2ZSBhbnkgYWxpYXNlc1xyXG4gICAgICAgIHZhciBhYnN0cmFjdCA9IHRoaXMuZ2V0QWxpYXMoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdGhlIGluc3RhbmNlIHdpbGwgbmVlZCBjb250ZXh0dWFsIGJpbmRpbmdcclxuICAgICAgICB2YXIgbmVlZHNDb250ZXh0dWFsQnVpbGQgPSBwYXJhbWV0ZXJzLmxlbmd0aCAhPT0gMCB8fCB0aGlzLl9nZXRDb250ZXh0dWFsQ29uY3JldGUoYWJzdHJhY3QpICE9PSBudWxsO1xyXG5cclxuICAgICAgICAvLyBJZiBhbiBpbnN0YW5jZSBvZiB0aGUgdHlwZSBpcyBjdXJyZW50bHkgYmVpbmcgbWFuYWdlZCBhcyBhIHNpbmdsZXRvbiB3ZSdsbFxyXG4gICAgICAgIC8vIGp1c3QgcmV0dXJuIGFuIGV4aXN0aW5nIGluc3RhbmNlIGluc3RlYWQgb2YgaW5zdGFudGlhdGluZyBuZXcgaW5zdGFuY2VzXHJcbiAgICAgICAgLy8gc28gdGhlIGRldmVsb3BlciBjYW4ga2VlcCB1c2luZyB0aGUgc2FtZSBvYmplY3RzIGluc3RhbmNlIGV2ZXJ5IHRpbWUuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGFuIGluc3RhbmNlIGFscmVhZHkgZXhpc3RzIGFzIGEgc2luZ2xldG9uXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF0gIT09ICd1bmRlZmluZWQnICYmICFuZWVkc0NvbnRleHR1YWxCdWlsZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFB1c2ggdGhlIFBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLl93aXRoLnB1c2gocGFyYW1ldGVycyk7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgY29uY3JldGUgaW5zdGFuY2VcclxuICAgICAgICB2YXIgY29uY3JldGUgPSB0aGlzLl9nZXRDb25jcmV0ZShhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIC8vIFdlJ3JlIHJlYWR5IHRvIGluc3RhbnRpYXRlIGFuIGluc3RhbmNlIG9mIHRoZSBjb25jcmV0ZSB0eXBlIHJlZ2lzdGVyZWQgZm9yXHJcbiAgICAgICAgLy8gdGhlIGJpbmRpbmcuIFRoaXMgd2lsbCBpbnN0YW50aWF0ZSB0aGUgdHlwZXMsIGFzIHdlbGwgYXMgcmVzb2x2ZSBhbnkgb2ZcclxuICAgICAgICAvLyBpdHMgXCJuZXN0ZWRcIiBkZXBlbmRlbmNpZXMgcmVjdXJzaXZlbHkgdW50aWwgYWxsIGhhdmUgZ290dGVuIHJlc29sdmVkLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgaW5zdGFuY2UgaXMgYnVpbGRhYmxlXHJcbiAgICAgICAgaWYodGhpcy5faXNCdWlsZGFibGUoY29uY3JldGUsIGFic3RyYWN0KSkge1xyXG5cclxuICAgICAgICAgICAgLy8gV2UncmUgZmluYWxseSBhdCBhIHBvaW50IHRvIHdoZXJlIHdlIGNhbiBidWlsZCB0aGUgY29uY3JldGVcclxuICAgICAgICAgICAgLy8gdHlwZSwgcHJvdmlkaW5nIHVzIHdpdGggYW4gY29uY3JldGUgaW5zdGFuY2UuIE1vc3Qgb2YgdGhlXHJcbiAgICAgICAgICAgIC8vIGRlcGVuZGVuY2llcyBzaG91bGQgYmUgcmVzb2x2ZWQgYnkgbm93LCBzbyB3ZSdyZSBnb29kLlxyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgdGhlIGluc3RhbmNlXHJcbiAgICAgICAgICAgIHZhciBvYmplY3QgPSB0aGlzLmJ1aWxkKGNvbmNyZXRlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBc3N1bWUgdGhlIGluc3RhbmNlIGlzIG5vdCBidWlsZGFibGVcclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFdlJ3JlIGEgc3RlcCBmdXJ0aGVyIGluIHRoZSBjaGFpbiwgYnV0IHdlJ3JlIG5vdCBxdWl0ZSBkb25lXHJcbiAgICAgICAgICAgIC8vIHlldC4gV2UnbGwgaGF2ZSB0byBjYWxsIG1ha2Ugb24gdGhlIGNvbmNyZXRlIHR5cGUgdG8gZ2V0XHJcbiAgICAgICAgICAgIC8vIGV2ZW4gZnVydGhlciBhbG9uZywgaG9waW5nIHRoYXQgd2UgZG9uJ3QgZW5kIHVwIGhlcmUuXHJcblxyXG4gICAgICAgICAgICAvLyBNYWtlIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgICAgICB2YXIgb2JqZWN0ID0gdGhpcy5tYWtlKGNvbmNyZXRlKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBkZWZpbmVkIGFueSBleHRlbmRlcnMgZm9yIHRoaXMgdHlwZSwgd2UnbGwgbmVlZCB0byBzcGluIHRocm91Z2ggdGhlbVxyXG4gICAgICAgIC8vIGFuZCBhcHBseSB0aGVtIHRvIHRoZSBvYmplY3QgYmVpbmcgYnVpbHQuIFRoaXMgYWxsb3dzIGZvciB0aGUgZXh0ZW5zaW9uXHJcbiAgICAgICAgLy8gb2Ygc2VydmljZXMsIHN1Y2ggYXMgY2hhbmdpbmcgY29uZmlndXJhdGlvbiBvciBkZWNvcmF0aW5nIHRoZSBvYmplY3QuXHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgRXh0ZW5kZXJzXHJcbiAgICAgICAgZm9yKGxldCBleHRlbmRlciBvZiB0aGlzLl9nZXRFeHRlbmRlcnMoYWJzdHJhY3QpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBJbnZva2UgZWFjaCBFeHRlbmRlclxyXG4gICAgICAgICAgICBleHRlbmRlci5hcHBseShudWxsLCBbb2JqZWN0LCB0aGlzXSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHJlcXVlc3RlZCB0eXBlIGlzIHJlZ2lzdGVyZWQgYXMgYSBzaW5nbGV0b24gd2UnbGwgd2FudCB0byBjYWNoZSBvZmZcclxuICAgICAgICAvLyB0aGUgaW5zdGFuY2VzIGluIFwibWVtb3J5XCIgc28gd2UgY2FuIHJldHVybiBpdCBsYXRlciB3aXRob3V0IGNyZWF0aW5nIGFuXHJcbiAgICAgICAgLy8gZW50aXJlbHkgbmV3IGluc3RhbmNlIG9mIGFuIG9iamVjdCBvbiBlYWNoIHN1YnNlcXVlbnQgcmVxdWVzdCBmb3IgaXQuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBvYmplY3Qgc2hvdWxkIGJlIGEgc2luZ2xldG9uXHJcbiAgICAgICAgaWYodGhpcy5pc1NoYXJlZChhYnN0cmFjdCkgJiYgIW5lZWRzQ29udGV4dHVhbEJ1aWxkKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBDYWNoZSB0aGUgaW5zdGFuY2VcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2VzW2Fic3RyYWN0XSA9IG9iamVjdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaXJlIGFueSByZXNvbHZpbmcgY2FsbGJhY2tzXHJcbiAgICAgICAgdGhpcy5fZmlyZVJlc29sdmluZ0NhbGxiYWNrcyhhYnN0cmFjdCwgb2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy8gQmVmb3JlIHJldHVybmluZywgd2Ugd2lsbCBhbHNvIHNldCB0aGUgcmVzb2x2ZWQgZmxhZyB0byBcInRydWVcIiBhbmQgcG9wIG9mZlxyXG4gICAgICAgIC8vIHRoZSBwYXJhbWV0ZXIgb3ZlcnJpZGVzIGZvciB0aGlzIGJ1aWxkLiBBZnRlciB0aG9zZSB0d28gdGhpbmdzIGFyZSBkb25lXHJcbiAgICAgICAgLy8gd2Ugd2lsbCBiZSByZWFkeSB0byByZXR1cm4gYmFjayB0aGUgZnVsbHkgY29uc3RydWN0ZWQgY2xhc3MgaW5zdGFuY2UuXHJcblxyXG4gICAgICAgIC8vIE1hcmsgdGhlIGFic3RyYWN0IGFzIHJlc29sdmVkXHJcbiAgICAgICAgdGhpcy5fcmVzb2x2ZWRbYWJzdHJhY3RdID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gUG9wIHRoZSBQYXJhbWV0ZXJzXHJcbiAgICAgICAgdGhpcy5fd2l0aC5wb3AoKTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxyXG4gICAgICAgIHJldHVybiBvYmplY3Q7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNvbmNyZXRlIHR5cGUgZm9yIHRoZSBzcGVjaWZpZWQgYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBfZ2V0Q29uY3JldGUoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBjb250ZXh0dWFsIGNvbmNyZXRlIHR5cGVcclxuICAgICAgICB2YXIgY29uY3JldGUgPSB0aGlzLl9nZXRDb250ZXh0dWFsQ29uY3JldGUoYWJzdHJhY3QpO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgYSBjb250ZXh0dWFsIGNvbmNyZXRlIHR5cGVcclxuICAgICAgICBpZihjb25jcmV0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29uY3JldGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIGEgcmVnaXN0ZXJlZCByZXNvbHZlciBvciBjb25jcmV0ZSBmb3IgdGhlIHR5cGUsIHdlJ2xsIGp1c3RcclxuICAgICAgICAvLyBhc3N1bWUgZWFjaCB0eXBlIGlzIGEgY29uY3JldGUgbmFtZSBhbmQgd2lsbCBhdHRlbXB0IHRvIHJlc29sdmUgaXQgYXMgaXNcclxuICAgICAgICAvLyBzaW5jZSB0aGUgY29udGFpbmVyIHNob3VsZCBiZSBhYmxlIHRvIHJlc29sdmUgY29uY3JldGVzIGF1dG9tYXRpY2FsbHkuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhbiBleGlzdGluZyBiaW5kaW5nXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2JpbmRpbmdzW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFVzZSB0aGUgY29uY3JldGUgdHlwZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmluZGluZ3NbYWJzdHJhY3RdWydjb25jcmV0ZSddO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVzZSB0aGUgYWJzdHJhY3QgdHlwZSBhcyB0aGUgY29uY3JldGUgdHlwZVxyXG4gICAgICAgIHJldHVybiBhYnN0cmFjdDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY29udGV4dHVhbCBjb25jcmV0ZSBiaW5kaW5nIGZvciB0aGUgc3BlY2lmaWVkIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuICB7c3RyaW5nfG51bGx9XHJcbiAgICAgKi9cclxuICAgIF9nZXRDb250ZXh0dWFsQ29uY3JldGUoYWJzdHJhY3QpIHtcclxuXHJcbiAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGNvbnRleHR1YWwgYmluZGluZyB1c2luZyB0aGUgYWJzdHJhY3QgdHlwZVxyXG4gICAgICAgIHZhciBiaW5kaW5nID0gdGhpcy5fZmluZEluQ29udGV4dHVhbEJpbmRpbmdzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSBjb250ZXh0dWFsIGJpbmRpbmcgd2FzIGZvdW5kXHJcbiAgICAgICAgaWYoYmluZGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYmluZGluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5leHQgd2UgbmVlZCB0byBzZWUgaWYgYSBjb250ZXh0dWFsIGJpbmRpbmcgbWlnaHQgYmUgYm91bmQgdW5kZXIgYW4gYWxpYXMgb2YgdGhlXHJcbiAgICAgICAgLy8gZ2l2ZW4gYWJzdHJhY3QgdHlwZS4gU28sIHdlIHdpbGwgbmVlZCB0byBjaGVjayBpZiBhbnkgYWxpYXNlcyBleGlzdCB3aXRoIHRoaXNcclxuICAgICAgICAvLyB0eXBlIGFuZCB0aGVuIHNwaW4gdGhyb3VnaCB0aGVtIGFuZCBjaGVjayBmb3IgY29udGV4dHVhbCBiaW5kaW5ncyBvbiB0aGVzZS5cclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBhYnN0cmFjdCB0eXBlIGhhcyBhbGlhc2VzXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuX2Fic3RyYWN0QWxpYXNlc1thYnN0cmFjdF0gPT09ICd1bmRlZmluZWQnIHx8IE9iamVjdC5rZXlzKHRoaXMuX2Fic3RyYWN0QWxpYXNlc1thYnN0cmFjdF0pLmxlbmd0aCA9PT0gMCkge1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlcmUgYXJlbid0IGFueSBhbGlhc2VzIHRvIHNwaW4gdGhyb3VnaCwgc28gc3RvcCBoZXJlXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgQWJzdHJhY3QgQWxpYXNlc1xyXG4gICAgICAgIGZvcihsZXQgYWxpYXMgb2YgdGhpcy5fYWJzdHJhY3RBbGlhc2VzW2Fic3RyYWN0XSkge1xyXG5cclxuICAgICAgICAgICAgLy8gVHJ5IHRvIGZpbmQgdGhlIGNvbnRleHR1YWwgYmluZGluZyB1c2luZyB0aGUgYWJzdHJhY3QgdHlwZVxyXG4gICAgICAgICAgICB2YXIgYmluZGluZyA9IHRoaXMuX2ZpbmRJbkNvbnRleHR1YWxCaW5kaW5ncyhhbGlhcyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhIGNvbnRleHR1YWwgYmluZGluZyB3YXMgZm91bmRcclxuICAgICAgICAgICAgaWYoYmluZGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJpbmRpbmc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBObyBiaW5kaW5nIHdhcyBmb3VuZFxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgY29uY3JldGUgYmluZGluZyBmb3IgdGhlIGdpdmVuIGFic3RyYWN0IGluIHRoZSBjb250ZXh0dWFsIGJpbmRpbmcgYXJyYXkuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd8bnVsbH1cclxuICAgICAqL1xyXG4gICAgX2ZpbmRJbkNvbnRleHR1YWxCaW5kaW5ncyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIEJ1aWxkIFN0YWNrIGhhcyBpdGVtc1xyXG4gICAgICAgIGlmKHRoaXMuX2J1aWxkU3RhY2subGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGxhc3QgaXRlbSBpbiB0aGUgYnVpbGQgc3RhY2tcclxuICAgICAgICB2YXIgYnVpbGQgPSB0aGlzLl9idWlsZFN0YWNrW3RoaXMuX2J1aWxkU3RhY2subGVuZ3RoIC0gMV07XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIENvbnRleHR1YWwgQmluZGluZ1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNvbnRleHR1YWxbYnVpbGRdW2Fic3RyYWN0XSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgQ29udGV4dHVhbCBCaW5kaW5nXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnRleHR1YWxbYnVpbGRdW2Fic3RyYWN0XTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBObyBDb250ZXh0dWFsIEJpbmRpbmdcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gY29uY3JldGUgdHlwZSBpcyBidWlsZGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgY29uY3JldGVcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgICAqL1xyXG4gICAgX2lzQnVpbGRhYmxlKGNvbmNyZXRlLCBhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY29uY3JldGUgdHlwZSBpcyB0aGUgYWJzdHJhY3QgdHlwZSwgb3IgdGhlIGNvbmNyZXRlXHJcbiAgICAgICAgLy8gdHlwZSBpcyBhIGZ1bmN0aW9uLCB0aGVuIHdlIGNhbiBidWlsZCB0aGUgYWJzdHJhY3QgdHlwZS5cclxuICAgICAgICAvLyBPdGhlcndpc2UsIHdlIGhhdmUgdG8gdXNlIG1ha2UgZm9yIHRoZSBjb25jcmV0ZSB0eXBlLlxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gd2hldGhlciBvciBub3QgdGhlIGNvbmNyZXRlIHR5cGUgaWYgYnVpbGRhYmxlXHJcbiAgICAgICAgcmV0dXJuIGNvbmNyZXRlID09PSBhYnN0cmFjdCB8fCB0eXBlb2YgY29uY3JldGUgPT09ICdmdW5jdGlvbic7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEluc3RhbnRpYXRlIGEgY29uY3JldGUgaW5zdGFuY2Ugb2YgdGhlIGdpdmVuIHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfGZ1bmN0aW9ufSAgY29uY3JldGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHttaXhlZH1cclxuICAgICAqXHJcbiAgICAgKiBAdGhyb3dzIHtFcnJvcn1cclxuICAgICAqL1xyXG4gICAgYnVpbGQoY29uY3JldGUpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNvbmNyZXRlIHR5cGUgaXMgYWN0dWFsbHkgYSBDbG9zdXJlLCB3ZSB3aWxsIGp1c3QgZXhlY3V0ZSBpdCBhbmRcclxuICAgICAgICAvLyBoYW5kIGJhY2sgdGhlIHJlc3VsdHMgb2YgdGhlIGZ1bmN0aW9ucywgd2hpY2ggYWxsb3dzIGZ1bmN0aW9ucyB0byBiZVxyXG4gICAgICAgIC8vIHVzZWQgYXMgcmVzb2x2ZXJzIGZvciBtb3JlIGZpbmUtdHVuZWQgcmVzb2x1dGlvbiBvZiB0aGVzZSBvYmplY3RzLlxyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgY29uY3JldGUgdHlwZSBpcyBhIENsb3N1cmVcclxuICAgICAgICBpZih0eXBlb2YgY29uY3JldGUgPT09ICdmdW5jdGlvbicgJiYgIU9iai5pc0NsYXNzKGNvbmNyZXRlKSkge1xyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSByZXN1bHRzIG9mIHRoZSBjbG9zdXJlXHJcbiAgICAgICAgICAgIHJldHVybiBjb25jcmV0ZSh0aGlzLCB0aGlzLl9nZXRMYXN0UGFyYW1ldGVyT3ZlcnJpZGUoKSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29tZXRpbWVzIENsYXNzZXMgbWF5IGJlIG5hbWVzcGFjZWQgYW5kIHRodXMgbmVzdGVkIGluIHRoZSB3aW5kb3cgdmlhXHJcbiAgICAgICAgLy8gbmVzdGVkIG9iamVjdHMuIEFzIGEgY2xhc3Mgc3RyaW5nLCB0aGlzIGNhbiBiZSBkZW5vdGVkIHVzaW5nIFwiZG90XCJcclxuICAgICAgICAvLyBub3RhdGlvbi4gSWYgbmFtZXNwYWNlcyBhcmUgdXNlZCwgd2UnbGwgbmVlZCB0byByZXNvbHZlIHRoZW0uXHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgdGhlIENsYXNzIE5hbWVzcGFjZVxyXG4gICAgICAgIHZhciBkZWZpbml0aW9uID0gdGhpcy5fcmVzb2x2ZUNsYXNzTmFtZXNwYWNlKGNvbmNyZXRlKTtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBDbGFzcyBOYW1lc3BhY2UgcmVzb2x2ZWRcclxuICAgICAgICBpZihkZWZpbml0aW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2xhc3MgWyR7Y29uY3JldGV9XSBkb2VzIG5vdCBleGlzdC5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIElmIHRoZSB0eXBlIGlzIG5vdCBpbnN0YW50aWFibGUsIHRoZSBkZXZlbG9wZXIgaXMgYXR0ZW1wdGluZyB0byByZXNvbHZlXHJcbiAgICAgICAgLy8gYW4gYWJzdHJhY3QgdHlwZSBzdWNoIGFzIGFuIEludGVyZmFjZSBvZiBBYnN0cmFjdCBDbGFzcyBhbmQgdGhlcmUgaXNcclxuICAgICAgICAvLyBubyBiaW5kaW5nIHJlZ2lzdGVyZWQgZm9yIHRoZSBhYnN0cmFjdGlvbnMgc28gd2UgbmVlZCB0byBiYWlsIG91dC5cclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBjb25jcmV0ZSB0eXBlIGlzIGluc3RhbnRpYWJsZVxyXG4gICAgICAgIGlmKHR5cGVvZiBkZWZpbml0aW9uICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBkZWZpbml0aW9uLnByb3RvdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vdEluc3RhbnRpYWJsZShjb25jcmV0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZGQgdGhlIGNvbmNyZXRlIHR5cGUgdG8gdGhlIGJ1aWxkIHN0YWNrXHJcbiAgICAgICAgdGhpcy5fYnVpbGRTdGFjay5wdXNoKGNvbmNyZXRlKTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IEluc3RhbmNlXHJcbiAgICAgICAgdmFyIGluc3RhbmNlID0gbmV3IGRlZmluaXRpb247XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgQ29uc3RydWN0b3JcclxuICAgICAgICB2YXIgY29uc3RydWN0b3IgPSBpbnN0YW5jZS5jb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNvbnN0cnVjdG9yIGRvZXMgbm90IHRha2UgYW55IGFyZ21lbnRzLCB0aGVuIHRoZXJlJ3Mgbm90aGluZ1xyXG4gICAgICAgIC8vIHRoYXQgd2UgbmVlZCB0byByZXNvbHZlIGFzIGEgZGVwZW5kZW5jeS4gU2luY2Ugd2UgaGFkIHRvIGNyZWF0ZVxyXG4gICAgICAgIC8vIGFuIGVtcHR5IGluc3RhbmNlIHRvIGdldCB0aGUgY29uc3RydWN0b3IsIHdlIGNhbiByZXR1cm4gaXQuXHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBDb25zdHJ1Y3RvciBkb2VzIG5vdCByZXF1aXJlIGFueSBhcmd1bWVudHNcclxuICAgICAgICBpZihjb25zdHJ1Y3Rvci5sZW5ndGggPT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY29uY3JldGUgZnJvbSB0aGUgYnVpbGQgc3RhY2tcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRTdGFjay5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbmV3IEluc3RhbmNlXHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhlIGNsYXNzIHJlcXVpcmVzIGFyZ3VtZW50cyBmb3IgaXRzXHJcbiAgICAgICAgLy8gY29uc3RydWN0b3IuIFdlJ2xsIGhhdmUgdG8gaG9wZSB0aGF0IHRoZSBkZXZlbG9wZXIgcGFzc2VkIHVzXHJcbiAgICAgICAgLy8gdGhlIHBhcmFtZXRlcnMgbmVlZGVkIHRvIGRvIHRoaXMuIE90aGVyd2lzZSwgd2UnbGwgZmFpbC5cclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBsYXN0IHBhcmFtZXRlciBvdmVycmlkZVxyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0gdGhpcy5fZ2V0TGFzdFBhcmFtZXRlck92ZXJyaWRlKCk7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIGVub3VnaCBwYXJhbWV0ZXJzIHdlcmUgcHJvdmlkZWRcclxuICAgICAgICBpZihjb25zdHJ1Y3Rvci5sZW5ndGggPD0gcGFyYW1ldGVycy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgY29uY3JldGUgZnJvbSB0aGUgYnVpbGQgc3RhY2tcclxuICAgICAgICAgICAgdGhpcy5fYnVpbGRTdGFjay5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiB0aGUgbmV3IEluc3RhbmNlXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgZGVmaW5pdGlvbiguLi5wYXJhbWV0ZXJzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhlIGNsYXNzIHJlcXVpcmVzIGFyZ3VtZW50cyBmb3IgaXRzXHJcbiAgICAgICAgLy8gY29uc3RydWN0b3IsIGJ1dCB0aGVyZSdzIHJlYWxseSBubyB3YXkgZm9yIHVzIHRvIGtub3cgd2hhdCB0b1xyXG4gICAgICAgIC8vIHBhc3MgaW4uIFdlJ3JlIHN0dWNrIHRlbGxpbmcgdGhlIGRldmVsb3BlciB0byBoZWxwIHVzIG91dC5cclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBjb25jcmV0ZSBmcm9tIHRoZSBidWlsZCBzdGFja1xyXG4gICAgICAgIHRoaXMuX2J1aWxkU3RhY2sucG9wKCk7XHJcblxyXG4gICAgICAgIC8vIFRocm93IGFuIEVycm9yXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDbGFzcyAke2RlZmluaXRpb259IGhhcyB1bnJlc29sdmFibGUgZGVwZW5kZW5jaWVzLmApO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBDbGFzcyBOYW1lIGludG8gYSBDbGFzcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBjb25jcmV0ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge29iamVjdHxudWxsfVxyXG4gICAgICovXHJcbiAgICBfcmVzb2x2ZUNsYXNzTmFtZXNwYWNlKGNvbmNyZXRlKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIFwiZG90XCIgbm90YXRpb24gaXNuJ3QgdXNlZFxyXG4gICAgICAgIGlmKGNvbmNyZXRlLmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgaW1tZWRpYXRlbHlcclxuICAgICAgICAgICAgcmV0dXJuIHdpbmRvd1tjb25jcmV0ZV07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGV4cGxpY3QgY2xhc3MgbmFtZSBpcyBkZWZpbmVkXHJcbiAgICAgICAgaWYodHlwZW9mIHdpbmRvd1tjb25jcmV0ZV0gIT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBSZXNvbHZlIHVzaW5nIHRoZSBleHBsaWNpdCBjbGFzcyBuYW1lXHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3dbY29uY3JldGVdO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIE5hbWVzcGFjZSB0byB0aGUgV2luZG93XHJcbiAgICAgICAgdmFyIG5hbWVzcGFjZSA9IHdpbmRvdztcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBOYW1lc3BhY2Ugc2VnbWVudHNcclxuICAgICAgICB2YXIgc2VnbWVudHMgPSBjb25jcmV0ZS5zcGxpdCgnLicpO1xyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIFNlZ21lbnRzXHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aCAtIDE7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBjdXJyZW50IFNlZ21lbnRcclxuICAgICAgICAgICAgdmFyIHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBuZXh0IE5hbWVzcGFjZSBleGlzdHNcclxuICAgICAgICAgICAgaWYodHlwZW9mIG5hbWVzcGFjZVtzZWdtZW50XSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIG5hbWVzcGFjZSA9IG5hbWVzcGFjZVtzZWdtZW50XTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gVGhlIG5leHQgTmFtZXNwYWNlIGRvZXNuJ3QgZXhpc3RcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgZmluYWwgTmFtZXNwYWNlXHJcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZVtzZWdtZW50c1tzZWdtZW50cy5sZW5ndGggLSAxXV07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgcGFyYW1ldGVyIG92ZXJyaWRlLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBfZ2V0TGFzdFBhcmFtZXRlck92ZXJyaWRlKCkge1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIG51bWJlciBvZiBwYXJhbWV0ZXIgb3ZlcnJpZGVzXHJcbiAgICAgICAgdmFyIGNvdW50ID0gdGhpcy5fd2l0aC5sZW5ndGg7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgbGFzdCBwYXJhbWV0ZXIgb3ZlcnJpZGVcclxuICAgICAgICByZXR1cm4gY291bnQgPj0gMCA/IHRoaXMuX3dpdGhbY291bnQgLSAxXSA6IFtdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaHJvd3MgYW4gZXhjZXB0aW9uIGRldGFpbGluZyB0aGF0IHRoZSBjb25jcmV0ZSB0eXBlIGlzIG5vdCBpbnN0YW50aWFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgY29uY3JldGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICpcclxuICAgICAqIEB0aHJvd3Mge0Vycm9yfVxyXG4gICAgICovXHJcbiAgICBfbm90SW5zdGFudGlhYmxlKGNvbmNyZXRlKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIEJ1aWxkIFN0YWNrXHJcbiAgICAgICAgaWYodGhpcy5fYnVpbGRTdGFjay5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB0aGUgUHJldmlvdXMgQnVpbGRcclxuICAgICAgICAgICAgdmFyIHByZXZpb3VzID0gdGhpcy5fYnVpbGRTdGFjay5qb2luKCcsICcpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBNZXNzYWdlXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYFRhcmdldCBbJHtjb25jcmV0ZX1dIGlzIG5vdCBpbnN0YW50aWFibGUgd2hpbGUgYnVpbGRpbmcgWyR7cHJldmlvdXN9XS5gO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBNZXNzYWdlXHJcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gYFRhcmdldCBbJHtjb25jcmV0ZX1dIGlzIG5vdCBpbnN0YW50aWFibGUuYDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaHJvdyB0aGUgRXhjZXB0aW9uXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWdpc3RlcnMgdGhlIHNwZWNpZmllZCByZXNvbHZpbmcgY2FsbGJhY2suXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfGZ1bmN0aW9ufSBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7ZnVuY3Rpb258bnVsbH0gICBjYWxsYmFja1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIHJlc29sdmluZyhhYnN0cmFjdCwgY2FsbGJhY2sgPSBudWxsKSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBhIFN0cmluZyBBYnN0cmFjdFxyXG4gICAgICAgIGlmKHR5cGVvZiBhYnN0cmFjdCA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlc29sdmUgYW55IGFsaWFzZXNcclxuICAgICAgICAgICAgdmFyIGFic3RyYWN0ID0gdGhpcy5nZXRBbGlhcyhhYnN0cmFjdCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIENsb3N1cmUgQWJzdHJhY3Qgd2l0aG91dCBDYWxsYmFja1xyXG4gICAgICAgIGlmKGNhbGxiYWNrID09PSBudWxsICYmIHR5cGVvZiBhYnN0cmFjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuICAgICAgICAgICAgLy8gUHVzaCB0aGUgQWJzdHJhY3QgdG8gdGhlIEdsb2JhbCBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbFJlc29sdmluZ0NhbGxiYWNrcy5wdXNoKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgdGhlIFJlc29sdmluZyBDYWxsYmFja3MgZm9yIHRoZSBBYnN0cmFjdCwgaWYgbmVjZXNzYXJ5XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLl9yZXNvbHZpbmdDYWxsYmFja3NbYWJzdHJhY3RdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb2x2aW5nQ2FsbGJhY2tzW2Fic3RyYWN0XSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBDYWxsYmFjayB0byB0aGUgQWJzdHJhY3QncyBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmluZ0NhbGxiYWNrc1thYnN0cmFjdF0ucHVzaChjYWxsYmFjayk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgYWxsIG9mIHRoZSByZXNvbHZpbmcgY2FsbGJhY2tzLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICBvYmplY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBfZmlyZVJlc29sdmluZ0NhbGxiYWNrcyhhYnN0cmFjdCwgb2JqZWN0KSB7XHJcblxyXG4gICAgICAgIC8vIEZpcmUgdGhlIEdsb2JhbCBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgdGhpcy5fZmlyZUNhbGxiYWNrQXJyYXkob2JqZWN0LCB0aGlzLl9nbG9iYWxSZXNvbHZpbmdDYWxsYmFja3MpO1xyXG5cclxuICAgICAgICAvLyBGaXJlIHRoZSBBYnN0cmFjdCdzIFJlc29sdmluZyBDYWxsYmFja3NcclxuICAgICAgICB0aGlzLl9maXJlQ2FsbGJhY2tBcnJheShvYmplY3QsIHRoaXMuX2dldENhbGxiYWNrc0ZvclR5cGUoYWJzdHJhY3QsIG9iamVjdCwgdGhpcy5fcmVzb2x2aW5nQ2FsbGJhY2tzKSk7XHJcblxyXG4gICAgICAgIC8vIEZpcmUgdGhlIEFmdGVyIFJlc29sdmluZyBDYWxsYmFja3NcclxuICAgICAgICB0aGlzLl9maXJlQWZ0ZXJSZXNvbHZpbmdDYWxsYmFja3MoYWJzdHJhY3QsIG9iamVjdCk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpcmVzIGFsbCBvZiB0aGUgYWZ0ZXIgcmVzb2x2aW5nIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgb2JqZWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX2ZpcmVBZnRlclJlc29sdmluZ0NhbGxiYWNrcyhhYnN0cmFjdCwgb2JqZWN0KSB7XHJcblxyXG4gICAgICAgIC8vIEZpcmUgdGhlIEdsb2JhbCBBZnRlciBSZXNvbHZpbmcgQ2FsbGJhY2tzXHJcbiAgICAgICAgdGhpcy5fZmlyZUNhbGxiYWNrQXJyYXkob2JqZWN0LCB0aGlzLl9nbG9iYWxBZnRlclJlc29sdmluZ0NhbGxiYWNrcyk7XHJcblxyXG4gICAgICAgIC8vIEZpcmUgdGhlIEFic3RyYWN0J3MgQWZ0ZXIgUmVzb2x2aW5nIENhbGxiYWNrc1xyXG4gICAgICAgIHRoaXMuX2ZpcmVDYWxsYmFja0FycmF5KG9iamVjdCwgdGhpcy5fZ2V0Q2FsbGJhY2tzRm9yVHlwZShhYnN0cmFjdCwgb2JqZWN0LCB0aGlzLl9hZnRlclJlc29sdmluZ0NhbGxiYWNrcykpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFsbCBvZiB0aGUgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICogQHBhcmFtICB7bWl4ZWR9ICAgbWl4ZWRcclxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgIGNhbGxiYWNrc1BlclR5cGVcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgX2dldENhbGxiYWNrc0ZvclR5cGUoYWJzdHJhY3QsIG9iamVjdCwgY2FsbGJhY2tzUGVyVHlwZSkge1xyXG5cclxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBSZXN1bHRzXHJcbiAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBDYWxsYmFja3MgUGVyIFR5cGVcclxuICAgICAgICBmb3IobGV0IHR5cGUgaW4gY2FsbGJhY2tzUGVyVHlwZSkge1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHRoZSBDYWxsYmFja3MgZm9yIHRoZSBjdXJyZW50IFR5cGVcclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrcyA9IGNhbGxiYWNrc1BlclR5cGVbdHlwZV07XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgVHlwZSBpcyB0aGUgQWJzdHJhY3QsIG9yIGlmIHRoZSBPYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIFR5cGVcclxuICAgICAgICAgICAgaWYodHlwZSA9PT0gYWJzdHJhY3QgfHwgb2JqZWN0IGluc3RhbmNlb2YgdHlwZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgQ2FsbGJhY2tzIHRvIHRoZSBSZXN1bHRzXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5jb25jYXQoY2FsbGJhY2tzKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIFJlc3VsdHNcclxuICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmlyZXMgdGhlIGdpdmVuIGFycmF5IG9mIGNhbGxiYWNrcy5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gIG9iamVjdFxyXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICBjYWxsYmFja3NcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBfZmlyZUNhbGxiYWNrQXJyYXkob2JqZWN0LCBjYWxsYmFja3MpIHtcclxuXHJcbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBDYWxsYmFja3NcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgdGhlIGN1cnJlbnQgQ2FsbGJhY2tcclxuICAgICAgICAgICAgbGV0IGNhbGxiYWNrID0gY2FsbGJhY2tzW2ldO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2FsbCB0aGUgQ2FsbGJhY2tcclxuICAgICAgICAgICAgY2FsbGJhY2sob2JqZWN0LCB0aGlzKTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBCaW5kaW5ncyBvZiB0aGlzIENvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtvYmplY3R9XHJcbiAgICAgKi9cclxuICAgIGdldEJpbmRpbmdzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iaW5kaW5ncztcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBBbGlhcyBvZiB0aGUgc3BlY2lmaWVkIEFic3RyYWN0LCBpZiBhdmFpbGFibGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICAgKlxyXG4gICAgICogQHRocm93cyB7RXJyb3J9XHJcbiAgICAgKi9cclxuICAgIGdldEFsaWFzKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFJldHVybiB0aGUgQWJzdHJhY3QgVHlwZSBpZiBhbiBhbGlhcyBkb2VzIG5vdCBleGlzdFxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9hbGlhc2VzW2Fic3RyYWN0XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFic3RyYWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBBYnN0cmFjdCBpcyBub3QgYWxpYXNlZCB0byBpdHNlbGZcclxuICAgICAgICBpZih0aGlzLl9hbGlhc2VzW2Fic3RyYWN0XSA9PT0gYWJzdHJhY3QpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHthYnN0cmFjdH1dIGlzIGFsaWFzZWQgdG8gaXRzZWxmLmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVjdXJzaXZlbHkgZGVyaXZlIHRoZSBBbGlhc1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEFsaWFzKHRoaXMuX2FsaWFzZXNbYWJzdHJhY3RdKTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXh0ZW5kZXIgY2FsbGJhY2tzIGZvciB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBfZ2V0RXh0ZW5kZXJzKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgYW55IGFsaWFzZXNcclxuICAgICAgICB2YXIgYWJzdHJhY3QgPSB0aGlzLmdldEFsaWFzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBleHRlbmRlcnMgaWYgdGhleSBleGlzdFxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLl9leHRlbmRlcnNbYWJzdHJhY3RdICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXh0ZW5kZXJzW2Fic3RyYWN0XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFJldHVybiBhbiBlbXB0eSBzZXRcclxuICAgICAgICByZXR1cm4gW107XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgYWxsIG9mIHRoZSBleHRlbmRlciBjYWxsYmFja3MgZm9yIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9yZ2V0RXh0ZW5kZXJzKGFic3RyYWN0KSB7XHJcblxyXG4gICAgICAgIC8vIFJlc29sdmUgYW55IGFsaWFzZXNcclxuICAgICAgICB2YXIgYWJzdHJhY3QgPSB0aGlzLmdldEFsaWFzKGFic3RyYWN0KTtcclxuXHJcbiAgICAgICAgLy8gRm9yZ2V0IHRoZSBFeHRlbmRlcnNcclxuICAgICAgICBkZWxldGUgdGhpcy5fZXh0ZW5kZXJzW2Fic3RyYWN0XTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRHJvcHMgYWxsIG9mIHRoZSBzdGFsZSBpbnN0YW5jZXMgYW5kIGFsaWFzZXMgZm9yIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgX2Ryb3BTdGFsZUluc3RhbmNlcyhhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBGb3JnZXQgdGhlIEluc3RhbmNlXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF07XHJcblxyXG4gICAgICAgIC8vIEZvcmdldCB0aGUgQWxpYXNlXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2FsaWFzZXNbYWJzdHJhY3RdO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSByZXNvbHZlZCBpbnN0YW5jZSBmcm9tIHRoZSBpbnN0YW5jZSBjYWNoZSBmb3IgdGhlIGdpdmVuIGFic3RyYWN0IHR5cGUuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICBmb3JnZXRJbnN0YW5jZShhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBGb3JnZXQgdGhlIEluc3RhbmNlXHJcbiAgICAgICAgZGVsZXRlIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF07XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhbGwgb2YgdGhlIGluc3RhbmNlcyBmcm9tIHRoZSBjb250YWluZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG4gICAgZm9yZ2V0SW5zdGFuY2VzKCkge1xyXG5cclxuICAgICAgICAvLyBJdGVyYXRlIHRocm91Z2ggdGhlIEluc3RhbmNlc1xyXG4gICAgICAgIGZvcihsZXQgYWJzdHJhY3QgaW4gdGhpcy5faW5zdGFuY2VzKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWxldGUgdGhlIGN1cnJlbnQgSW5zdGFuY2VcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2luc3RhbmNlc1thYnN0cmFjdF07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUmVzZXQgdGhlIEluc3RhbmNlc1xyXG4gICAgICAgIHRoaXMuX2luc3RhbmNlcyA9IHt9O1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGbHVzaGVzIHRoaXMgQ29udGFpbmVyIG9mIGFsbCBiaW5kaW5ncyBhbmQgcmVzb2x2ZWQgaW5zdGFuY2VzLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3ZvaWR9XHJcbiAgICAgKi9cclxuICAgIGZsdXNoKCkge1xyXG5cclxuICAgICAgICAvLyBSZXNldCBhbGwgcHJvcGVydGllcyB0aGF0IGRvbid0IHJlcXVpcmUgZ2FyYmFnZSBjb2xsZWN0aW9uXHJcbiAgICAgICAgdGhpcy5fYWxpYXNlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3Jlc29sdmVkID0ge307XHJcbiAgICAgICAgdGhpcy5fYmluZGluZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLl9hYnN0cmFjdEFsaWFzZXMgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gRm9yZ2V0IGFsbCBJbnN0YW5jZXNcclxuICAgICAgICB0aGlzLmZvcmdldEluc3RhbmNlcygpO1xyXG5cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBnbG9iYWxseSBhdmFpbGFibGUgaW5zdGFuY2Ugb2YgdGhlIGNvbnRhaW5lci5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtzdGF0aWN9XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW4gaW5zdGFuY2UgZG9lc24ndCBleGlzdFxyXG4gICAgICAgIGlmKENvbnRhaW5lci5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlXHJcbiAgICAgICAgICAgIENvbnRhaW5lci5faW5zdGFuY2UgPSBuZXcgdGhpcztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXHJcbiAgICAgICAgcmV0dXJuIENvbnRhaW5lci5faW5zdGFuY2U7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldHMgdGhlIGdsb2JhbGx5IGF2YWlsYWJsZSBpbnN0YW5jZSBvZiB0aGUgY29udGFpbmVyLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0NvbnRhaW5lcnxudWxsfSAgY29udGFpbmVyXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7c3RhdGljfVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgc2V0SW5zdGFuY2UoY29udGFpbmVyID0gbnVsbCkge1xyXG5cclxuICAgICAgICAvLyBTZXQgdGhlIEluc3RhbmNlXHJcbiAgICAgICAgQ29udGFpbmVyLl9pbnN0YW5jZSA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBuZXcgSW5zdGFuY2VcclxuICAgICAgICByZXR1cm4gQ29udGFpbmVyLl9pbnN0YW5jZTtcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZSBleGlzdHMuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgYWJzdHJhY3RcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBleGlzdHMoYWJzdHJhY3QpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib3VuZChhYnN0cmFjdCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBhYnN0cmFjdFxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBnZXQoYWJzdHJhY3QpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWtlKGFic3RyYWN0KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIHRoZSBnaXZlbiBhYnN0cmFjdCB0eXBlLlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gIGFic3RyYWN0XHJcbiAgICAgKiBAcGFyYW0gIHttaXhlZH0gICB2YWx1ZVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge21peGVkfVxyXG4gICAgICovXHJcbiAgICBzZXQoYWJzdHJhY3QsIHZhbHVlKSB7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgY29uY3JldGUgdHlwZVxyXG4gICAgICAgIHZhciBjb25jcmV0ZSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBCaW5kIHRoZSBhYnN0cmFjdCB0eXBlIHRvIHRoZSBjb25jcmV0ZSB0eXBlXHJcbiAgICAgICAgdGhpcy5iaW5kKGFic3RyYWN0LCBjb25jcmV0ZSk7XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFVuc2V0cyB0aGUgZ2l2ZW4gYWJzdHJhY3QgdHlwZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHt2b2lkfVxyXG4gICAgICovXHJcbiAgICB1bnNldChhYnN0cmFjdCkge1xyXG5cclxuICAgICAgICAvLyBEZWZlcmVuY2UgdGhlIGFic3RyYWN0IHR5cGVcclxuICAgICAgICBkZWxldGUgdGhpcy5fYmluZGluZ3NbYWJzdHJhY3RdO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pbnN0YW5jZXNbYWJzdHJhY3RdO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9yZXNvbHZlZFthYnN0cmFjdF07XHJcblxyXG4gICAgfTtcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgY3VycmVudCBnbG9iYWxseSBhdmFpbGFibGUgY29udGFpbmVyIChpZiBhbnkpLlxyXG4gKlxyXG4gKiBAdmFyIHtzdGF0aWN9XHJcbiAqL1xyXG5Db250YWluZXIuX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuQ29udGFpbmVyID0gQ29udGFpbmVyO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvZW5naW5lL0NvbnRhaW5lci9Db250YWluZXIuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuRXZlbnRzJyk7XHJcblxyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICdFbmdpbmUvRXZlbnRzL0Rpc3BhdGNoZXIuanMnO1xyXG5pbXBvcnQgU2VydmljZVByb3ZpZGVyIGZyb20gJ0VuZ2luZS9TdXBwb3J0L1NlcnZpY2VQcm92aWRlci5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudFNlcnZpY2VQcm92aWRlciBleHRlbmRzIFNlcnZpY2VQcm92aWRlciB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJlZ2lzdGVycyB0aGUgc2VydmljZSBwcm92aWRlci5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0cmVnaXN0ZXIoKSB7XHJcblxyXG5cdFx0dGhpcy5fYXBwLnNpbmdsZXRvbignZXZlbnRzJywgZnVuY3Rpb24oYXBwKSB7XHJcblx0XHRcdHJldHVybiBuZXcgRGlzcGF0Y2hlcigpO1xyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblx0XHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuRXZlbnRTZXJ2aWNlUHJvdmlkZXIgPSBFdmVudFNlcnZpY2VQcm92aWRlcjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9FdmVudHMvRXZlbnRTZXJ2aWNlUHJvdmlkZXIuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0dhbWUuU3VwcG9ydCcpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmljZVByb3ZpZGVyIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBTZXJ2aWNlIFByb3ZpZGVyIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7RnJhbWV3b3JrLkFwcGxpY2F0aW9ufSAgYXBwXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt0aGlzfVxyXG5cdCAqL1xyXG5cdGNvbnN0cnVjdG9yKGFwcCkge1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIFRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZS5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7RnJhbWV3b3JrLkFwcGxpY2F0aW9ufVxyXG5cdCAgICAgKi9cclxuXHQgICAgdGhpcy5fYXBwID0gYXBwO1xyXG5cclxuXHQgICAgLyoqXHJcblx0ICAgICAqIEluZGljYXRlcyBpZiBsb2FkaW5nIG9mIHRoZSBwcm92aWRlciBpcyBkZWZlcnJlZC5cclxuXHQgICAgICpcclxuXHQgICAgICogQHZhciB7Ym9vbGVhbn1cclxuXHQgICAgICovXHJcblx0ICAgIHRoaXMuX2RlZmVyID0gZmFsc2U7XHJcblxyXG5cdH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBzZXJ2aWNlcyBwcm92aWRlZCBieSB0aGlzIHByb3ZpZGVyLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2FycmF5fVxyXG4gICAgICovXHJcbiAgICBwcm92aWRlcygpIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZXZlbnRzIHRoYXQgdHJpZ2dlciB0aGlzIHNlcnZpY2UgcHJvdmlkZXIgdG8gcmVnaXN0ZXIuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHdoZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGlzIHByb3ZpZGVyIGlzIGRlZmVycmVkLlxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGlzRGVmZXJyZWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmVyO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5TZXJ2aWNlUHJvdmlkZXIgPSBTZXJ2aWNlUHJvdmlkZXI7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvU3VwcG9ydC9TZXJ2aWNlUHJvdmlkZXIuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0FwcC5HYW1lJyk7XHJcblxyXG5pbXBvcnQgTG9hZENvbmZpZ3VyYXRpb24gZnJvbSAnRW5naW5lL0ZvdW5kYXRpb24vQm9vdHN0cmFwL0xvYWRDb25maWd1cmF0aW9uLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEtlcm5lbCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZXMgYSBuZXcgS2VybmVsIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZS5Db250cmFjdHMuRm91bmRhdGlvbi5BcHBsaWNhdGlvbn0gIGFwcFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcihhcHApIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBhcHBsaWNhdGlvbiBpbnN0YW5jZS5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtHYW1lLkNvbnRyYWN0cy5Gb3VuZGF0aW9uLkFwcGxpY2F0aW9ufVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9hcHAgPSBhcHA7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUaGUgYm9vdHN0cmFwcGVycyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxyXG5cdFx0ICpcclxuXHRcdCAqIEB2YXIge2FycmF5fVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLl9ib290c3RyYXBwZXJzID0gW1xyXG5cdFx0XHQvLyAnR2FtZS5Gb3VuZGF0aW9uLkJvb3RzdHJhcC5Mb2FkRW52aXJvbm1lbnRWYXJpYWJsZXMnLFxyXG5cdFx0XHQnR2FtZS5Gb3VuZGF0aW9uLkJvb3RzdHJhcC5Mb2FkQ29uZmlndXJhdGlvbicsXHJcblx0XHRcdC8vICdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLkhhbmRsZUV4Y2VwdGlvbnMnLFxyXG5cdFx0XHQvLyAnR2FtZS5Gb3VuZGF0aW9uLkJvb3RzdHJhcC5SZWdpc3RlckZhY2FkZXMnLFxyXG5cdFx0XHQvLyAnR2FtZS5Gb3VuZGF0aW9uLkJvb3RzdHJhcC5SZWdpc3RlclByb3ZpZGVycycsXHJcblx0XHRcdC8vICdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwLkJvb3RQcm92aWRlcnMnLFxyXG5cdFx0XTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQm9vdHN0cmFwcyB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGJvb3RzdHJhcCgpIHtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIGFwcGxpY2F0aW9uIGhhc24ndCBhbHJlYWR5IGJlZW4gYm9vdHN0cmFwcGVkXHJcblx0XHRpZih0aGlzLl9hcHAuaGFzQmVlbkJvb3RzdHJhcHBlZCgpKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBCb290c3RyYXAgdGhlIGFwcGxpY2F0aW9uXHJcblx0XHR0aGlzLl9hcHAuYm9vdHN0cmFwV2l0aCh0aGlzLmdldEJvb3RzdHJhcHBlcnMoKSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGJvb3RzdHJhcCBjbGFzc2VzIGZvciB0aGUgYXBwbGljYXRpb24uXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHthcnJheX1cclxuXHQgKi9cclxuXHRnZXRCb290c3RyYXBwZXJzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Jvb3RzdHJhcHBlcnM7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgYXBwbGljYXRpb24gaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLkNvbnRyYWN0cy5Gb3VuZGF0aW9uLkFwcGxpY2F0aW9ufVxyXG5cdCAqL1xyXG5cdGdldEFwcGxpY2F0aW9uKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2FwcDtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5LZXJuZWwgPSBLZXJuZWw7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL0dhbWUvS2VybmVsLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdBcHAuT2JqZWN0cycpO1xyXG5cclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnRW5naW5lL09iamVjdHMvR2FtZU9iamVjdC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWxsR2FtZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgXCJib290aW5nXCIgbWV0aG9kIG9mIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgX2Jvb3QoKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3NpZ24gSW5zdGFuY2UgQXR0cmlidXRlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQmFsbEdhbWVPYmplY3R9ICBiYWxsXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vbkNyZWF0ZShmdW5jdGlvbihiYWxsKSB7XHJcblxyXG5cdFx0XHRiYWxsLnJhZGl1cyA9IDEwO1xyXG5cdFx0XHRiYWxsLmR4ID0gMDtcclxuXHRcdFx0YmFsbC5keSA9IDA7XHJcblx0XHRcdGJhbGwudHJhY2tpbmdPYmplY3QgPSBudWxsO1xyXG5cdFx0XHRiYWxsLnRyYWNraW5nT2Zmc2V0ID0gbnVsbDtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBEcmF3IEV2ZW50IEhhbmRsZXIgZm9yIHRoaXMgT2JqZWN0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5CYWxsR2FtZU9iamVjdH0gIGJhbGxcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuR3JhcGhpY3MuQ2FudmFzfSAgICAgICAgIGNhbnZhc1xyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5HcmFwaGljcy5DYW52YXNDb250ZXh0fSAgY29udGV4dFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25EcmF3KGZ1bmN0aW9uKGJhbGwsIGNhbnZhcywgY29udGV4dCkge1xyXG5cclxuXHRcdFx0Ly8gRHJhdyB0aGUgQmFsbFxyXG5cdFx0XHRjb250ZXh0LmRyYXdDaXJjbGUoYmFsbC54LCBiYWxsLnksIGJhbGwucmFkaXVzLCAnIzAwOTVERCcpO1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFN0ZXAgRXZlbnQgSGFuZGxlciBmb3IgdGhpcyBPYmplY3QuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLkJhbGxHYW1lT2JqZWN0fSAgYmFsbFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMub25TdGVwKGZ1bmN0aW9uKGJhbGwpIHtcclxuXHJcblx0XHRcdC8vIENoZWNrIGZvciBhIFRyYWNraW5nIE9iamVjdFxyXG5cdFx0XHRpZihiYWxsLnRyYWNraW5nT2JqZWN0KSB7XHJcblxyXG5cdFx0XHRcdC8vIFRyYWNrIHRoZSBUcmFja2luZyBPYmplY3RcclxuXHRcdFx0XHRiYWxsLnggPSBiYWxsLnRyYWNraW5nT2JqZWN0LnggKyBiYWxsLnRyYWNraW5nT2Zmc2V0O1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIFRvcCBDb2xsaXNpb25cclxuXHRcdFx0aWYoYmFsbC55ICsgYmFsbC5keSA8IDAgKyBiYWxsLnJhZGl1cykge1xyXG5cclxuXHRcdFx0XHQvLyBSZXZlcnNlIHRoZSBWZXJ0aWNhbCBEaXJlY3Rpb25cclxuXHRcdFx0XHRiYWxsLmR5ICo9IC0xO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIEJvdHRvbSBDb2xsaXNpb25cclxuXHRcdFx0ZWxzZSBpZihiYWxsLnkgKyBiYWxsLmR5ID4gZ2FtZSgpLmdyYXBoaWNzLmdldENhbnZhcygpLmdldEhlaWdodCgpIC0gYmFsbC5yYWRpdXMpIHtcclxuXHJcblx0XHRcdFx0Ly8gRmluZCB0aGUgUGFkZGxlIE9iamVjdFxyXG5cdFx0XHRcdHZhciBwYWRkbGUgPSBnYW1lKCkub2JqZWN0cy5nZXRPYmplY3RCeUNsYXNzKCdQYWRkbGVHYW1lT2JqZWN0Jyk7XHJcblxyXG5cdFx0XHRcdC8vIENoZWNrIGlmIHRoZSBQYWRkbGUgd291bGQgc3RvcCB0aGUgQmFsbFxyXG5cdFx0XHRcdGlmKHBhZGRsZSAhPSBudWxsICYmIGJhbGwueCA+IHBhZGRsZS54ICYmIGJhbGwueCA8IHBhZGRsZS54ICsgcGFkZGxlLndpZHRoKSB7XHJcblxyXG5cdFx0XHRcdFx0Ly8gQm91bmNlIG9mZiBvZiB0aGUgUGFkZGxlXHJcblx0XHRcdFx0XHRwYWRkbGUuYm91bmNlKGJhbGwpO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vIEFzc3VtZSBHYW1lIE92ZXJcclxuXHRcdFx0XHRlbHNlIHtcclxuXHJcblx0XHRcdFx0XHQvLyBJbml0aWF0ZSBHYW1lIE92ZXJcclxuXHRcdFx0XHRcdGFsZXJ0KCdHQU1FIE9WRVInKTtcclxuXHJcblx0XHRcdFx0XHRiYWxsLnggPSA1MDtcclxuXHRcdFx0XHRcdGJhbGwueSA9IDUwO1xyXG5cdFx0XHRcdFx0YmFsbC5keCA9IDA7XHJcblx0XHRcdFx0XHRiYWxsLmR5ID0gMDtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIExlZnQgQ29sbGlzaW9uXHJcblx0XHRcdGlmKGJhbGwueCArIGJhbGwuZHggPCAwICsgYmFsbC5yYWRpdXMpIHtcclxuXHJcblx0XHRcdFx0Ly8gUmV2ZXJzZSB0aGUgSG9yaXpvbnRhbCBEaXJlY3Rpb25cclxuXHRcdFx0XHRiYWxsLmR4ICo9IC0xO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gQ2hlY2sgZm9yIFJpZ2h0IENvbGxpc2lvblxyXG5cdFx0XHRlbHNlIGlmKGJhbGwueCArIGJhbGwuZHkgPiBnYW1lKCkuZ3JhcGhpY3MuZ2V0Q2FudmFzKCkuZ2V0V2lkdGgoKSAtIGJhbGwucmFkaXVzKSB7XHJcblxyXG5cdFx0XHRcdC8vIFJldmVyc2UgdGhlIEhvcml6b250YWwgRGlyZWN0aW9uXHJcblx0XHRcdFx0YmFsbC5keCAqPSAtMTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIE1vdmUgdGhlIEJhbGxcclxuXHRcdFx0YmFsbC54ICs9IGJhbGwuZHg7XHJcblx0XHRcdGJhbGwueSArPSBiYWxsLmR5O1xyXG5cclxuXHRcdH0pO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBIaXRzIHRoZSBzcGVjaWZpZWQgQnJpY2suXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQnJpY2tHYW1lT2JqZWN0fSAgYnJpY2tcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0aGl0QnJpY2soYnJpY2spIHtcclxuXHJcblx0XHQvLyBSZXZlcnNlIHRoZSBWZXJ0aWNhbCBEaXJlY3Rpb24gb2YgdGhlIEJhbGxcclxuXHRcdHRoaXMuZHkgKj0gLTE7XHJcblxyXG5cdFx0Ly8gRGFtYWdlIHRoZSBCcmlja1xyXG5cdFx0YnJpY2suZGFtYWdlKCk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0b3BzIHRoaXMgQmFsbCdzIE1vdmVtZW50LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdG9wKCkge1xyXG5cclxuXHRcdHRoaXMuZHggPSAwO1xyXG5cdFx0dGhpcy5keSA9IDA7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIExhdW5jaGVzIHRoaXMgQmFsbCBpbiB0aGUgc3BlY2lmaWVkIGRpcmVjdGlvbi5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgZGlyZWN0aW9uXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9ICBzcGVlZFxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSAgYWNjdXJhY3lcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0bGF1bmNoKGRpcmVjdGlvbiA9IDkwLCBzcGVlZCA9IDIsIGFjY3VyYWN5ID0gMC45KSB7XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBzcHJlYWRcclxuXHRcdHZhciBzcHJlYWQgPSAxIC0gYWNjdXJhY3k7XHJcblxyXG5cdFx0Ly8gT2Zmc2V0IHRoZSBEaXJlY3Rpb25cclxuXHRcdGRpcmVjdGlvbiAqPSAxICsgKE1hdGgucmFuZG9tKCkgKiBzcHJlYWQgKiAyIC0gc3ByZWFkKTtcclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgdGhlIG1vdmVtZW50XHJcblx0XHR0aGlzLmR4ID0gTWF0aC5jb3MoZGlyZWN0aW9uICogTWF0aC5QSSAvIDE4MCkgKiBzcGVlZDtcclxuXHRcdHRoaXMuZHkgPSAtTWF0aC5zaW4oZGlyZWN0aW9uICogTWF0aC5QSSAvIDE4MCkgKiBzcGVlZDtcclxuXHJcblx0XHRjb25zb2xlLmxvZygnTGF1bmNoOiAnICsgdGhpcy5keCArICcsICcgKyB0aGlzLmR5KTtcclxuXHJcblx0XHQvLyBSZWxlYXNlIHRoZSBUcmFja2luZyBPYmplY3RcclxuXHRcdHRoaXMudHJhY2tpbmdPYmplY3QgPSBudWxsO1xyXG5cdFx0dGhpcy50cmFja2luZ09mZnNldCA9IDA7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgdGhlIFRyYWNraW5nIE9iamVjdCBmb3IgdGhpcyBCYWxsLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7R2FtZS5PYmplY3RzLkdhbWVPYmplY3R9ICBvYmplY3RcclxuXHQgKiBAcGFyYW0gIGludGVnZXIgICAgICAgICAgICAgICAgICAgIG9mZnNldFxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzZXRUcmFja2luZ09iamVjdChvYmplY3QsIG9mZnNldCA9IDApIHtcclxuXHJcblx0XHQvLyBTZXQgdGhlIFRyYWNraW5nIE9iamVjdFxyXG5cdFx0dGhpcy50cmFja2luZ09iamVjdCA9IG9iamVjdDtcclxuXHJcblx0XHQvLyBTZXQgdGhlIFRyYWNraW5nIE9mZnNldFxyXG5cdFx0dGhpcy50cmFja2luZ09mZnNldCA9IG9mZnNldDtcclxuXHJcblx0XHQvLyBTdG9wIGFueSBtb3ZlbWVudFxyXG5cdFx0dGhpcy5zdG9wKCk7XHJcblxyXG5cdH07XHJcblxyXG59XHJcblxyXG4vLyBBc3NpZ24gQ29uc3RydWN0b3IgdG8gTmFtZXNwYWNlXHJcbm5zLkJhbGxHYW1lT2JqZWN0ID0gQmFsbEdhbWVPYmplY3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvQmFsbEdhbWVPYmplY3QuanMiLCJ2YXIgbnMgPSBuYW1lc3BhY2UoJ0FwcC5PYmplY3RzJyk7XHJcblxyXG5pbXBvcnQgR2FtZU9iamVjdCBmcm9tICdFbmdpbmUvT2JqZWN0cy9HYW1lT2JqZWN0LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyaWNrR2FtZU9iamVjdCBleHRlbmRzIEdhbWVPYmplY3Qge1xyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgXCJib290aW5nXCIgbWV0aG9kIG9mIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGF0aWMgX2Jvb3QoKSB7XHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3NpZ24gSW5zdGFuY2UgQXR0cmlidXRlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLk9iamVjdHMuQnJpY2tHYW1lT2JqZWN0fSAgYnJpY2tcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9uQ3JlYXRlKGZ1bmN0aW9uKGJyaWNrKSB7XHJcblxyXG5cdFx0XHQvLyBJbml0aWFsaXplIHRoZSBIZWFsdGhcclxuXHRcdFx0YnJpY2suaGVhbHRoID0gYnJpY2suaGVhbHRoTWF4ID0gMTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBEcmF3IEV2ZW50IEhhbmRsZXIgZm9yIHRoaXMgT2JqZWN0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5Ccmlja0dhbWVPYmplY3R9ICBicmlja1xyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5HcmFwaGljcy5DYW52YXN9ICAgICAgICAgIGNhbnZhc1xyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5HcmFwaGljcy5DYW52YXNDb250ZXh0fSAgIGNvbnRleHRcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9uRHJhdyhmdW5jdGlvbihicmljaywgY2FudmFzLCBjb250ZXh0KSB7XHJcblxyXG5cdFx0XHQvLyBGaW5kIHRoZSBCYWxsIE9iamVjdFxyXG5cdFx0XHR2YXIgYmFsbCA9IHdpbmRvdy5BcHAuZ2FtZS5vYmplY3RzLmdldE9iamVjdEJ5Q2xhc3MoJ0JhbGxHYW1lT2JqZWN0Jyk7XHJcblxyXG5cdFx0XHQvLyBDaGVjayBpZiBhIEJhbGwgd2FzIGZvdW5kXHJcblx0XHRcdGlmKGJhbGwgIT0gbnVsbCkge1xyXG5cclxuXHRcdFx0XHQvLyBDaGVjayBmb3IgQmFsbCBDb2xsaXNpb25cclxuXHRcdFx0XHRpZihicmljay5pc0JhbGxDb2xsaWRpbmcoYmFsbCkpIHtcclxuXHJcblx0XHRcdFx0XHQvLyBIaXQgdGhlIEJyaWNrXHJcblx0XHRcdFx0XHRiYWxsLmhpdEJyaWNrKGJyaWNrKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gRHJhdyB0aGUgQnJpY2tcclxuXHRcdFx0Y29udGV4dC5kcmF3UmVjdGFuZ2xlKGJyaWNrLngsIGJyaWNrLnksIGJyaWNrLndpZHRoLCBicmljay5oZWlnaHQsICcjMDA5NUREJyk7XHJcblxyXG5cdFx0fSk7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHNwZWNpZmllZCBCYWxsIGlzIGNvbGxpZGluZyB3aXRoIHRoaXMgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7QmFsbEdhbWVPYmplY3R9ICBiYWxsXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGlzQmFsbENvbGxpZGluZyhiYWxsKSB7XHJcblxyXG5cdFx0cmV0dXJuIGJhbGwueCA+IHRoaXMueCAgICAgICAgICAgICAgIC8vIENoZWNrIExlZnQgRWRnZVxyXG5cdFx0XHQmJiBiYWxsLnggPCB0aGlzLnggKyB0aGlzLndpZHRoICAvLyBDaGVjayBSaWdodCBFZGdlXHJcblx0XHRcdCYmIGJhbGwueSA+IHRoaXMueSAgICAgICAgICAgICAgIC8vIENoZWNrIFRvcCBFZGdlXHJcblx0XHRcdCYmIGJhbGwueSA8IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8vIENoZWNrIEJvdHRvbSBFZGdlXHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERhbWFnZXMgdGhpcyBCcmljay5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge2ludGVnZXJ9ICBhbW91bnRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZGFtYWdlKGFtb3VudCA9IDEpIHtcclxuXHJcblx0XHQvLyBSZWR1Y2UgdGhlIEhlYWx0aFxyXG5cdFx0dGhpcy5oZWFsdGggLT0gYW1vdW50O1xyXG5cclxuXHRcdC8vIENoZWNrIGZvciBEZWF0aFxyXG5cdFx0aWYodGhpcy5oZWFsdGggPCAwKSB7XHJcblx0XHRcdHRoaXMuZGllKCk7XHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEtpbGxzIHRoaXMgQnJpY2suXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGRpZSgpIHtcclxuXHJcblx0XHQvLyBEZXN0cm95IHRoZSBCcmlja1xyXG5cdFx0dGhpcy5kZXN0cm95KCk7XHJcblxyXG5cdFx0Ly8gSW5jcmVhc2UgdGhlIEdhbWUgU2NvcmVcclxuXHRcdGdhbWUoKS5pbmNWYXJpYWJsZSgnc2NvcmUnLCAxKTtcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5Ccmlja0dhbWVPYmplY3QgPSBCcmlja0dhbWVPYmplY3Q7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9nYW1lL09iamVjdHMvQnJpY2tHYW1lT2JqZWN0LmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdBcHAuT2JqZWN0cycpO1xyXG5cclxuaW1wb3J0IEdhbWVPYmplY3QgZnJvbSAnRW5naW5lL09iamVjdHMvR2FtZU9iamVjdC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWRkbGVHYW1lT2JqZWN0IGV4dGVuZHMgR2FtZU9iamVjdCB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBcImJvb3RpbmdcIiBtZXRob2Qgb2YgdGhpcyBPYmplY3QuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHN0YXRpYyBfYm9vdCgpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFzc2lnbiBJbnN0YW5jZSBBdHRyaWJ1dGVzLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5QYWRkbGVHYW1lT2JqZWN0fSAgcGFkZGxlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vbkNyZWF0ZShmdW5jdGlvbihwYWRkbGUpIHtcclxuXHJcblx0XHRcdHBhZGRsZS53aWR0aCA9IDc1O1xyXG5cdFx0XHRwYWRkbGUuaGVpZ2h0ID0gMTA7XHJcblx0XHRcdHBhZGRsZS5tb3ZlbWVudFNwZWVkID0gMjtcclxuXHRcdFx0cGFkZGxlLnRyYWNraW5nT2JqZWN0ID0gbnVsbDtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBTdGVwIEV2ZW50IEhhbmRsZXIgZm9yIHRoaXMgT2JqZWN0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5QYWRkbGVHYW1lT2JqZWN0fSAgcGFkZGxlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vblN0ZXAoZnVuY3Rpb24ocGFkZGxlKSB7XHJcblxyXG5cdFx0XHQvLyBBcHBseSBNb3ZlbWVudFxyXG5cdFx0XHRwYWRkbGUuYXBwbHlNb3ZlbWVudEFjdGlvbnMoKTtcclxuXHJcblx0XHRcdC8vIEFwcGx5IExhdW5jaFxyXG5cdFx0XHRwYWRkbGUuYXBwbHlMYXVuY2hBY3Rpb24oKTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBEcmF3IEV2ZW50IEhhbmRsZXIgZm9yIHRoaXMgT2JqZWN0LlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5QYWRkbGVHYW1lT2JqZWN0fSAgcGFkZGxlXHJcblx0XHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gICAgICAgICAgIGNhbnZhc1xyXG5cdFx0ICogQHBhcmFtICB7R2FtZS5HcmFwaGljcy5DYW52YXNDb250ZXh0fSAgICBjb250ZXh0XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiB7dm9pZH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5vbkRyYXcoZnVuY3Rpb24ocGFkZGxlLCBjYW52YXMsIGNvbnRleHQpIHtcclxuXHJcblx0XHRcdC8vIERyYXcgdGhlIFBhZGRsZVxyXG5cdFx0XHRjb250ZXh0LmRyYXdSZWN0YW5nbGUocGFkZGxlLngsIHBhZGRsZS55LCBwYWRkbGUud2lkdGgsIHBhZGRsZS5oZWlnaHQsICcjMDA5NUREJyk7XHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIEJhbGxcclxuXHRcdFx0dmFyIGJhbGwgPSBnYW1lKCkub2JqZWN0cy5nZXRPYmplY3RCeUNsYXNzKCdCYWxsR2FtZU9iamVjdCcpO1xyXG5cclxuXHRcdFx0dmFyIGFjY3VyYWN5ID0gMC45O1xyXG5cdFx0XHR2YXIgYWNjZWxlcmF0aW9uID0gMDtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgaW1wYWN0IGxpbmVcclxuXHRcdFx0dmFyIHgxLCB5MSwgeDIsIHkyO1xyXG5cclxuXHRcdFx0eDEgPSBjYW52YXMuZ2V0TW91c2VYKCk7XHJcblx0XHRcdHkxID0gY2FudmFzLmdldE1vdXNlWSgpO1xyXG5cdFx0XHR4MiA9IHBhZGRsZS54ICsgcGFkZGxlLndpZHRoIC8gMjtcclxuXHRcdFx0eTIgPSBwYWRkbGUueTtcclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgbGluZSBkaXJlY3Rpb25cclxuXHRcdFx0dmFyIGRpcmVjdGlvbiA9IEdhbWUuU3VwcG9ydC5DYWxjLnBvaW50RGlyZWN0aW9uKHgxLCB5MSwgeDIsIHkyKTtcclxuXHJcblx0XHRcdGNvbnRleHQuZHJhd0xpbmUoeDEsIHkxLCB4MiwgeTIsICdyZWQnKTtcclxuXHJcblx0XHRcdC8vIEF2ZXJhZ2UgdGhlIGRpcmVjdGlvbiB3aXRoIHN0cmFpZ2h0IGRvd25cclxuXHRcdFx0ZGlyZWN0aW9uID0gKGRpcmVjdGlvbiArIChNYXRoLlBJICogMy8yKSkvMjtcclxuXHJcblx0XHRcdGNvbnRleHQuZHJhd0xpbmUoeDIsIHkyLCB4MiAtIE1hdGguY29zKGRpcmVjdGlvbikgKiA2MCwgeTIgKyBNYXRoLmNvcyhkaXJlY3Rpb24pICogNjAsICdncmVlbicpO1xyXG5cclxuXHRcdFx0Ly8gY29uc29sZS5sb2coJ0luaXRpYWw6IERpcjogJyArIGRpcmVjdGlvbiArICcgKFJhZCkgJyArIChkaXJlY3Rpb24gKiAxODAgLyBNYXRoLlBJKSArICcgKERlZyknKTtcclxuXHJcblx0XHRcdC8vIFRvIG1ha2UgdGhpbmdzIGEgYml0IG1vcmUgcmFuZG9tLCB3ZSdyZSBnb2luZyB0byBzcHJlYWQgYXJvdW5kXHJcblx0XHRcdC8vIHRoZSBkaXJlY3Rpb24gYSBiaXQsIG1ha2luZyBvdXIgZ2FtZSBhIGJpdCBoYXJkZXIgdG8ga25vd1xyXG5cdFx0XHQvLyBob3cgdGhlIGJhbGwgaXMgZ29pbmcgdG8gYm91bmNlIGFoZWFkIG9mIHRpbWUuIE5lYXQhXHJcblxyXG5cdFx0XHQvLyBEZXRlcm1pbmUgdGhlIHNwcmVhZFxyXG5cdFx0XHR2YXIgc3ByZWFkID0gYWNjdXJhY3kgLSAxO1xyXG5cclxuXHRcdFx0Ly8gT2Zmc2V0IHRoZSBkaXJlY3Rpb25cclxuXHRcdFx0Ly8gZGlyZWN0aW9uICo9IDEgKyAoKE1hdGgucmFuZG9tKCkgKiBzcHJlYWQgKiAyIC0gc3ByZWFkKSAvICgxODAgLyBNYXRoLlBJKSk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnU3ByZWFkOiBEaXI6ICcgKyBkaXJlY3Rpb24gKyAnIChSYWQpICcgKyAoZGlyZWN0aW9uICogMTgwIC8gTWF0aC5QSSkgKyAnIChEZWcpJyk7XHJcblxyXG5cdFx0XHQvLyBNYWtlIHN1cmUgdGhlIGRpcmVjdGlvbiBpc24ndCBjb21wbGV0ZWx5IHdhY2tcclxuXHRcdFx0ZGlyZWN0aW9uID0gTWF0aC5taW4oTWF0aC5tYXgoTWF0aC5QSSAqIDkgLyA4LCBkaXJlY3Rpb24pLCBNYXRoLlBJICogMTUgLyA4KTtcclxuXHJcblx0XHRcdGNvbnRleHQuZHJhd0xpbmUoeDIsIHkyLCB4MiAtIE1hdGguY29zKGRpcmVjdGlvbikgKiA2MCwgeTIgKyBNYXRoLmNvcyhkaXJlY3Rpb24pICogNjAsICdvcmFuZ2UnKTtcclxuXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdDbGFtcDogRGlyOiAnICsgZGlyZWN0aW9uICsgJyAoUmFkKSAnICsgKGRpcmVjdGlvbiAqIDE4MCAvIE1hdGguUEkpICsgJyAoRGVnKScpO1xyXG5cclxuXHRcdFx0Ly8gQmVmb3JlIHdlIGRldGVybWluZSB0aGUgbmV3IGRpcmVjdGlvbiBvZiB0aGUgYmFsbCwgd2UgbmVlZFxyXG5cdFx0XHQvLyB0byBkZXRlcm1pbmUgaG93IGZhc3QgdGhlIGJhbGwgc2hvdWxkIGJlIHRyYXZlbGxpbmcuIFdlXHJcblx0XHRcdC8vIGNhbiB0YWtlIHRoZSBjdXJyZW50IHNwZWVkLCBhbmQgYWNjZWxlcmF0ZSB0aGUgYmFsbC5cclxuXHJcblx0XHRcdC8vIERldGVybWluZSB0aGUgY3VycmVudCBzcGVlZCBvZiB0aGUgYmFsbFxyXG5cdFx0XHR2YXIgc3BlZWQgPSAyO1xyXG5cdFx0XHQvLyB2YXIgc3BlZWQgPSBNYXRoLnNxcnQoTWF0aC5wb3coYmFsbC5keCwgMikgKyBNYXRoLnBvdyhiYWxsLmR5LCAyKSk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnSW5pdGlhbDogU3BlZWQ6ICcgKyBzcGVlZCk7XHJcblxyXG5cdFx0XHQvLyBJbmNyZWFzZSB0aGUgc3BlZWRcclxuXHRcdFx0c3BlZWQgKj0gYWNjZWxlcmF0aW9uICsgMTtcclxuXHJcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdBY2M6IFNwZWVkOiAnICsgc3BlZWQpO1xyXG5cclxuXHRcdFx0Ly8gV2hlbiBkZXRlcm1pbmluZyB0aGUgbGluZSBjb21wb25lbnRzLCB3ZSdkIG5vcm1hbGx5IGhhdmVcclxuXHRcdFx0Ly8gdG8gZmxpcCBkeSwgYXMgd2Ugd2FudCB0aGUgYmFsbCB0byBcImJvdW5jZVwiLiBIb3dldmVyLFxyXG5cdFx0XHQvLyBzaW5jZSB0aGUgYXhpcyBpcyBpbnZlcnRlZCwgdGhpcyBpcyBkb25lIGZvciB1cy5cclxuXHJcblx0XHRcdC8vIEZsaXAgdGhlIGxpbmUgZGlyZWN0aW9uXHJcblx0XHRcdHZhciBkeCA9IC1NYXRoLmNvcyhkaXJlY3Rpb24pICogc3BlZWQgKiAzMDtcclxuXHRcdFx0dmFyIGR5ID0gTWF0aC5zaW4oZGlyZWN0aW9uKSAqIHNwZWVkICogMzA7XHJcblxyXG5cdFx0XHRjb250ZXh0LmRyYXdMaW5lKHgxLCB5MSwgeDEgKyBkeCwgeTEgKyBkeSwgJ2JsdWUnKTtcclxuXHRcdFx0Y29udGV4dC5kcmF3TGluZSh4MiwgeTIsIHgyICsgZHgsIHkyICsgZHksICdibHVlJyk7XHJcblxyXG5cdFx0XHQvLyBjb25zb2xlLmxvZygnTmV3OiBTcGVlZDogJyArIGR4ICsgJywgJyArIGR5KTtcclxuXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyB0aGUgTW92ZW1lbnQgQWN0aW9ucyBvZiB0aGlzIFBhZGRsZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YXBwbHlNb3ZlbWVudEFjdGlvbnMoKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIE1vdmUgUmlnaHRcclxuXHRcdGlmKHdpbmRvdy5rZXlib2FyZC5pc0tleURvd24od2luZG93LmNvbnRyb2xNYXAubW92ZVJpZ2h0KSkge1xyXG5cclxuXHRcdFx0aWYodGhpcy5jYW5Nb3ZlUmlnaHQoKSkge1xyXG5cdFx0XHRcdHRoaXMubW92ZVJpZ2h0KCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIE1vdmUgTGVmdFxyXG5cdFx0ZWxzZSBpZih3aW5kb3cua2V5Ym9hcmQuaXNLZXlEb3duKHdpbmRvdy5jb250cm9sTWFwLm1vdmVMZWZ0KSkge1xyXG5cclxuXHRcdFx0aWYodGhpcy5jYW5Nb3ZlTGVmdCgpKSB7XHJcblx0XHRcdFx0dGhpcy5tb3ZlTGVmdCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgUGFkZGxlIGNhbiBtb3ZlIHRvIHRoZSBMZWZ0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRjYW5Nb3ZlTGVmdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLnggPiAwO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmVzIHRoaXMgUGFkZGxlIHRvIHRoZSBMZWZ0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRtb3ZlTGVmdCgpIHtcclxuXHRcdHRoaXMueCAtPSB0aGlzLm1vdmVtZW50U3BlZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgUGFkZGxlIGNhbiBtb3ZlIHRvIHRoZSBSaWdodC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y2FuTW92ZVJpZ2h0KCkge1xyXG5cdFx0cmV0dXJuIHRoaXMueCA8IGdhbWUoKS5ncmFwaGljcy5nZXRDYW52YXMoKS5nZXRXaWR0aCgpIC0gdGhpcy53aWR0aDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlcyB0aGlzIFBhZGRsZSB0byB0aGUgUmlnaHQuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdG1vdmVSaWdodCgpIHtcclxuXHRcdHRoaXMueCArPSB0aGlzLm1vdmVtZW50U3BlZWQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGllcyB0aGUgTGF1bmNoIEFjdGlvbiBvZiB0aGlzIFBhZGRsZS5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0YXBwbHlMYXVuY2hBY3Rpb24oKSB7XHJcblxyXG5cdFx0Ly8gQ2hlY2sgZm9yIExhdW5jaCBBY3Rpb25cclxuXHRcdGlmKHdpbmRvdy5rZXlib2FyZC5pc0tleVByZXNzZWQod2luZG93LmNvbnRyb2xNYXAubGF1bmNoKSkge1xyXG5cclxuXHRcdFx0Ly8gTWFrZSBzdXJlIHRoZSBQYWRkbGUgY2FuIGxhdW5jaCB0aGUgVHJhY2tpbmcgT2JqZWN0XHJcblx0XHRcdGlmKHRoaXMuY2FuTGF1bmNoVHJhY2tpbmdPYmplY3QoKSkge1xyXG5cclxuXHRcdFx0XHQvLyBMYXVuY2ggdGhlIFRyYWNraW5nIE9iamVjdFxyXG5cdFx0XHRcdHRoaXMubGF1bmNoVHJhY2tpbmdPYmplY3QoKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBQYWRkbGUgY2FuIGxhdW5jaC5cclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge2Jvb2xlYW59XHJcblx0ICovXHJcblx0Y2FuTGF1bmNoVHJhY2tpbmdPYmplY3QoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5oYXNUcmFja2luZ09iamVjdCgpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhpcyBQYWRkbGUgaGFzIGEgVHJhY2tpbmcgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7Ym9vbGVhbn1cclxuXHQgKi9cclxuXHRoYXNUcmFja2luZ09iamVjdCgpIHtcclxuXHRcdHJldHVybiB0aGlzLnRyYWNraW5nT2JqZWN0ICE9IG51bGw7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgVHJhY2tpbmcgT2JqZWN0IGZvciB0aGlzIFBhZGRsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5HYW1lT2JqZWN0fSAgb2JqZWN0XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdHNldFRyYWNraW5nT2JqZWN0KG9iamVjdCkge1xyXG5cdFx0dGhpcy50cmFja2luZ09iamVjdCA9IG9iamVjdDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBMYXVuY2hlcyB0aGUgVHJhY2tpbmcgT2JqZWN0LlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRsYXVuY2hUcmFja2luZ09iamVjdCgpIHtcclxuXHJcblx0XHQvLyBMYXVuY2ggdGhlIEJhbGxcclxuXHRcdHRoaXMudHJhY2tpbmdPYmplY3QubGF1bmNoKDkwKTtcclxuXHJcblx0XHQvLyBSZWxlYXNlIHRoZSBUcmFja2luZyBPYmplY3RcclxuXHRcdHRoaXMudHJhY2tpbmdPYmplY3QgPSBudWxsO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBDcmVhdGVzIGEgbmV3IFRyYWNraW5nIEJhbGwuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtHYW1lLk9iamVjdHMuQmFsbEdhbWVPYmplY3R9XHJcblx0ICovXHJcblx0Y3JlYXRlVHJhY2tpbmdCYWxsKCkge1xyXG5cclxuXHRcdC8vIENyZWF0ZSBhIG5ldyBCYWxsXHJcblx0XHR2YXIgYmFsbCA9IGdhbWUoKS5vYmplY3RzLmNyZWF0ZUluc3RhbmNlKCdCYWxsR2FtZU9iamVjdCcsIHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkgLSAxMCk7XHJcblxyXG5cdFx0Ly8gRm9yY2UgdGhlIEJhbGwgdG8gdHJhY2sgdGhpcyBQYWRkbGVcclxuXHRcdGJhbGwuc2V0VHJhY2tpbmdPYmplY3QodGhpcywgdGhpcy53aWR0aCAvIDIpO1xyXG5cclxuXHRcdC8vIFNldCB0aGUgVHJhY2tpbmcgT2JqZWN0IHRvIHRoZSBCYWxsXHJcblx0XHR0aGlzLnNldFRyYWNraW5nT2JqZWN0KGJhbGwpO1xyXG5cclxuXHRcdC8vIFJldHVybiB0aGUgQmFsbFxyXG5cdFx0cmV0dXJuIGJhbGw7XHJcblxyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEJvdW5jZXMgdGhlIHNwZWNpZmllZCBCYWxsIG9mZiBvZiB0aGlzIFBhZGRsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge0dhbWUuT2JqZWN0cy5CYWxsR2FtZU9iamVjdH0gIGJhbGxcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgICAgICAgICAgICAgICBhY2NlbGVyYXRpb25cclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gICAgICAgICAgICAgICAgICAgICAgICBhY2N1cmFjeVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRib3VuY2UoYmFsbCwgYWNjZWxlcmF0aW9uID0gMCwgYWNjdXJhY3kgPSAwLjkpIHtcclxuXHJcblx0XHQvLyBGb3IgZGV0ZXJtaW5pbmcgdGhlIGJvdW5jZSBkaXJlY3Rpb24sIHdlIHdhbnQgdGhpcyB0byBkcm9wIGZyb21cclxuXHRcdC8vIHRoZSBiYWxsLCBjb21wYXJlIHRoZSBpbXBhY3QgdG8gdGhlIGNlbnRlciBhbmQgYm91bmNlIGF3YXlcclxuXHRcdC8vIGZyb20gdGhlIGRpcmVjdGlvbi4gVGhpcyBjcmVhdGVzIGEgcmVhbCBwYWRkbGUgZWZmZWN0LlxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgaW1wYWN0IGxpbmVcclxuXHRcdHZhciB4MSwgeTEsIHgyLCB5MjtcclxuXHJcblx0XHR4MSA9IGdhbWUoKS5ncmFwaGljcy5nZXRDYW52YXMoKS5nZXRNb3VzZVgoKTtcclxuXHRcdHkxID0gdGhpcy55O1xyXG5cdFx0eDIgPSB0aGlzLnggKyB0aGlzLndpZHRoIC8gMjtcclxuXHRcdHkyID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyO1xyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgbGluZSBkaXJlY3Rpb25cclxuXHRcdHZhciBkaXJlY3Rpb24gPSBHYW1lLlN1cHBvcnQuQ2FsYy5wb2ludERpcmVjdGlvbih4MSwgeTEsIHgyLCB5Mik7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ0luaXRpYWw6IERpcjogJyArIGRpcmVjdGlvbiArICcgKFJhZCkgJyArIChkaXJlY3Rpb24gKiAxODAgLyBNYXRoLlBJKSArICcgKERlZyknKTtcclxuXHJcblx0XHQvLyBUbyBtYWtlIHRoaW5ncyBhIGJpdCBtb3JlIHJhbmRvbSwgd2UncmUgZ29pbmcgdG8gc3ByZWFkIGFyb3VuZFxyXG5cdFx0Ly8gdGhlIGRpcmVjdGlvbiBhIGJpdCwgbWFraW5nIG91ciBnYW1lIGEgYml0IGhhcmRlciB0byBrbm93XHJcblx0XHQvLyBob3cgdGhlIGJhbGwgaXMgZ29pbmcgdG8gYm91bmNlIGFoZWFkIG9mIHRpbWUuIE5lYXQhXHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBzcHJlYWRcclxuXHRcdHZhciBzcHJlYWQgPSBhY2N1cmFjeSAtIDE7XHJcblxyXG5cdFx0Ly8gT2Zmc2V0IHRoZSBkaXJlY3Rpb25cclxuXHRcdC8vIGRpcmVjdGlvbiAqPSAxICsgKChNYXRoLnJhbmRvbSgpICogc3ByZWFkICogMiAtIHNwcmVhZCkgLyAoMTgwIC8gTWF0aC5QSSkpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdTcHJlYWQ6IERpcjogJyArIGRpcmVjdGlvbiArICcgKFJhZCkgJyArIChkaXJlY3Rpb24gKiAxODAgLyBNYXRoLlBJKSArICcgKERlZyknKTtcclxuXHJcblx0XHQvLyBNYWtlIHN1cmUgdGhlIGRpcmVjdGlvbiBpc24ndCBjb21wbGV0ZWx5IHdhY2tcclxuXHRcdGRpcmVjdGlvbiA9IE1hdGgubWluKE1hdGgubWF4KE1hdGguUEkgKiA5IC8gOCwgZGlyZWN0aW9uKSwgTWF0aC5QSSAqIDE1IC8gOCk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ0NsYW1wOiBEaXI6ICcgKyBkaXJlY3Rpb24gKyAnIChSYWQpICcgKyAoZGlyZWN0aW9uICogMTgwIC8gTWF0aC5QSSkgKyAnIChEZWcpJyk7XHJcblxyXG5cdFx0Ly8gQmVmb3JlIHdlIGRldGVybWluZSB0aGUgbmV3IGRpcmVjdGlvbiBvZiB0aGUgYmFsbCwgd2UgbmVlZFxyXG5cdFx0Ly8gdG8gZGV0ZXJtaW5lIGhvdyBmYXN0IHRoZSBiYWxsIHNob3VsZCBiZSB0cmF2ZWxsaW5nLiBXZVxyXG5cdFx0Ly8gY2FuIHRha2UgdGhlIGN1cnJlbnQgc3BlZWQsIGFuZCBhY2NlbGVyYXRlIHRoZSBiYWxsLlxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgY3VycmVudCBzcGVlZCBvZiB0aGUgYmFsbFxyXG5cdFx0dmFyIHNwZWVkID0gTWF0aC5zcXJ0KE1hdGgucG93KGJhbGwuZHgsIDIpICsgTWF0aC5wb3coYmFsbC5keSwgMikpO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdJbml0aWFsOiBTcGVlZDogJyArIHNwZWVkKTtcclxuXHJcblx0XHQvLyBJbmNyZWFzZSB0aGUgc3BlZWRcclxuXHRcdHNwZWVkICo9IGFjY2VsZXJhdGlvbiArIDE7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coJ0FjYzogU3BlZWQ6ICcgKyBzcGVlZCk7XHJcblxyXG5cdFx0Ly8gV2hlbiBkZXRlcm1pbmluZyB0aGUgbGluZSBjb21wb25lbnRzLCB3ZSdkIG5vcm1hbGx5IGhhdmVcclxuXHRcdC8vIHRvIGZsaXAgZHksIGFzIHdlIHdhbnQgdGhlIGJhbGwgdG8gXCJib3VuY2VcIi4gSG93ZXZlcixcclxuXHRcdC8vIHNpbmNlIHRoZSBheGlzIGlzIGludmVydGVkLCB0aGlzIGlzIGRvbmUgZm9yIHVzLlxyXG5cclxuXHRcdC8vIEZsaXAgdGhlIGxpbmUgZGlyZWN0aW9uXHJcblx0XHR2YXIgZHggPSAtTWF0aC5jb3MoZGlyZWN0aW9uKSAqIHNwZWVkO1xyXG5cdFx0dmFyIGR5ID0gTWF0aC5zaW4oZGlyZWN0aW9uKSAqIHNwZWVkO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKCdOZXc6IFNwZWVkOiAnICsgZHggKyAnLCAnICsgZHkpO1xyXG5cclxuXHRcdC8vIFNldCB0aGUgc3BlZWQgb2YgdGhlIGJhbGxcclxuXHRcdGJhbGwuZHggPSBkeDtcclxuXHRcdGJhbGwuZHkgPSBkeTtcclxuXHJcblx0XHQvLyBNb3ZlIHRoZSBCYWxsIG9uY2UgdG8gcHJldmVudCBhZGRpdGlvbmFsIGNvbGxpc2lvbnNcclxuXHRcdGJhbGwueCArPSBiYWxsLmR4O1xyXG5cdFx0YmFsbC55ICs9IGJhbGwuZHk7XHJcblxyXG5cdH1cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5QYWRkbGVHYW1lT2JqZWN0ID0gUGFkZGxlR2FtZU9iamVjdDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2dhbWUvT2JqZWN0cy9QYWRkbGVHYW1lT2JqZWN0LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvc2Fzcy9hcHAuc2Nzc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkZvdW5kYXRpb24uQm9vdHN0cmFwJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkQ29uZmlndXJhdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCb290c3RyYXBzIHRoZSBnaXZlbiBhcHBsaWNhdGlvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtHYW1lLkNvbnRyYWN0cy5Gb3VuZGF0aW9uLkFwcGxpY2F0aW9ufSAgYXBwXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7dm9pZH1cclxuICAgICAqL1xyXG5cdGJvb3RzdHJhcChhcHApIHtcclxuXHJcblx0fTtcclxuXHJcbn1cclxuXHJcbi8vIEFzc2lnbiBDb25zdHJ1Y3RvciB0byBOYW1lc3BhY2VcclxubnMuTG9hZENvbmZpZ3VyYXRpb24gPSBMb2FkQ29uZmlndXJhdGlvbjtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0Jvb3RzdHJhcC9Mb2FkQ29uZmlndXJhdGlvbi5qcyIsImltcG9ydCBDb250YWluZXIgZnJvbSAnRW5naW5lL0NvbnRhaW5lci9Db250YWluZXIuanMnO1xyXG5cclxuaWYodHlwZW9mIHdpbmRvdy5hcHAgPT09ICd1bmRlZmluZWQnKSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFJldHVybnMgdGhlIGF2YWlsYWJsZSBjb250YWluZXIgaW5zdGFuY2UuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd8bnVsbH0gIGFic3RyYWN0XHJcblx0ICogQHBhcmFtICB7YXJyYXl9ICAgICAgICBwYXJhbWV0ZXJzXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHttaXhlZH1cclxuXHQgKi9cclxuXHR3aW5kb3cuYXBwID0gZnVuY3Rpb24oYWJzdHJhY3QgPSBudWxsLCBwYXJhbWV0ZXJzID0gW10pIHtcclxuXHJcblx0XHQvLyBDaGVjayBpZiBubyBhYnN0cmFjdCB0eXBlIHdhcyBwcm92aWRlZFxyXG5cdFx0aWYoYWJzdHJhY3QgPT09IG51bGwpIHtcclxuXHJcblx0XHRcdC8vIFJldHVybiB0aGUgQ29udGFpbmVyIEluc3RhbmNlXHJcblx0XHRcdHJldHVybiBDb250YWluZXIuZ2V0SW5zdGFuY2UoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIGFuIGluc3RhbmNlIG9mIHRoZSBhYnN0cmFjdCB0eXBlXHJcblx0XHRyZXR1cm4gQ29udGFpbmVyLmdldEluc3RhbmNlKCkubWFrZShhYnN0cmFjdCwgcGFyYW1ldGVycyk7XHJcblxyXG5cdH07XHJcblxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9lbmdpbmUvRm91bmRhdGlvbi9oZWxwZXJzLmpzIiwidmFyIG5zID0gbmFtZXNwYWNlKCdHYW1lLkZvdW5kYXRpb24nKTtcclxuXHJcbmltcG9ydCBMb29wIGZyb20gJ0VuZ2luZS9TdXBwb3J0L0xvb3AuanMnO1xyXG5pbXBvcnQgTWFuYWdlciBmcm9tICdFbmdpbmUvT2JqZWN0cy9NYW5hZ2VyLmpzJztcclxuaW1wb3J0IEdyYXBoaWNzIGZyb20gJ0VuZ2luZS9HcmFwaGljcy9HcmFwaGljcy5qcyc7XHJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJ0VuZ2luZS9FdmVudHMvRGlzcGF0Y2hlci5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlcyBhIG5ldyBHYW1lIGluc3RhbmNlLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lJ3MgR3JhcGhpY3MuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5HcmFwaGljc31cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ncmFwaGljcyA9IG5ldyBHcmFwaGljcyh0aGlzKTtcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFRoZSBHYW1lJ3MgT2JqZWN0IE1hbmFnZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5PYmplY3RzfVxyXG5cdFx0ICovXHJcblx0XHR0aGlzLm9iamVjdHMgPSBuZXcgTWFuYWdlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIEV2ZW50IERpc3BhdGNoZXIuXHJcblx0XHQgKlxyXG5cdFx0ICogQHZhciB7R2FtZS5FdmVudHMuRGlzcGF0Y2hlcn1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5ldmVudHMgPSBuZXcgRGlzcGF0Y2hlcigpO1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIGdsb2JhbCBnYW1lIHZhcmlhYmxlcy5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtvYmplY3R9XHJcblx0XHQgKi9cclxuXHRcdHRoaXMuX3ZhcmlhYmxlcyA9IHt9O1xyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGhlIFN0ZXAgTG9vcC5cclxuXHRcdCAqXHJcblx0XHQgKiBAdmFyIHtHYW1lLlN1cHBvcnQuTG9vcH1cclxuXHRcdCAqL1xyXG5cdFx0dGhpcy5zdGVwTG9vcCA9IG5ldyBMb29wKHtcclxuXHRcdFx0J2xvb3AnOiB0aGlzLmRvU3RlcExvb3AuYmluZCh0aGlzKSxcclxuXHRcdFx0J2ludGVydmFsJzogMSAvIDYwXHJcblx0XHR9KTtcclxuXHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnRzIHRoZSBHYW1lLlxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRzdGFydCgpIHtcclxuXHJcblx0XHQvLyBTdGFydCB0aGUgR3JhcGhpY3NcclxuXHRcdHRoaXMuZ3JhcGhpY3Muc3RhcnQoKTtcclxuXHJcblx0XHR0aGlzLnN0ZXBMb29wLnN0YXJ0KCk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHRkb1N0ZXBMb29wKCkge1xyXG5cdFx0dGhpcy5vYmplY3RzLnN0ZXBHYW1lT2JqZWN0cygpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIERyYXdzIHRoZSBHYW1lIE9iamVjdHMuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtHYW1lLkdyYXBoaWNzLkNhbnZhc30gIGNhbnZhc1xyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dGhpc31cclxuXHQgKi9cclxuXHRkcmF3R2FtZU9iamVjdHMoY2FudmFzKSB7XHJcblxyXG5cdFx0Ly8gRHJhdyB0aGUgR2FtZSBPYmplY3RzXHJcblx0XHR0aGlzLm9iamVjdHMuZHJhd0dhbWVPYmplY3RzKGNhbnZhcyk7XHJcblxyXG5cdFx0Ly8gQWxsb3cgQ2hhaW5pbmdcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZS5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gIGtleVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7bWl4ZWR9XHJcblx0ICovXHJcblx0Z2V0VmFyaWFibGUoa2V5KSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fdmFyaWFibGVzW2tleV07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyB0aGUgc3BlY2lmaWVkIEdhbWUgVmFyaWFibGUuXHJcblx0ICpcclxuXHQgKiBAcGFyYW0gIHtzdHJpbmd9ICBrZXlcclxuXHQgKiBAcGFyYW0gIHttaXhlZH0gICB2YWx1ZVxyXG5cdCAqXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzZXRWYXJpYWJsZShrZXksIHZhbHVlKSB7XHJcblx0XHR0aGlzLl92YXJpYWJsZXNba2V5XSA9IHZhbHVlO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluY3JlYXNlcyB0aGUgc3BlY2lmaWVkIEdhbWUgVmFyaWFibGUgYnkgdGhlIGdpdmVuIGFtb3VudC5cclxuXHQgKlxyXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gICBrZXlcclxuXHQgKiBAcGFyYW0gIHtudW1lcmljfSAgYW1vdW50XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGluY1ZhcmlhYmxlKGtleSwgYW1vdW50KSB7XHJcblx0XHR0aGlzLl92YXJpYWJsZXNba2V5XSArPSBhbW91bnQ7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogRGVjcmVhc2VzIHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZSBieSB0aGUgZ2l2ZW4gYW1vdW50LlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAgIGtleVxyXG5cdCAqIEBwYXJhbSAge251bWVyaWN9ICBhbW91bnRcclxuXHQgKlxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0ZGVjVmFyaWFibGUoa2V5LCBhbW91bnQpIHtcclxuXHRcdHRoaXMuX3ZhcmlhYmxlc1trZXldIC09IGFtb3VudDtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBzcGVjaWZpZWQgR2FtZSBWYXJpYWJsZSBpcyBkZWZpbmVkLlxyXG5cdCAqXHJcblx0ICogQHBhcmFtICB7c3RyaW5nfSAga2V5XHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtib29sZWFufVxyXG5cdCAqL1xyXG5cdGhhc1ZhcmlhYmxlKGtleSkge1xyXG5cdFx0cmV0dXJuIHR5cGVvZiB0aGlzLl92YXJpYWJsZXNba2V5XSA9PT0gJ3VuZGVmaW5lZCc7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogUmV0dXJucyB0aGUgR2FtZSBWYXJpYWJsZXMuXHJcblx0ICpcclxuXHQgKiBAcmV0dXJuIHtvYmplY3R9XHJcblx0ICovXHJcblx0Z2V0VmFyaWFibGVzKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhcmlhYmxlcztcclxuXHR9O1xyXG5cclxufVxyXG5cclxuLy8gQXNzaWduIENvbnN0cnVjdG9yIHRvIE5hbWVzcGFjZVxyXG5ucy5HYW1lID0gR2FtZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2VuZ2luZS9Gb3VuZGF0aW9uL0dhbWUuanMiXSwic291cmNlUm9vdCI6IiJ9