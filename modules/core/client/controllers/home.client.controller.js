'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.mike_photo = 'modules/core/client/img/photos/mike_headshot_cropped_2.jpg';

    $scope.name = 'Mike Thomas';
    $scope.name_con = 'for';
    $scope.name_con2 = 'Florida Senate';
    $scope.mission_head = 'Are You In The District?';

  }
]);
