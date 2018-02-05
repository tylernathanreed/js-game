var ns = namespace('App.Objects');

import Calc from 'Engine/Support/Calc.js';
import GameObject from 'Engine/Objects/GameObject.js';
import BallGameObject from 'App/Objects/BallGameObject.js';

export default class PaddleGameObject extends GameObject {

	/**
	 * The "booting" method of this Object.
	 *
	 * @return {void}
	 */
	static _boot() {

		/**
		 * Assign Instance Attributes.
		 *
		 * @param  {Game.Objects.PaddleGameObject}  paddle
		 *
		 * @return {void}
		 */
		this.onCreate(function(paddle) {

			paddle.width = 75;
			paddle.height = 10;
			paddle.movementSpeed = 2;
			paddle.trackingObject = null;

		});

		/**
		 * The Step Event Handler for this Object.
		 *
		 * @param  {Game.Objects.PaddleGameObject}  paddle
		 *
		 * @return {void}
		 */
		this.onStep(function(paddle) {

			// Apply Movement
			paddle.applyMovementActions();

			// Apply Launch
			paddle.applyLaunchAction();

		});

		/**
		 * The Draw Event Handler for this Object.
		 *
		 * @param  {Game.Objects.PaddleGameObject}  paddle
		 * @param  {Game.Graphics.Canvas}           canvas
		 * @param  {Game.Graphics.CanvasContext}    context
		 *
		 * @return {void}
		 */
		this.onDraw(function(paddle, canvas, context) {

			// Draw the Paddle
			context.drawRectangle(paddle.x, paddle.y, paddle.width, paddle.height, '#0095DD');

			// Determine the Ball
			var ball = BallGameObject.getClassInstance();

			var accuracy = 0.9;
			var acceleration = 0;

			// Determine the impact line
			var x1, y1, x2, y2;

			x1 = canvas.getMouseX();
			y1 = canvas.getMouseY();
			x2 = paddle.x + paddle.width / 2;
			y2 = paddle.y;

			// Determine the line direction
			var direction = Calc.pointDirection(x1, y1, x2, y2);

			context.drawLine(x1, y1, x2, y2, 'red');

			// Average the direction with straight down
			direction = (direction + (Math.PI * 3/2))/2;

			context.drawLine(x2, y2, x2 - Math.cos(direction) * 60, y2 + Math.cos(direction) * 60, 'green');

			// console.log('Initial: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

			// To make things a bit more random, we're going to spread around
			// the direction a bit, making our game a bit harder to know
			// how the ball is going to bounce ahead of time. Neat!

			// Determine the spread
			var spread = accuracy - 1;

			// Offset the direction
			// direction *= 1 + ((Math.random() * spread * 2 - spread) / (180 / Math.PI));

			// console.log('Spread: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

			// Make sure the direction isn't completely wack
			direction = Math.min(Math.max(Math.PI * 9 / 8, direction), Math.PI * 15 / 8);

			context.drawLine(x2, y2, x2 - Math.cos(direction) * 60, y2 + Math.cos(direction) * 60, 'orange');

			// console.log('Clamp: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

			// Before we determine the new direction of the ball, we need
			// to determine how fast the ball should be travelling. We
			// can take the current speed, and accelerate the ball.

			// Determine the current speed of the ball
			var speed = 2;
			// var speed = Math.sqrt(Math.pow(ball.dx, 2) + Math.pow(ball.dy, 2));

			// console.log('Initial: Speed: ' + speed);

			// Increase the speed
			speed *= acceleration + 1;

			// console.log('Acc: Speed: ' + speed);

			// When determining the line components, we'd normally have
			// to flip dy, as we want the ball to "bounce". However,
			// since the axis is inverted, this is done for us.

			// Flip the line direction
			var dx = -Math.cos(direction) * speed * 30;
			var dy = Math.sin(direction) * speed * 30;

			context.drawLine(x1, y1, x1 + dx, y1 + dy, 'blue');
			context.drawLine(x2, y2, x2 + dx, y2 + dy, 'blue');

			// console.log('New: Speed: ' + dx + ', ' + dy);

		});

	};

	/**
	 * Applies the Movement Actions of this Paddle.
	 *
	 * @return {void}
	 */
	applyMovementActions() {

		// Check for Move Right
		if(window.keyboard.isKeyDown(window.controlMap.moveRight)) {

			if(this.canMoveRight()) {
				this.moveRight();
			}

		}

		// Check for Move Left
		else if(window.keyboard.isKeyDown(window.controlMap.moveLeft)) {

			if(this.canMoveLeft()) {
				this.moveLeft();
			}

		}


	};

	/**
	 * Returns whether or not the Paddle can move to the Left.
	 *
	 * @return {boolean}
	 */
	canMoveLeft() {
		return this.x > 0;
	};

	/**
	 * Moves this Paddle to the Left.
	 *
	 * @return {void}
	 */
	moveLeft() {
		this.x -= this.movementSpeed;
	};

	/**
	 * Returns whether or not the Paddle can move to the Right.
	 *
	 * @return {boolean}
	 */
	canMoveRight() {
		return this.x < game().graphics.getCanvas().getWidth() - this.width;
	};

	/**
	 * Moves this Paddle to the Right.
	 *
	 * @return {void}
	 */
	moveRight() {
		this.x += this.movementSpeed;
	};

	/**
	 * Applies the Launch Action of this Paddle.
	 *
	 * @return {void}
	 */
	applyLaunchAction() {

		// Check for Launch Action
		if(window.keyboard.isKeyPressed(window.controlMap.launch)) {

			// Make sure the Paddle can launch the Tracking Object
			if(this.canLaunchTrackingObject()) {

				// Launch the Tracking Object
				this.launchTrackingObject();

			}

		}

	};

	/**
	 * Returns whether or not this Paddle can launch.
	 *
	 * @return {boolean}
	 */
	canLaunchTrackingObject() {
		return this.hasTrackingObject();
	};

	/**
	 * Returns whether or not this Paddle has a Tracking Object.
	 *
	 * @return {boolean}
	 */
	hasTrackingObject() {
		return this.trackingObject != null;
	};

	/**
	 * Sets the Tracking Object for this Paddle.
	 *
	 * @param  {Game.Objects.GameObject}  object
	 *
	 * @return {void}
	 */
	setTrackingObject(object) {
		this.trackingObject = object;
	};

	/**
	 * Launches the Tracking Object.
	 *
	 * @return {void}
	 */
	launchTrackingObject() {

		// Launch the Ball
		this.trackingObject.launch(90);

		// Release the Tracking Object
		this.trackingObject = null;

	};

	/**
	 * Creates a new Tracking Ball.
	 *
	 * @return {Game.Objects.BallGameObject}
	 */
	createTrackingBall() {

		// Create a new Ball
		var ball = BallGameObject.createInstance(this.x + this.width / 2, this.y - 10);

		// Force the Ball to track this Paddle
		ball.setTrackingObject(this, this.width / 2);

		// Set the Tracking Object to the Ball
		this.setTrackingObject(ball);

		// Return the Ball
		return ball;

	};

	/**
	 * Bounces the specified Ball off of this Paddle.
	 *
	 * @param  {Game.Objects.BallGameObject}  ball
	 * @param  {float}                        acceleration
	 * @param  {float}                        accuracy
	 *
	 * @return {void}
	 */
	bounce(ball, acceleration = 0, accuracy = 0.9) {

		// For determining the bounce direction, we want this to drop from
		// the ball, compare the impact to the center and bounce away
		// from the direction. This creates a real paddle effect.

		// Determine the impact line
		var x1, y1, x2, y2;

		x1 = game().graphics.getCanvas().getMouseX();
		y1 = this.y;
		x2 = this.x + this.width / 2;
		y2 = this.y + this.height / 2;

		// Determine the line direction
		var direction = Game.Support.Calc.pointDirection(x1, y1, x2, y2);

		console.log('Initial: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

		// To make things a bit more random, we're going to spread around
		// the direction a bit, making our game a bit harder to know
		// how the ball is going to bounce ahead of time. Neat!

		// Determine the spread
		var spread = accuracy - 1;

		// Offset the direction
		// direction *= 1 + ((Math.random() * spread * 2 - spread) / (180 / Math.PI));

		console.log('Spread: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

		// Make sure the direction isn't completely wack
		direction = Math.min(Math.max(Math.PI * 9 / 8, direction), Math.PI * 15 / 8);

		console.log('Clamp: Dir: ' + direction + ' (Rad) ' + (direction * 180 / Math.PI) + ' (Deg)');

		// Before we determine the new direction of the ball, we need
		// to determine how fast the ball should be travelling. We
		// can take the current speed, and accelerate the ball.

		// Determine the current speed of the ball
		var speed = Math.sqrt(Math.pow(ball.dx, 2) + Math.pow(ball.dy, 2));

		console.log('Initial: Speed: ' + speed);

		// Increase the speed
		speed *= acceleration + 1;

		console.log('Acc: Speed: ' + speed);

		// When determining the line components, we'd normally have
		// to flip dy, as we want the ball to "bounce". However,
		// since the axis is inverted, this is done for us.

		// Flip the line direction
		var dx = -Math.cos(direction) * speed;
		var dy = Math.sin(direction) * speed;

		console.log('New: Speed: ' + dx + ', ' + dy);

		// Set the speed of the ball
		ball.dx = dx;
		ball.dy = dy;

		// Move the Ball once to prevent additional collisions
		ball.x += ball.dx;
		ball.y += ball.dy;

	}
}

// Assign Constructor to Namespace
ns.PaddleGameObject = PaddleGameObject;