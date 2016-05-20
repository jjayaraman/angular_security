var idleApp = angular.module("idleApp", [ 'ngIdle' ]);


idleApp.config(['KeepaliveProvider', 'IdleProvider', function(KeepaliveProvider, IdleProvider) {
  IdleProvider.idle(1*60);
  IdleProvider.timeout(1*60);
  KeepaliveProvider.interval(1*60);
}]);


idleApp.run([ 'Idle', function(Idle) {
	console.log("...run....");
	Idle.watch();
} ]);


idleApp.controller('EventsCtrl', function($scope, Idle) {
    $scope.events = [];

    $scope.$on('IdleStart', function() {
        // the user appears to have gone idle
    	console.log("...IdleStart....");    	
    });

    $scope.$on('IdleWarn', function(e, countdown) {
        // follows after the IdleStart event, but includes a countdown until the user is considered timed out
        // the countdown arg is the number of seconds remaining until then.
        // you can change the title or display a warning dialog from here.
        // you can let them resume their session by calling Idle.watch()
    	
    	console.log("...IdleWarn....");    	
    });

    $scope.$on('IdleTimeout', function() {
        // the user has timed out (meaning idleDuration + timeout has passed without any activity)
        // this is where you'd log them
    	
    	console.log("...IdleTimeout....");    	
    });

    $scope.$on('IdleEnd', function() {
        // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
    	
    	console.log("...IdleEnd....");    	
    });

    $scope.$on('Keepalive', function() {
        // do something to keep the user's session alive
    	
    	console.log("...Keepalive....");    	
    });

})