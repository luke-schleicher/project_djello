var dj = angular.module('dj', ['ui.router', 'restangular', 'Devise']);

dj.factory('_', ['$window', function($window) {
  return $window._;
}]);

dj.config(["$httpProvider", "$stateProvider", "$urlRouterProvider", 'RestangularProvider', function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    'content-type': 'application/json'
  })

  $urlRouterProvider.otherwise('/boards');

  $stateProvider

    .state('boards', {
      url: '/',
      views: {
        'nav': {
          templateUrl: 'templates/nav.html'
        },
        'main': {
          templateUrl: 'templates/main.html'
        }
      },
      resolve: {
        user: function(userService) {
          return userService.getCurrentUser();
        }
      }
    })

    .state('boards.index', {
      url: 'boards',
      controller: 'BoardsIndexCtrl',
      templateUrl: 'templates/boards/index.html',
      resolve: {
        boards: function(boardService) {
          return boardService.all();
        }
      }
    })

    .state('boards.show', {
      url: 'boards/:id',
      controller: 'BoardsShowCtrl',
      templateUrl: 'templates/boards/show.html',
      resolve: {
        boards: function(boardService) {
          return boardService.all();
        },
        currentBoard: function($stateParams, boards) {
          console.log('boards', boards);
          for (var i = 0; i < boards.length; i++) {
            if (boards[i].id === Number($stateParams.id)) {
              return boards[i];
            }
          }
        }
      }
    });

}]);
