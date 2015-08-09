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
				onblclick: '&',
				onMouseOver: '&',
				options: '='
			},
			link: function($scope, $element, $attrs) {
				var network = new vis.Network($element[0], $scope.ngModel, $scope.options);
				var onSelect = $scope.onSelect() || function(prop) {};
				network.on('select', function(properties) {
					onSelect(properties);
				});
				network.on('dblclick', function(properties) {
					ondblclick(properties);
				});
				network.on('mouseover', function(properties) {
					onMouseOver(properties);
				});
			}
		};
	}
);