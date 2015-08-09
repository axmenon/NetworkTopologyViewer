'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var links = require('../../app/controllers/links.server.controller');

	// Links Routes
	app.route('/links')
		.get(links.list)
		.post(users.requiresLogin, links.create);

	app.route('/links/:linkId')
		.get(links.read)
		.put(users.requiresLogin, links.hasAuthorization, links.update)
		.delete(users.requiresLogin, links.hasAuthorization, links.delete);

	// Finish by binding the Link middleware
	app.param('linkId', links.linkByID);
};
