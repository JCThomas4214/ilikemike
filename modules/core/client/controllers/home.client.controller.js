'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.section1_title = "Title";
    $scope.section1 = "This is section one of the website!";
  }
]);
