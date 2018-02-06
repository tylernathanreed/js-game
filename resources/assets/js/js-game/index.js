/*
|--------------------------------------------------------------------------
| Turn On The Lights
|--------------------------------------------------------------------------
|
| We need to illuminate PHP development, so let us turn on the lights.
| This bootstraps the framework and gets it ready for use, then it
| will load up this application so that we can run it and send
| the responses back to the browser and delight our users.
|
*/

var app = require('./bootstrap/app.js').default;

/*
|--------------------------------------------------------------------------
| Run The Application
|--------------------------------------------------------------------------
|
| Once we have the application, we can handle the incoming request
| through the kernel, and send the associated response back to
| the client's browser allowing them to enjoy the creative
| and wonderful application we have prepared for them.
|
*/

var kernel = require('App/Game/Kernel.js').default;

kernel = app.make('Engine.Contracts.Game.Kernel', [app]);

kernel.start();


/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Game from 'Engine/Game/Game.js';

require('./app/Objects/BallGameObject');
require('./app/Objects/BrickGameObject');
require('./app/Objects/PaddleGameObject');

(new Game).start();