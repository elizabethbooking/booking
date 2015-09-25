Booking.controller('guestController', ['DataService','$state','$scope', function(DataService,$state,$scope){
   $scope.formData={};


   $scope.payment=function(){

	   	 var data={};
	   	 data.id='guestinfo';
	   	 data.customerProfile=$scope.formData;
	   	DataService.save(data);
	   	$state.go('payment');
   };

}]);