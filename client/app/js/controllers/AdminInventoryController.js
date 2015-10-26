Booking.controller('AdminInventoryController', ['$rootScope', 'InventoryService','ngDialog','$scope', function($rootScope, InventoryService,ngDialog,$scope){
  this.results = InventoryService.results;

  $rootScope.$on('query:results', function(){
    this.results = InventoryService.results;
  }.bind(this));


                  InventoryService.getRooms(function(results){

			          $scope.rooms=results.result;
			       
			        });


  $scope.addRoom=function(){

      	ngDialog.openConfirm({
                    template: 'addroomstmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
                    preCloseCallback: function(value) {
                              if(confirm('Are you sure you want to close without saving your changes?')) {
                                  return true;
                              }
                              return false;
                          }
                }).then(function (value) {
                	
                        $scope.room=value;
                        $scope.room.status="Active";

                	InventoryService.addRoom($scope.room,function(results){
                		console.log(results);
                		  if (results.status=="success"){ var temp ='<p>Room Successfully Created</p>';
                           $scope.rooms.push($scope.room);
                		}
                		  else{ var temp ='<p>Error Saving Room</p>';}
                      
                           ngDialog.open({
		                            template: temp,
		                            plain: true
                                }); 

			             });
                	 
                	

                  }, function (reason) {
                    
                });
  }

}]);
