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

  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('dashboard', {
      url: '/',
      views: {
        'nav': {
          templateUrl: 'templates/nav.html'
        },
        'boards-header': {
          templateUrl: 'templates/header.html',
          controller: 'BoardsCtrl'
        },
        'main': {
          templateUrl: 'templates/main.html'
        }
      }
    })
    .state('boards', {
      url: 'boards/:id',
      views: {
        'board@boards': {
          templateUrl: 'templates/boards/show.html'
        }
      }
    });

}]);
