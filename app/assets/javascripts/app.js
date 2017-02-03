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

    .state('dashboard', {
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

    .state('dashboard.boards', {
      url: 'boards',
      views: {
        'boards-header': {
          templateUrl: 'templates/boards/header.html',
          controller: 'BoardsCtrl'
        },
        'board@dashboard': {
          template: '<div class="text-center text-muted">Create or select a board.</div<',
          controller: 'BoardsCtrl'
        }
      },
    })

    .state('dashboard.boards.show', {
      url: '/:id',
      views: {
        'boards-header@dashboard': {
          templateUrl: 'templates/boards/header.html',
          controller: 'BoardsCtrl'
        },
        'board@dashboard': {
          templateUrl: 'templates/boards/show.html',
          controller: 'BoardsCtrl'
        }
      },
    });

}]);
