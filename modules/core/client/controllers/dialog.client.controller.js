'use strict';

angular.module('core').controller('DialogCtrl', ['$scope', function($scope) {

  $scope.title = 'Welcome to the Campaign Website!';
  $scope.title2 = 'We would love your support';

  $scope.test = 'This is a test from the controller';

}]);