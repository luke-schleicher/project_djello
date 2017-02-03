dj.controller('BoardsCtrl',
  ['boardService',
    function(boardService) {

      var createDefaultBoard = function createDefaultBoard() {
        console.log('ran');
        boardService.create($scope.board);
      };

    }
  ]
);
