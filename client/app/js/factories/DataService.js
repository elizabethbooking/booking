Booking.service('DataService', ['$http', function($http){

	  var data=[]


	   this.save=function(dt){
	     	data.push(dt);
	     	console.log("data Saved");
	     	console.log(data);

	   }
	   this.get=function(){
	   	return data;
	   }

     
}]);