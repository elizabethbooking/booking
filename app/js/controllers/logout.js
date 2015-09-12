Booking.controller('LogoutController', ['$location', 'LoginService', function($location, LoginService){
  LoginService.logout();
  $location.path('/login');
}]);


