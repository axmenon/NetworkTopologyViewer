'use strict';

angular.module('devices').controller('DevicesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Devices',
	function($scope, $stateParams, $location, Authentication, Devices) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var device = new Devices({
				alive: this.alive,
				interfaceList: {},
				leadIpAddress: {
					type: this.leadIpAddress.type,
					ip: this.leadIpAddress.ip
				},
				sysName: this.sysName,
				sysDescr: this.sysDescr,
				deviceType: this.deviceType,
				version: this.version,
				manuallyAdded: this.manuallyAdded,
				reachable: this.reachable
			});
			device.$save(function(response) {
				$location.path('devices/' + response._id);
				$scope.alive = false;
				$scope.interfaceList = null;
				$scope.leadIpAddress.type = '';
				$scope.leadIpAddress.ip = '';
				$scope.sysName = '';
				$scope.sysDescr = '';
				$scope.deviceType = '';
				$scope.version = '';
				$scope.manuallyAdded = false;
				$scope.reachable = false;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(device) {
			if (device) {
				device.$remove();

				for (var i in $scope.devices) {
					if ($scope.devices[i] === device) {
						$scope.devices.splice(i, 1);
					}
				}
			} else {
				$scope.device.$remove(function() {
					$location.path('devices');
				});
			}
		};

		$scope.update = function() {
			var device = $scope.device;

			device.$update(function() {
				$location.path('devices/' + device._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.devices = Devices.query();
		};

		$scope.findOne = function() {
			$scope.device = Devices.get({
				deviceId: $stateParams.deviceId
			});
		};
	}
]);