<script src="{{ asset('js/vendor/jquery-3.2.1.min.js') }}"></script>
<script src="{{ asset('js/app.js') }}"></script>

<script>

	/**
	 * Breakout Game
	 */
	$(document).ready(function() {

		// Create a new Game
		var game = new Game.Foundation.Game();

		window.game = function() {
			return game;
		}

		console.log(app('config'));

		// Bind the Repository as an Instance
		// game.instance('config', config);

		// Set the Game Object settings
		// Game.Objects.GameObject.setDispatcher(game.events);
		// Game.Objects.GameObject.setManager(game.objects);

		var canvas = app('graphics').getCanvas();

		// Set the Event Dispatcher for the Keyboard
		// Game.Input.Keyboard.setDispatcher(game.events);

		// Create a new Keyboard
		var keyboard = new Game.Input.Keyboard();

		// App.game.input = {};
		// App.game.input.keyboard = keyboard;
		window.keyboard = keyboard;

		// Create a new Mouse
		var mouse = new Game.Input.Mouse();

		// App.game.input.mouse = mouse;
		// game.instance('mouse', mouse);
		window.mouse = mouse;

		window.controlMap = {
			'moveLeft': Game.Input.Keyboard.KEY_LEFT,
			'moveRight': Game.Input.Keyboard.KEY_RIGHT,
			'launch': Game.Input.Keyboard.KEY_SPACE
		};

		// Create a new Paddle Object
		paddle = game.objects.createInstance('PaddleGameObject', (canvas.getWidth() - 75) / 2, canvas.getHeight() - 10);

		// Create a new Ball Object
		paddle.createTrackingBall();
		// ball = game.objects.createInstance('BallGameObject', canvas.getWidth() / 2, canvas.getHeight() - 30);

		// Draw on the Canvas
		canvas.draw(function(context) {

			context.drawText('Score: ' + game.getVariable('score'), 8, 20, '#0095DD', '16px Arial');
			context.drawText('Mouse: ' + canvas.getMouseX() + ', ' + canvas.getMouseY(), 355, 20, 'black', '16px Arial');
			game.drawGameObjects(canvas);

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
		        bricks[i][j] = game.objects.createInstance('BrickGameObject', xx, yy);

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