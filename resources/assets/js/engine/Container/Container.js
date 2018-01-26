var ns = namespace('Game.Container');

import Obj from 'Engine/Support/Obj.js';

export default class Container {

    /**
     * Creates a Container instance.
     *
     * @return {this}
     */
    constructor() {

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

    };

    /**
     * Defines a contextual binding.
     *
     * @param  {string}  concrete
     *
     * @return {mixed}
     */
    when(concrete) {

        /**
         * @todo Implementation
         */

    };

    /**
     * Returns whether or not the specified Abstract Type has been bound.
     *
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    bound(abstract) {

        return (typeof this._bindings[abstract] !== 'undefined')
            || (typeof this._instances[abstract] !== 'undefined')
            || this.isAlias(abstract);

    };

    /**
     * Alias of {@see $this->bound()}.
     *
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    has(abstract) {

        return this.bound(abstract);

    };

    /**
     * Returns whether or not the specified Abstract Type has been resolved.
     *
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    resolved(abstract) {

        // Check if the Abstract is an Alias
        if(this.isAlias(abstract)) {

            // Resolve the Alias
            var abstract = this.getAlias(abstract);

        }

        // Return whether or not the Instance has been resolved or shared
        return (typeof this._resolved[abstract] !== 'undefined')
            || (typeof this._instances[abstract] !== 'undefined');

    };

    /**
     * Returns whether or not the given Type is shared.
     *
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    isShared(abstract) {

        // Check if the Instance is shared
        if(typeof this._instances[abstract] !== 'undefined') {
            return true;
        }

        // Check if the Binding is Shared
        if(this._bindings[abstract] === true) {
            return true;
        }

        // The Type is not shared
        return false;

    };

    /**
     * Returns whether or not the specified string is registered as an Alias.
     *
     * @param  {string}  name
     *
     * @return {boolean}
     */
    isAlias(name) {

        return (typeof this._aliases[name] !== 'undefined');

    };

    /**
     * Registers the specified Binding with this Container.
     *
     * @param  {string}                abstract
     * @param  {function|string|null}  concrete
     * @param  {boolean}               shared
     *
     * @return {void}
     */
    bind(abstract, concrete, shared) {

        // Initialize the Arguments
        var concrete = concrete || null;
        var shared = shared || false;

        // If no concrete type was given, we will simply set the concrete type to the
        // abstract type. After that, the concrete type to be registered as shared
        // without being forced to state their classes in both of the parameters.

        // Remove shared and aliased instances
        this._dropStaleInstances(abstract);

        // Check if a Concrete definition wasn't provided
        if(concrete == null) {

            // Define the Concrete as the Abstract
            concrete = abstract;

        }

        // If the factory is not a Closure, it means it is just a class name which is
        // bound into this container to the abstract type and we will just wrap it
        // up inside its own Closure to give us more convenience when extending.

        // Check if the concrete isn't a Closure
        if(typeof concrete !== 'function') {

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
        if(this.resolved(abstract)) {

            // Fire the Rebound Event
            this._rebound(abstract);

        }

    };

    /**
     * Registers the specified Binding with this Container.
     *
     * @param  {string}  abstract
     * @param  {string}  concrete
     *
     * @return {function}
     */
    _getClosure(abstract, concrete) {

        // Return the Closure
        return function(container, parameters) {

            // Initialize the Parameters
            var parameters = parameters || [];

            // Check if the Abstract is the Concrete
            if(abstract == concrete) {

                // Build the Concrete instance without parameters
                return container.build(concrete);

            }

            // Make the Concrete instance with parmaeters
            return container.make(concrete, parameters);

        };

    };

    /**
     * Returns whether or not the specified Method Binding exists.
     *
     * @param  {string}  method
     *
     * @return {boolean}
     */
    hasMethodBinding(method) {

        return (typeof this._methodBindings[method] !== 'undefined');

    };

    /**
     * Binds the specified Callback to the given method so that it may resolve using {@see Container.call()}.
     *
     * @param  {string}    method
     * @param  {function}  callback
     *
     * @return {void}
     */
    bindMethod(method, callback) {

        this._methodBindings[method] = callback;

    };

    /**
     * Calls the specified Method Binding.
     *
     * @param  {string}  method
     * @param  {mixed}   instance
     *
     * @return {mixed}
     */
    callMethodBinding(method, instance) {

        // Determine the Callback
        var callback = this._methodBindings[method];

        // Invoke the Callback
        return callback(instance, this);

    };

    /**
     * Adds the specified Contextual Binding to this Container.
     *
     * @param  {string}           concrete
     * @param  {string}           abstract
     * @param  {function|string}  implementation
     *
     * @return {void}
     */
    addContextualBinding(concrete, abstract, implementation) {

        this.contextual[concrete][this.getAlias(abstract)] = implementation;

    };

    /**
     * Registers the specified Binding if it hasn't already been registered.
     *
     * @param  {string}                abstract
     * @param  {function|string|null}  concrete
     * @param  {boolean}               shared
     *
     * @return {void}
     */
    bindIf(abstract, concrete, shared) {

        // Make sure the Binding hasn't already been registered
        if(!this.bound(abstract)) {

            // Register the Binding
            this.bind(abstract, concrete, shared);

        }

    };

    /**
     * Registers the specified shared binding to this Container.
     *
     * @param  {string}                abstract
     * @param  {function|string|null}  concrete
     * @param  {boolean}               shared
     *
     * @return {void}
     */
    bindIf(abstract, concrete, shared = false) {

        // Register the Binding
        this.bind(abstract, concrete, shared);

    };

    /**
     * Registers the specified shared binding to this Container.
     */
    singleton(abstract, concrete = null) {
        this.bind(abstract, concrete, true);
    };

    /**
     * Extend the specified Abstract Type in this Container.
     *
     * @param  {string}    abstract
     * @param  {function}  callback
     *
     * @return {void}
     */
    extend(abstract, callback) {

        // Resolve any aliases
        var abstract = this.getAlias(abstract);

        // Check if the Abstract Type is shared
        if(typeof this._instances[abstract] !== 'undefined') {

            // Rebind the Shared Instance
            this._instances[abstract] = callback(this._instances[abstract], this);

            // Fire the Rebound Event
            this._rebound(abstract);

        }

        // Assume the Abstract Type isn't shared
        else {

            // Initialize the Extenders if they don't exist
            if(typeof this._extenders[abstract] === 'undefined') {
                this._extenders[abstract] = [];
            }

            // Register the Extender
            this._extenders[abstract].push(callback);

            // Check if the Abstract Type has been resolved
            if(this.resolved(abstract)) {

                // Fire the Rebound Event
                this._rebound(abstract);

            }

        }

    };

    /**
     * Registers an existing Instance as shared in this Container.
     *
     * @param  {string}  abstract
     * @param  {mixed}   instance
     *
     * @return {mixed}
     */
    instance(abstract, instance) {

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
        this._instances[abstract] = instance;

        // Check if the Instance was originally bound
        if(isBound) {

            // Fire the Rebound Event
            this._reboud(abstract);

        }

        // Return the Instance
        return instance;

    };

    /**
     * Removes the specified Alias for the Contextual Binding Alias Cache.
     *
     * @param  {string}  search
     *
     * @return {void}
     */
    _removeAbstractAlias(search) {

        // If the Search isn't an Alias, then don't bother
        if(typeof this._aliases[search] === 'undefined') {
            return;
        }

        // Iterate through the Abstract Aliases
        for(var abstract in this._abstractAliases) {

            // Make sure the Property exists
            if(!this._abstractAliases.hasOwnProperty(abstract)) {
                continue;
            }

            // Determine the Aliases
            var aliases = this._abstractAliases[abstract];

            // Iterate through the Aliases
            for(var index = 0; index < aliases.length; index++) {

                // Determine the Alias
                var alias = aliases[index];

                // Check if the Alias is the Search Key
                if(alias == search) {

                    // Remove the Abstract Alias
                    delete this._abstractAliases[abstract][index];

                }

            }
        }

    };

    /**
     * Removes the specified Alias for the Contextual Binding Alias Cache.
     *
     * @param  {string|array}  abstracts
     * @param  {...string}     ...tags
     *
     * @return {void}
     */
    tag(abstracts, ...tags) {

        // Determine the Abstracts
        if(typeof abstracts === 'string') {
            var abstracts = [abstracts];
        }

        // Iterate through each Tag
        for(var i = 0; i < tags.length; i++) {

            // Determine the current Tag
            var tag = tags[i];

            // Check if the Tag hasn't been initialized
            if(typeof this._tags[tag] === 'undefined') {

                // Initialize the Tags
                this._tags[tag] = [];

            }

            // Iterate through the the Abstracts
            for(var j = 0; j < abstracts.length; j++) {

                // Determine the current Abstract
                var abstract = abstracts[i];

                // Add each Abstract
                this._tags[tag].push(abstract);

            }
        }

    };

    /**
     * Returns all of the tags for the given binding.
     *
     * @param  {string}  tag
     *
     * @return {array}
     */
    tagged(tag) {

        // Initialize the Results
        var results = [];

        // Make sure the tag exists
        if(typeof this._tags[tag] === 'undefined') {
            return results;
        }

        // Iterate through the tags
        for(var i = 0; i < this._tags[tag].length; i++) {

            // Determine the current abstract binding
            var abstract = this._tags[tag][i];

            // Resolve the binding and append it to the results
            results.push(this.make(abstract));

        }

        // Return the Results
        return results;

    };

    /**
     * Aliases the specified type to a different name.
     *
     * @param  {string}  abstract
     * @param  {string}  alias
     *
     * @return {void}
     */
    alias(abstract, alias) {

        // Assign the Alias
        this._aliases[alias] = abstract;

        // Initialize the Abstract Aliases
        if(typeof this._abstractAliases[abstract] === 'undefined') {
            this._abstractAliases[abstract] = [];
        }

        // Append the Abstract Alias
        this._abstractAliases[abstract].push(alias);

    };

    /**
     * Binds the specified callback to an abstract's rebind event.
     *
     * @param  {string}    abstract
     * @param  {function}  callback
     *
     * @return {mixed}
     */
    rebinding(abstract, callback) {

        // Resolve any aliases
        var abstract = this.getAlias(abstract);

        // Initialize the Rebound Callbacks
        if(typeof this._reboundCallbacks[abstract] === 'undefined') {
            this._reboundCallbacks[abstract] = [];
        }

        // Append the rebind callback
        this._reboundCallbacks[abstract].push(callback);

        // Check if the Abstract as already been bound
        if(this.bound(abstract)) {
            return this.make(abstract);
        }

        // Return NULL
        return null;

    };

    /**
     * Refresh an instance using the given target and method.
     *
     * @param  {string}  abstract
     * @param  {mixed}   target
     * @param  {string}  method
     *
     * @return {mixed}
     */
    refresh(abstract, target, method) {

        // Register a Rebinding Callback
        return this.rebinding(abstract, function(app, instance) {

            // Call the Target's Method
            target[method](instance);

        });

    };

    /**
     * Invoke the "rebound" callbacks for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {void}
     */
    _rebound(abstract) {

        // Resolve the instance
        var instance = this.make(abstract);

        // Iterate through the rebound callbacks
        for(let callback of this._getReboundCallbacks(abstract)) {
            callback.apply(null, [this, instance]);
        }

    };

    /**
     * Returns the rebound callbacks for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {array}
     */
    _getReboundCallbacks(abstract) {

        // Make sure the rebound callbacks exist
        if(typeof this._reboundCallbacks[abstract] === 'undefined') {
            return [];
        }

        // Return the rebound callbacks
        return this._reboundCallbacks[abstract];

    };

    /**
     * Wraps the given closure such that its dependencies will be injected when executed.
     *
     * @param  {function}  callback
     * @param  {array}     parameters
     *
     * @return {function}
     */
    wrap(callback, parameters = []) {

        // Return a wrapping closure
        return (function() {
            return this.call(callback, parameters);
        }).bind(this);

    };

    /**
     * Calls the given Closure / class@method and injects its dependencies.
     *
     * @param  {function|string}  callback
     * @param  {array}            parameters
     * @param  {string|null}      defaultMethod
     *
     * @return {mixed}
     */
    call(callback, parameters = [], defaultMethod = null) {

        return Framework.BoundMethod.call(this, callback, parameters, defaultMethod);

    };

    /**
     * Returns a closure to resolve the given abstract type from this container.
     *
     * @param  {string}  abstract
     *
     * @return {function}
     */
    factory(abstract) {

        // Return the closure
        return (function() {
            return this.make(abstract);
        }).bind(this);

    };

    /**
     * Alias of {@see this.make()}.
     *
     * @param  {string}  abstract
     * @param  {array}   parameters
     *
     * @return {mixed}
     */
    makeWith(abstract, parameters = []) {
        return this.make(abstract, parameters);
    };

    /**
     * Resolves the given abstract type from this container.
     *
     * @param  {string}  abstract
     * @param  {array}   parameters
     *
     * @return {mixed}
     */
    make(abstract, parameters = []) {
        return this.resolve(abstract, parameters);
    };

    /**
     * Resolves the given abstract type form this container.
     *
     * @param  {string}  abstract
     *
     * @return {mixed}
     *
     * @throws {Error}
     */
    get(abstract) {

        // Make sure the Abstract type is defined
        if(!this.has(abstract)) {
            throw new Error(`Abstract type [${abstract}] is not bound to the container.`);
        }

        // Resolve the Abstract type
        return this.resolve(abstract);
    };

    /**
     * Resolves the given abstract type from this container.
     *
     * @param  {string}  abstract
     * @param  {array}   parameters
     *
     * @return {mixed}
     */
    resolve(abstract, parameters = []) {

        // Resolve any aliases
        var abstract = this.getAlias(abstract);

        // Determine whether or not the instance will need contextual binding
        var needsContextualBuild = parameters.length !== 0 || this._getContextualConcrete(abstract) !== null;

        // If an instance of the type is currently being managed as a singleton we'll
        // just return an existing instance instead of instantiating new instances
        // so the developer can keep using the same objects instance every time.

        // Check if an instance already exists as a singleton
        if(typeof this._instances[abstract] !== 'undefined' && !needsContextualBuild) {
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
        if(this._isBuildable(concrete, abstract)) {

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
        for(let extender of this._getExtenders(abstract)) {

            // Invoke each Extender
            extender.apply(null, [object, this]);

        }

        // If the requested type is registered as a singleton we'll want to cache off
        // the instances in "memory" so we can return it later without creating an
        // entirely new instance of an object on each subsequent request for it.

        // Check if the object should be a singleton
        if(this.isShared(abstract) && !needsContextualBuild) {

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

    };

    /**
     * Returns the concrete type for the specified abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {mixed}
     */
    _getConcrete(abstract) {

        // determine the contextual concrete type
        var concrete = this._getContextualConcrete(abstract);

        // Check for a contextual concrete type
        if(concrete !== null) {
            return concrete;
        }

        // If we don't have a registered resolver or concrete for the type, we'll just
        // assume each type is a concrete name and will attempt to resolve it as is
        // since the container should be able to resolve concretes automatically.

        // Check for an existing binding
        if(typeof this._bindings[abstract] !== 'undefined') {

            // Use the concrete type
            return this._bindings[abstract]['concrete'];

        }

        // Use the abstract type as the concrete type
        return abstract;

    };

    /**
     * Returns the contextual concrete binding for the specified abstract type.
     *
     * @param  {string}  abstract
     *
     * @return  {string|null}
     */
    _getContextualConcrete(abstract) {

        // Try to find the contextual binding using the abstract type
        var binding = this._findInContextualBindings(abstract);

        // Check if a contextual binding was found
        if(binding !== null) {
            return binding;
        }

        // Next we need to see if a contextual binding might be bound under an alias of the
        // given abstract type. So, we will need to check if any aliases exist with this
        // type and then spin through them and check for contextual bindings on these.

        // Make sure the abstract type has aliases
        if(typeof this._abstractAliases[abstract] === 'undefined' || Object.keys(this._abstractAliases[abstract]).length === 0) {

            // There aren't any aliases to spin through, so stop here
            return null;

        }

        // Iterate through the Abstract Aliases
        for(let alias of this._abstractAliases[abstract]) {

            // Try to find the contextual binding using the abstract type
            var binding = this._findInContextualBindings(alias);

            // Check if a contextual binding was found
            if(binding !== null) {
                return binding;
            }

        }

        // No binding was found
        return null;

    };

    /**
     * Finds and returns the concrete binding for the given abstract in the contextual binding array.
     *
     * @param  {string}  abstract
     *
     * @return {string|null}
     */
    _findInContextualBindings(abstract) {

        // Make sure the Build Stack has items
        if(this._buildStack.length == 0) {
            return null;
        }

        // Determine the last item in the build stack
        var build = this._buildStack[this._buildStack.length - 1];

        // Check for a Contextual Binding
        if(typeof this.contextual[build][abstract] !== 'undefined') {

            // Return the Contextual Binding
            return this.contextual[build][abstract];

        }

        // No Contextual Binding
        return null;

    };

    /**
     * Returns whether or not the given concrete type is buildable.
     *
     * @param  {mixed}   concrete
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    _isBuildable(concrete, abstract) {

        // If the concrete type is the abstract type, or the concrete
        // type is a function, then we can build the abstract type.
        // Otherwise, we have to use make for the concrete type.

        // Return whether or not the concrete type if buildable
        return concrete === abstract || typeof concrete === 'function';

    };

    /**
     * Instantiate a concrete instance of the given type.
     *
     * @param  {string|function}  concrete
     *
     * @return {mixed}
     *
     * @throws {Error}
     */
    build(concrete) {

        // If the concrete type is actually a Closure, we will just execute it and
        // hand back the results of the functions, which allows functions to be
        // used as resolvers for more fine-tuned resolution of these objects.

        // Check if the concrete type is a Closure
        if(typeof concrete === 'function' && !Obj.isClass(concrete)) {

            // Return the results of the closure
            return concrete(this, this._getLastParameterOverride());

        }

        // Sometimes Classes may be namespaced and thus nested in the window via
        // nested objects. As a class string, this can be denoted using "dot"
        // notation. If namespaces are used, we'll need to resolve them.

        // Resolve the Class Namespace
        var definition = this._resolveClassNamespace(concrete);

        // Make sure the Class Namespace resolved
        if(definition === null) {
            throw new Error(`Class [${concrete}] does not exist.`);
        }

        // If the type is not instantiable, the developer is attempting to resolve
        // an abstract type such as an Interface of Abstract Class and there is
        // no binding registered for the abstractions so we need to bail out.

        // Make sure the concrete type is instantiable
        if(typeof definition !== 'function' || typeof definition.prototype === 'undefined') {
            return this._notInstantiable(concrete);
        }

        // Add the concrete type to the build stack
        this._buildStack.push(concrete);

        // Create a new Instance
        var instance = new definition;

        // Determine the Constructor
        var constructor = instance.constructor;

        // If the constructor does not take any argments, then there's nothing
        // that we need to resolve as a dependency. Since we had to create
        // an empty instance to get the constructor, we can return it.

        // Check if the Constructor does not require any arguments
        if(constructor.length === 0) {

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
        if(constructor.length <= parameters.length) {

            // Remove the concrete from the build stack
            this._buildStack.pop();

            // Return the new Instance
            return new definition(...parameters);

        }

        // At this point, we know that the class requires arguments for its
        // constructor, but there's really no way for us to know what to
        // pass in. We're stuck telling the developer to help us out.

        // Remove the concrete from the build stack
        this._buildStack.pop();

        // Throw an Error
        throw new Error(`Class ${definition} has unresolvable dependencies.`);

    };

    /**
     * Returns the Class Name into a Class.
     *
     * @param  {string}  concrete
     *
     * @return {object|null}
     */
    _resolveClassNamespace(concrete) {

        // Check if "dot" notation isn't used
        if(concrete.indexOf('.') === -1) {

            // Resolve immediately
            return window[concrete];

        }

        // Check if the explict class name is defined
        if(typeof window[concrete] !== 'undefined') {

            // Resolve using the explicit class name
            return window[concrete];

        }

        // Initialize the Namespace to the Window
        var namespace = window;

        // Determine the Namespace segments
        var segments = concrete.split('.');

        // Iterate through the Segments
        for(var i = 0; i < segments.length - 1; i++) {

            // Determine the current Segment
            var segment = segments[i];

            // Check if the next Namespace exists
            if(typeof namespace[segment] === 'object') {
                namespace = namespace[segment];
            }

            // The next Namespace doesn't exist
            else {
                return null;
            }

        }

        // Return the final Namespace
        return namespace[segments[segments.length - 1]];

    };

    /**
     * Returns the last parameter override.
     *
     * @return {array}
     */
    _getLastParameterOverride() {

        // Determine the number of parameter overrides
        var count = this._with.length;

        // Return the last parameter override
        return count >= 0 ? this._with[count - 1] : [];

    };

    /**
     * Throws an exception detailing that the concrete type is not instantiable.
     *
     * @param  {string}  concrete
     *
     * @return {void}
     *
     * @throws {Error}
     */
    _notInstantiable(concrete) {

        // Check for a Build Stack
        if(this._buildStack.length !== 0) {

            // Determine the Previous Build
            var previous = this._buildStack.join(', ');

            // Determine the Message
            var message = `Target [${concrete}] is not instantiable while building [${previous}].`;

        } else {

            // Determine the Message
            var message = `Target [${concrete}] is not instantiable.`;

        }

        // Throw the Exception
        throw new Error(message);

    };

    /**
     * Registers the specified resolving callback.
     *
     * @param  {string|function} abstract
     * @param  {function|null}   callback
     *
     * @return {void}
     */
    resolving(abstract, callback = null) {

        // Check for a String Abstract
        if(typeof abstract === 'string') {

            // Resolve any aliases
            var abstract = this.getAlias(abstract);

        }

        // Check for Closure Abstract without Callback
        if(callback === null && typeof abstract === 'function') {

            // Push the Abstract to the Global Resolving Callbacks
            this._globalResolvingCallbacks.push(abstract);

        } else {

            // Initialize the Resolving Callbacks for the Abstract, if necessary
            if(typeof this._resolvingCallbacks[abstract] === 'undefined') {
                this._resolvingCallbacks[abstract] = [];
            }

            // Push the Callback to the Abstract's Resolving Callbacks
            this._resolvingCallbacks[abstract].push(callback);

        }

    };

    /**
     * Fires all of the resolving callbacks.
     *
     * @param  {string}  abstract
     * @param  {mixed}   object
     *
     * @return {void}
     */
    _fireResolvingCallbacks(abstract, object) {

        // Fire the Global Resolving Callbacks
        this._fireCallbackArray(object, this._globalResolvingCallbacks);

        // Fire the Abstract's Resolving Callbacks
        this._fireCallbackArray(object, this._getCallbacksForType(abstract, object, this._resolvingCallbacks));

        // Fire the After Resolving Callbacks
        this._fireAfterResolvingCallbacks(abstract, object);

    };

    /**
     * Fires all of the after resolving callbacks.
     *
     * @param  {string}  abstract
     * @param  {mixed}   object
     *
     * @return {void}
     */
    _fireAfterResolvingCallbacks(abstract, object) {

        // Fire the Global After Resolving Callbacks
        this._fireCallbackArray(object, this._globalAfterResolvingCallbacks);

        // Fire the Abstract's After Resolving Callbacks
        this._fireCallbackArray(object, this._getCallbacksForType(abstract, object, this._afterResolvingCallbacks));

    };

    /**
     * Returns all of the callbacks for the given abstract type.
     *
     * @param  {string}  abstract
     * @param  {mixed}   mixed
     * @param  {array}   callbacksPerType
     *
     * @return {array}
     */
    _getCallbacksForType(abstract, object, callbacksPerType) {

        // Initialize the Results
        var results = [];

        // Iterate through the Callbacks Per Type
        for(let type in callbacksPerType) {

            // Determine the Callbacks for the current Type
            let callbacks = callbacksPerType[type];

            // Check if the Type is the Abstract, or if the Object is an instance of the Type
            if(type === abstract || object instanceof type) {

                // Append the Callbacks to the Results
                results = results.concat(callbacks);

            }

        }

        // Return the Results
        return results;

    };

    /**
     * Fires the given array of callbacks.
     *
     * @param  {mixed}  object
     * @param  {array}  callbacks
     *
     * @return {void}
     */
    _fireCallbackArray(object, callbacks) {

        // Iterate through the Callbacks
        for(let i = 0; i < callbacks.length; i++) {

            // Determine the current Callback
            let callback = callbacks[i];

            // Call the Callback
            callback(object, this);

        }

    };

    /**
     * Returns the Bindings of this Container.
     *
     * @return {object}
     */
    getBindings() {
        return this._bindings;
    };

    /**
     * Returns the Alias of the specified Abstract, if available.
     *
     * @param  {string}  abstract
     *
     * @return {string}
     *
     * @throws {Error}
     */
    getAlias(abstract) {

        // Return the Abstract Type if an alias does not exist
        if(typeof this._aliases[abstract] === 'undefined') {
            return abstract;
        }

        // Make sure the Abstract is not aliased to itself
        if(this._aliases[abstract] === abstract) {
            throw new Error(`[${abstract}] is aliased to itself.`);
        }

        // Recursively derive the Alias
        return this.getAlias(this._aliases[abstract]);

    };

    /**
     * Returns the extender callbacks for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {array}
     */
    _getExtenders(abstract) {

        // Resolve any aliases
        var abstract = this.getAlias(abstract);

        // Return the extenders if they exist
        if(typeof this._extenders[abstract] !== 'undefined') {
            return this._extenders[abstract];
        }

        // Return an empty set
        return [];

    };

    /**
     * Removes all of the extender callbacks for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {void}
     */
    forgetExtenders(abstract) {

        // Resolve any aliases
        var abstract = this.getAlias(abstract);

        // Forget the Extenders
        delete this._extenders[abstract];

    };

    /**
     * Drops all of the stale instances and aliases for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {void}
     */
    _dropStaleInstances(abstract) {

        // Forget the Instance
        delete this._instances[abstract];

        // Forget the Aliase
        delete this._aliases[abstract];

    };

    /**
     * Removes the resolved instance from the instance cache for the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {void}
     */
    forgetInstance(abstract) {

        // Forget the Instance
        delete this._instances[abstract];

    };

    /**
     * Clears all of the instances from the container.
     *
     * @return {void}
     */
    forgetInstances() {

        // Iterate through the Instances
        for(let abstract in this._instances) {

            // Delete the current Instance
            delete this._instances[abstract];

        }

        // Reset the Instances
        this._instances = {};

    };

    /**
     * Flushes this Container of all bindings and resolved instances.
     *
     * @return {void}
     */
    flush() {

        // Reset all properties that don't require garbage collection
        this._aliases = {};
        this._resolved = {};
        this._bindings = {};
        this._abstractAliases = {};

        // Forget all Instances
        this.forgetInstances();

    };

    /**
     * Returns the globally available instance of the container.
     *
     * @return {static}
     */
    static getInstance() {

        // Check if an instance doesn't exist
        if(Container._instance == null) {

            // Create a new instance
            Container._instance = new this;

        }

        // Return the instance
        return Container._instance;

    };

    /**
     * Sets the globally available instance of the container.
     *
     * @param  {Container|null}  container
     *
     * @return {static}
     */
    static setInstance(container = null) {

        // Set the Instance
        Container._instance = container;

        // Return the new Instance
        return Container._instance;

    };

    /**
     * Returns whether or not the given abstract type exists.
     *
     * @param  {string}  abstract
     *
     * @return {boolean}
     */
    exists(abstract) {
        return this.bound(abstract);
    };

    /**
     * Returns the given abstract type.
     *
     * @param  {string}  abstract
     *
     * @return {mixed}
     */
    get(abstract) {
        return this.make(abstract);
    };

    /**
     * Sets the given abstract type.
     *
     * @param  {string}  abstract
     * @param  {mixed}   value
     *
     * @return {mixed}
     */
    set(abstract, value) {

        // Determine the concrete type
        var concrete = typeof value === 'function' ? value : function() {
            return value;
        };

        // Bind the abstract type to the concrete type
        this.bind(abstract, concrete);

    };

    /**
     * Unsets the given abstract type.
     *
     * @param  {string}  key
     *
     * @return {void}
     */
    unset(abstract) {

        // Deference the abstract type
        delete this._bindings[abstract];
        delete this._instances[abstract];
        delete this._resolved[abstract];

    };

}

/**
 * The current globally available container (if any).
 *
 * @var {static}
 */
Container._instance = null;

// Assign Constructor to Namespace
ns.Container = Container;