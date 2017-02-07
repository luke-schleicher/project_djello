dj.controller('CardsIndexCtrl', ['$scope', 'cardService', function($scope, cardService) {

  $scope.addCard = function(list) {
    cardService.add(list, $scope.currentBoard);
  };

  $scope.editCard = function(card) {
    console.log('card');
    angular.element('#card-modal-' + card.id).modal("show");
  };

  $scope.updateCard = function(card) {
    angular.element('#card-modal-' + card.id).modal("hide");
    angular.element('.modal-backdrop').remove();
  };

}]);