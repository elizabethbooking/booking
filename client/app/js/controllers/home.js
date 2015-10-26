Booking.controller('HomeController', ['CompanyService','ReservationService','$scope','ngDialog','InventoryService', function(CompanyService,ReservationService,$scope,ngDialog,InventoryService){
  this.company = null;
  this.data = 'Booking Home';
  var _self = this;

  CompanyService.data(function(data){
    _self.company = data;
          $scope.query = {
			        adults: 1,
			        childs: 0,
			        check_in: new moment().toDate(),
			        check_out: new moment().add(3, 'days').toDate()
			      };

			   
			        InventoryService.query($scope.query, function(results){
			          $scope.availability=results;
			       
			        });
                 


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

          ReservationService.GuestCheckedin()
            .success(function (data){ 
                 	$scope.GuestCheckedin=data.result;
			   })
		   .error(function(data) {
            	$scope.GuestCheckedin=[];

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


       $scope.checkout =function(cusm){
             $scope.checkout=cusm;
                ngDialog.openConfirm({
                    template: 'checkoutmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function (value) {

                	ReservationService.confirmCheckout($scope.checkout)
                	  .success(function (data){ 
			                    ngDialog.open({
		                            template: '<p>Client Reservation Updated to Checked-OUT </p>',
		                            plain: true
                                });  
                            $scope.Todaycheckouts.splice($scope.Todaycheckouts.indexOf($scope.checkout),1);

						   })
					   .error(function(data) {
					   	      ngDialog.open({
	                            template: '<p>Error Updating Client Reservation Status</p>',
	                            plain: true
                                });

					     });
                    
                  }, function (reason) {
                    
                });
      }  ;     
   

   




}]);
