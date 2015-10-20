Booking.factory('ReservationService', ['$http', function($http){
     var reservation={};

       reservation.data=function(){
          return  $http.get('/api/reservation');
       
       };

       reservation.query=function(querry){
           return  $http.get('/api/reservation');
       }

       reservation.create=function(data){
           return  $http.post('/api/reservation',data);
       }


     return reservation;

  
}]);