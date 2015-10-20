Booking.directive('login', [function(){
  return {
    restrict    : 'E',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/login.html',
    controller  : 'LoginController'
  };
}]);
