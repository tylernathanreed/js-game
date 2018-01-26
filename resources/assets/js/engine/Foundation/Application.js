import Obj from 'Engine/Support/Obj.js';
import Container from 'Engine/Container/Container.js';
import EventServiceProvider from 'Engine/Events/EventServiceProvider.js';

export default class Application extends Container {

	/**
	 * Creates a new Application instance.
	 *
	 * @param  {string|null}  basePath
	 *
	 * @return {this}
	 */
	constructor(basePath = null) {

		// Call parent constructor
		super();

		/**
		 * The base path for the framework installation.
		 *
		 * @var {string}
		 */
		this._basePath = null;

		/**
		 * Indicates if the application has been bootstrapped before.
		 *
		 * @var {boolean}
		 */
		this._hasBeenBootstrapped = false;

	    /**
	     * Indicates if the application has "booted".
	     *
	     * @var {bool}
	     */
	    this._booted = false;

	    /**
	     * The array of booting callbacks.
	     *
	     * @var {array}
	     */
	    this._bootingCallbacks = [];

	    /**
	     * The array of booted callbacks.
	     *
	     * @var {array}
	     */
	    this._bootedCallbacks = [];

	    /**
	     * The array of terminating callbacks.
	     *
	     * @var {array}
	     */
	    this._terminatingCallbacks = [];

	    /**
	     * All of the registered service providers.
	     *
	     * @var {array}
	     */
	    this._serviceProviders = [];

	    /**
	     * The names of the loaded service providers.
	     *
	     * @var {object}
	     */
	    this._loadedProviders = {};

	    /**
	     * The deferred services and their providers.
	     *
	     * @var {array}
	     */
	    this._deferredServices = [];

	    /**
	     * A custom callback used to configure Monolog.
	     *
	     * @var {callable|null}
	     */
	    this._monologConfigurator = null;

	    /**
	     * The custom database path defined by the developer.
	     *
	     * @var {string|null}
	     */
	    this._databasePath = null;

	    /**
	     * The custom storage path defined by the developer.
	     *
	     * @var {string|null}
	     */
	    this._storagePath = null;

	    /**
	     * The custom environment path defined by the developer.
	     *
	     * @var {string|null}
	     */
	    this._environmentPath = null;

	    /**
	     * The environment file to load during bootstrapping.
	     *
	     * @var {string}
	     */
	    this._environmentFile = '.env';

	    /**
	     * The application namespace.
	     *
	     * @var {string|null}
	     */
	    this._namespace = null;

		// Check if a Base Path was provided
		if(basePath !== null) {

			// Set the Base Path
			this.setBasePath(basePath);

		}

		// Register the Base Bindings
		this._registerBaseBindings();

		// Register the Base Service Providers
		this._registerBaseServiceProviders();

		// Register the Core Container Aliases
		// this._registerCoreContainerAliases();

	};

	/**
	 * Registers the basic bindings into the container.
	 *
	 * @return {void}
	 */
	_registerBaseBindings() {

		// Set the Container instance to this Application
		this.constructor.setInstance(this);

		// Bind the 'app' keyword to this Application
		this.instance('app', this);

		// Bind the Container Class to this Application
		this.instance('Framework.Container', this);

		/**
		 * @todo Register Package Manifest
		 */

	};

	/**
	 * Registers all of the base service providers.
	 *
	 * @return {void}
	 */
	_registerBaseServiceProviders() {

		// Register the Event Service Provider
		this.register(new EventServiceProvider(this));

		// // Register the Log Service Provider
		// this.register(new LogServiceProvider(this));

		// // Register the Routing Service Provider
		// this.register(new RoutingServiceProvider(this));

	};

	/**
	 * Boots the application using the given bootstrappers.
	 *
	 * @param  {array}  bootstrappers
	 *
	 * @return {void}
	 */
	bootstrapWith(bootstrappers) {

		// Mark the application has booted
		this._hasBeenBootstrapped = true;

		// Run each bootstrapper
		for(let i = 0; i < bootstrappers.length; i++) {

			// Determine the current bootstrapper
			let bootstrapper = bootstrappers[i];

			// Fire the bootstrapping event
			this.get('events').fire('bootstrapping: ' + bootstrapper, [this]);

			// Run the bootstrapper
			this.make(bootstrapper).bootstrap(this);

			// Fire the bootstrapped event
			this.get('events').fire('bootstrapped: ' + bootstrapper, [this]);

		}

	};

	/**
	 * Registers a callback to run before a bootstrapper.
	 *
	 * @param  {string}    bootstrapper
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	beforeBootstrapping(bootstrapper, callback) {
		this.get('events').listen('bootstrapping: ' + bootstrapper, callback);
	};

	/**
	 * Registers a callback to run after a bootstrapper.
	 *
	 * @param  {string}    bootstrapper
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	afterBootstrapping(bootstrapper, callback) {
		this.get('events').listen('bootstrapped: ' + bootstrapper, callback);
	};

	/**
	 * Returns whether or not the application has been bootstrapped.
	 *
	 * @return {boolean}
	 */
	hasBeenBootstrapped() {
		return this._hasBeenBootstrapped;
	};

	/**
	 * Registers the given service provider with the application.
	 *
	 * @param  {Framework.Support.ServiceProvider|string}  provider
	 * @param  {object}                                    options
	 * @param  {boolean}                                   force
	 *
	 * @return {Framework.Support.ServiceProvider}
	 */
	register(provider, options = {}, force = false) {

		// Declare the registered provider
		var registered;

		// Check if the service provider is already registered, and we're not forcing
		if((registered = this.getProvider(provider)) && !force) {
			return registered;
		}

        // If the given "provider" is a string, we will resolve it, passing in the
        // application instance automatically for the developer. This is simply
        // a more convenient way of specifying your service provider classes.

        // Check if the given "provider" is a string
        if(typeof provider === 'string') {

        	// Resolve the provider
        	provider = this.resolveProvider(provider);

        }

        // Check if the provider uses a register method
        if(typeof provider.register === 'function') {

        	// Register the provider
        	provider.register();

        }

        // Mark the provider as registered
        this._markAsRegistered(provider);

        // If the application has already booted, we will call this boot method on
        // the provider class so it has an opportunity to do its boot logic and
        // will be ready for any usage by this developer's application logic.

        // Check if the application has already booted
        if(this._booted) {
        	this._bootProvider(provider);
        }

        // Return the Provider
        return provider;

	};

	/**
	 * Returns the registered service provider instance if it exists.
	 *
	 * @param  {Framework.Support.ServiceProvider|class}  provider
	 *
	 * @return {Framework.Support.ServiceProvider|null}
	 */
	getProvider(provider) {

		// Determine the Providers that are an instance of the given provider
		var providers = this.getProviders(provider);

		// Check if no providers were found
		if(providers.length === 0) {
			return null;
		}

		// Return the first provider
		return providers[0];

	};

	/**
	 * Returns the registered service provider instances if any exist.
	 *
	 * @param  {Framework.Support.ServiceProvider|class}  provider
	 *
	 * @return {array}
	 */
	getProviders(provider) {

		// Determine the provider class definition
		var definition = Obj.getClass(provider);

		// Return the providers that are an instance of the provider class
		return this._serviceProviders.filter(function(value) {
			return value instanceof definition;
		});

	};

	/**
	 * Resolves the given service provider instance.
	 *
	 * @param  {class}  provider
	 *
	 * @return {Framework.Support.ServiceProvider}
	 */
	resolveProvider(provider) {
		return new provider(this);
	};

	/**
	 * Marks the given service provider as registered.
	 *
	 * @param  {Framework.Support.ServiceProvider}  provider
	 *
	 * @return {void}
	 */
	_markAsRegistered(provider) {

		// Append the service provider to the list of providers
		this._serviceProviders.push(provider);

		// Mark the service provider as loaded
		this._loadedProviders[Obj.getClassName(provider)] = true;

	};

	/**
	 * Load and boot all of the remaining deferred providers.
	 *
	 * @return {void}
	 */
	loadDeferredProviders() {

        // We will simply spin through each of the deferred providers and register each
        // one and boot them if the application has booted. This should make each of
        // the remaining services available to this application for immediate use.

        // Iterate through the deferred service providers
        for(let service in this._deferredServices) {

        	// Make sure the property exists
        	if(!this._deferredServices.hasOwnProperty(service)) {
        		continue;
        	}

        	// Load the deferred service provider
        	this.loadDeferredProvider(service);

        }

        // Clear the deferred services
        this._deferredServices = {};

	};

}