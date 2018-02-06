var ns = namespace('Engine.Foundation.Bootstrap');

export default class StartGraphicsLoop {

    /**
     * Bootstraps the given application.
     *
     * @param  {Engine.Contracts.Foundation.Application}  app
     *
     * @return {void}
     */
	bootstrap(app) {

        // Determine the graphics manager
        var graphics = app.make('graphics');

        // Determine the default canvas
        var canvas = graphics.getCanvas();

        console.log(graphics._drivers);

        // Draw the Game Objects on each draw cycle
        canvas.draw(function() {
            app.make('objects').drawGameObjects(canvas);
        });

        // Start the graphics loop
		app.make('graphics').start();

	};

}

// Assign Constructor to Namespace
ns.StartGraphicsLoop = StartGraphicsLoop;