dj.factory('boardService',
  ['Restangular',
    function(Restangular) {

      var _boards = [];
      var _currentBoard;

      var all = function() {
        return Restangular.all('boards').getList().then(
          function(boards) {
            _boards = boards;
            return boards;
          }
        );
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

      var setCurrentBoard = function(id) {
        return Restangular.one('boards', id).get().then(function(board){
          _currentBoard = board;
          return board;          
        }, function(response) {
          console.log(response);
        });        
      };

      var getBoard = function(id) {
        return _currentBoard;
      };

      var deleteBoard = function(board) {
        return board.remove().then(function(board) {
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

          _currentBoard = board;

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
        create: createBoard,
        setCurrentBoard: setCurrentBoard,
        getBoard: getBoard,
        deleteBoard: deleteBoard,
        update: update
      };
    }
  ]
);
