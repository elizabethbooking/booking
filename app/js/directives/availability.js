Booking.directive('availability', ['$rootScope', 'dateFilter', function($rootScope, dateFilter){
  return {
    restrict    : 'E',
    templateUrl : '/templates/directives/availability.html',
    controller  : ['$scope', 'ReservationService', function($scope, ReservationService){
     
      $scope.submit = function(){
         ReservationService.query($scope.query, function(results){
          
         });
      }
    }]
  };
}]);