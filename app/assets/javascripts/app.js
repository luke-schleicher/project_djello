var dj = angular.module('dj', ['ui.router', 'restangular', 'Devise']);

dj.factory('_', ['$window', function($window) {
  return $window._;
}]);

dj.config(["$httpProvider", "$stateProvider", "$urlRouterProvider", 'RestangularProvider', function($httpProvider, $stateProvider, $urlRouterProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setRequestSuffix('.json');
  RestangularProvider.setDefaultHttpFields({
    'content-type': 'application/json'
  });
}]);
