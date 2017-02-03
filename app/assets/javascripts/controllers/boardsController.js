dj.controller('BoardsCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user', 'boards',
    function($scope, $state, $stateParams, boardService, user, boards) {

      $scope.currentUser = user;
      $scope.currentBoard = boardService.getBoard($stateParams.id);
      $scope.boards = boards;

      $scope.createDefaultBoard = function createDefaultBoard() {
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('boards.show', { id: board.id });
        });
      };

      $scope.deleteBoard = function deleteBoard() {
        boardService.deleteBoard($scope.currentBoard).then( function() {
          $state.go('boards.index');
        });
      };
    }
  ]
);
