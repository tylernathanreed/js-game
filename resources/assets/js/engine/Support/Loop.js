var ns = namespace('Engine.Support');

export default class Loop {

	/**
	 * Creates a new Loop instance.
	 *
	 * @param  {object}  options
	 *
	 * @return {this}
	 */
	constructor(options = {}) {

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

	};

	/**
	 * Starts the Loop.
	 *
	 * @return {this}
	 */
	start() {

		// Check if the Loop is already active
		if(this.intervalId != null) {

			// Clear the Loop Interval
			clearInterval(this.intervalId);

		}

		// Start the Loop
		this.intervalId = setInterval(this.doLoop.bind(this), this.intervalTimeout);

		// Mark the Loop as running
		this.running = true;

		// Allow Chaining
		return this;

	};

	/**
	 * Performs an iteration of the Loop.
	 *
	 * @return {this}
	 */
	doLoop() {

		// Perform any actions before the Loop
		this.beforeLoopIteration();

		// Perform the Loop iteration
		this.doLoopIteration();

		// Perform any actions after the Loop
		this.afterLoopIteration();

		// Allow Chaining
		return this;

	};

	/**
	 * Calls the Before Loop Handler.
	 *
	 * @return {void}
	 */
	beforeLoopIteration() {

		// Make sure the Before Loop Handler is defined
		if(typeof this.beforeLoopHandler !== 'function') {
			return;
		}

		// Call the Before Loop Handler
		this.beforeLoopHandler.apply(this, []);

	};

	/**
	 * Calls the Loop Handler.
	 *
	 * @return {void}
	 */
	doLoopIteration() {

		// Make sure the Loop Handler is defined
		if(typeof this.loopHandler !== 'function') {
			return;
		}

		// Call the Loop Handler
		this.loopHandler.apply(this, []);

	};

	/**
	 * Calls the After Loop Handler.
	 *
	 * @return {void}
	 */
	afterLoopIteration() {

		// Make sure the After Loop Handler is defined
		if(typeof this.afterLoopHandler !== 'function') {
			return;
		}

		// Call the After Loop Handler
		this.afterLoopHandler.apply(this, []);

	};

	/**
	 * Sets the Before Loop Handler.
	 *
	 * @param  {function|null}  callback
	 *
	 * @return {this}
	 */
	onBeforeLoop(callback) {

		this.beforeLoopHandler = callback;

		return this;

	};

	/**
	 * Sets the Loop Handler.
	 *
	 * @param  {function|null}  callback
	 *
	 * @return {this}
	 */
	onLoop(callback) {

		this.loopHandler = callback;

		return this;

	};

	/**
	 * Sets the After Loop Handler.
	 *
	 * @param  {function|null}  callback
	 *
	 * @return {this}
	 */
	onAfterLoop(callback) {

		this.afterLoopHandler = callback;

		return this;

	};

	/**
	 * Ends the Loop.
	 *
	 * @return {this}
	 */
	stop() {

		// Clear the Loop Interval
		clearInterval(this.intervalId);

		// Mark the Loop as no longer running
		this.running = true;

		// Allow Chaining
		return this;

	}

}

// Assign Constructor to Namespace
ns.Loop = Loop;