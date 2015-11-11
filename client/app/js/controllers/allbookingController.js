Booking.controller('allbookingController', ['$rootScope','$scope','ReservationService','ngDialog' ,function($rootScope,$scope,ReservationService,ngDialog){
            ReservationService.pendingReservations()
            .success(function (data){ 

            	console.log(data.result);
                  	$scope.pendingConfirmation=data.result;
			   })
		   .error(function(data) {
		   
            	$scope.pendingConfirmation=[];

		     });


	$scope.viewdetails =function(customer){
             $scope.cust=customer;
                ngDialog.openConfirm({
                    template: 'customertmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function (value) {

                	ReservationService.confirmReservation($scope.cust)
                	  .success(function (data){ 
			                    ngDialog.open({
		                            template: '<p>Reservation Updated</p>',
		                            plain: true
                                });  
                            $scope.pendingConfirmation.splice($scope.pendingConfirmation.indexOf($scope.cust),1);

						   })
					   .error(function(data) {
					   	      ngDialog.open({
	                            template: '<p>Error Updating Reservation </p>',
	                            plain: true
                                });

					     });
                    
                  }, function (reason) {
                    
                });
      };

   $scope.editdetails =function(customer){
              $scope.cust=customer;
                ngDialog.openConfirm({
                    template: 'editcustomertmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function (value) {

                	ReservationService.EditReservation($scope.cust)
                	  .success(function (data){ 
			                    ngDialog.open({
		                            template: '<p>Reservation Updated</p>',
		                            plain: true
                                });  
                            $scope.pendingConfirmation.splice($scope.pendingConfirmation.indexOf($scope.cust),1);
                            $scope.pendingConfirmation.push($scope.cust);
						   })
					   .error(function(data) {
					   	      ngDialog.open({
	                            template: '<p>Error Updating Reservation </p>',
	                            plain: true
                                });

					     });
                    
                  }, function (reason) {
                    
                });

   };


}]);
