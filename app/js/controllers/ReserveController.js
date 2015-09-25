Booking.controller('ReserveController', ['$scope','$stateParams','$state','ReservationService', 'DataService',function($scope,$stateParams,$state,ReservationService,DataService){


	
  $scope.formData = {};
 $scope.formData.roomDetails=angular.fromJson(atob($stateParams.roomdetails));
  console.log($scope.formData.roomDetails);

  $scope.summary={};
  $scope.summary.noRooms=$scope.formData.roomDetails.selectedrooms.length;
  $scope.summary.noGuest= $scope.formData.roomDetails.querry.adults; 
  $scope.summary.startdate=$scope.formData.roomDetails.querry.check_in;
  $scope.summary.enddate=$scope.formData.roomDetails.querry.check_out;

  $scope.totalprice=function(){
        var tprice=0;
        

       for (var i=0  ;i<$scope.summary.noRooms;i++){

           tprice=tprice+$scope.formData.roomDetails.selectedrooms[i].room.base_price;
       }
        return tprice;
      };



$scope.summary.tPrice= $scope.totalprice(); 

    
    // function to process the form
    $scope.processForm = function() {
       // alert('awesome!');

          ReservationService.create($scope.formData)
              .success(function (data) {
                alert("data saved Reservation ID 9889");
                $scope.formData="";
                
            })
            .error(function (error) {
                alert("Errror "+error.message);
            });  


    };


    $scope.proceed=function(){
      var data={};
        data.roomdetails=$scope.formData;
        data.summary=$scope.summary;
         DataService.save(data);
           $state.go('guestinfo');
    };

    
}]);