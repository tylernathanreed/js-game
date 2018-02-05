var ns = namespace('Engine.Foundation');

import Arr from 'Engine/Support/Arr.js';

export default class ProviderRepository {

	/**
	 * Creates a new provider repository instance.
	 *
	 * @param  {Engine.Contracts.Foundation.Application}  app
	 * @param  {Engine.Filesystem.Filesystem}             files
	 * @param  {string}                                   manifestBinding
	 *
	 * @return {this}
	 */
	constructor(app, files, manifestBinding) {

		/**
		 * The application instance.
		 *
		 * @var {Engine.Contracts.Foundation.Application}
		 */
		this._app = app;

		/**
		 * The filesystem instance.
		 *
		 * @var {Engine.Filesystem.Filesystem}
		 */
		this._files = files;

		/**
		 * The path to the manifest file.
		 *
		 * @var {string}
		 */
		this._manifestBinding = manifestBinding;

	};

	/**
	 * Registers the specified service providers.
	 *
	 * @param  {array|object}  providers
	 *
	 * @return {void}
	 */
	load(providers) {

		// Convert associative array to sequential array
		if(!Array.isArray(providers)) {
			providers = Arr.fromObject(providers);
		}

		// Load the manifest file
		var manifest = this.loadManifest();

        // First we will load the service manifest, which contains information on all
        // service providers registered with the application and which services it
        // provides. This is used to know which services are "deferred" loaders.

        // Check if the manifest file needs to be recompiled
        if(this.shouldRecompile(manifest, providers)) {

        	// Recompile the manifest
        	manifest = this._compileManifest(providers);

        }

        // Next, we will register events to load the providers for each of the events
        // that it has requested. This allows the service provider to defer itself
        // while still getting automatically loaded when a certain event occurs.

        // Iterate through the provider events
        for(let provider in manifest['when']) {

        	// Skip non-properties of the object
        	if(!manifest['when'].hasOwnProperty(provider)) {
        		continue;
        	}

        	// Determine the events
        	let events = manifest['when'][provider];

        	// Register the load events
        	this._registerLoadEvents(provider, events);

        }

        // We will go ahead and register all of the eagerly loaded providers with the
        // application so their services can be registered with the application as
        // a provided service. Then we will set the deferred service list on it.

        // Iterate through the eagerly loaded providers
        for(let index in manifest['eager']) {

        	// Determine the provider
        	let provider = manifest['eager'][index];

        	// Register each provider
        	this._app.register(provider);

        }

        // Add the deferred providers to the application
        this._app.addDeferredServices(manifest['deferred']);

	};

	/**
	 * Loads the service provider manifest JSON file.
	 *
	 * @return {object|null}
	 */
	loadManifest() {

        // The service manifest is a file containing a JSON representation of every
        // service provided by the application and whether its provider is using
        // deferred loading or should be eagerly loaded on each request to us.

        // Make sure the manifest resolver exists
        if(!this._app.bound(this._manifestBinding)) {
        	return null;
        }

        // Determine the manifest resolver
        var resolver = this._app.get(this._manifestBinding);

        // Determine the manifest
        var manifest = resolver.call();

        // Make sure the provider events are at least initialized
        if(typeof manifest['when'] === 'undefined') {
        	manifest['when'] = {};
        }

        // Return the manifest
        return manifest;

	};

	/**
	 * Returns whether or not the specified manifest needs to be recompiled.
	 *
	 * @param  {object|null}  manifest
	 * @param  {array}        providers
	 *
	 * @return {boolean}
	 */
	shouldRecompile(manifest, providers) {
		return manifest === null || !Arr.equals(manifest['providers'], providers);
	};

	/**
	 * Compiles the specified providers into a manifest.
	 *
	 * @param  {array}  providers
	 *
	 * @return {object}
	 */
	_compileManifest(providers) {

        // The service manifest should contain a list of all of the providers for
        // the application so we can compare it on each request to the service
        // and determine if the manifest should be recompiled or is current.

        // Create a fresh manifest
        var manifest = this._freshManifest(providers);

        // Iterate through the providers
        for(let i in providers) {

        	// Determine the current provider
        	let provider = providers[i];

        	// Create a new provider instance
        	let instance = this.createProvider(provider);

            // When recompiling the service manifest, we will spin through each of the
            // providers and check if it's a deferred provider or not. If so we'll
            // add it's provided services to the manifest and note the provider.

            // Check if the provider is deferred
            if(instance.isDeferred()) {

            	// Determine the services that are provided
            	let services = instance.provides();

            	// Iterate through the services that are provided
            	for(let j in services) {

            		// Determine the current service
            		let service = services[j];

            		// Mark the service as deferred
            		manifest['deferred'][service] = provider;

            	}

            	// Assign the events that load the provider
            	manifest['when'][provider] = instance.when();

            }

            // If the service providers are not deferred, we will simply add it to an
            // array of eagerly loaded providers that will get registered on every
            // request to this application instead of "lazy" loading every time.

            // The provider is not deferred
            else {

            	// Register the provider as eagerly loaded
            	manifest['eager'].push(provider);

            }

        }

        // Write the manifest file
        return this.writeManifest(manifest);

	};

	/**
	 * Creates a fresh service provider manifest data structure.
	 *
	 * @param  {array}  providers
	 *
	 * @return {object}
	 */
	_freshManifest(providers) {

		// Return a fresh manifest
		return {
			'providers': providers,
			'eager': [],
			'deferred': {}
		};

	};

	/**
	 * Writes the specified manifest file to disk.
	 *
	 * @param  {object}  manifest
	 *
	 * @return 
	 */
	writeManifest(manifest) {

		// Make sure the provider events are initialized
		return Object.assign({'when': {}}, manifest);

	};

	/**
	 * Creates a new provider instance.
	 *
	 * @param  {string}  provider
	 *
	 * @return {Engine.Support.ServiceProvider}
	 */
	createProvider(provider) {
		return this._app.make(provider, [this._app]);
	};

}

ns.ProviderRepository = ProviderRepository;