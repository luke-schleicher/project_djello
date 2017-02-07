dj.factory('listService',
  ['Restangular', 'boardService',
    function(Restangular, boardService) {

      var _boards = boardService.getBoards();

      var addList = function(currentBoard) {

        var newList = {
          list: {
            title: 'Sample Title',
            description: 'Sample Description',
            board_id: currentBoard.id
          }
        };

        return Restangular.all('lists').post(newList).then(function(list) {

          if (currentBoard.lists) {
            currentBoard.lists.push(list);            
          } else {
            currentBoard.lists = [list];
          }

          return list;
        });
      };

      var deleteList = function(list, currentBoard) {
        return Restangular.one('lists', list.id).remove().then(function(response) {

          for (var i = 0; i < _boards.length; i++) {
            if (currentBoard.id === _boards[i].id) {
              if (_boards[i].lists) {
                for (var j = 0; j < _boards[i].lists.length; j++) {
                  if (list.id === _boards[i].lists[j].id) {
                    _boards[i].lists.splice(j, 1);
                    break;
                  }
                }
              }
            }
          }

          return list;
          
        });
      };

      var update = function(list, currentBoard) {

        return Restangular.one('lists').customPUT(list, list.id).then(function(list) {

          for (var i = 0; i < currentBoard.lists.length; i++) {
            if (currentBoard.lists[i].id === list.id) {
              currentBoard.lists[i].title = list.title;
              currentBoard.lists[i].description = list.description;
            }
          }

        }, function(response) {
          console.log(response);
        });
        
      };

      return {
        addList: addList,
        deleteList: deleteList,
        update: update
      };
    }
  ]
);
