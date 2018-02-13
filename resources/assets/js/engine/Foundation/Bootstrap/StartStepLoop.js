var ns = namespace('Engine.Foundation.Bootstrap');

export default class StartStepLoop {

    /**
     * Bootstraps the given application.
     *
     * @param  {Engine.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {

        // Determine the step loop
        var steps = app.make('steps');

        // Start the step loop
        steps.start();

	};

}

// Assign Constructor to Namespace
ns.StartStepLoop = StartStepLoop;