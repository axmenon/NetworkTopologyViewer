'use strict';

angular.module('links').controller('LinksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Links',
	function($scope, $stateParams, $location, Authentication, Links) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var link = new Links({
				nearIPAddress: {
					type: this.nearIPAddress.type,
					ip: this.nearIPAddress.ip
				},
				nearDeviceLabel: this.nearDeviceLabel,
				nearIfIndex: this.nearIfIndex,
				farIPAddress: {
					type: this.farIPAddress.type,
					ip: this.farIPAddress.type
				},
				farDeviceLabel: this.farDeviceLabel,
				farIfIndex: this.farIfIndex,
				speed: this.speed,
				duplex: this.duplex
			});
			link.$save(function(response) {
				$location.path('links/' + response._id);
				$scope.nearIPAddress.type = '';
				$scope.nearIPAddress.ip = '';
				$scope.nearDeviceLabel = '';
				$scope.nearIfIndex = '';
				$scope.farIPAddress.type = '';
				$scope.farIPAddress.ip = '';
				$scope.farDeviceLabel = '';
				$scope.farIfIndex = '';
				$scope.speed = '';
				$scope.duplex = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(link) {
			if (link) {
				link.$remove();

				for (var i in $scope.links) {
					if ($scope.links[i] === link) {
						$scope.links.splice(i, 1);
					}
				}
			} else {
				$scope.link.$remove(function() {
					$location.path('links');
				});
			}
		};

		$scope.update = function() {
			var link = $scope.link;

			link.$update(function() {
				$location.path('links/' + link._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.links = Links.query();
		};

		$scope.findOne = function() {
			$scope.link = Links.get({
				linkId: $stateParams.linkId
			});
		};
	}
]);