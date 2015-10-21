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
       reservation.pendingReservations=function(){
           return  $http.get('/admin/PendingReservations');
       }
       reservation.confirmReservation=function(data){
           return  $http.post('/admin/Confirmreservation',data);
       }
       reservation.confirmCheckin=function(data){
           return  $http.post('/admin/Confirmcheckin',data);
       }
       reservation.Todaycheckins=function(){
           return  $http.get('/admin/todayCheckins');
       }
        reservation.Todaycheckouts=function(){
           return  $http.get('/admin/todayCheckOuts');
       }

       

     return reservation;

  
}]);