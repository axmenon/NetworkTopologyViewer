'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Link = mongoose.model('Link'),
	_ = require('lodash');

/**
 * Create a Link
 */
exports.create = function(req, res) {
	var link = new Link(req.body);
	link.nearIPAddress.type = req.nearIPAddress.type;
	link.nearIPAddress.ip = req.nearIPAddress.ip;
	link.nearDeviceLabel = req.nearDeviceLabel;
	link.nearIfIndex = req.nearIfIndex;
	link.farIPAddress.type = req.farIPAddress.type;
	link.farIPAddress.ip = req.farIPAddress.ip;
	link.farDeviceLabel = req.farDeviceLabel;
	link.farIfIndex = req.farIfIndex;
	link.speed = req.speed;
	link.duplex = req.duplex;

	link.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(link);
		}
	});
};

/**
 * Show the current Link
 */
exports.read = function(req, res) {
	res.jsonp(req.link);
};

/**
 * Update a Link
 */
exports.update = function(req, res) {
	var link = req.link;

	link = _.extend(link, req.body);

	link.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(link);
		}
	});
};

/**
 * Delete an Link
 */
exports.delete = function(req, res) {
	var link = req.link;

	link.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(link);
		}
	});
};

/**
 * List of Links
 */
exports.list = function(req, res) {

	Link.find().exec(function(err, links) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(links);
		}
	});

	// var sort;
	// var sortObject = {};
	// var count = req.query.count || 5;
	// var page = req.query.page || 1;


	// var filter = {
	// 	filters: {
	// 		mandatory: {
	// 			contains: req.query.filter
	// 		}
	// 	}
	// };

	// var pagination = {
	// 	start: (page - 1) * count,
	// 	count: count
	// };

	// if (req.query.sorting) {
	// 	var sortKey = Object.keys(req.query.sorting)[0];
	// 	var sortValue = req.query.sorting[sortKey];
	// 	sortObject[sortValue] = sortKey;
	// } else {
	// 	sortObject.desc = '_id';
	// }

	// sort = {
	// 	sort: sortObject
	// };


	// Link
	// 	.find()
	// 	.filter(filter)
	// 	.order(sort)
	// 	.page(pagination, function(err, links) {
	// 		if (err) {
	// 			return res.status(400).send({
	// 				message: errorHandler.getErrorMessage(err)
	// 			});
	// 		} else {
	// 			res.jsonp(links);
	// 		}
	// 	});

};

/**
 * Link middleware
 */
exports.linkByID = function(req, res, next, id) {
	Link.findById(id).populate('user', 'displayName').exec(function(err, link) {
		if (err) return next(err);
		if (!link) return next(new Error('Failed to load Link ' + id));
		req.link = link;
		next();
	});
};

/**
 * Link authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.link.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};