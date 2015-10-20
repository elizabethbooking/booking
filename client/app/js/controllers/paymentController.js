Booking.controller('paymentController', ['DataService','$state','$scope', function(DataService,$state,$scope){
   $scope.formData={};


   $scope.gotoConfirm=function(){
	   	 var data={};
	   	 data.id='paymentinfo';
	   	 data.paymentDetails=$scope.formData;
	   	DataService.save(data);
	   	$state.go('Confirmation');
   };

}]);