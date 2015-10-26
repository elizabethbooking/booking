Booking.controller('InventoryController', ['$rootScope', 'InventoryService','$scope', function($rootScope, InventoryService,$scope){
  this.results = InventoryService.results;

  $rootScope.$on('query:results', function(){
    this.results = InventoryService.results;
  }.bind(this));


                  InventoryService.getRooms(function(results){

			          $scope.rooms=results.result;
			       
			        });




}]);
