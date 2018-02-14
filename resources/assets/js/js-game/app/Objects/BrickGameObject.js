var ns = namespace('App.Objects');

import GameObject from 'Engine/Objects/GameObject.js';
import BallGameObject from 'App/Objects/BallGameObject.js';

export default class BrickGameObject extends GameObject {

	/**
	 * The "booting" method of this Object.
	 *
	 * @return {void}
	 */
	static _boot() {

		// Determine the game variables
		var variables = app('variables');

		/**
		 * Assign Instance Attributes.
		 *
		 * @param  {Game.Objects.BrickGameObject}  brick
		 *
		 * @return {void}
		 */
		this.onCreate(function(brick) {

			// Initialize the Health
			brick.health = brick.healthMax = 1;

		});

		/**
		 * The Draw Event Handler for this Object.
		 *
		 * @param  {Game.Objects.BrickGameObject}  brick
		 * @param  {Game.Graphics.Canvas}          canvas
		 * @param  {Game.Graphics.CanvasContext}   context
		 *
		 * @return {void}
		 */
		this.onDraw(function(brick, canvas, context) {

			// Find the Ball Object
			var ball = BallGameObject.getClassInstance();

			// Check if a Ball was found
			if(ball != null) {

				// Check for Ball Collision
				if(brick.isBallColliding(ball)) {

					// Hit the Brick
					ball.hitBrick(brick);

				}

			}

			// Draw the Brick
			context.drawRectangle(brick.x, brick.y, brick.width, brick.height, '#0095DD');

		});

		/**
		 * The Destroy Event Handler for this Object.
		 *
		 * @return {void}
		 */
		this.onDeleted(function() {

			// Increase the Game Score
			variables.increment('score', 1);

		});

	};

	/**
	 * Returns whether or not the specified Ball is colliding with this Object.
	 *
	 * @param  {BallGameObject}  ball
	 *
	 * @return {boolean}
	 */
	isBallColliding(ball) {

		return ball.x > this.x               // Check Left Edge
			&& ball.x < this.x + this.width  // Check Right Edge
			&& ball.y > this.y               // Check Top Edge
			&& ball.y < this.y + this.height // Check Bottom Edge

	};

	/**
	 * Damages this Brick.
	 *
	 * @param  {integer}  amount
	 *
	 * @return {void}
	 */
	damage(amount = 1) {

		// Reduce the Health
		this.health -= amount;

		// Check for Death
		if(this.health < 0) {
			this.destroy();
		}

	};

}

// Assign Constructor to Namespace
ns.BrickGameObject = BrickGameObject;