/**
 * @description Cirective: Vis-Network
 * @author Akshay Menon <makshay@avaya.com>
 */

'use strict';
/**
 * visNetwork is plugged in to the webpage as a directive.
 * @param  visNetwork 	 	
 * @param  {vis}    
 * @return {[type]}       [description]
 * @package core
 */
angular.module('core').directive('visNetwork',
	function() {
		return {
			restrict: 'E',
			require: '^ngModel',
			transclude: true,
			scope: {
				ngModel: '=',
				onSelect: '&',
				onDoubleclick: '&',
				onMouseover: '&',
				options: '='
			},
			link: function($scope, $element, $attrs) {
				var network = new vis.Network($element[0], $scope.ngModel, $scope.options);
				var onSelect = $scope.onSelect() || function(prop) {};
				var onMouseover = $scope.onMouseover() || function(prop) {};
				var onDoubleclick = $scope.onDoubleclick() || function(prop) {};
				network.on('select', function(properties) {
					onSelect(properties);
				});
				network.on('doubleClick', function(properties) {
					onDoubleclick(properties);
				});
				network.on('hoverNode', function(properties) {
					onMouseover(properties);
				});
			}
		};
	}
);