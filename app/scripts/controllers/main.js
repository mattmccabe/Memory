'use strict';

angular.module('memoryApp')
  .controller('MainCtrl', function ($scope, BoardService) {
  	$scope.hasBoards = BoardService.getBoards().length > 0;

  });
