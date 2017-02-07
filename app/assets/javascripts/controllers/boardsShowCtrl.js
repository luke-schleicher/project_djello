dj.controller('BoardsShowCtrl',
  [ '$scope', '$state', '$stateParams', 'boardService', 'user', 'boards', 'currentBoard',
    function($scope, $state, $stateParams, boardService, user, boards, currentBoard) {

      $scope.currentUser = user;
      $scope.boards = boards;
      $scope.currentBoard = currentBoard;
      $scope.chosenBoard = { id: String(currentBoard.id) };
      $scope.editingTitle = false;

      $scope.createDefaultBoard = function() {
        boardService.create($scope.board, $scope.currentUser).then(function(board) {
          $state.go('boards.show', { id: board.id });
        });
      };

      $scope.deleteBoard = function() {
        boardService.deleteBoard($scope.currentBoard).then(function() {
          $state.go('boards.index');
        });
      };

      $scope.chooseBoard = function(id) {
        var boardId = parseInt(id);
        boardService.setCurrentBoard(boardId).then(function(board) {
          $state.go('boards.show', { id: board.id });
        });
      };

      $scope.editTitle = function() {
        $scope.editingTitle = true;
        setTimeout(function(){
          document.getElementById('new-title').focus();      
        }, 0);
      };

      $scope.updateTitle = function() {
        var title = angular.element('#new-title').val();
        if (title.length) {
          $scope.currentBoard.title = title;
          boardService.update($scope.currentBoard).then(function(board) {
            $scope.currentBoard = board;
          });
        }
        $scope.editingTitle = false;
      };


    }
  ]
);
