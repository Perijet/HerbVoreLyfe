// angular.module('herbVoreLyfeApp', ['ngRoute', 'ngResource']);

// var _isNumeric = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

// var formatDistance = function () {
//   return function (distance) {
//     var numDistance, unit;
//     if (distance && _isNumeric(distance)) {
//       if (distance > 1) {
//         numDistance = parseFloat(distance).toFixed(1);
//         unit = 'km';
//       } else {
//         numDistance = parseInt(distance * 1000,10);
//         unit = 'm';
//       }
//       return numDistance + unit;
//     } else {
//       return "?";
//     }
//   };
// };

// var geolocation = function () {
//   var getPosition = function (cbSuccess, cbError, cbNoGeo) {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(cbSuccess, cbError);
//     }
//     else {
//       cbNoGeo();
//     }
//   };
//   return {
//     getPosition : getPosition
//   };
// };

var locationListCtrl = function ($scope, herbVoreLyfeData, geolocation){
	// $scope.message = "Checking your location";
	// $scope.getData = function(position){
	// 	var lat = position.coords.latitude,
	// 		lng = position.coords.longitude;
	// 	$scope.message = "Searching for nearby places";
	// 	herbVoreLyfeData.locationByCoords(lat, lng)
	// 	.success(function(data){
	// 		$scope.message = data.length > 0? "" : "No locations found";
	// 		$scope.data = {locations: data};
	// 		console.log(data);
	// 	})
	// 		.error(function(e){
	// 			$scope.message = "Sorry, something's gone wrong";
	// 			console.log(e);
	// 		});

	// };
	// $scope.showError = function(error){
	// 	$scope.$apply(function(){
	// 		$scope.message = error.message;
	// 	});
			
	// 	};
	// $scope.noGeo = function(){
	// 	$scope.$apply(function(){
	// 		$scope.message = "Geolocation not supported by this browser.";
	// 	});
	// };
	// geolocation.getPosition($scope.getData,$scope.showError,$scope.noGeo);
	
	
		// locations: [{
		// 	name: 'Green World',
		// 	address: '4000 Central Florida Blvd, Orlando, FL 32816',
		// 	rating: 3,
		// 	facilities: ['Food', 'Drinks', 'Wifi',],
		// 	distance: '0.29654',
		// 	_id:'5370a35f2536f6785f8dfb6a'
		// },
		// {
		// 	name: 'New Spot',
		// 	address: '110 Elmwood Street, Melbourne, FL 32924',
		// 	rating: 4,
		// 	facilities: ['Food', 'Drinks', 'Wifi',],
		// 	distance: '0.39654',
		// 	_id:'5370a35f2536f6785f8dfb6a'
		// },
		// {	name: 'Herb Garden',
		// 	address: '9400 Universal Blvd, Orlando, FL 32816',
		// 	rating: 2,
		// 	facilities: ['Food', 'Drinks', 'Wifi',],
		// 	distance: '0.49654',
		// 	_id:'5370a35f2536f6785f8dfb6a'
		// },
		// {	name: 'Foodie',
		// 	address: '223 E. Concord Street, Orlando, FL 32816',
		// 	rating: 5,
		// 	facilities: ['Food', 'Drinks', 'Wifi',],
		// 	distance: '0.59654',
		// 	_id:'5370a35f2536f6785f8dfb6a'
		// }]
	//};
//};

// var ratingStars = function(){
// 	return{
// 		scope:{
// 			thisRating: '=rating'
// 		},
// 		templateUrl: "/angular/rating-stars.html"
// 	};
// };

// var herbVoreLyfeData = function($http){
// 	var locationByCoords = function(lat, lng){
// 		return $http.get('api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=20');
// 	};
// 	return{
// 		locationByCoords: locationByCoords
// 	};
	

	// [{
	// 	name: 'Green World',
	// 		address: '4000 Central Florida Blvd, Orlando, FL 32816',
	// 		rating: 3,
	// 		facilities: ['Food', 'Drinks', 'Wifi',],
	// 		distance: '0.29654',
	// 		_id:'5370a35f2536f6785f8dfb6a'
	// 	},
	// 	{
	// 		name: 'New Spot',
	// 		address: '110 Elmwood Street, Melbourne, FL 32924',
	// 		rating: 4,
	// 		facilities: ['Food', 'Drinks', 'Wifi',],
	// 		distance: '0.39654',
	// 		_id:'5370a35f2536f6785f8dfb6a'
	// 	},
	// 	{	name: 'Herb Garden',
	// 		address: '9400 Universal Blvd, Orlando, FL 32816',
	// 		rating: 2,
	// 		facilities: ['Food', 'Drinks', 'Wifi',],
	// 		distance: '0.49654',
	// 		_id:'5370a35f2536f6785f8dfb6a'
	// 	},
	// 	{	name: 'Foodie',
	// 		address: '223 E. Concord Street, Orlando, FL 32816',
	// 		rating: 5,
	// 		facilities: ['Food', 'Drinks', 'Wifi',],
	// 		distance: '0.59654',
	// 		_id:'5370a35f2536f6785f8dfb6a'
	// 	}];
};

angular
	.module('herbVoreLyfeApp')
	.controller('locationListCtrl', locationListCtrl)
	.filter('formatDistance', formatDistance)
	.directive('ratingStars', ratingStars)
	.service('herbVoreLyfeData', herbVoreLyfeData)
	.service('geolocation', geolocation);