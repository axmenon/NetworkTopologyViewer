'use strict';

//Setting up route
angular.module('controller').config(['$stateProvider',
	function($stateProvider) {
		// Controller state routing
		$stateProvider.
		state('controller-data', {
			url: '/controller-data',
			templateUrl: 'modules/controller/views/controller-data.client.view.html'
		}).
		state('controller', {
			url: '/controller',
			templateUrl: 'modules/controller/views/controller.client.view.html'
		});
	}
]);
