'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Link = mongoose.model('Link'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, link;

/**
 * Link routes tests
 */
describe('Link CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Link
		user.save(function() {
			link = {
				name: 'Link Name'
			};

			done();
		});
	});

	it('should be able to save Link instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Link
				agent.post('/links')
					.send(link)
					.expect(200)
					.end(function(linkSaveErr, linkSaveRes) {
						// Handle Link save error
						if (linkSaveErr) done(linkSaveErr);

						// Get a list of Links
						agent.get('/links')
							.end(function(linksGetErr, linksGetRes) {
								// Handle Link save error
								if (linksGetErr) done(linksGetErr);

								// Get Links list
								var links = linksGetRes.body;

								// Set assertions
								(links[0].user._id).should.equal(userId);
								(links[0].name).should.match('Link Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Link instance if not logged in', function(done) {
		agent.post('/links')
			.send(link)
			.expect(401)
			.end(function(linkSaveErr, linkSaveRes) {
				// Call the assertion callback
				done(linkSaveErr);
			});
	});

	it('should not be able to save Link instance if no name is provided', function(done) {
		// Invalidate name field
		link.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Link
				agent.post('/links')
					.send(link)
					.expect(400)
					.end(function(linkSaveErr, linkSaveRes) {
						// Set message assertion
						(linkSaveRes.body.message).should.match('Please fill Link name');
						
						// Handle Link save error
						done(linkSaveErr);
					});
			});
	});

	it('should be able to update Link instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Link
				agent.post('/links')
					.send(link)
					.expect(200)
					.end(function(linkSaveErr, linkSaveRes) {
						// Handle Link save error
						if (linkSaveErr) done(linkSaveErr);

						// Update Link name
						link.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Link
						agent.put('/links/' + linkSaveRes.body._id)
							.send(link)
							.expect(200)
							.end(function(linkUpdateErr, linkUpdateRes) {
								// Handle Link update error
								if (linkUpdateErr) done(linkUpdateErr);

								// Set assertions
								(linkUpdateRes.body._id).should.equal(linkSaveRes.body._id);
								(linkUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Links if not signed in', function(done) {
		// Create new Link model instance
		var linkObj = new Link(link);

		// Save the Link
		linkObj.save(function() {
			// Request Links
			request(app).get('/links')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Link if not signed in', function(done) {
		// Create new Link model instance
		var linkObj = new Link(link);

		// Save the Link
		linkObj.save(function() {
			request(app).get('/links/' + linkObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', link.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Link instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Link
				agent.post('/links')
					.send(link)
					.expect(200)
					.end(function(linkSaveErr, linkSaveRes) {
						// Handle Link save error
						if (linkSaveErr) done(linkSaveErr);

						// Delete existing Link
						agent.delete('/links/' + linkSaveRes.body._id)
							.send(link)
							.expect(200)
							.end(function(linkDeleteErr, linkDeleteRes) {
								// Handle Link error error
								if (linkDeleteErr) done(linkDeleteErr);

								// Set assertions
								(linkDeleteRes.body._id).should.equal(linkSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Link instance if not signed in', function(done) {
		// Set Link user 
		link.user = user;

		// Create new Link model instance
		var linkObj = new Link(link);

		// Save the Link
		linkObj.save(function() {
			// Try deleting Link
			request(app).delete('/links/' + linkObj._id)
			.expect(401)
			.end(function(linkDeleteErr, linkDeleteRes) {
				// Set message assertion
				(linkDeleteRes.body.message).should.match('User is not logged in');

				// Handle Link error error
				done(linkDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec(function(){
			Link.remove().exec(function(){
				done();
			});	
		});
	});
});
