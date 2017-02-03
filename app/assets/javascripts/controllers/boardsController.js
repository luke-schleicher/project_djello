dj.controller('BoardsCtrl',
  [ '$scope', '$state', 'boardService', 'user',
    function($scope, $state, boardService, user) {

      $scope.currentUser = user;

      $scope.createDefaultBoard = function createDefaultBoard() {
        console.log('ran');
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('boards', { id: board.id });
        });
      };

    }
  ]
);
