<script src="{{ asset('js/vendor/jquery-3.2.1.min.js') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>

<script>

	/**
	 * Breakout Game
	 */
	$(document).ready(function() {

		var variables = new Engine.Support.Collection();
		app().instance('variables', variables);

		var canvas = app('graphics').getCanvas();

		// Determine the objects manager
		var objects = app('objects');

		// Create a new Paddle Object
		paddle = objects.createInstance('PaddleGameObject', (canvas.getWidth() - 75) / 2, canvas.getHeight() - 10);

		// Create a new Ball Object
		var ball = paddle.createTrackingBall();

		// Draw on the Canvas
		canvas.draw(function(context) {

			context.drawText('Score: ' + variables.get('score'), 8, 20, '#0095DD', '16px Arial');
			context.drawText('Mouse: ' + canvas.getMouseX() + ', ' + canvas.getMouseY(), 355, 20, 'black', '16px Arial');
			objects.drawGameObjects(canvas);

		});

		// Initialize the Brick Parameters
		var brickRowCount = 3;
		var brickColumnCount = 5;
		var brickWidth = 75;
		var brickHeight = 20;
		var brickPadding = 10;
		var brickOffsetTop = 30;
		var brickOffsetLeft = 30;

		// Initialize the list of Bricks
		var bricks = [];

		// Iterate through the Brick Columns
		for(var i = 0; i < brickColumnCount; i++) {

			// Initialize the Brick Column
		    bricks[i] = [];

		    // Iterate through the Brick Rows
		    for(var j = 0; j < brickRowCount; j++) {

		    	// Determine the position of each Brick
		    	var xx, yy;

		    	xx = (i * (brickWidth + brickPadding)) + brickOffsetLeft;
		    	yy = (j * (brickHeight + brickPadding)) + brickOffsetTop;

		    	// Create each Brick
		        bricks[i][j] = objects.createInstance('BrickGameObject', xx, yy);

		        // Assign the Width and Height to each Brick
		        bricks[i][j].width = brickWidth;
		        bricks[i][j].height = brickHeight;

		    }
		}

		variables.set('score', 0);

	});

</script>