Booking.controller('LoginController', ['$rootScope', '$scope', '$location', 'LoginService',
  function($rootScope, $scope, $location, LoginService){
    $scope.submit = function(){

      LoginService.auth($scope.user, function(data, status){

        if (status === 200) {
          $rootScope.loggedIn = data;        
          $location.path('/');
        }
      });
    };

  }]
);

