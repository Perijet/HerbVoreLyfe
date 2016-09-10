(function () {

  angular
    .module('herbVoreLyfeApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$uibModalInstance', 'herbVoreLyfeData', 'locationData'];
  function reviewModalCtrl ($uibModalInstance, herbVoreLyfeData, locationData) {
    var vm = this;
    vm.locationData = locationData;

    vm.onSubmit = function () {
      console.log('reviewModal.controller.js - onSubmit', vm.formData);
      vm.formError = "";
      if (!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      }
    };

    vm.doAddReview = function (locationid, formData) {
      console.log('reviewModal.controller - doAddReview', formData);
      herbVoreLyfeData.addReviewById(locationid, {
        author : formData.name,
        rating : formData.rating,
        reviewText : formData.reviewText
      })
        .success(function (data) {
          console.log('reviewModal.controller - doAddReview - Success', data);
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Your review has not been saved, please try again";
        });
      return false;
    };

    vm.modal = {
      close : function (data) {
        $uibModalInstance.close(data);
        console.log('reviewModal.controller - close', data);
      },
      cancel : function () {
        $uibModalInstance.dismiss('cancel');
      }
    };

  }

})();