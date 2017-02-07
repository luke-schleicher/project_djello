dj.controller('CardsIndexCtrl', ['$scope', 'cardService', function($scope, cardService) {

  $scope.addCard = function(list) {
    cardService.add(list, $scope.currentBoard);
  };

}]);