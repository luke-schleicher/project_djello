dj.controller('BoardsIndexCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user', 'boards',
    function($scope, $state, $stateParams, boardService, user, boards) {

      $scope.currentUser = user;
      $scope.boards = boards;

      $scope.createDefaultBoard = function() {
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('boards.show', { id: board.id });
        });
      };

      $scope.deleteBoard = function() {
        boardService.deleteBoard($scope.chosenBoard.id).then(function() {
          $state.go('boards.index');
        });
      };

      $scope.chooseBoard = function(id) {
        var boardId = parseInt(id);
        $state.go('boards.show', { id: boardId });
      };

    }
  ]
);
