import Keyboard from 'Engine/Input/Keyboard.js';

export default {

	'keyboard': {

		'enabled': true,

		'default': 'main',

		'controls': {

			'main': {
				'moveLeft': Keyboard.KEY_LEFT,
				'moveRight': Keyboard.KEY_RIGHT,
				'launch': Keyboard.KEY_SPACE
			}

		}

	}

}