'use strict';

angular.module('memoryApp')
  .controller('BoardsCtrl', function ($scope, $routeParams, BoardService) {
  	
  	var boardId = $routeParams.boardId || -1;


    $scope.boards = BoardService.getBoards();

    if(boardId > 0)
    {
    	$scope.selectedBoard = BoardService.getBoardById(boardId);
    }
    else if(boardId == 0)
    {
    	$scope.selectedBoard = BoardService.getNewBoard();
    }

    var _getCardImage = function(sourceType)
    {
		var options = {quality:50,destinationType:Camera.DestinationType.FILE_URI,sourceType:sourceType,targetWidth:80,targetHeight:80};
		navigator.camera.getPicture( onCameraSuccess, onCameraError, options);																																					
	};

    $scope.getNewImage = function()
    {
    	_getCardImage(Camera.PictureSourceType.CAMERA);
    };

    $scope.getLibraryImage = function ()
    {
    	_getCardImage(Camera.PictureSourceType.PHOTOLIBRARY);
    };

    $scope.getAlbumImage = function ()
    {
    	_getCardImage(Camera.PictureSourceType.SAVEDPHOTOALBUM);
    };

	var onCameraSuccess = function(imageURI)
	{
        BoardService.addPhoto($scope.selectedBoard, imageURI);
        console.log(imageURI);
		console.log("card created");
	};
	
	var onCameraError = function(e)
	{
		setTimeout(function(){alert("Failed because: " + e);},0);
	};

  });
