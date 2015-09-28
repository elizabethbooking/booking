var Booking;

Booking = angular.module('Booking', ['ngCookies','ui.router','angularUtils.directives.dirPagination']);

Booking.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
 
$urlRouterProvider.otherwise('/home');
 
    $stateProvider
       .state('home', {
           url: '/home',
            templateUrl: '/templates/views/index.html',
            controller: 'HomeController'
        })
       .state('booking', {
           url: '/booking/:querry',
            templateUrl: '/templates/booking.html'
        })
       
        .state('reserve', {
           url: '/reserve/:roomdetails',
            templateUrl: '/templates/views/reserve.html',
            controller: 'ReserveController'
        }) 
        .state('payment', {
            url: '/payment',
            templateUrl: '/templates/views/payment.html',
            controller: 'paymentController'
        })
        .state('Confirmation', {
            url: '/Confirmation',
            templateUrl: '/templates/views/paymentConfirmation.html',
            controller: 'confirmationController'

        })
        .state('guestinfo', {
            url: '/guestinfo',
            templateUrl: '/templates/views/profile.html',
            controller: 'guestController'
        });
        
        

        
       


}]);

