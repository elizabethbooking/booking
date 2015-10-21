Booking.controller('HomeController', ['CompanyService','ReservationService','$scope', function(CompanyService,ReservationService,$scope){
  this.company = null;
  this.data = 'Booking Home';
  var _self = this;

  CompanyService.data(function(data){
    _self.company = data;
    console.log(data);
  });

 ReservationService.pendingReservations()
            .success(function (data){ 
            	console.log("pending Reservation ");
            	console.log(data.result);

            	$scope.pendingConfirmation=data.result;
			   })
		   .error(function(data) {
		   	console.log("Error in pending Reservation ");
            	console.log(data);
            	$scope.pendingConfirmation=[];

		     });



}]);
