Booking.directive('query', ['$rootScope', 'dateFilter', function($rootScope, dateFilter){
  return {
    restrict    : 'E',
    templateUrl : '/templates/directives/query.html',
    controller  : ['$scope', 'InventoryService', function($scope, InventoryService){
      $scope.max_adults = [1,2,3];
      $scope.max_childs = [0,1,2,3];
      $scope.query = {
        adults: 1,
        childs: 0,
        check_in: new moment().toDate(),
        check_out: new moment().add(3, 'days').toDate()
      };

      $scope.submit = function(){
        InventoryService.query($scope.query, function(results){
          $rootScope.$broadcast('query:results');
        });
      }
    }]
  };
}]);

