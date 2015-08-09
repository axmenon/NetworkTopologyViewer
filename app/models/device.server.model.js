'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Device Schema
 */

var DeviceSchema = new Schema({
	alive: Boolean,
	interfaceList: {
		interface: [{
			alive: Boolean,
			ipAddress: {
				type: String,
				ip: String
			},
			netmask: String,
			ifIndex: String
		}]
	},
	leadIpAddress: Schema.Types.Mixed,
	sysName: String,
	sysDescr: String,
	deviceType: String,
	version: String,
	manuallyAdded: Boolean,
	reachable: Boolean
});
mongoose.model('Device', DeviceSchema);