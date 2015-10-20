Booking.factory('CustomerService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/customer')
        .success(function(data, status){
          callback(data);
        });
    }
  };

}]);