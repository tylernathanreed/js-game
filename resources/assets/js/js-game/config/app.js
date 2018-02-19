import GameServiceProvider from 'Engine/Game/GameServiceProvider.js';
import InputServiceProvider from 'Engine/Input/InputServiceProvider.js';
import ObjectsServiceProvider from 'Engine/Objects/ObjectsServiceProvider.js';
import GraphicsServiceProvider from 'Engine/Graphics/GraphicsServiceProvider.js';
import CollisionServiceProvider from 'Engine/Collision/CollisionServiceProvider.js';

export default {

	'providers': [
		'Engine.Collision.CollisionServiceProvider',
		'Engine.Game.GameServiceProvider',
		'Engine.Graphics.GraphicsServiceProvider',
		'Engine.Input.InputServiceProvider',
		'Engine.Objects.ObjectsServiceProvider'
	]

};