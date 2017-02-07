dj.factory('cardService', ['Restangular', 'boardService', function(Restangular, boardService) {


  var _boards = boardService.getBoards();


  var all = function(list) {
    return Restangular.all('cards').customGETLIST('', {
      list_id: list.id
    }).then(function(cards) {
      return cards;
    })
  };


  var add = function(list, currentBoard) {

    var card = {
      card: {
        title: 'Sample title',
        description: 'Sample description',
        list_id: list.id
      }
    }

    return Restangular.all('cards').post(card).then(function(card) {

      if (list.cards) {
        list.cards.push(card);        
      } else {
        list.cards = [card];
      }

      return card;

    }, function(response) {
      console.log(response);
    });

  };


  var update = function(card, currentBoard) {

    return Restangular.one('cards').customPUT(card, card.id).then(function(card) {

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
    all: all,
    add: add,
    update: update
  };

}]);