var Booking;

Booking = angular.module('Booking', ['ngRoute', 'ngCookies']);

Booking.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : '/templates/admin/index.html',
      controller  : 'HomeController'
    })
    .when('/login', {
      templateUrl : '/templates/admin/login.html',
      controller  : 'LoginController'
    })
    .when('/logout', {
      templateUrl : 'templates/admin/logout.html',
      controller  : 'LogoutController'
    })
    .otherwise({ redirectTo : '/' });

  //$locationProvider.html5Mode(true);
}]);

Booking.run(['$rootScope', '$location', 'LoginService', function($rootScope, $location, LoginService){
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    if (LoginService.user() === null) {
      $rootScope.loggedIn = null;
      if ( next.templateUrl === '/templates/admin/login.html') {
      } else {
        $location.path('/login');
      }
    }
  });
}]);

