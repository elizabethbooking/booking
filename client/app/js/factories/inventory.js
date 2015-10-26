Booking.factory('InventoryService', ['$http', function($http){
  var company_id = 10001;
  return {
    results: [],

    data: function(callback) {
      $http.get('/api/inventory')
        .success(function(data, status){
          callback(data);
        });
    },
    query: function(query, callback) {
      $http.post('/api/availability/'+company_id, query)
        .success(function(data, status){
          this.results = data;
          callback(data);
        }.bind(this));
    },
    addRoom:function(room,callback){
      room.company_id = 10001;
      $http.post('/admin/room',room)
       .success(function(data, status){
          this.results = "success";
          callback(data);
        }
        .bind(this));
    },
    getRooms:function(callback){
        
      $http.get('/admin/rooms/'+company_id)  
       .success(function(data, status){
          this.results = data;
          callback(data);
        }.bind(this));
    }
  };
}]);
