var ns = namespace('Game.Support');

export default class ServiceProvider {

	/**
	 * Creates a new Service Provider instance.
	 *
	 * @param  {Framework.Application}  app
	 *
	 * @return {this}
	 */
	constructor(app) {

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

	};

    /**
     * Returns the services provided by this provider.
     *
     * @return {array}
     */
    provides() {
        return [];
    };

    /**
     * Returns the events that trigger this service provider to register.
     *
     * @return {array}
     */
    when() {
        return [];
    }

    /**
     * Returns whether or not this provider is deferred.
     *
     * @return {boolean}
     */
    isDeferred() {
        return this._defer;
    }

}

// Assign Constructor to Namespace
ns.ServiceProvider = ServiceProvider;