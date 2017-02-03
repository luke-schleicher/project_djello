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
      controller: 'BoardsCtrl',
      templateUrl: 'templates/boards/index.html'
    })

    .state('boards.show', {
      url: 'boards/:id',
      controller: 'BoardsCtrl',
      templateUrl: 'templates/boards/show.html'
    });

}]);
