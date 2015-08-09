'use strict';

//Links service used to communicate Links REST endpoints
angular.module('links').factory('Links', ['$resource',
	function($resource) {
		return $resource('links/:linkId', {
			linkId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);