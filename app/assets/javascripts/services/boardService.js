dj.factory('boardService',
  ['Restangular', 'userService',
    function(Restangular, userService) {

      var _currentUser = userService.getCurrentUser();

      var createBoard = function createBoard(boardFormData) {
        var newBoard = {
          board: {
            title: 'Add board title...',
            user_id: _currentUser.id
          }
        };

        Restangular.all('boards').post(newBoard);

        // $state.go('boards', id);
      };

      return {
        create: createBoard
      };
    }
  ]
);
