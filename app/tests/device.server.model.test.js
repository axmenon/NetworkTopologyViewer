'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Device = mongoose.model('Device');

/**
 * Globals
 */
var user, device;

/**
 * Unit tests
 */
describe('Device Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			device = new Device({
				alive: true,
				interfaceList: {
					"interface": [{
						alive: true,
						ipAddress: {
							type: "IPv4",
							ip: "192.168.1.1"
						},
						netmask: "255.255.255.0",
						ifIndex: "10001"
					}]
				},
				leadIpAddress: {
					type: "IPv4",
					ip: "192.168.1.2"
				},
				sysName: "Avaya",
				sysDescr: "Test Switch",
				deviceType: "VSP 4000",
				version: "4.2.1.0",
				manuallyAdded: true,
				reachable: true
			});
			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return device.save(function(err) {
				should.not.exist(err);
				done();
			});
		});
		// it('should be able to show an error when try to save without title', function(done) {
		// 	device.title = '';
		// 	return article.save(function(err) {
		// 		should.exist(err);
		// 		done();
		// 	});
		// });
	});

	afterEach(function(done) {
		Device.remove().exec();
		User.remove().exec();
		done();
	});
});