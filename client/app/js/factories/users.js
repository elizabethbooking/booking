Booking.factory('UsersService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/users')
        .success(function(data, status){
          callback(data);
        });
    }
  };

}]);