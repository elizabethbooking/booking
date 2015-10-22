var Booking;

Booking = angular.module('Booking', ['ngRoute','angularUtils.directives.dirPagination','ngDialog','ui.calendar']);

Booking.factory('authInterceptor',['$rootScope', '$q', '$window', function ($rootScope, $q, $window) {
      return {
      request: function (config) {
        
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
        config.headers.token=  $window.sessionStorage.token;
        }
         else{
           // no token in Store
                    $window.location.href = "Error.html";
        }
        return config;
      },
      response: function (response) {
        if (response.status === 401) {
        // handle the case where the user is not authenticated
        $window.location.href = "Error.html";
        }
        
        return response || $q.when(response);
      }
      };
    }]);



Booking.config(['$routeProvider', '$locationProvider','$httpProvider', function($routeProvider, $locationProvider,$httpProvider){
  

    $httpProvider.interceptors.push('authInterceptor');

  $routeProvider
    .when('/', {
      templateUrl : '/templates/admin/index.html',
      controller  : 'HomeController'
        })  
    
    .when('/policies', {
      templateUrl : '/templates/views/policies.html',
      controller  : 'PoliciesController'
    })
    .when('/inventory', {
      templateUrl : '/templates/views/inventory.html',
      controller  : 'InventoryController'
    })
    .when('/users', {
      templateUrl : '/templates/views/users.html',
      controller  : 'UsersController'
    })
   
    .when('/user-profile', {
      templateUrl : '/templates/views/user_profile.html',
      controller  : 'UserProfileController'
    })

   .when('/calender', {
      templateUrl : '/templates/views/calender.html',
      controller  : 'CalendarController'
    })
    
   
    .when('/logout', {
      templateUrl : 'templates/admin/logout.html',
      controller  : 'LogoutController'
    })
    .otherwise({ redirectTo : '/' });

  //$locationProvider.html5Mode(true);
    

}]);

Booking.run(['$rootScope', '$location',  function($rootScope, $location){

 $rootScope.loggedIn=true;
 
/*
  $rootScope.$on("$routeChangeStart", function(event, next, current){
    if (LoginService.user() === null) {
      $rootScope.loggedIn = null;
      if ( next.templateUrl === '/templates/admin/login.html') {
      } else {
        $location.path('/');
      }
    }
  });
  */

}]);

