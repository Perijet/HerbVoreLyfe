(function () {

  angular
    .module('herbVoreLyfeApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  locationDetailCtrl.$inject = ['$routeParams', '$location', '$uibModal', 'herbVoreLyfeData', 'authentication'];
  function locationDetailCtrl ($routeParams, $location, $uibModal, herbVoreLyfeData, authentication) {
    var vm = this;
    vm.locationid = $routeParams.locationid;

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentPath = $location.path();

    herbVoreLyfeData.locationById(vm.locationid)
      .success(function(data) {
        console.log('locationDetailCtrl', data);
        vm.data = { location: data };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function (e) {
        console.log(e);
      });

    vm.popupReviewForm = function () {
      var uibModalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl as vm',
        resolve : {
          locationData : function () {
            return {
              locationid : vm.locationid,
              locationName : vm.data.location.name
            };
          }
        }
      });

      uibModalInstance.result.then(function (data) {
        vm.data.location.reviews.push(data);
        console.log('location details controller - vm.data.location.reviews.push(data) ', data);
      });
    };

  }

})();