Booking.factory('LoginService', ['$http',  '$rootScope','$window', function($http, $rootScope,$window){
  return {
    auth: function(credentials, callback) {
      $http.post('/api/login', credentials)
        .success(function(data, status){
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.role = data.role;
          $window.sessionStorage.user=data.username
        
            $rootScope.loggedIn=true;
          callback(data, status);
        })
        .error(function(){
          console.log('error');
        })
    },

    user: function(){
      var user = "";

             user =$window.sessionStorage.role;
              console.log("user role " + user);
      return user;
    },

    logout: function(){
      $rootScope.loggedIn = null;
      delete $window.sessionStorage.token;
      delete $window.sessionStorage.role;
      delete $window.sessionStorage.user;
      $window.location.href='login.html';
    }
  };

}]);

