(function () {

angular
	.module('herbVoreLyfeApp')
	.service('herbVoreLyfeData', herbVoreLyfeData);

herbVoreLyfeData.$inject = ['$http', 'authentication'];
function herbVoreLyfeData ($http, authentication) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=200000000000');
    };

    var locationById = function(locationid){
    	return $http.get('/api/locations/' + locationid);
    };

    var addReviewById = function(locationid, data){
      console.log('herbVoreLyfeData.services.js - addReviewById - data', data);
      console.log('herbVoreLyfeData.services.js - addReviewById - locationid', locationid);
      console.log(authentication.getToken());
      return $http.post('/api/locations/' + locationid + '/reviews', data, {
        headers: {
          Authorization: 'Bearer '+ authentication.getToken()
        }
      });
    };

    return {
      locationByCoords : locationByCoords,
      locationById: locationById,
      addReviewById: addReviewById
    };
  }

})();