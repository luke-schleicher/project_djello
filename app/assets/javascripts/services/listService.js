dj.factory('listService',
  ['Restangular', 'boardService',
    function(Restangular, boardService) {

      var _boards = boardService.getBoards();
      var _currentBoard = boardService.getCurrentBoard();

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
        addList: addList,
        deleteList: deleteList
      };
    }
  ]
);
