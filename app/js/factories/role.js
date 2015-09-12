Booking.factory('RoleService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/role')
        .success(function(data, status){
          callback(data);
        });
    }
  };
}]);