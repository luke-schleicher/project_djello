dj.controller('BoardsCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user',
    function($scope, $state, $stateParams, boardService, user) {

      $scope.currentUser = user;
      
      $scope.createDefaultBoard = function createDefaultBoard() {
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('dashboard.boards', { id: board.id });
        });
      };

    }
  ]
);


// Use broadcast or emit
