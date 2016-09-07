(function () {

angular
	.module('herbVoreLyfeApp')
	.service('herbVoreLyfeData', herbVoreLyfeData);

herbVoreLyfeData.$inject = ['$http'];
function herbVoreLyfeData ($http) {
    var locationByCoords = function (lat, lng) {
      return $http.get('/api/locations?lng=' + lng + '&lat=' + lat + '&maxDistance=200000000000');
    };
    return {
      locationByCoords : locationByCoords
    };
  }

})();