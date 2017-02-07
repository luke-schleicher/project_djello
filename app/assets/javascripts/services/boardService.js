dj.factory('boardService',
  ['Restangular',
    function(Restangular) {

      var _boards = [];

      var all = function() {
        return Restangular.all('boards').getList().then(
          function(boards) {
            _boards = boards;
            return boards;
          }
        );
      };

      var getBoards = function() {
        return _boards;
      };

      var createBoard = function(boardFormData, user) {
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

      var getCurrentBoard = function(id) {
        return Restangular.one('boards', id).get().then(function(board){
          return board;          
        }, function(response) {
          console.log(response);
        });        
      };

      var deleteBoard = function(id) {
        return Restangular.one('boards', id).remove().then(function(board) {
          for (var i = 0; i < _boards.length; i++) {
            if (board.id === _boards[i].id) {
              _boards.splice(i, 1);
              break;
            }
          }
        });
      };

      var update = function(board) {
        return board.put().then(function(board) {
          for (var i = 0; i < _boards.length; i++) {
            if (board.id === _boards[i].id) {
              _boards[i].title = board.title;
              break;
            }
          }
          return board;
        })
      };


      return {
        all: all,
        getBoards: getBoards,
        create: createBoard,
        getCurrentBoard: getCurrentBoard,
        deleteBoard: deleteBoard,
        update: update
      };
    }
  ]
);
