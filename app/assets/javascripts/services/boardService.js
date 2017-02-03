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

        Restangular.all('boards').post(newBoard).then(function(board){
          _boards.push(board);
          return board;
        });

      };

      return {
        create: createBoard
      };
    }
  ]
);
