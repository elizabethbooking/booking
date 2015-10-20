Booking.directive('resNav', [function(){
  return {
    restrict    : 'E',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/res-nav.html',
    controller  : 'ResController'
  };
}]);

