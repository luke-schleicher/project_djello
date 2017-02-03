dj.factory('boardService',
  ['Restangular',
    function(Restangular) {

      var _boards = [];

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

      return {
        create: createBoard,
        getBoard: getBoard
      };
    }
  ]
);
