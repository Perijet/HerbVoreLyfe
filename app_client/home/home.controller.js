(function () {

angular
    .module('herbVoreLyfeApp')
    .controller('homeCtrl', homeCtrl);

function homeCtrl($scope, herbVoreLyfeData, geolocation){
	var vm = this;
	vm.pageHeader = {
		title: 'HerbVoreLyfe',
		strapline: 'Find local vegan/vegetarian options at your location'
	};
	vm.sidebar = {
		content: "x"
	};
	vm.message = "Checking your location";
	vm.getData = function(position){
		var lat = position.coords.latitude,
			lng = position.coords.longitude;
		vm.message = "Searching for nearby places";
		herbVoreLyfeData.locationByCoords(lat, lng)
		.success(function(data){
			vm.message = data.length > 0? "" : "No locations found";
			vm.data = {locations: data};
			console.log(data);
		})
			.error(function(e){
				vm.message = "Sorry, something's gone wrong";
				console.log(e);
			});

	};
	vm.showError = function(error){
		$scope.$apply(function(){
			vm.message = error.message;
		});
			
		};
	vm.noGeo = function(){
		$scope.$apply(function(){
			vm.message = "Geolocation not supported by this browser.";
		});
	};
	geolocation.getPosition(vm.getData,vm.showError,vm.noGeo);
}

})();