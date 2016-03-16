'use strict';

angular.module('controller').controller('ControllerDataController', ['$http', '$scope', 'Restservice',
  function($http, $scope, Restservice) {

    $scope.checkedItems = [];

    $scope.initial = function() {
      $scope.nodes = {};
      $scope.config = Restservice.getConfig();
      $http($scope.config).success(function(response) {
        $scope.nodes = response;
        console.log(response);
      }).error(function(response) {
        $scope.nodes = response.message;
      });
    };

    $scope.selectAllFilteredItems = function() {
      //TODO: Implement selectAll()
    };

    $scope.onViewInTopologyClick = function(checkedItems) {
      //TODO: Route to discoveryPage and show ONAs
      if (checkedItems.length === 0) {
        alert('No Items to show in topology.');
      }
    };
  }
]);
