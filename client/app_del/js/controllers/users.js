Booking.controller('UsersController', ['UsersService', function(UsersService){
  this.users = null;
  this.data = 'Booking Users';
  var _self = this;

  UsersService.data(function(data){
    _self.users = data;
    console.log(data);
  });
}]);