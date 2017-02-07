dj.directive('cardModal', function() {

  return {
    templateUrl: 'directives/cards/cardModal.html',
    restrict: 'E',
    scope: {
      card: '=',
      updateCard: '&'
    }
  };

});