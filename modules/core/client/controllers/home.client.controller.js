'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.section1_title = 'Title';
    $scope.section1 = 'This is section one of the website!';

    $scope.backgroundOne = '/modules/core/client/img/backgrounds/florida-state-capital.jpg';

    $scope.showMore = function() {
      console.log('show more triggered');  
    };

  }
]);
