'use strict';

angular.module('memoryApp')
  .factory('BoardService', function () {
  	
    var boards = [
    	{name:'Iowa Fall 2013',id:1,images:[{url:''},{url:''},{url:''},{url:''},{url:''},{url:''},{url:''},{url:''},{url:''},{url:''}]},
    	{name:'ES Fall 2013',id:2},
    	{name:'Halloween 2012',id:3}
    ];

    var getById = function(boardId)
    {
    	var board = undefined;
    	for(var i=0;i<boards.length;i++)
    	{
    		if(boards[i].id==boardId)
    		{
    			board = boards[i];
    			break;
    		}
    	}
    	return board;
    };

    var getNewBoard = function()
    {

    	var newId = 0;
    	boards.forEach(function(b){
    		if(b.id > newId)
    		{
    			newId = b.id;
    		}
    	});
    	newId++;

    	return { name : 'New Board', id: newId};
    };

    var addPhoto = function (board, imgUrl)
    {
    	board.images = board.images || [];

        board.images.push({url:imgUrl});
    };

    return {
    	getBoards : function() { return boards;},
    	getBoardById : getById,
    	getNewBoard : getNewBoard,
        addPhoto : addPhoto

    }

  });
