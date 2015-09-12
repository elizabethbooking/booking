Booking.factory('CompanyService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/company')
        .success(function(data, status){
          callback(data);
        });
    }
  };

}]);
