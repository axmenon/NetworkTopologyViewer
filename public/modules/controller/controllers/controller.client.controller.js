'use strict';

angular.module('controller').controller('ControllerController', ['$scope','$http', '$location', 'Restservice',
	function($scope, $http, $location, Restservice) {
		$scope.signin = function() {
			var USER_CREDENTIALS = $scope.credentials.controllerUsername+':'+$scope.credentials.controllerPassword;
			var CONTROLLER_IP = $scope.credentials.controllerip;
			Restservice.setCredentials(USER_CREDENTIALS, CONTROLLER_IP);
			$location.path('controller-data');
		};

	}
]);