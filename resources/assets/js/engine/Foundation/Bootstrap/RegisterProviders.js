var ns = namespace('Game.Foundation.Bootstrap');

console.log(ns);

export default class RegisterProviders {

    /**
     * Bootstraps the given application.
     *
     * @param  {Game.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {
		app.registerConfiguredProviders();
	};

}

// Assign Constructor to Namespace
ns.RegisterProviders = RegisterProviders;