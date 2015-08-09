'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Link Schema
 */
var LinkSchema = new Schema({
	nearIPAddress: Schema.Types.Mixed,
	nearDeviceLabel: String,
	nearIfIndex: String,
	farIPAddress: Schema.Types.Mixed,
	farDeviceLabel: String,
	farIfIndex: String,
	speed: String,
	duplex: String
});

mongoose.model('Link', LinkSchema);