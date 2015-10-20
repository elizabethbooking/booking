Booking.factory('PoliciesService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/policies')
        .success(function(data, status){
          callback(data);
        });
    }
  };

}]);
