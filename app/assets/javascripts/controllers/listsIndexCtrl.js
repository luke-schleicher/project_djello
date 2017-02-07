dj.controller('ListsIndexCtrl',
  [ '$scope', 'boardService', 'userService', 'listService',
    function($scope, boardService, userService, listService) {

      $scope.currentUser = userService.getCurrentUser();
      $scope.boards = boardService.getBoards();
      $scope.currentBoard = boardService.getCurrentBoard();

      $scope.addList = function() {
        console.log('running');
        listService.addList().then(function(list) {
          if ($scope.currentBoard.lists) {
            $scope.currentBoard.lists.push(list);
          } else {
            $scope.currentBoard.lists = [list];
            console.log($scope.currentBoard)
          }
        });
      };

      $scope.deleteList = function(list) {
        listService.deleteList(list).then(function(list) {
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
