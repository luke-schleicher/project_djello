dj.controller('ListsIndexCtrl',
  [ '$scope', 'boardService', 'userService', 'listService',
    function($scope, boardService, userService, listService) {

      $scope.currentUser = userService.getCurrentUser();
      $scope.boards = boardService.getBoards();

      $scope.editingTitle = {};
      $scope.editingDesc = {};

      $scope.addList = function() {
        listService.addList($scope.currentBoard).then(function(list) {
          // if ($scope.currentBoard.lists) {
          //   $scope.currentBoard.lists.push(list);
          // } else {
          //   $scope.currentBoard.lists = [list];
          // }
        });
      };

      $scope.editListTitle = function(id) {
        $scope.editingTitle[id] = true;
        setTimeout(function(){
          document.getElementById('new-list-title-' + id).focus();
        }, 0);
      };

      $scope.updateTitle = function(list) {
        var title = angular.element('#new-list-title-' + list.id).val();
          if (title.length) {
            list.title = title;
            listService.update(list, $scope.currentBoard);
          }
        $scope.editingTitle = {};
      };

      $scope.editListDesc = function(id) {
        $scope.editingDesc[id] = true;
        setTimeout(function() {
          document.getElementById('new-list-desc-' + id).focus();
        }, 0);
      };

      $scope.updateListDesc = function(list) {
        var desc = angular.element('#new-list-desc-' + list.id).val();
        if (desc.length) {
          list.description = desc;
          listService.update(list, $scope.currentBoard);
        }
        $scope.editingDesc = {};
      };

      $scope.deleteList = function(list) {
        listService.deleteList(list, $scope.currentBoard).then(function(list) {
          for (var i = 0; i < $scope.currentBoard.lists.length; i++) {
            if ($scope.currentBoard.lists[i].id === list.id) {
              $scope.currentBoard.lists.splice(i, 1);
              break;
            }
          }
        });
      };      

    }
  ]
);
