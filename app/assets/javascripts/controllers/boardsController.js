dj.controller('BoardsCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user',
    function($scope, $state, $stateParams, boardService, user) {

      $scope.currentUser = user;
      $scope.currentBoard = boardService.getBoard($stateParams.id);

      var func = function() {
        console.log('hey i ran');
      }
      func();
      
      $scope.createDefaultBoard = function createDefaultBoard() {
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('dashboard.boards.show', { id: board.id });
        });
      };

    }
  ]
);

