'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	devices = require('../../app/controllers/devices.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/devices')
		.get(devices.list)
		.post(users.requiresLogin, devices.create);

	app.route('/devices/:deviceId')
		.get(devices.update)
		.put(users.requiresLogin, devices.hasAuthorization, devices.update)
		.delete(users.requiresLogin, devices.hasAuthorization, devices.delete);

	// Finish by binding the article middleware
	app.param('deviceId', devices.deviceByID);
};