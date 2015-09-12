Booking.controller('HomeController', ['CompanyService', function(CompanyService){
  this.company = null;
  this.data = 'Booking Home';
  var _self = this;

  CompanyService.data(function(data){
    _self.company = data;
    console.log(data);
  });
}]);
