'use strict';

describe('Controller: BoardeditCtrl', function () {

  // load the controller's module
  beforeEach(module('memoryAppApp'));

  var BoardeditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BoardeditCtrl = $controller('BoardeditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
