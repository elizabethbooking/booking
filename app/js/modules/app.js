var Booking;

Booking = angular.module('Booking', ['ngRoute', 'ngCookies']);

Booking.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl : '/templates/views/index.html',
      controller  : 'HomeController'
    })
    .otherwise({ redirectTo : '/' });

  //$locationProvider.html5Mode(true);
}]);

