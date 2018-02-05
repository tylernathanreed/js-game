var ns = namespace('Engine.Support');

export default class Calc {

	/**
	 * Returns the direction between the specified points.
	 *
	 * @param  {float}  x1
	 * @param  {float}  y1
	 * @param  {float}  x2
	 * @param  {float}  y2
	 *
	 * @return {float}
	 */
	static pointDirection(x1, y1, x2, y2) {

		// For those that remember their geometry, this is a case where
		// we have an adjacent (x) and opposite (y) sides, therefore
		// tangent is needed. We want the angle, so arc tangent.

		// Determine the sides
		var adjacent = x2 - x1;
		var opposite = y2 - y1;

		// When working with monitors (and really games for that matter),
		// the y-axis increases as a point moves downward. This is the
		// opposite of a typical cartesian plane. Invert to fix it.

		// Inverst the opposite side
		opposite = -opposite;

		// If you really remembered your geometry, you'd know that atan
		// returns values between pi/2 and -pi/2. The tan2 function
		// is much better for this, as it handles the quadrants.

		// Calculate the angle
		var angle = Math.atan2(opposite, adjacent);

		// However tan2 still isn't perfect, as it returns values between
		// -pi and pi, not 0 to 2pi. The -pi happens in quadrants III
		// and IV, where opposite is negative. We can fix that.

		// Check for negative opposite
		if(opposite < 0) {

			// The value here flips from pi to -pi on the II/III quadrant line.
			// This means that our fix is to add the angle (because it is
			// negative) to 2pi, which gives us the range we wanted.

			// Add the angle to 2pi
			return 2 * Math.PI + angle;

		}

		// If we're here, then we're in quadrant I or II. The value of
		// atan2 is correct here, so we can just return the angle
		// as-is. Thankfully other special cases are handled.

		// Return the angle
		return angle;

	};

};

// Assign Constructor to Namespace
ns.Calc = Calc;