'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Device = mongoose.model('Device'),
	_ = require('lodash');

/**
 * Create a device
 */
exports.create = function(req, res) {
	var device = new Device(req.body);
	device.alive = req.alive;
	device.interfaceList = req.interfaceList;
	device.leadIpAddress = req.leadIpAddress;
	device.sysName = req.sysName;
	device.sysDescr = req.sysDescr;
	device.deviceType = req.deviceType;
	device.version = req.version;
	device.manuallyAdded = req.manuallyAdded;
	device.reachable = req.reachable;
	device.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(device);
		}
	});
};

/**
 * Show the current device
 */
exports.read = function(req, res) {
	res.json(req.device);
};

/**
 * Update a device
 */
exports.update = function(req, res) {
	var device = req.device;

	device = _.extend(device, req.body);

	device.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(device);
		}
	});
};

/**
 * Delete an device
 */
exports.delete = function(req, res) {
	var device = req.device;

	device.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(device);
		}
	});
};

/**
 * List of Devices
 */
exports.list = function(req, res) {
	Device.find().exec(function(err, devices) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(devices);
		}
	});
};

/**
 * Device middleware
 */
exports.deviceByID = function(req, res, next, id) {
	Device.findById(id).populate('user', 'displayName').exec(function(err, device) {
		if (err) return next(err);
		if (!device) return next(new Error('Failed to load device ' + id));
		req.device = device;
		next();
	});
};

/**
 * Device authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.device.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};