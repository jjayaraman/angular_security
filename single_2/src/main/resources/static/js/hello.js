angular.module('hello', [ 'ngRoute' ]).config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home.html',
		controller : 'home'
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'navigation'
	}).when('/entities', {
		templateUrl : 'entities.html',
		controller : 'navigation'
	}).when('/dataCollection', {
		templateUrl : 'dataCollection.html',
		controller : 'navigation'
	}).when('/calendar', {
		templateUrl : 'calendar/calendar.html',
		controller : 'navigation'
	}).otherwise('/');

//	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	// No cache config
	// initialize get if not there
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}

	// disable IE ajax request caching
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	// extra
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

})

.controller('navigation', function($rootScope, $scope, $http, $location, $route) {

	// $scope.tab = function(route) {
	// return $route.current && route === $route.current.controller;
	// };

	var authenticate = function(credentials, callback) {

		var headers = credentials ? {
			authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
		} : {};

		$http.get('user', {
			headers : headers
		}).success(function(data) {
			console.log("Logged in : " + JSON.stringify(data));
			if (data.name) {
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			callback && callback($rootScope.authenticated);
		}).error(function() {
			$rootScope.authenticated = false;
			callback && callback(false);
		});
	}

	authenticate();

	$scope.credentials = {};

	$scope.login = function() {
		authenticate($scope.credentials, function(authenticated) {
			if (authenticated) {
				console.log("Login succeeded")
				$location.path("/");
				$scope.error = false;
				$rootScope.authenticated = true;
			} else {
				console.log("Login failed")
				$location.path("/login");
				$rootScope.authenticated = false;
				$scope.error = true;
			}
		})
	};

	$scope.logout = function() {
		$http.post('logout', {}).success(function() {
			$rootScope.authenticated = false;
			$location.path("/login");
		}).error(function(data) {
			console.log("Logout failed")
			$rootScope.authenticated = false;
			$location.path("/login");
		});
	}

})

.controller('home', function($scope, $http) {
	$http.get('/resource/').success(function(data) {
		$scope.greeting = data;
	})
})

app.run([ '$templateCache', function($templateCache) {
	$templateCache.removeAll();
} ]);


