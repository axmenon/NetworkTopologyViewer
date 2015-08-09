'use strict';

//Devices service used for communicating with the devices REST endpoints
angular.module('devices').factory('Devices', ['$resource',
	function($resource) {
		return $resource('devices/:deviceId', {
			deviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);