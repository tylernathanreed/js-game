var ns = namespace('App.Objects');

import GameObject from 'Engine/Objects/GameObject.js';

export default class BallGameObject extends GameObject {

	/**
	 * The "booting" method of this Object.
	 *
	 * @return {void}
	 */
	static _boot() {

		/**
		 * Assign Instance Attributes.
		 *
		 * @param  {Game.Objects.BallGameObject}  ball
		 *
		 * @return {void}
		 */
		this.onCreate(function(ball) {

			ball.radius = 10;
			ball.dx = 0;
			ball.dy = 0;
			ball.trackingObject = null;
			ball.trackingOffset = null;

		});

		/**
		 * The Draw Event Handler for this Object.
		 *
		 * @param  {Game.Objects.BallGameObject}  ball
		 * @param  {Game.Graphics.Canvas}         canvas
		 * @param  {Game.Graphics.CanvasContext}  context
		 *
		 * @return {void}
		 */
		this.onDraw(function(ball, canvas, context) {

			// Draw the Ball
			context.drawCircle(ball.x, ball.y, ball.radius, '#0095DD');

		});

		/**
		 * The Step Event Handler for this Object.
		 *
		 * @param  {Game.Objects.BallGameObject}  ball
		 *
		 * @return {void}
		 */
		this.onStep(function(ball) {

			// Check for a Tracking Object
			if(ball.trackingObject) {

				// Track the Tracking Object
				ball.x = ball.trackingObject.x + ball.trackingOffset;

			}

			// Check for Top Collision
			if(ball.y + ball.dy < 0 + ball.radius) {

				// Reverse the Vertical Direction
				ball.dy *= -1;

			}

			// Check for Bottom Collision
			else if(ball.y + ball.dy > game().graphics.getCanvas().getHeight() - ball.radius) {

				// Find the Paddle Object
				var paddle = game().objects.getObjectByClass('PaddleGameObject');

				// Check if the Paddle would stop the Ball
				if(paddle != null && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {

					// Bounce off of the Paddle
					paddle.bounce(ball);

				}

				// Assume Game Over
				else {

					// Initiate Game Over
					alert('GAME OVER');

					ball.x = 50;
					ball.y = 50;
					ball.dx = 0;
					ball.dy = 0;

				}

			}

			// Check for Left Collision
			if(ball.x + ball.dx < 0 + ball.radius) {

				// Reverse the Horizontal Direction
				ball.dx *= -1;

			}

			// Check for Right Collision
			else if(ball.x + ball.dy > game().graphics.getCanvas().getWidth() - ball.radius) {

				// Reverse the Horizontal Direction
				ball.dx *= -1;

			}

			// Move the Ball
			ball.x += ball.dx;
			ball.y += ball.dy;

		});

	};

	/**
	 * Hits the specified Brick.
	 *
	 * @param  {Game.Objects.BrickGameObject}  brick
	 *
	 * @return {void}
	 */
	hitBrick(brick) {

		// Reverse the Vertical Direction of the Ball
		this.dy *= -1;

		// Damage the Brick
		brick.damage();

	};

	/**
	 * Stops this Ball's Movement.
	 *
	 * @return {void}
	 */
	stop() {

		this.dx = 0;
		this.dy = 0;

	};

	/**
	 * Launches this Ball in the specified direction.
	 *
	 * @param  {float}  direction
	 * @param  {float}  speed
	 * @param  {float}  accuracy
	 *
	 * @return {void}
	 */
	launch(direction = 90, speed = 2, accuracy = 0.9) {

		// Determine the spread
		var spread = 1 - accuracy;

		// Offset the Direction
		direction *= 1 + (Math.random() * spread * 2 - spread);

		// Determine the movement
		this.dx = Math.cos(direction * Math.PI / 180) * speed;
		this.dy = -Math.sin(direction * Math.PI / 180) * speed;

		console.log('Launch: ' + this.dx + ', ' + this.dy);

		// Release the Tracking Object
		this.trackingObject = null;
		this.trackingOffset = 0;

	};

	/**
	 * Sets the Tracking Object for this Ball.
	 *
	 * @param  {Game.Objects.GameObject}  object
	 * @param  integer                    offset
	 *
	 * @return {void}
	 */
	setTrackingObject(object, offset = 0) {

		// Set the Tracking Object
		this.trackingObject = object;

		// Set the Tracking Offset
		this.trackingOffset = offset;

		// Stop any movement
		this.stop();

	};

}

// Assign Constructor to Namespace
ns.BallGameObject = BallGameObject;