Booking.factory('UsersService', ['$http', function($http){
  return {
    data : function(callback) {
      $http.get('/api/users')
        .success(function(data, status){
          callback(data);
        });
    },
    createUser:function(user,callback){
      user.company_id = 10001;
      $http.post('/admin/CreateUser',user)
       .success(function(data, status){
          this.results = "success";
          callback(data);
        }
        .bind(this));
    },
    getUsers : function(callback) {
     	var company_id = 10001;
      $http.get('/admin/users/'+ company_id)
        .success(function(data, status){
          callback(data);
        });
    },
    getUser : function(username,callback) {
      var company_id = 10001;
      $http.get('/admin/user/'+ username)
        .success(function(data, status){
          callback(data);
        });
    }
  };

}]);