Booking.directive('availability', ['$rootScope', 'dateFilter', function($rootScope, dateFilter){
  return {
    restrict    : 'E',
    templateUrl : '/templates/directives/availability.html',
    controller  : ['$scope','$location','ReservationService','$stateParams','DataService', function($scope,$location,ReservationService,$stateParams,DataService){
      
      $scope.selectedrooms=[];
      $scope.number=-1;
  $scope.querry= angular.fromJson(atob($stateParams.querry))
     

$scope.selectroom=function(index,room){
   var rm={};
    rm.id=index;
    rm.room=room;
    room.selected=true;
    $scope.selectedrooms.push(rm);
    $scope.number=index;
    console.log($scope.selectedrooms)
};
$scope.removeroom=function(index){

   for (i in $scope.selectedrooms) {
            if ($scope.selectedrooms[i].id == index) {
                $scope.selectedrooms.splice(i, 1);
            }
        }
};

$scope.book=function(){
  var k={};
     k.selectedrooms=$scope.selectedrooms;
     k.querry=$scope.querry;
     k.companyid=$scope.selectedrooms[0].room.company_id;
     k.id='bookinginfo';
   var det=btoa(angular.toJson(k));
   DataService.save(k);
  $location.path('/reserve/'+det);
  
};

      $scope.submit = function(){
         ReservationService.query($scope.query)
              .success(function (data) {

                  
                 
                
            })
            .error(function (error) {
                alert("Errror "+error.message);
            });  
        
      };
    }]
  };
}]);