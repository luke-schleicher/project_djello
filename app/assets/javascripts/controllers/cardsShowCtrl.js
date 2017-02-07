dj.controller('CardsShowCtrl', ['$scope', 'cardService', function($scope, cardService) {

  $scope.editingTitle = false;
  $scope.editingDesc = false;

  $scope.editCardTitle = function(id) {
    $scope.editingTitle = true;
    setTimeout(function(){
      document.getElementById('new-card-title-' + id).focus();
    }, 0);
  };

  $scope.updateCardTitle = function(card) {
    var title = angular.element('#new-card-title-' + card.id).val();
      if (title.length) {
        card.title = title;
        cardService.update(card, $scope.currentBoard);
      }
    $scope.editingTitle = false;
  };

  $scope.editCardDesc = function(id) {
    $scope.editingDesc = true;
    setTimeout(function() {
      document.getElementById('new-card-desc-' + id).focus();
    }, 0);
  };

  $scope.updateCardDesc = function(card) {
    var desc = angular.element('#new-card-desc-' + card.id).val();
    if (desc.length) {
      card.description = desc;
      cardService.update(card, $scope.currentBoard);
    }
    $scope.editingDesc = false;
  };

}]);