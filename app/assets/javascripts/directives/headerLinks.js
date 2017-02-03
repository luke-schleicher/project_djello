dj.directive('headerLinks', function() {

  return {
    templateUrl: 'directives/boards/headerLinks.html',
    restrict: 'E',
    scope: {
      boards: '=',
      createDefaultBoard: '&'
    }
  };

});