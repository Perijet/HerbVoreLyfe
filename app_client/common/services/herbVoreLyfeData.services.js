(function () {

angular
	.module('herbVoreLyfeApp')
	.service('herbVoreLyfeData', herbVoreLyfeData);

herbVoreLyfeData.$inject = ['$http'];
function herbVoreLyfeData ($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=200000000000');
    };

    var locationById = function(locationid){
    	return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function(locationid, data){
      console.log('herbVoreLyfeData.services.js - addReviewById - data', data);
      console.log('herbVoreLyfeData.services.js - addReviewById - locationid', locationid);
      return $http.post('/api/locations/' + locationid + '/reviews', data);
    };

    return {
      locationByCoords : locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }

})();