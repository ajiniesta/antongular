(function() {
	// Read https://docs.angularjs.org/guide/directive
	var app = angular.module('antongular', []);

	app.directive('node', function(){
		return {
			restrict: 'E',
			exclude: true,
			template: "<span><i class='icon-folder-open'></i></span>"
		};
	});

	app.directive('nodelist', function(){
		return {
			restrict:'E',
			transclude: true,
			template: '<div ng-transclude></div>',
			require: "^listgroup",			
			link: function (scope, element, attrs, ctrl) {
				ctrl.addNode(scope);
			}
		};
	});

	app.directive('listgroup', function(){
		return {
			restrict:'E',
			transclude: true,
			template: '<div ng-repeat="node in nodes" class="btn">aaa</div><ul class="list-group"><li ng-repeat="node in nodes" class="list-group-item" ng-click ng-class="{active: selected}"><div ng-transclude></div></li></ul>',
			controller: function($scope) {
				$scope.nodes = [];
				this.addNode = function(node) {					
					// if($scope.nodes.length==0){
					// 	console.log("Setting initial as active");
					// 	node.selected = true;
					// }
					$scope.nodes.push(node);
					console.log($scope.nodes.length);
				}
			}
		};
	});

	app.directive('tabgroup', function () {
		return {
			restrict: "E",
			transclude: true,
			template: "<div ng-repeat='tab in tabs' ng-click='select(tab)' class='btn btn-default' ng-class='{active: tab.selected}'>{{tab.title}}</div>"
			+"<div ng-transclude></div>",
			controller: function ($scope) {
				$scope.tabs = [];
				this.addTab = function (tab) {
					if($scope.tabs.length==0){
						tab.selected = true;
					}
					$scope.tabs.push(tab);
				}

				$scope.select = function (tab) {
					angular.forEach($scope.tabs, function (eachTab) {
						eachTab.selected = angular.equals(tab, eachTab);
					})
				}
			}

		};
	});

	app.directive('tab', function () {
		return {
			restrict: "E",
			scope: {
				title: "@"
			},
			transclude: true,
			template: "<div ng-show='selected' ng-transclude></div>",
			require: "^tabgroup",
			link: function (scope, element, attrs, ctrl) {
				ctrl.addTab(scope);
			}
		};
	});
})();
