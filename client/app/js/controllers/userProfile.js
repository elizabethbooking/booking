Booking.controller('UserProfileController', ['UsersService','$scope','$rootScope' ,function(UsersService,$scope,$rootScope){


    UsersService.getUser(function(results){

    	console.log(results);
          $scope.userdetails=results.result;
    });

 }]);