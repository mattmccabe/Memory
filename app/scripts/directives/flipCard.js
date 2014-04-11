'use strict';

angular.module('memoryApp')
  .directive('flipCard', function () {
    return {
      templateUrl: '/views/flipCard.html',
      restrict: 'E',
      scope: {
      	card : '='
      },
      link: function postLink(scope, element, attrs) 
      {
      		scope.$watch('card.state', function(){
      			if(scope.card.state == "UP")
      			{
      				var s = element.children(".flipper");
      				s.addClass('flip-container-over');
      			}
      			else
      			{
					     element.children(".flipper").removeClass('flip-container-over');	
      			}
      		})
      }
    };
  });
