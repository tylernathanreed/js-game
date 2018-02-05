var ns = namespace('Engine.Input');

export default class Mouse {

    /**
     * Creates a new Mouse instance.
     *
     * @return {static}
     */
    constructor() {

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

    };

    /**
     * Registers the Mouse Event Listeners.
     *
     * @return {void}
     */
    registerMouseListeners() {

        // Register the Mouse Move Listener
        this.registerMouseMoveListener();

    };

    /**
     * Registers the Mouse Move Listener.
     *
     * @return {void}
     */
    registerMouseMoveListener() {

        // Listen to the Key Down Event using this.mouseMoveHandler()
        document.addEventListener('mousemove', this.mouseMoveHandler.bind(this), false);

    };

    /**
     * Handles the Key Down Event.
     *
     * @param  {MouseEvent}  event
     *
     * @return {void}
     */
    mouseMoveHandler(event) {

        // Determine the Mouse Position from the Event
        var position = this._getMousePositionFromEvent(event);

        // Update the Position
        this._position = position;

    };

    /**
     * Returns the Mouse Position from the specified Mouse Event.
     *
     * @param  {MouseEvent}  event
     *
     * @return {object}
     */
    _getMousePositionFromEvent(event) {

        return {
            'x': event.clientX,
            'y': event.clientY
        };

    };

    /**
     * Returns the Mouse Position.
     *
     * @return {object}
     */
    getPosition() {
        return this._position;
    };

    /**
     * Returns the Mouse X Position.
     *
     * @return {float}
     */
    getX() {
        return this._position['x'];
    };

    /**
     * Returns the Mouse Y Position.
     *
     * @return {float}
     */
    getY() {
        return this._position['y'];
    };

};

// Assign Constructor to Namespace
ns.Mouse = Mouse;