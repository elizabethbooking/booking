Booking.controller('UserProfileController', ['UsersService','$scope','$rootScope' ,function(UsersService,$scope,$rootScope){


    UsersService.getUser($rootScope.username,function(results){
          $scope.userdetails=results.result;
    });

 }]);