var Booking;

Booking = angular.module('Booking', ['ngCookies','ui.router']);

Booking.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
 
$urlRouterProvider.otherwise('/home');
 
    $stateProvider
       .state('home', {
           url: '/home',
            templateUrl: '/templates/views/index.html',
            controller: 'HomeController'
        })
        .state('reserve', {
           url: '/reserve/:roomdetails',
            templateUrl: '/templates/views/reserve.html',
            controller: 'ReserveController'
        }) 
        .state('reserve.payment', {
            url: '/payment',
            templateUrl: '/templates/views/payment.html'
        })
        .state('reserve.paymentConfirmation', {
            url: '/paymentConfirmation',
            templateUrl: '/templates/views/paymentConfirmation.html'
        })
        .state('reserve.customerinfo', {
            url: '/customerinfo',
            templateUrl: '/templates/views/profile.html'
        });
        
        

        
       


}]);

