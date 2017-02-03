dj.factory('boardService',
  ['Restangular',
    function(Restangular) {

      var _boards = [];

      var all = function all() {
        return Restangular.all('boards').getList().then(
          function(boards) {
            _boards = boards;
            return _boards;
          }
        );
      };

      var createBoard = function createBoard(boardFormData, user) {
        var newBoard = {
          board: {
            title: 'Add board title...',
            user_id: user.id
          }
        };

        return Restangular.all('boards').post(newBoard).then(function(board){
          _boards.push(board);
          return board;
        });

      };

      var getBoard = function getBoard(id) {
        var board = Restangular.one('boards', id).get().$object;
        return board;
      };

      var deleteBoard = function deleteBoard(board) {
        return board.remove().then(function(board) {
          for (var i = 0; i < _boards.length; i++) {
            if (board.id === _boards[i].id) {
              _boards.splice(i, 1);
              break;
            }
          }
        });
      };

      return {
        create: createBoard,
        getBoard: getBoard,
        deleteBoard: deleteBoard
      };
    }
  ]
);
