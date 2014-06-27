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

})();
