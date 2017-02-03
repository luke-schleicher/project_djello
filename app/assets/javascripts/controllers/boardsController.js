dj.controller('BoardsCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user',
    function($scope, $state, $stateParams, boardService, user) {

      $scope.currentUser = user;
      $scope.currentBoard = boardService.getBoard($stateParams.id);
      
      $scope.createDefaultBoard = function createDefaultBoard() {
        console.log('creating board');
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('boards.show', { id: board.id });
        });
      };

    }
  ]
);

