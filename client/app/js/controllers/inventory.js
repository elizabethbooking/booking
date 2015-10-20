Booking.controller('InventoryController', ['$rootScope', 'InventoryService', function($rootScope, InventoryService){
  this.results = InventoryService.results;

  $rootScope.$on('query:results', function(){
    this.results = InventoryService.results;
  }.bind(this));



}]);
