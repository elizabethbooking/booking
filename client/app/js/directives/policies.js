Booking.directive('policies', [function(){
  return {
    restrict    : 'E',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/policies.html',
    controller : 'PoliciesController'
  };
}]


);
