Booking.factory('LoginService', ['$http', '$cookies', '$rootScope', function($http, $cookies, $rootScope){
  return {
    auth: function(credentials, callback) {
      $http.post('/api/login', credentials)
        .success(function(data, status){
          $cookies.put('user', JSON.stringify(data));
          callback(data, status);
        })
        .error(function(){
          console.log('error');
        })
    },

    user: function(){
      var user = null;
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

