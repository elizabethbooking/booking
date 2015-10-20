Booking.directive('topNav', [function(){
  return {
    restrict    : 'E',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/header.html',
    controller  : 'HeaderController'
  };
}]);

