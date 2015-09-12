Booking.factory('ReservationService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/reservation')
        .success(function(data, status){
          callback(data);
        });
    }
  };
}]);