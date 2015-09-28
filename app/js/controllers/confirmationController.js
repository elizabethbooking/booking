Booking.controller('confirmationController', ['DataService','$state','$scope','ReservationService', function(DataService,$state,$scope,ReservationService){
   $scope.formData=DataService.get();     
   $scope.guestinfo= _.findWhere($scope.formData, {id:"guestinfo"}).customerProfile;
   $scope.cardinfo=_.findWhere($scope.formData, {id:"paymentinfo"}).paymentDetails;
   $scope.bookinginfo=_.findWhere($scope.formData, {id:"bookinginfo"}).selectedrooms;
    $scope.guestSummary=_.findWhere($scope.formData, {id:"bookinginfo"}).querry;
    $scope.roomsSummary=_.findWhere($scope.formData, {id:"roominfo"}).summary;
   $scope.company_id=_.findWhere($scope.formData, {id:"bookinginfo"}).companyid;

   

   $scope.processForm=function(){
    var data ={};
        data.guestinfo=$scope.guestinfo;
        data.cardinfo=$scope.cardinfo;
        data.bookinginfo=$scope.bookinginfo;
         data.guestSummary=$scope.guestSummary;
         data.roomSummary=$scope.roomsSummary;
         data.company_id=$scope.company_id;


     ReservationService.create(data)
        .success(function (resp) {
                alert(resp);
                console.log(resp);
                $scope.formData="";
                //clear data service data
                
            })
            .error(function (resp) {
                alert("Errror "+resp);
            });  

   };
   

}]);