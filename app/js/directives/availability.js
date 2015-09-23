Booking.directive('availability', ['$rootScope', 'dateFilter', function($rootScope, dateFilter){
  return {
    restrict    : 'E',
    templateUrl : '/templates/directives/availability.html',
    controller  : ['$scope','$location','ReservationService', function($scope,$location,ReservationService){
     
      $scope.submit = function(roomdetails){
         ReservationService.query($scope.query)
              .success(function (data) {

                  var det = angular.toJson(roomdetails);
                   det=btoa(det);
                $location.path('/reserve/'+det);
                
            })
            .error(function (error) {
                alert("Errror "+error.message);
            });  
        
      }
    }]
  };
}]);