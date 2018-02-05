<script src="{{ asset('js/vendor/jquery-3.2.1.min.js') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>

<script>

	/**
	 * Breakout Game
	 */
	$(document).ready(function() {

		var canvas = app('graphics').getCanvas();

		window.controlMap = {
			'moveLeft': Engine.Input.Keyboard.KEY_LEFT,
			'moveRight': Engine.Input.Keyboard.KEY_RIGHT,
			'launch': Engine.Input.Keyboard.KEY_SPACE
		};

		// Create a new Paddle Object
		paddle = app('objects').createInstance('PaddleGameObject', (canvas.getWidth() - 75) / 2, canvas.getHeight() - 10);

		// Create a new Ball Object
		paddle.createTrackingBall();
		ball = app('objects').createInstance('BallGameObject', canvas.getWidth() / 2, canvas.getHeight() - 30);

		// Draw on the Canvas
		canvas.draw(function(context) {

			context.drawText('Score: ' + game.getVariable('score'), 8, 20, '#0095DD', '16px Arial');
			context.drawText('Mouse: ' + canvas.getMouseX() + ', ' + canvas.getMouseY(), 355, 20, 'black', '16px Arial');
			app('objects').drawGameObjects(canvas);

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
		        bricks[i][j] = app('objects').createInstance('BrickGameObject', xx, yy);

		        // Assign the Width and Height to each Brick
		        bricks[i][j].width = brickWidth;
		        bricks[i][j].height = brickHeight;

		    }
		}

		game.setVariable('score', 0);

		// Start the Game
		game.start();

	});

</script>