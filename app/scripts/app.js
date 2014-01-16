'use strict';

angular.module('memoryApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/boards/', {
        templateUrl: 'views/boards.html',
        controller: 'BoardsCtrl'
      })
      .when('/boards/:boardId', {
        templateUrl: 'views/editBoard.html',
        controller: 'BoardsCtrl'
      })
      .when('/play/:boardId', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
