'use strict';

angular.module('memoryApp')
  .controller('PlayCtrl', function ($scope, $routeParams, $window, BoardService) {
  	
  	var boardId = parseInt($routeParams.boardId);

    var CARD_DOWN = 'DOWN';
    var CARD_UP = 'UP';
    var CARD_MATCHED = 'MATCHED';

    var shuffle = function(o) {
        for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    var playBoard = BoardService.getBoardById(boardId);
    var cardCount = playBoard.images.length * 2;

    var docWidth = $window.innerWidth, docHeight = $window.innerHeight - 60;
    var cardCountSqRt = Math.sqrt(cardCount);
    var cardColCount, cardRowCount;
    var cardPadding = 10;
    var cardWidth, cardHeight;

    var calcCardWidth = function(cols, padding)
    {
        return (docWidth - (padding * (cols+1))) / cols;
    }

    var calcCardHeight = function(rows, padding)
    {
        return (docHeight - (padding * (rows+1))) / rows;   
    }

    var calcWidthHeightRatio = function(cols, numCards)
    {
        var rows  = Math.ceil(numCards / cols);

        return calcCardWidth(cols, cardPadding) / calcCardHeight(rows, cardPadding);
    }

    if(Math.floor(cardCountSqRt) == Math.ceil(cardCountSqRt))
    {
        cardColCount = Math.floor(cardCountSqRt);
        cardRowCount = Math.floor(cardCountSqRt);
    }
    else
    {
        if(calcWidthHeightRatio(Math.floor(cardCountSqRt), cardCount) > calcWidthHeightRatio(Math.ceil(cardCountSqRt), cardCount))
        {
            cardColCount = Math.floor(cardCountSqRt);
            cardRowCount = Math.ceil(cardCount / cardColCount)
        }
        else
        {
            cardColCount = Math.ceil(cardCountSqRt);
            cardRowCount = Math.ceil(cardCount / cardColCount)
        }
    }

    cardWidth = calcCardWidth(cardColCount, cardPadding);
    cardHeight = calcCardHeight(cardRowCount, cardPadding);
    


    var deck = [];

    playBoard.images.forEach(function(img)
    {
        var card1 = {url:img.url,state:'DOWN',faceUp:false,width:cardWidth.toString(),height:cardHeight.toString()};
        var card2 = angular.copy(card1);
        deck.push(card1);
        deck.push(card2);
    });

    $scope.deck = shuffle(deck);

    $scope.gameState = {count:playBoard.images.length, matchCount:0,guessCount:0,gameBegin:new Date()};

    $scope.cardImageUrl = '';

    $scope.flipCard = function(card)
    {
        if(($scope.gameState.firstGuess && $scope.gameState.secondGuess)
            || card.state == CARD_UP
            || card.state == CARD_MATCHED)
        {
            return;
        }

        card.state = CARD_UP;
        card.faceUp = true;
        if($scope.gameState.firstGuess)
        {
            var callback;
            $scope.gameState.secondGuess = card;
            if(card.url == $scope.gameState.firstGuess.url)
            {
                callback = resolveMatch;
            }
            else
            {
                callback = resolveMismatch;
            }

            setTimeout(callback,1000);
        }
        else
        {
            $scope.gameState.firstGuess = card;
        }
    }

    var clearGuesses = function()
    {
        delete $scope.gameState.firstGuess;
        delete $scope.gameState.secondGuess;
    }

	var resolveMatch = function()
	{
        $scope.gameState.firstGuess.state = CARD_MATCHED;
        $scope.gameState.secondGuess.state = CARD_MATCHED;

        $scope.guessCount++;
        $scope.gameState.matchCount++;

        clearGuesses();

        if($scope.gameState.count == $scope.gameState.matchCount)
        {
            alert('Game over!');
        }
	};
	
	var resolveMismatch = function()
	{
		$scope.gameState.firstGuess.state = CARD_DOWN;
        $scope.gameState.firstGuess.faceUp = false;
        $scope.gameState.secondGuess.state = CARD_DOWN;
        $scope.gameState.secondGuess.faceUp = false;

        $scope.guessCount++;

        clearGuesses();
	};

  });
