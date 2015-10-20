Booking.controller('LoginController', ['$rootScope', '$scope', '$window', 'LoginService',
  function($rootScope, $scope, $window, LoginService){
    $scope.submit = function(){
      LoginService.auth($scope.user, function(data, status){
        if (status === 200) {
           $window.sessionStorage.token = data.token;
          $rootScope.loggedIn = data;
          $window.location.href='/Admin.html';
        }
        else {
            delete $window.sessionStorage.token;
        }
      });
    };

  }]
);

