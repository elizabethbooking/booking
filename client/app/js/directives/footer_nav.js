Booking.directive('footerNav', [function(){
  return {
    restrict    : 'E',
    scope       : {},
    transclude  : true,
    templateUrl : '/templates/directives/footer.html',
    controller  : 'FooterController'
  };
}]);

