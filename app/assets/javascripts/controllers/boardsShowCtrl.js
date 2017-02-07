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
      };

      $scope.updateTitle = function() {
        var title = angular.element('#new-title').val();
        $scope.currentBoard.title = title
        boardService.update($scope.currentBoard).then(function(board) {
          $scope.currentBoard = board;
          $scope.editingTitle = false;
        })
      };

      $scope.addList = function() {
        console.log('running');
        boardService.addList().then(function(list) {
          if ($scope.currentBoard.lists) {
            $scope.currentBoard.lists.push(list);
          } else {
            $scope.currentBoard.lists = [list];
            console.log($scope.currentBoard)
          }
        });
      };

      $scope.deleteList = function(list) {
        boardService.deleteList(list).then(function(list) {
          for (var i = 0; i < $scope.currentBoard.lists.length; i++) {
            if ($scope.currentBoard.lists[i].id === list.id) {
              $scope.currentBoard.lists.splice(i, 1);
            }
          }
        });
      };

    }
  ]
);
