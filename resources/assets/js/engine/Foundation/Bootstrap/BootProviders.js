var ns = namespace('Engine.Foundation.Bootstrap');

export default class BootProviders {

    /**
     * Bootstraps the given application.
     *
     * @param  {Engine.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {
		app.boot();
	};

}

// Assign Constructor to Namespace
ns.BootProviders = BootProviders;