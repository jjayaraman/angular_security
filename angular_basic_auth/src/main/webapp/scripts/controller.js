/**
 * Angular modules
 */

'use strict'

var app = angular.module("mdmApp");


var controller = app.controller('initController', [ 'authDefaults', function(authDefaults) {
	// modify the auth service URL
	authDefaults.authenticateUrl = 'http://localhost:7001/mdmservice/services/entities';
} ]);

var controller = app.controller('MyController', [ 'authService', // the authentication service
'$rootScope', // (optional) if you want to receive auth events
'$scope', function(authService, $rootScope, $scope) {

	// define the endpoints that will be authenticated
	authService.addEndpoint(); // the current hostname
	// authService.addEndpoint('https://some.other.hostname.com');

	// listen for login events
	$rootScope.$on('login', function() {
		$scope.loggedInUsername = authService.username();
	});

	// listen for logout events
	$rootScope.$on('logout', function() {
		$scope.loggedInUsername = null;
	});

	// method to log-in
	$scope.onLoginButton = function() {
		// pass input username and password to
		// the service for authentication
		authService.login($scope.username, $scope.password).success(function() {
			// handle login success
			console.log("success");
		}).error(function() {
			// handle login error
			console.log("Failed..");
		});
	};

	// method to log out
	$scope.onLogoutButton = function() {
		// simply call the logout button
		authService.logout();
	};
} ]);