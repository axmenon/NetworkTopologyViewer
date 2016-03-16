'use strict';

// Configuring the Devices module
angular.module('controller').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Register Controller', 'controller');
	}
]);
