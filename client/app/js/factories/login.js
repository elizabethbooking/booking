Booking.factory('LoginService', ['$http',  '$rootScope', function($http, $rootScope){
  return {
    auth: function(credentials, callback) {
      $http.post('/api/login', credentials)
        .success(function(data, status){
          callback(data, status);
        })
        .error(function(){
          console.log('error');
        })
    },

    user: function(){
      var user = "";
      if ($cookies.get('user')) {
        $rootScope.loggedIn = user = JSON.parse($cookies.get('user'));
      }
      return user;
    },

    logout: function(){
      $rootScope.loggedIn = null;
      $cookies.remove('user');
    }
  };

}]);

