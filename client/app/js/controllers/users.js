Booking.controller('UsersController', ['UsersService','$scope','ngDialog', function(UsersService,$scope,ngDialog){
  this.users = null;
  this.data = 'Booking Users';
  var _self = this;
/*
  UsersService.data(function(data){
    _self.users = data;
    console.log(data);
  });
*/
  UsersService.getUsers(function(data){
    $scope.users=data.result;
    console.log(data.result);
  });

  $scope.roles=[{"name":"user","id":1},
   {"name":"admin","id":2}
  ];

  $scope.adduser=function(){

                ngDialog.openConfirm({
                    template: 'usertmpl',
                    className: 'ngdialog-theme-default',
                    scope: $scope
                }).then(function (value) {
                	$scope.user=value;
                	console.log(value);
                         UsersService.createUser($scope.user,function(results){
                		
                		  if (results.sucess=="ok"){ var temp ='<p>User Successfully Created</p>';
                           $scope.users.push($scope.user);
                		}
                		  else{ var temp ='<p>Error Creating User </p>';}
                      
                           ngDialog.open({
		                            template: temp,
		                            plain: true
                                }); 

			             });

                	}


                	, function (reason) {
                    
                });

  }
}]);

 