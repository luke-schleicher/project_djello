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

      var addList = function() {

        var newList = {
          list: {
            title: 'Sample Title',
            description: 'Sample Description',
            board_id: _currentBoard.id
          }
        };

        return Restangular.all('lists').post(newList).then(function(list) {
          for (var i = 0; i < _boards.length; i++) {
            if (_currentBoard.id === _boards[i].id) {
              if (_boards[i].lists) {
                _boards[i].lists.push(list);
              } else {
                _boards[i].lists = [list];
              }
            }
          }
          return list;
        });
      };

      var deleteList = function(list) {

        return list.remove().then(function(response) {
        for (var i = 0; i < _boards.length; i++) {
          if (_currentBoard.id === _boards[i].id) {
            for (var j = 0; j < _boards[i].lists.length; j++) {
              if (list.id === _boards[i].lists[j].id) {
                _boards[i].lists.splice(j, 1);
                return list;
              }
            }
          }
        }
        })

      };

      return {
        all: all,
        create: createBoard,
        setCurrentBoard: setCurrentBoard,
        getBoard: getBoard,
        deleteBoard: deleteBoard,
        update: update,
        addList: addList,
        deleteList: deleteList
      };
    }
  ]
);
