(function () {

angular.module('herbVoreLyfeApp', ['ngRoute', 'ngResource']);

function config($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'home/home.view.html',
			controller: 'homeCtrl',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: '/'});
}

angular
	.module('herbVoreLyfeApp')
	.config(['$routeProvider', config]);

})();