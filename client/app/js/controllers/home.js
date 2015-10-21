Booking.controller('HomeController', ['CompanyService','ReservationService','$scope','ngDialog', function(CompanyService,ReservationService,$scope,ngDialog){
  this.company = null;
  this.data = 'Booking Home';
  var _self = this;

  CompanyService.data(function(data){
    _self.company = data;
    console.log(data);
  });

        ReservationService.pendingReservations()
            .success(function (data){ 
                  	$scope.pendingConfirmation=data.result;
			   })
		   .error(function(data) {
		   
            	$scope.pendingConfirmation=[];

		     });
    
       ReservationService.Todaycheckins()
            .success(function (data){ 
                 	$scope.Todaycheckins=data.result;
			   })
		   .error(function(data) {
            	$scope.Todaycheckins=[];

		     });


      ReservationService.Todaycheckouts()
            .success(function (data){ 
                 	$scope.Todaycheckouts=data.result;
			   })
		   .error(function(data) {
            	$scope.Todaycheckouts=[];

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
      }       


		 $scope.checkin =function(customer){
             $scope.client=customer;
                ngDialog.openConfirm({
                    template: 'checkinmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function (value) {

                	ReservationService.confirmCheckin($scope.client)
                	  .success(function (data){ 
			                    ngDialog.open({
		                            template: '<p>Client Reservation Updated to Checked in </p>',
		                            plain: true
                                });  
                            $scope.Todaycheckins.splice($scope.Todaycheckins.indexOf($scope.client),1);

						   })
					   .error(function(data) {
					   	      ngDialog.open({
	                            template: '<p>Error Updating Client Reservation Status</p>',
	                            plain: true
                                });

					     });
                    
                  }, function (reason) {
                    
                });
      }       






}]);
