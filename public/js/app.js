var Booking;Booking=angular.module("Booking",["ngCookies","ui.router","angularUtils.directives.dirPagination"]),Booking.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/home"),e.state("home",{url:"/home",templateUrl:"/templates/views/index.html",controller:"HomeController"}).state("booking",{url:"/booking/:querry",templateUrl:"/templates/booking.html"}).state("reserve",{url:"/reserve/:roomdetails",templateUrl:"/templates/views/reserve.html",controller:"ReserveController"}).state("payment",{url:"/payment",templateUrl:"/templates/views/payment.html",controller:"paymentController"}).state("Confirmation",{url:"/Confirmation",templateUrl:"/templates/views/paymentConfirmation.html"}).state("guestinfo",{url:"/guestinfo",templateUrl:"/templates/views/profile.html",controller:"guestController"})}]);
Booking.factory("CompanyService",["$http",function(n){return{data:function(t){n.get("/api/company").success(function(n,c){t(n)})}}}]);
Booking.factory("CustomerService",["$http",function(t){return{data:function(c){t.get("/api/customer").success(function(t,n){c(t)})}}}]);
Booking.service("DataService",["$http",function(o){var t=[];this.save=function(o){t.push(o),console.log("data Saved"),console.log(t)},this.get=function(){return t}}]);
Booking.factory("InventoryService",["$http",function(t){var n=10001;return{results:[],data:function(n){t.get("/api/inventory").success(function(t,i){n(t)})},query:function(i,s){t.post("/api/availability/"+n,i).success(function(t,n){this.results=t,s(t)}.bind(this))}}}]);
Booking.factory("LoginService",["$http","$cookies","$rootScope",function(o,n,e){return{auth:function(e,r){o.post("/api/login",e).success(function(o,e){n.put("user",JSON.stringify(o)),r(o,e)}).error(function(){console.log("error")})},user:function(){var o=null;return n.get("user")&&(e.loggedIn=o=JSON.parse(n.get("user"))),o},logout:function(){e.loggedIn=null,n.remove("user")}}}]);
Booking.factory("PoliciesService",["$http",function(i){return{data:function(c){i.get("/api/policies").success(function(i,t){c(i)})}}}]);
Booking.factory("ReservationService",["$http",function(r){var t={};return t.data=function(){return r.get("/api/reservation")},t.query=function(t){return r.get("/api/reservation")},t.create=function(t){return r.post("/api/reservation",t)},t}]);
Booking.factory("RoleService",["$http",function(t){return{data:function(n){t.get("/api/role").success(function(t,o){n(t)})}}}]);
Booking.factory("UsersService",["$http",function(t){return{data:function(n){t.get("/api/users").success(function(t,c){n(t)})}}}]);
Booking.directive("availability",["$rootScope","dateFilter",function(e,o){return{restrict:"E",templateUrl:"/templates/directives/availability.html",controller:["$scope","$location","ReservationService","$stateParams","DataService",function(e,o,r,t,s){e.selectedrooms=[],e.number=-1,e.querry=angular.fromJson(atob(t.querry)),console.log("test"),console.log(e.querry),e.selectroom=function(o,r){var t={};t.id=o,t.room=r,r.selected=!0,e.selectedrooms.push(t),e.number=o,console.log(e.selectedrooms)},e.removeroom=function(o){for(i in e.selectedrooms)e.selectedrooms[i].id==o&&e.selectedrooms.splice(i,1)},e.book=function(){var r={};r.selectedrooms=e.selectedrooms,r.querry=e.querry;var t=btoa(angular.toJson(r));s.save(r),o.path("/reserve/"+t)},e.submit=function(){r.query(e.query).success(function(e){}).error(function(e){alert("Errror "+e.message)})}}]}}]);
Booking.directive("footerNav",[function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"/templates/directives/footer.html",controller:"FooterController"}}]);
Booking.directive("home",[function(){return{restrict:"E",templateUrl:"/templates/home.html"}}]);
Booking.directive("inventory",[function(){return{restrict:"E",templateUrl:"/templates/inventory.html"}}]);
Booking.directive("leftNav",[function(){return{restrict:"A",scope:{},transclude:!0,templateUrl:"/templates/directives/left_nav.html",controller:"LeftNavController"}}]);
Booking.directive("login",[function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"/templates/directives/login.html",controller:"LoginController"}}]);
Booking.directive("policies",[function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"/templates/directives/policies.html",controller:"PoliciesController"}}]);
Booking.directive("query",["$rootScope","dateFilter","$location",function(t,e,o){return{restrict:"E",templateUrl:"/templates/directives/query.html",controller:["$scope","InventoryService",function(e,r){e.max_adults=[1,2,3],e.max_childs=[0,1,2,3],e.query={adults:1,childs:0,check_in:(new moment).toDate(),check_out:(new moment).add(3,"days").toDate()},e.submit=function(){r.query(e.query,function(e){t.$broadcast("query:results")});var n=btoa(angular.toJson(e.query));o.path("/booking/"+n)}}]}}]);
Booking.directive("resNav",[function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"/templates/directives/res-nav.html",controller:"ResController"}}]);
Booking.directive("topNav",[function(){return{restrict:"E",scope:{},transclude:!0,templateUrl:"/templates/directives/header.html",controller:"HeaderController"}}]);
Booking.directive("users",[function(){return{restrict:"E",templateUrl:"/templates/users.html"}}]);
Booking.directive("user_profile",[function(){return{restrict:"E",templateUrl:"/templates/user_profile.html"}}]);
Booking.controller("CustomerController",["CustomerService",function(o){this.customer=null,this.data="Booking Customer";var t=this;CustomerService.data(function(o){t.customer=o,console.log(o)})}]);
Booking.controller("FooterController",["$scope",function(o){}]);
Booking.controller("guestController",["DataService","$state","$scope",function(o,t,e){e.formData={},e.payment=function(){var a={};a.id="guestinfo",a.customerProfile=e.formData,o.save(a),t.go("payment")}}]);
Booking.controller("HeaderController",["$scope",function(o){}]);
Booking.controller("HomeController",["CompanyService",function(o){this.company=null,this.data="Booking Home";var n=this;o.data(function(o){n.company=o,console.log(o)})}]);
Booking.controller("InventoryController",["$rootScope","InventoryService",function(t,o){this.results=o.results,t.$on("query:results",function(){this.results=o.results}.bind(this))}]);
Booking.controller("LeftNavController",["$scope",function(o){}]);
Booking.controller("LoginController",["$rootScope","$scope","$location","LoginService",function(o,n,t,i){n.submit=function(){i.auth(n.user,function(n,i){200===i&&(o.loggedIn=n,t.path("/"))})}}]);
Booking.controller("LogoutController",["$location","LoginService",function(o,n){n.logout(),o.path("/login")}]);
Booking.controller("paymentController",["DataService","$state","$scope",function(o,t,a){a.formData={},a.gotoConfirm=function(){var n={};n.id="paymentinfo",n.paymentDetails=a.formData,o.save(n),t.go("Confirmation")}}]);
Booking.controller("PoliciesController",["$rootScope","$scope","$location",function(o,i,c){i.policies=function(o){return policies.show=!0}}]);
Booking.controller("ResController",["$scope",function(o){}]);
Booking.controller("ReservationController",["ReservationService",function(o){this.reservation=null,this.data="Booking Rerservation";var e=this;RoleService.data(function(o){e.reservation=o,console.log(o)})}]);
Booking.controller("ReserveController",["$scope","$stateParams","$state","ReservationService","DataService",function(o,r,a,e,t){o.formData={},o.formData.roomDetails=angular.fromJson(atob(r.roomdetails)),console.log(o.formData.roomDetails),o.summary={},o.summary.noRooms=o.formData.roomDetails.selectedrooms.length,o.summary.noGuest=o.formData.roomDetails.querry.adults,o.summary.startdate=o.formData.roomDetails.querry.check_in,o.summary.enddate=o.formData.roomDetails.querry.check_out,o.totalprice=function(){for(var r=0,a=0;a<o.summary.noRooms;a++)r+=o.formData.roomDetails.selectedrooms[a].room.base_price;return r},o.summary.tPrice=o.totalprice(),o.processForm=function(){e.create(o.formData).success(function(r){alert("data saved Reservation ID 9889"),o.formData=""}).error(function(o){alert("Errror "+o.message)})},o.proceed=function(){var r={};r.roomdetails=o.formData,r.summary=o.summary,t.save(r),a.go("guestinfo")}}]);
Booking.controller("ReservePaymentController",["ReservationService",function(e){}]);
Booking.controller("bookingController",["ReservationService",function(o){}]);
Booking.controller("RoleController",["RoleService",function(o){this.role=null,this.data="Booking User Role";var l=this;o.data(function(o){l.role=o,console.log(o)})}]);
Booking.controller("UsersController",["UsersService",function(s){this.users=null,this.data="Booking Users";var o=this;s.data(function(s){o.users=s,console.log(s)})}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbXBhbnkuanMiLCJjdXN0b21lci5qcyIsIkRhdGFTZXJ2aWNlLmpzIiwiaW52ZW50b3J5LmpzIiwibG9naW4uanMiLCJwb2xpY2llcy5qcyIsInJlc2VydmF0aW9uLmpzIiwicm9sZS5qcyIsInVzZXJzLmpzIiwiYXZhaWxhYmlsaXR5LmpzIiwiZm9vdGVyX25hdi5qcyIsImhvbWUuanMiLCJsZWZ0X25hdi5qcyIsInF1ZXJ5LmpzIiwicmV6X25hdi5qcyIsInRvcF9uYXYuanMiLCJ1c2VyX3Byb2ZpbGUuanMiLCJmb290ZXIuanMiLCJndWVzdENvbnRyb2xsZXIuanMiLCJoZWFkZXIuanMiLCJsb2dvdXQuanMiLCJwYXltZW50Q29udHJvbGxlci5qcyIsInJlcy1oZWFkZXIuanMiLCJSZXNlcnZlQ29udHJvbGxlci5qcyIsIlJlc2VydmVQYXltZW50Q29udHJvbGxlci5qcyIsIlJlc2VydmVQcm9maWxlQ29udHJvbGxlci5qcyJdLCJuYW1lcyI6WyJCb29raW5nIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJmYWN0b3J5IiwiJGh0dHAiLCJkYXRhIiwiY2FsbGJhY2siLCJnZXQiLCJzdWNjZXNzIiwic3RhdHVzIiwic2VydmljZSIsInRoaXMiLCJzYXZlIiwiZHQiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImNvbXBhbnlfaWQiLCJyZXN1bHRzIiwicXVlcnkiLCJwb3N0IiwiYmluZCIsIiRjb29raWVzIiwiJHJvb3RTY29wZSIsImF1dGgiLCJjcmVkZW50aWFscyIsInB1dCIsIkpTT04iLCJzdHJpbmdpZnkiLCJlcnJvciIsInVzZXIiLCJsb2dnZWRJbiIsInBhcnNlIiwibG9nb3V0IiwicmVtb3ZlIiwicmVzZXJ2YXRpb24iLCJxdWVycnkiLCJjcmVhdGUiLCJkaXJlY3RpdmUiLCJkYXRlRmlsdGVyIiwicmVzdHJpY3QiLCIkc2NvcGUiLCIkbG9jYXRpb24iLCJSZXNlcnZhdGlvblNlcnZpY2UiLCIkc3RhdGVQYXJhbXMiLCJEYXRhU2VydmljZSIsInNlbGVjdGVkcm9vbXMiLCJudW1iZXIiLCJmcm9tSnNvbiIsImF0b2IiLCJzZWxlY3Ryb29tIiwiaW5kZXgiLCJyb29tIiwicm0iLCJpZCIsInNlbGVjdGVkIiwicmVtb3Zlcm9vbSIsImkiLCJzcGxpY2UiLCJib29rIiwiayIsImRldCIsImJ0b2EiLCJ0b0pzb24iLCJwYXRoIiwic3VibWl0IiwiYWxlcnQiLCJtZXNzYWdlIiwic2NvcGUiLCJ0cmFuc2NsdWRlIiwiSW52ZW50b3J5U2VydmljZSIsIm1heF9hZHVsdHMiLCJtYXhfY2hpbGRzIiwiYWR1bHRzIiwiY2hpbGRzIiwiY2hlY2tfaW4iLCJtb21lbnQiLCJ0b0RhdGUiLCJjaGVja19vdXQiLCJhZGQiLCIkYnJvYWRjYXN0IiwiVXNlcnNTZXJ2aWNlIiwiY3VzdG9tZXIiLCJfc2VsZiIsIkN1c3RvbWVyU2VydmljZSIsIiRzdGF0ZSIsImZvcm1EYXRhIiwicGF5bWVudCIsImN1c3RvbWVyUHJvZmlsZSIsImdvIiwiQ29tcGFueVNlcnZpY2UiLCJjb21wYW55IiwiJG9uIiwiTG9naW5TZXJ2aWNlIiwiZ290b0NvbmZpcm0iLCJwYXltZW50RGV0YWlscyIsInBvbGljaWVzIiwic2hvdyIsIlJvbGVTZXJ2aWNlIiwicm9vbURldGFpbHMiLCJyb29tZGV0YWlscyIsInN1bW1hcnkiLCJub1Jvb21zIiwibGVuZ3RoIiwibm9HdWVzdCIsInN0YXJ0ZGF0ZSIsImVuZGRhdGUiLCJ0b3RhbHByaWNlIiwidHByaWNlIiwiYmFzZV9wcmljZSIsInRQcmljZSIsInByb2Nlc3NGb3JtIiwicHJvY2VlZCIsInJvbGUiLCJ1c2VycyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBSUEsUUFFSkEsU0FBVUMsUUFBUUMsT0FBTyxXQUFZLFlBQVksWUFBWSwwQ0FFN0RGLFFBQVFHLFFB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QUFPSSxHQUFHO0FDckRyQmpHLFFBQVFVLFdBQVcsNEJBQTZCLHFCQUFzQixTQUFTeUM7QUNBL0VuRCxRQUFRVSxXQUFXLHFCQUFzQixxQkFBc0IsU0FBU3lDO0FsQkF4RW5ELFFBQVFVLFdBQVcsa0JBQW1CLGNBQWUsU0FBU2dHLEdBQzVEdkYsS0FBS3NHLEtBQU8sS0FDWnRHLEtBQUtOLEtBQU8sbUJBQ1osSUFBSThFLEdBQVF4RSxJQUVadUYsR0FBWTdGLEtBQUssU0FBU0EsR0FDeEI4RSxFQUFNOEIsS0FBTzVHLEVBQ2JVLFFBQVFDLElBQUlYO0FDUGhCYixRQUFRVSxXQUFXLG1CQUFvQixlQUFnQixTQUFTK0UsR0FDOUR0RSxLQUFLdUcsTUFBUSxLQUNidkcsS0FBS04sS0FBTyxlQUNaLElBQUk4RSxHQUFReEUsSUFFWnNFLEdBQWE1RSxLQUFLLFNBQVNBLEdBQ3pCOEUsRUFBTStCLE1BQVE3RyxFQUNkVSxRQUFRQyxJQUFJWCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQm9va2luZztcblxuQm9va2luZyA9IGFuZ3VsYXIubW9kdWxlKCdCb29raW5nJywgWyduZ0Nvb2tpZXMnLCd1aS5yb3V0ZXInLCdhbmd1bGFyVXRpbHMuZGlyZWN0aXZlcy5kaXJQYWdpbmF0aW9uJ10pO1xuXG5Cb29raW5nLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuIFxuJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2hvbWUnKTtcbiBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL3ZpZXdzL2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgIC5zdGF0ZSgnYm9va2luZycsIHtcbiAgICAgICAgICAgdXJsOiAnL2Jvb2tpbmcvOnF1ZXJyeScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvYm9va2luZy5odG1sJ1xuICAgICAgICB9KVxuICAgICAgIFxuICAgICAgICAuc3RhdGUoJ3Jlc2VydmUnLCB7XG4gICAgICAgICAgIHVybDogJy9yZXNlcnZlLzpyb29tZGV0YWlscycsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy90ZW1wbGF0ZXMvdmlld3MvcmVzZXJ2ZS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZXNlcnZlQ29udHJvbGxlcidcbiAgICAgICAgfSkgXG4gICAgICAgIC5zdGF0ZSgncGF5bWVudCcsIHtcbiAgICAgICAgICAgIHVybDogJy9wYXltZW50JyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy92aWV3cy9wYXltZW50Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ3BheW1lbnRDb250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ0NvbmZpcm1hdGlvbicsIHtcbiAgICAgICAgICAgIHVybDogJy9Db25maXJtYXRpb24nLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvdGVtcGxhdGVzL3ZpZXdzL3BheW1lbnRDb25maXJtYXRpb24uaHRtbCdcbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdndWVzdGluZm8nLCB7XG4gICAgICAgICAgICB1cmw6ICcvZ3Vlc3RpbmZvJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3RlbXBsYXRlcy92aWV3cy9wcm9maWxlLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2d1ZXN0Q29udHJvbGxlcidcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBcblxuICAgICAgICBcbiAgICAgICBcblxuXG59XSk7XG5cbiIsIkJvb2tpbmcuZmFjdG9yeSgnQ29tcGFueVNlcnZpY2UnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApe1xuICByZXR1cm4ge1xuICAgIGRhdGEgOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgJGh0dHAuZ2V0KCcvYXBpL2NvbXBhbnknKVxuICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhLCBzdGF0dXMpe1xuICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH07XG5cbn1dKTtcbiIsIkJvb2tpbmcuY29udHJvbGxlcignQ3VzdG9tZXJDb250cm9sbGVyJywgWydDdXN0b21lclNlcnZpY2UnLCBmdW5jdGlvbihVc2Vyc1NlcnZpY2Upe1xuICB0aGlzLmN1c3RvbWVyID0gbnVsbDtcbiAgdGhpcy5kYXRhID0gJ0Jvb2tpbmcgQ3VzdG9tZXInO1xuICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gIEN1c3RvbWVyU2VydmljZS5kYXRhKGZ1bmN0aW9uKGRhdGEpe1xuICAgIF9zZWxmLmN1c3RvbWVyID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSk7XG59XSk7IiwiQm9va2luZy5zZXJ2aWNlKCdEYXRhU2VydmljZScsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCl7XHJcblxyXG5cdCAgdmFyIGRhdGE9W11cclxuXHJcblxyXG5cdCAgIHRoaXMuc2F2ZT1mdW5jdGlvbihkdCl7XHJcblx0ICAgICBcdGRhdGEucHVzaChkdCk7XHJcblx0ICAgICBcdGNvbnNvbGUubG9nKFwiZGF0YSBTYXZlZFwiKTtcclxuXHQgICAgIFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblxyXG5cdCAgIH1cclxuXHQgICB0aGlzLmdldD1mdW5jdGlvbigpe1xyXG5cdCAgIFx0cmV0dXJuIGRhdGE7XHJcblx0ICAgfVxyXG5cclxuICAgICBcclxufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignSW52ZW50b3J5Q29udHJvbGxlcicsIFsnJHJvb3RTY29wZScsICdJbnZlbnRvcnlTZXJ2aWNlJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgSW52ZW50b3J5U2VydmljZSl7XG4gIHRoaXMucmVzdWx0cyA9IEludmVudG9yeVNlcnZpY2UucmVzdWx0cztcblxuICAkcm9vdFNjb3BlLiRvbigncXVlcnk6cmVzdWx0cycsIGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5yZXN1bHRzID0gSW52ZW50b3J5U2VydmljZS5yZXN1bHRzO1xuICB9LmJpbmQodGhpcykpO1xuXG5cblxufV0pO1xuIiwiQm9va2luZy5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBbJyRyb290U2NvcGUnLCAnJHNjb3BlJywgJyRsb2NhdGlvbicsICdMb2dpblNlcnZpY2UnLFxuICBmdW5jdGlvbigkcm9vdFNjb3BlLCAkc2NvcGUsICRsb2NhdGlvbiwgTG9naW5TZXJ2aWNlKXtcbiAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICAgIExvZ2luU2VydmljZS5hdXRoKCRzY29wZS51c2VyLCBmdW5jdGlvbihkYXRhLCBzdGF0dXMpe1xuICAgICAgICBpZiAoc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAkcm9vdFNjb3BlLmxvZ2dlZEluID0gZGF0YTtcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLycpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gIH1dXG4pO1xuXG4iLCJCb29raW5nLmNvbnRyb2xsZXIoJ1BvbGljaWVzQ29udHJvbGxlcicsIFsnJHJvb3RTY29wZScsICckc2NvcGUnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgJHNjb3BlLCAkbG9jYXRpb24pe1xuICAgICRzY29wZS5wb2xpY2llcyA9IGZ1bmN0aW9uKHNob3cpIHtcbiAgICAgIHJldHVybiBwb2xpY2llcy5zaG93ID0gdHJ1ZTsgIFxuICAgIH07XG4gIH1cbl0pO1xuXG4iLCJCb29raW5nLmNvbnRyb2xsZXIoJ1Jlc2VydmF0aW9uQ29udHJvbGxlcicsIFsnUmVzZXJ2YXRpb25TZXJ2aWNlJywgZnVuY3Rpb24oUmVzZXJ2YXRpb25TZXJ2aWNlKXtcbiAgdGhpcy5yZXNlcnZhdGlvbiA9IG51bGw7XG4gIHRoaXMuZGF0YSA9ICdCb29raW5nIFJlcnNlcnZhdGlvbic7XG4gIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgUm9sZVNlcnZpY2UuZGF0YShmdW5jdGlvbihkYXRhKXtcbiAgICBfc2VsZi5yZXNlcnZhdGlvbiA9IGRhdGE7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0pO1xufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignUm9sZUNvbnRyb2xsZXInLCBbJ1JvbGVTZXJ2aWNlJywgZnVuY3Rpb24oUm9sZVNlcnZpY2Upe1xuICB0aGlzLnJvbGUgPSBudWxsO1xuICB0aGlzLmRhdGEgPSAnQm9va2luZyBVc2VyIFJvbGUnO1xuICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gIFJvbGVTZXJ2aWNlLmRhdGEoZnVuY3Rpb24oZGF0YSl7XG4gICAgX3NlbGYucm9sZSA9IGRhdGE7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0pO1xufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignVXNlcnNDb250cm9sbGVyJywgWydVc2Vyc1NlcnZpY2UnLCBmdW5jdGlvbihVc2Vyc1NlcnZpY2Upe1xuICB0aGlzLnVzZXJzID0gbnVsbDtcbiAgdGhpcy5kYXRhID0gJ0Jvb2tpbmcgVXNlcnMnO1xuICB2YXIgX3NlbGYgPSB0aGlzO1xuXG4gIFVzZXJzU2VydmljZS5kYXRhKGZ1bmN0aW9uKGRhdGEpe1xuICAgIF9zZWxmLnVzZXJzID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSk7XG59XSk7IiwiQm9va2luZy5kaXJlY3RpdmUoJ2F2YWlsYWJpbGl0eScsIFsnJHJvb3RTY29wZScsICdkYXRlRmlsdGVyJywgZnVuY3Rpb24oJHJvb3RTY29wZSwgZGF0ZUZpbHRlcil7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3QgICAgOiAnRScsXG4gICAgdGVtcGxhdGVVcmwgOiAnL3RlbXBsYXRlcy9kaXJlY3RpdmVzL2F2YWlsYWJpbGl0eS5odG1sJyxcbiAgICBjb250cm9sbGVyICA6IFsnJHNjb3BlJywnJGxvY2F0aW9uJywnUmVzZXJ2YXRpb25TZXJ2aWNlJywnJHN0YXRlUGFyYW1zJywnRGF0YVNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsJGxvY2F0aW9uLFJlc2VydmF0aW9uU2VydmljZSwkc3RhdGVQYXJhbXMsRGF0YVNlcnZpY2Upe1xuICAgICAgXG4gICAgICAkc2NvcGUuc2VsZWN0ZWRyb29tcz1bXTtcbiAgICAgICRzY29wZS5udW1iZXI9LTE7XG4gICRzY29wZS5xdWVycnk9IGFuZ3VsYXIuZnJvbUpzb24oYXRvYigkc3RhdGVQYXJhbXMucXVlcnJ5KSlcbiAgICAgXG4gICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUucXVlcnJ5KTtcblxuJHNjb3BlLnNlbGVjdHJvb209ZnVuY3Rpb24oaW5kZXgscm9vbSl7XG4gICB2YXIgcm09e307XG4gICAgcm0uaWQ9aW5kZXg7XG4gICAgcm0ucm9vbT1yb29tO1xuICAgIHJvb20uc2VsZWN0ZWQ9dHJ1ZTtcbiAgICAkc2NvcGUuc2VsZWN0ZWRyb29tcy5wdXNoKHJtKTtcbiAgICAkc2NvcGUubnVtYmVyPWluZGV4O1xuICAgIGNvbnNvbGUubG9nKCRzY29wZS5zZWxlY3RlZHJvb21zKVxufTtcbiRzY29wZS5yZW1vdmVyb29tPWZ1bmN0aW9uKGluZGV4KXtcblxuICAgZm9yIChpIGluICRzY29wZS5zZWxlY3RlZHJvb21zKSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLnNlbGVjdGVkcm9vbXNbaV0uaWQgPT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc2VsZWN0ZWRyb29tcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbn07XG5cbiRzY29wZS5ib29rPWZ1bmN0aW9uKCl7XG4gIHZhciBrPXt9O1xuICAgICBrLnNlbGVjdGVkcm9vbXM9JHNjb3BlLnNlbGVjdGVkcm9vbXM7XG4gICAgIGsucXVlcnJ5PSRzY29wZS5xdWVycnk7XG4gICB2YXIgZGV0PWJ0b2EoYW5ndWxhci50b0pzb24oaykpO1xuICAgRGF0YVNlcnZpY2Uuc2F2ZShrKTtcbiAgJGxvY2F0aW9uLnBhdGgoJy9yZXNlcnZlLycrZGV0KTtcbiAgXG59O1xuXG4gICAgICAkc2NvcGUuc3VibWl0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgIFJlc2VydmF0aW9uU2VydmljZS5xdWVyeSgkc2NvcGUucXVlcnkpXG4gICAgICAgICAgICAgIC5zdWNjZXNzKGZ1bmN0aW9uIChkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJyb3IgXCIrZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTsgIFxuICAgICAgICBcbiAgICAgIH07XG4gICAgfV1cbiAgfTtcbn1dKTsiLCJCb29raW5nLmRpcmVjdGl2ZSgnZm9vdGVyTmF2JywgW2Z1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3QgICAgOiAnRScsXG4gICAgc2NvcGUgICAgICAgOiB7fSxcbiAgICB0cmFuc2NsdWRlICA6IHRydWUsXG4gICAgdGVtcGxhdGVVcmwgOiAnL3RlbXBsYXRlcy9kaXJlY3RpdmVzL2Zvb3Rlci5odG1sJyxcbiAgICBjb250cm9sbGVyICA6ICdGb290ZXJDb250cm9sbGVyJ1xuICB9O1xufV0pO1xuXG4iLCJCb29raW5nLmNvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJywgWydDb21wYW55U2VydmljZScsIGZ1bmN0aW9uKENvbXBhbnlTZXJ2aWNlKXtcbiAgdGhpcy5jb21wYW55ID0gbnVsbDtcbiAgdGhpcy5kYXRhID0gJ0Jvb2tpbmcgSG9tZSc7XG4gIHZhciBfc2VsZiA9IHRoaXM7XG5cbiAgQ29tcGFueVNlcnZpY2UuZGF0YShmdW5jdGlvbihkYXRhKXtcbiAgICBfc2VsZi5jb21wYW55ID0gZGF0YTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSk7XG5cblxuXG59XSk7XG4iLCJCb29raW5nLmNvbnRyb2xsZXIoJ0xlZnROYXZDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpe1xufV0pO1xuXG4iLCJCb29raW5nLmRpcmVjdGl2ZSgncXVlcnknLCBbJyRyb290U2NvcGUnLCAnZGF0ZUZpbHRlcicsJyRsb2NhdGlvbicgLGZ1bmN0aW9uKCRyb290U2NvcGUsIGRhdGVGaWx0ZXIsJGxvY2F0aW9uKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdCAgICA6ICdFJyxcbiAgICB0ZW1wbGF0ZVVybCA6ICcvdGVtcGxhdGVzL2RpcmVjdGl2ZXMvcXVlcnkuaHRtbCcsXG4gICAgY29udHJvbGxlciAgOiBbJyRzY29wZScsICdJbnZlbnRvcnlTZXJ2aWNlJywgZnVuY3Rpb24oJHNjb3BlLCBJbnZlbnRvcnlTZXJ2aWNlKXtcbiAgICAgICRzY29wZS5tYXhfYWR1bHRzID0gWzEsMiwzXTtcbiAgICAgICRzY29wZS5tYXhfY2hpbGRzID0gWzAsMSwyLDNdO1xuICAgICAgJHNjb3BlLnF1ZXJ5ID0ge1xuICAgICAgICBhZHVsdHM6IDEsXG4gICAgICAgIGNoaWxkczogMCxcbiAgICAgICAgY2hlY2tfaW46IG5ldyBtb21lbnQoKS50b0RhdGUoKSxcbiAgICAgICAgY2hlY2tfb3V0OiBuZXcgbW9tZW50KCkuYWRkKDMsICdkYXlzJykudG9EYXRlKClcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS5zdWJtaXQgPSBmdW5jdGlvbigpe1xuICAgICAgICBJbnZlbnRvcnlTZXJ2aWNlLnF1ZXJ5KCRzY29wZS5xdWVyeSwgZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdxdWVyeTpyZXN1bHRzJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAgICAgIHZhciBkZXQ9YnRvYShhbmd1bGFyLnRvSnNvbigkc2NvcGUucXVlcnkpKTtcbiAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Jvb2tpbmcvJytkZXQpO1xuICAgICAgfVxuICAgIH1dXG4gIH07XG59XSk7XG5cbiIsIkJvb2tpbmcuZGlyZWN0aXZlKCdyZXNOYXYnLCBbZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdCAgICA6ICdFJyxcbiAgICBzY29wZSAgICAgICA6IHt9LFxuICAgIHRyYW5zY2x1ZGUgIDogdHJ1ZSxcbiAgICB0ZW1wbGF0ZVVybCA6ICcvdGVtcGxhdGVzL2RpcmVjdGl2ZXMvcmVzLW5hdi5odG1sJyxcbiAgICBjb250cm9sbGVyICA6ICdSZXNDb250cm9sbGVyJ1xuICB9O1xufV0pO1xuXG4iLCJCb29raW5nLmRpcmVjdGl2ZSgndG9wTmF2JywgW2Z1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3QgICAgOiAnRScsXG4gICAgc2NvcGUgICAgICAgOiB7fSxcbiAgICB0cmFuc2NsdWRlICA6IHRydWUsXG4gICAgdGVtcGxhdGVVcmwgOiAnL3RlbXBsYXRlcy9kaXJlY3RpdmVzL2hlYWRlci5odG1sJyxcbiAgICBjb250cm9sbGVyICA6ICdIZWFkZXJDb250cm9sbGVyJ1xuICB9O1xufV0pO1xuXG4iLCJCb29raW5nLmRpcmVjdGl2ZSgndXNlcl9wcm9maWxlJywgW2Z1bmN0aW9uKCl7XG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3QgICAgOiAnRScsXG4gICAgdGVtcGxhdGVVcmwgOiAnL3RlbXBsYXRlcy91c2VyX3Byb2ZpbGUuaHRtbCdcbiAgfTtcbn1dKTtcbiIsIkJvb2tpbmcuY29udHJvbGxlcignRm9vdGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbn1dKTtcblxuIiwiQm9va2luZy5jb250cm9sbGVyKCdndWVzdENvbnRyb2xsZXInLCBbJ0RhdGFTZXJ2aWNlJywnJHN0YXRlJywnJHNjb3BlJywgZnVuY3Rpb24oRGF0YVNlcnZpY2UsJHN0YXRlLCRzY29wZSl7XHJcbiAgICRzY29wZS5mb3JtRGF0YT17fTtcclxuXHJcblxyXG4gICAkc2NvcGUucGF5bWVudD1mdW5jdGlvbigpe1xyXG5cclxuXHQgICBcdCB2YXIgZGF0YT17fTtcclxuXHQgICBcdCBkYXRhLmlkPSdndWVzdGluZm8nO1xyXG5cdCAgIFx0IGRhdGEuY3VzdG9tZXJQcm9maWxlPSRzY29wZS5mb3JtRGF0YTtcclxuXHQgICBcdERhdGFTZXJ2aWNlLnNhdmUoZGF0YSk7XHJcblx0ICAgXHQkc3RhdGUuZ28oJ3BheW1lbnQnKTtcclxuICAgfTtcclxuXHJcbn1dKTsiLCJCb29raW5nLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG59XSk7XG5cbiIsIkJvb2tpbmcuY29udHJvbGxlcignTG9nb3V0Q29udHJvbGxlcicsIFsnJGxvY2F0aW9uJywgJ0xvZ2luU2VydmljZScsIGZ1bmN0aW9uKCRsb2NhdGlvbiwgTG9naW5TZXJ2aWNlKXtcbiAgTG9naW5TZXJ2aWNlLmxvZ291dCgpO1xuICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJyk7XG59XSk7XG5cblxuIiwiQm9va2luZy5jb250cm9sbGVyKCdwYXltZW50Q29udHJvbGxlcicsIFsnRGF0YVNlcnZpY2UnLCckc3RhdGUnLCckc2NvcGUnLCBmdW5jdGlvbihEYXRhU2VydmljZSwkc3RhdGUsJHNjb3BlKXtcclxuICAgJHNjb3BlLmZvcm1EYXRhPXt9O1xyXG5cclxuXHJcbiAgICRzY29wZS5nb3RvQ29uZmlybT1mdW5jdGlvbigpe1xyXG5cdCAgIFx0IHZhciBkYXRhPXt9O1xyXG5cdCAgIFx0IGRhdGEuaWQ9J3BheW1lbnRpbmZvJztcclxuXHQgICBcdCBkYXRhLnBheW1lbnREZXRhaWxzPSRzY29wZS5mb3JtRGF0YTtcclxuXHQgICBcdERhdGFTZXJ2aWNlLnNhdmUoZGF0YSk7XHJcblx0ICAgXHQkc3RhdGUuZ28oJ0NvbmZpcm1hdGlvbicpO1xyXG4gICB9O1xyXG5cclxufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignUmVzQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKXtcbn1dKTtcblxuIiwiQm9va2luZy5jb250cm9sbGVyKCdSZXNlcnZlQ29udHJvbGxlcicsIFsnJHNjb3BlJywnJHN0YXRlUGFyYW1zJywnJHN0YXRlJywnUmVzZXJ2YXRpb25TZXJ2aWNlJywgJ0RhdGFTZXJ2aWNlJyxmdW5jdGlvbigkc2NvcGUsJHN0YXRlUGFyYW1zLCRzdGF0ZSxSZXNlcnZhdGlvblNlcnZpY2UsRGF0YVNlcnZpY2Upe1xyXG5cclxuXHJcblx0XHJcbiAgJHNjb3BlLmZvcm1EYXRhID0ge307XHJcbiAkc2NvcGUuZm9ybURhdGEucm9vbURldGFpbHM9YW5ndWxhci5mcm9tSnNvbihhdG9iKCRzdGF0ZVBhcmFtcy5yb29tZGV0YWlscykpO1xyXG4gIGNvbnNvbGUubG9nKCRzY29wZS5mb3JtRGF0YS5yb29tRGV0YWlscyk7XHJcblxyXG4gICRzY29wZS5zdW1tYXJ5PXt9O1xyXG4gICRzY29wZS5zdW1tYXJ5Lm5vUm9vbXM9JHNjb3BlLmZvcm1EYXRhLnJvb21EZXRhaWxzLnNlbGVjdGVkcm9vbXMubGVuZ3RoO1xyXG4gICRzY29wZS5zdW1tYXJ5Lm5vR3Vlc3Q9ICRzY29wZS5mb3JtRGF0YS5yb29tRGV0YWlscy5xdWVycnkuYWR1bHRzOyBcclxuICAkc2NvcGUuc3VtbWFyeS5zdGFydGRhdGU9JHNjb3BlLmZvcm1EYXRhLnJvb21EZXRhaWxzLnF1ZXJyeS5jaGVja19pbjtcclxuICAkc2NvcGUuc3VtbWFyeS5lbmRkYXRlPSRzY29wZS5mb3JtRGF0YS5yb29tRGV0YWlscy5xdWVycnkuY2hlY2tfb3V0O1xyXG5cclxuICAkc2NvcGUudG90YWxwcmljZT1mdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciB0cHJpY2U9MDtcclxuICAgICAgICBcclxuXHJcbiAgICAgICBmb3IgKHZhciBpPTAgIDtpPCRzY29wZS5zdW1tYXJ5Lm5vUm9vbXM7aSsrKXtcclxuXHJcbiAgICAgICAgICAgdHByaWNlPXRwcmljZSskc2NvcGUuZm9ybURhdGEucm9vbURldGFpbHMuc2VsZWN0ZWRyb29tc1tpXS5yb29tLmJhc2VfcHJpY2U7XHJcbiAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRwcmljZTtcclxuICAgICAgfTtcclxuXHJcblxyXG5cclxuJHNjb3BlLnN1bW1hcnkudFByaWNlPSAkc2NvcGUudG90YWxwcmljZSgpOyBcclxuXHJcbiAgICBcclxuICAgIC8vIGZ1bmN0aW9uIHRvIHByb2Nlc3MgdGhlIGZvcm1cclxuICAgICRzY29wZS5wcm9jZXNzRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgLy8gYWxlcnQoJ2F3ZXNvbWUhJyk7XHJcblxyXG4gICAgICAgICAgUmVzZXJ2YXRpb25TZXJ2aWNlLmNyZWF0ZSgkc2NvcGUuZm9ybURhdGEpXHJcbiAgICAgICAgICAgICAgLnN1Y2Nlc3MoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiZGF0YSBzYXZlZCBSZXNlcnZhdGlvbiBJRCA5ODg5XCIpO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZvcm1EYXRhPVwiXCI7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJyb3IgXCIrZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0pOyAgXHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuICAgICRzY29wZS5wcm9jZWVkPWZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBkYXRhPXt9O1xyXG4gICAgICAgIGRhdGEucm9vbWRldGFpbHM9JHNjb3BlLmZvcm1EYXRhO1xyXG4gICAgICAgIGRhdGEuc3VtbWFyeT0kc2NvcGUuc3VtbWFyeTtcclxuICAgICAgICAgRGF0YVNlcnZpY2Uuc2F2ZShkYXRhKTtcclxuICAgICAgICAgICAkc3RhdGUuZ28oJ2d1ZXN0aW5mbycpO1xyXG4gICAgfTtcclxuXHJcbiAgICBcclxufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignUmVzZXJ2ZVBheW1lbnRDb250cm9sbGVyJywgWydSZXNlcnZhdGlvblNlcnZpY2UnLCBmdW5jdGlvbihSZXNlcnZhdGlvblNlcnZpY2Upe1xyXG5cclxufV0pOyIsIkJvb2tpbmcuY29udHJvbGxlcignYm9va2luZ0NvbnRyb2xsZXInLCBbJ1Jlc2VydmF0aW9uU2VydmljZScsIGZ1bmN0aW9uKFJlc2VydmF0aW9uU2VydmljZSl7XHJcblxyXG59XSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9