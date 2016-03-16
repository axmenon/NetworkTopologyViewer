'use strict';

angular.module('controller').factory('Restservice', ['$cookieStore',
	function($cookieStore) {
		// Public API
		return {
			CONTROLLER_IP: '',
			USER_CREDENTIALS: '',
			setCredentials: function(credentials, ip) {
				this.CONTROLLER_IP = ip;
				this.USER_CREDENTIALS = credentials;
				$cookieStore.put('controllerIp', ip);
				$cookieStore.put('controllerCredentials', credentials);

			},
			getUserCredentials: function() {
				return this.USER_CREDENTIALS;
			},
			getControllerIp: function() {
				return this.CONTROLLER_IP;
			},
			getConfig: function() {
				return {
					method: 'GET',
					url: 'http://' + $cookieStore.get('controllerIp') + ':8181/restconf/operational/opendaylight-inventory:nodes',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Basic ' + btoa($cookieStore.get('controllerCredentials'))
					}
				};
			}
		};
	}
]);