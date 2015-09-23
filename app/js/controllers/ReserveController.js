Booking.controller('ReserveController', ['$scope','$stateParams','$state','ReservationService', function($scope,$stateParams,$state,ReservationService){

    $scope.hidepromo=true;
	
  $scope.formData = {};
 $scope.formData.roomDetails=angular.fromJson(atob($stateParams.roomdetails));
  console.log($scope.formData.roomDetails);
    
    // function to process the form
    $scope.processForm = function() {
       // alert('awesome!');

          ReservationService.create($scope.formData)
              .success(function (data) {
                alert("data saved Reservation ID 9889");
                
            })
            .error(function (error) {
                alert("Errror "+error.message);
            });  


    };


    $scope.promo=function(){
           $scope.hidepromo=false;
           $state.go('reserve.customerinfo');
    };
}]);