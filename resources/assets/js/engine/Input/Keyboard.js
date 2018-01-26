var ns = namespace('Game.Input');

class Keyboard {

    /**
     * Creates a new Keyboard instance.
     *
     * @return {static}
     */
    constructor() {

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

    };

    /**
     * Registers the Keyboard Event Listeners.
     *
     * @return {void}
     */
    registerKeyboardListeners() {

        // Register the Key Down Listener
        this.registerKeyDownListener();

        // Register the Key Up Listener
        this.registerKeyUpListener();

    };

    /**
     * Registers the Key Down Listener.
     *
     * @return {void}
     */
    registerKeyDownListener() {

        // Listen to the Key Down Event using this.keyDownHandler()
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);

    };

    /**
     * Registers the Key Up Listener.
     *
     * @return {void}
     */
    registerKeyUpListener() {

        // Listen to the Key Up Event using this.keyUpHandler()
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);

    };

    /**
     * Handles the Key Down Event.
     *
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    keyDownHandler(event) {

        // Check for a Key Hold Event
        if(event.repeat) {

            // Handle as a Key Hold Event
            return this.keyHoldHandler(event);

        }

        // Handle as a Key Pressed Event
        return this.keyPressedHandler(event);

    };

    /**
     * Handles the Key Pressed Event.
     *
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    keyPressedHandler(event) {

        // Update the Keyboard State
        this._updateKeyboardStates(Keyboard.KEYSTATE_PRESSED, event);

        // Fire the Key Pressed Event
        Keyboard.dispatcher.fire('Keyboard.Pressed', {
            'keyboard': this,
            'event': event
        });

        // Remember the Keyboard Event
        this.previousKeyboardEvent = event;

    };

    /**
     * Handles the Key Hold Event.
     *
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    keyHoldHandler(event) {

        // Update the Keyboard State
        this._updateKeyboardStates(Keyboard.KEYSTATE_HOLD, event);

        // Fire the Key Hold Event
        Keyboard.dispatcher.fire('Keyboard.Hold', {
            'keyboard': this,
            'event': event
        });

        // Remember the Keyboard Event
        this.previousKeyboardEvent = event;

    };

    /**
     * Handles the Key Up Event.
     *
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    keyUpHandler(event) {

        // Handle as a Key Released Event
        return this.keyReleasedHandler(event);

    };

    /**
     * Handles the Key Released Event.
     *
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    keyReleasedHandler(event) {

        // Update the Keyboard State
        this._updateKeyboardStates(Keyboard.KEYSTATE_RELEASED, event);

        // Fire the Key Released Event
        Keyboard.dispatcher.fire('Keyboard.Released', {
            'keyboard': this,
            'event': event
        });

        // Remember the Keyboard Event
        this.previousKeyboardEvent = event;

    };

    /**
     * Updates the Key State and Key Code State using the specified Keyboard Event.
     *
     * @param  {string}         state
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    _updateKeyboardStates(state, event) {

        // Update the Key State
        this._updateKeyState(event.key, state, event);

        // Update the Key Code State
        this._updateKeyCodeState(event.code, state, event);

    };

    /**
     * Updates the specified Key State using the given Keyboard Event.
     *
     * @param  {string}         key
     * @param  {string}         state
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    _updateKeyState(key, state, event) {

        // Convert the Key to Upper Case
        var key = key.toUpperCase();

        // Update the Key State
        this.keyStates[state][key] = event;

        // Clear the other States for the Key
        switch(state) {

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

    };

    /**
     * Updates the specified Key Code State using the given Keyboard Event.
     *
     * @param  {string}         code
     * @param  {string}         state
     * @param  {KeyboardEvent}  event
     *
     * @return {void}
     */
    _updateKeyCodeState(code, state, event) {

        // Update the Key Code State
        this.keyCodeStates[state][code] = event;

        // Clear the other States for the Key Code
        switch(state) {

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

    };

    /**
     * Returns whether or not the specified Key is pressed.
     *
     * @param  {string}  key
     *
     * @return {boolean}
     */
    isKeyPressed(key) {

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
    isKeyCodePressed(code) {

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
    isKeyHeld(key) {

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
    isKeyCodeHeld(code) {

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
    isKeyDown(key) {

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
    isKeyCodeDown(code) {

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
    isKeyReleased(key) {

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
    isKeyCodeReleased(code) {

        // Return whether or not the Key Code is up
        return typeof this.keyCodeStates[Keyboard.KEYSTATE_RELEASED][code] !== 'undefined';

    }

    /**
     * Returns the Event Dispatcher.
     *
     * @return {Game.Events.Dispatcher}
     */
    static getDispatcher() {

        return Keyboard.dispatcher;

    }

    /**
     * Sets the Event Dispatcher.
     *
     * @param  {Game.Events.Dispatcher}  dispatcher
     *
     * @return {void}
     */
    static setDispatcher(dispatcher) {

        Keyboard.dispatcher = dispatcher;

    }

};

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