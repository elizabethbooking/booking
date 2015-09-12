Booking.controller('CustomerController', ['CustomerService', function(UsersService){
  this.customer = null;
  this.data = 'Booking Customer';
  var _self = this;

  CustomerService.data(function(data){
    _self.customer = data;
    console.log(data);
  });
}]);