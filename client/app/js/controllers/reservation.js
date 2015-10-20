Booking.controller('ReservationController', ['ReservationService', function(ReservationService){
  this.reservation = null;
  this.data = 'Booking Rerservation';
  var _self = this;

  RoleService.data(function(data){
    _self.reservation = data;
    console.log(data);
  });
}]);