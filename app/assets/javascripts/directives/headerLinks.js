dj.directive('headerLinks', function() {

  return {
    templateUrl: 'directives/boards/headerLinks.html',
    restrict: 'E',
    scope: {
      boards: '=',
      currentBoard: '=',
      chosenBoard: '=',
      createDefaultBoard: '&',
      deleteBoard: '&',
      chooseBoard: '&'
    }
  };

});
