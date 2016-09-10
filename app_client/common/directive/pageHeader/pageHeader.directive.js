(function () {

  angular
    .module('herbVoreLyfeApp')
    .directive('pageHeader', pageHeader);

  function pageHeader () {
    return {
      restrict: 'EA',
      scope: {
        content : '=content'
      },
      templateUrl: '/common/directive/pageHeader/pageHeader.template.html'
    };
  }

})();