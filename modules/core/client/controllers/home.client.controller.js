'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.mike_photo = 'modules/core/client/img/photos/mike_headshot.jpg';

    $scope.mission_title = 'Mike Thomas for Florida Senate District 17';
    $scope.mission_head = 'Are You In The District?';
    $scope.mission_text = 'Newly redistricted District 17 lies Between state road 520 and the bottom of Indian River County.';
  }
]);
