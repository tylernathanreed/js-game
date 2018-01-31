var ns = namespace('Game.Foundation');

import Obj from 'Engine/Support/Obj.js';
import Str from 'Engine/Support/Str.js';
import Container from 'Engine/Container/Container.js';
import Collection from 'Engine/Support/Collection.js';
import Filesystem from 'Engine/Filesystem/Filesystem.js';
import ProviderRepository from 'Engine/Foundation/ProviderRepository.js';
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
		this._basePath = basePath;

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
	 * Sets the base path for the application.
	 *
	 * @param  {string}  basePath
	 *
	 * @return {this}
	 */
	setBasePath(basePath) {

		// Set the base path
		this._basePath = basePath.replace(/[\\\/]+$/, '');

		// Bind the paths in the container
		this._bindPathsInContainer();

		// Allow chaining
		return this;

	};

	/**
	 * Binds all of the application paths in the container.
	 *
	 * @return {void}
	 */
	_bindPathsInContainer() {

		this.instance('path', this.path());
		this.instance('path.base', this.basePath());
		// this.instance('path.lang', this.langPath());
		this.instance('path.config', this.configPath());
		// this.instance('path.public', this.publicPath());
		// this.instance('path.storage', this.storagePath());
		// this.instance('path.database', this.databasePath());
		// this.instance('path.resources', this.resourcesPath());
		this.instance('path.bootstrap', this.bootstrapPath());

	};

	/**
	 * Returns the path to the application "app" directory.
	 *
	 * @param  {string}  path
	 *
	 * @return {string}
	 */
	path(path = '') {
		return this._basePath + '/app' + (path ? '/' + path : '');
	};

	/**
	 * Returns the base path to the framework installation.
	 *
	 * @param  {string}  path
	 *
	 * @return {string}
	 */
	basePath(path = '') {
		return this._basePath + (path ? '/' + path : '');
	};

	/**
	 * Returns the path to the bootstrap directory.
	 *
	 * @param  {string}  path
	 *
	 * @return {string}
	 */
	bootstrapPath(path = '') {
		return this._basePath + '/bootstrap' + (path ? '/' + path : '');
	};

	/**
	 * Returns the path to the application configuration files.
	 *
	 * @param  {string}  path
	 *
	 * @return {string}
	 */
	configPath(path = '') {
		return this._basePath + '/config' + (path ? '/' + path : '');
	};

	/**
	 * Registers the configured service providers.
	 *
	 * @return {void}
	 */
	registerConfiguredProviders() {

		// Determine the service providers
		var providers = Collection.make(this.get('config').get('app.providers'))
			.partition(function(provider) {
				return Str.startsWith(provider, 'Game.');
			});

		// Append auto-discovered service providers to the custom providers
		// providers.splice(1, 0, [this.make('Game.Foundation.PackageManifest').providers()]);

		// Create a new provider repository
		var repository = new ProviderRepository(this, new Filesystem, this.getCachedServicesPath());

		// Load the providers
		repository.load(providers.collapse().toArray());

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

	/**
	 * Registers the specified deferred provider and service.
	 *
	 * @param  {string|class}  provider
	 * @param  {string|null}   service
	 *
	 * @retrun {void}
	 */
	registerDeferredProvider(provider, service = null) {

        // Once the provider that provides the deferred service has been registered we
        // will remove it from our local list of the deferred services with related
        // providers so that this container does not try to resolve it out again.

        // Check if a service was provided
        if(service) {
        	this._deferredServices[service] = undefined;
        }

        // Create the service provider
        var instance = new provider(this);

        // Register the service provider
        this.register(instance);

        // Check if the application hasn't booted yet
        if(!this._booted) {

        	// Boot the provider with the other providers
        	this.booting(function() {
        		this.bootProvider(instance);
        	});

        }

	};

	/**
	 * Resolves the specified abstract type from the container.
	 *
	 * @param  {string}  abstract
	 * @param  {array}   parameters
	 *
	 * @return {mixed}
	 */
	make(abstract, parameters = []) {

		// Resolve any aliases
		abstract = this.getAlias(abstract);

		// Check if the abstract type is bound as a deferred service provider
		if(typeof this._deferredServices[abstract] !== 'undefined' && typeof this._instances[abstract] === 'undefined') {

			// Load the deferred service provider
			this.loadDeferredProvider(abstract);

		}

		// Call the parent method
		return super.make(abstract, parameters);

	};

	/**
	 * Returns whether or not the specified abstract type has been bound to the container.
	 *
	 * @param  {string}  abstract
	 *
	 * @return {boolean}
	 */
	bound(abstract) {

		// Check if the abstract type is bound as a deferred service provider
		if(typeof this._deferredServices[abstract] !== 'undefined') {
			return true;
		}

		// Call the parent method
		return super.bound(abstract);

	};

	/**
	 * Returns whether or not the application has been booted.
	 *
	 * @return {boolean}
	 */
	isBooted() {
		return this._booted;
	};

	/**
	 * Boots the application's service providers.
	 *
	 * @return {void}
	 */
	boot() {

		// Stop if already booted
		if(this._booted) {
			return;
		}

        // Once the application has booted we will also fire some "booted" callbacks
        // for any listeners that need to do work after this initial booting gets
        // finished. This is useful when ordering the boot-up processes we run.

        // Fire the booting callbacks
        this._fireAppCallbacks(this._bootingCallbacks);

        // Boot each service provider
        for(let index in this._serviceProviders) {
        	this._bootProvider(this._serviceProviders[index]);
        }

        // Mark the application as booted
        this._booted = true;

        // Fire the booted callbacks
        this._fireAppCallbacks(this._bootedCallbacks);

	};

	/**
	 * Boots the specified service provider.
	 *
	 * @param  {Game.Support.ServiceProvider}  provider
	 *
	 * @return {mixed}
	 */
	_bootProvider(provider) {

		// Check for a boot method on the provider
		if(typeof provider.boot === 'function') {

			// Call the boot method
			return this.call([provider, 'boot']);

		}

	};

	/**
	 * Registers the specified "booting" listener.
	 *
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	booting(callback) {
		this._bootingCallbacks.push(callback);
	};

	/**
	 * Registers the specified "booted" listener.
	 *
	 * @param  {function}  callback
	 *
	 * @return {void}
	 */
	booted(callback) {

		// Register the callback
		this._bootedCallbacks.push(callback);

		// Check if the application has already been booted
		if(this.isBooted()) {

			// Fire the booted callback immediately
			this._fireAppCallbacks([callback]);

		}

	};

	/**
	 * Fires the specified callbacks for the application.
	 *
	 * @param  {array}  callbacks
	 *
	 * @return {void}
	 */
	_fireAppCallbacks(callbacks) {

		// Iterate through the callbacks
		for(let index in callbacks) {

			// Determine the callback
			let callback = callbacks[index];

			// Call each callback
			callback.call(null, this);


		}

	};

	/**
	 * Returns the path to the services cache file.
	 *
	 * @return {string}
	 */
	getCachedServicesPath() {
		return this.bootstrapPath() + '/cache/services.js';
	};

	/**
	 * Returns the path to the packages cache file.
	 *
	 * @return {string}
	 */
	getCachedServicesPath() {
		return this.bootstrapPath() + '/cache/packages.js';
	};

    /**
     * Returns the path to the configuration cache file.
     *
     * @return {string}
     */
    getCachedConfigPath() {
        return this.bootstrapPath() + '/cache/config.js';
    };

}

// Assign Constructor to Namespace
ns.Application = Application;