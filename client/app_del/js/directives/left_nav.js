Booking.directive('leftNav', [function(){
  return {
    restrict    : 'A',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/left_nav.html',
    controller  : 'LeftNavController'
  };
}]);

