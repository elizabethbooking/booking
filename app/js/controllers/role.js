Booking.controller('RoleController', ['RoleService', function(RoleService){
  this.role = null;
  this.data = 'Booking User Role';
  var _self = this;

  RoleService.data(function(data){
    _self.role = data;
    console.log(data);
  });
}]);