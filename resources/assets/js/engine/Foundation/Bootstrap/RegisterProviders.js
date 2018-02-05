var ns = namespace('Engine.Foundation.Bootstrap');

export default class RegisterProviders {

    /**
     * Bootstraps the given application.
     *
     * @param  {Engine.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {
		app.registerConfiguredProviders();
	};

}

// Assign Constructor to Namespace
ns.RegisterProviders = RegisterProviders;