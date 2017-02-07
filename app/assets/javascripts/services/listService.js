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
        return Restangular.one('lists', list.id).remove().then(function(response) {

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
          
        });
      };

      var update = function(list) {
        debugger;
        return list.put().then(function(list) {

          for (var i = 0; i < _currentBoard.lists.length; i++) {
            if (_currentBoard.lists[i].id === list.id) {
              _currentBoard.lists[i].title = list.title;
            }
          }

          for (var i = 0; i < _boards.length; i++) {
            if (_currentBoard.id === _boards[i].id) {
              for (var j = 0; j < _boards.lists.length; j++) {
                if (_boards[i].lists[j].id === list.id) {
                  _boards[i].lists[j].title = list.title;
                }
              }
            }
          }

        })
      };

      return {
        addList: addList,
        deleteList: deleteList,
        update: update
      };
    }
  ]
);
