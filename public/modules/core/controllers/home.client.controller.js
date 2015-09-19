/**
 * @description Controller for the Home page, includes the vis network and the input box.
 * @author Akshay Menon <makshay@avaya.com>
 */

'use strict';
/**
 * Controller: HomeController
 * @param  {[type]} $scope         [description]
 * @param  {[type]} Authentication [description]
 * @param  {[type]} Devices        [description]
 * @param  {[type]} Links          [description]
 * @return {[type]}                [description]
 */
angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Devices', 'Links',
	/**
	 * [description]
	 * @param  {[type]} $scope         [description]
	 * @param  {[type]} Authentication [description]
	 * @param  {[type]} Devices        [description]
	 * @param  {[type]} Links          [description]
	 * @return {[type]}                [description]
	 */
	function($scope, Authentication, Devices, Links) {

		/**
		 * [authentication This provides Authentication context.]
		 * @type {[type]}
		 */
		$scope.authentication = Authentication;

		/**
		 * Local variables used for the configuration of the vis-network.
		 */
		var LENGTH_MAIN = 350,
			LENGTH_SERVER = 150,
			LENGTH_SUB = 50,
			WIDTH_SCALE = 2,
			GREEN = 'green',
			RED = '#C5000B',
			ORANGE = 'orange',
			BLUE = '#2B7CE9',
			GRAY = 'gray',
			BLACK = '#2B1B17',
			device, link, newLink, newNode;

		/**
		 * Network data comprises of two datasets
		 * @type {vis}
		 */
		$scope.nodes = new vis.DataSet();
		$scope.edges = new vis.DataSet();
		$scope.network_data = {
			nodes: $scope.nodes,
			edges: $scope.edges
		};

		/**
		 * [network_options description]
		 * @type {Object}
		 */

		$scope.network_options = {
			autoResize: true,
			edges: {
				font: {
					face: 'ekmukta-light'
				}
			},
			nodes: {
				font: {
					face: 'ekmukta-light'
				}
			},
			height: '100%',
			width: '100%',
			interaction: {
				hover: true,
				keyboard: {
					enabled: false,
					speed: {
						x: 10,
						y: 10,
						zoom: 0.02
					},
					bindToWindow: true
				},
				multiselect: true
			},
			physics: {
				barnesHut: {
					gravitationalConstant: -7025
				},
				timestep: 0.31,
				maxVelocity: 102,
				minVelocity: 0.52,
			}
		};

		/**
		 * [onSelect description]
		 * @param  {[type]} properties [description]
		 * @return {[type]}            [description]
		 */
		$scope.onSelect = function(properties) {
			var selected = $scope.nodes.get(properties.nodes[0]);
			// console.log(selected);
			if (selected.id) {
				var url = '#!/devices/' + selected._id;
				window.open(url);
			}
		};

		/**
		 * [onDoubleclick description]
		 * @param  {Object} properties [description]
		 * @return {[type]}            [description]
		 */
		$scope.onDoubleclick = function(properties) {
			var selected = $scope.nodes.get(properties.nodes[0]);
			if (selected.id) {
				var url = '#!/devices/' + selected._id;
				window.open(url);
			}
		};

		/**
		 * [onMouseOver Shows tool-tip for the node/link]
		 * TODO: Write function to show tooltip.
		 * @param  {[type]} properties [description]
		 * @return {[type]}            [description]
		 */
		$scope.onMouseover = function(properties) {
			var mouseOverElement = $scope.nodes.get(properties.node);
			// console.log(mouseOverElement);
			// mouseOverElement.showPopup();
			// showToolTip(mouseOverElement);
		};

		/**
		 * [discover description]
		 * @return {[type]} [description]
		 */
		$scope.discover = function() {
			$scope.discoverNow = true;
			$scope.devices = Devices.query(function() {
				for (device of $scope.devices) {
					if (device.leadIpAddress) {
						var imgType;
						if (parseInt(device.deviceType) > 0 && parseInt(device.deviceType) < 200) {
							imgType = device.sysName === 'null' ? 'ersNull' : 'ers';
						} else if (parseInt(device.deviceType) > 200) {
							imgType = device.sysName === 'null' ? 'vspNull' : 'vsp';
						} else {
							imgType = 'phone';
						}
						newNode = {
							_id: device._id,
							id: device.leadIpAddress.ip,
							image: 'modules/core/img/switches/' + imgType + '.png',
							shape: 'image',
							label: device.leadIpAddress.ip,
							group: device.deviceType,
							value: device.interfaceList.interface.length
						};
						$scope.nodes.update(newNode);
					}
				}
			});
			$scope.links = Links.query(function() {
				for (link of $scope.links) {
					newLink = {
						from: link.nearIPAddress.ip,
						to: link.farIPAddress.ip,
						length: LENGTH_MAIN,
						width: WIDTH_SCALE,
						arrows: 'middle',
						label: link.nearDeviceLabel + ' to ' + link.farDeviceLabel
					};
					$scope.edges.update(newLink);
				}
			});
		};
	}
]);