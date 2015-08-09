/**
 * @description Controller for the Header.
 * @author Akshay Menon <makshay@avaya.com>
 */

'use strict';
/**
 * Controller: HeaderController
 * @param  {[type]} $scope         [Header Scope]
 * @param  {[type]} Authentication [Checks for RBAC]
 * @param  {[type]} Menus)         {		$scope.authentication [description]
 * @return {[type]}                [description]
 */
angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

/**
 * [toggleCollapsibleMenu Toggles the menu collapse on click]
 * @return {[type]} [description]
 */
		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

/**
 * On successful change of state: Collapsing the menu after navigation
 * @param  {[type]} ) {			$scope.isCollapsed [description]
 * @return {[type]}   [description]
 */
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);