'use strict';

angular.module('core').controller('DialogCtrl', ['$scope', 'ngDialog', function($scope, ngDialog) {

  $scope.closeDialog = function() {
    ngDialog.close('closed');
  };
  $scope.openPatitionReview = function() {
    ngDialog.close('closed');
    ngDialog.open({
      template: 'This is a test',
      plain: true,
      className: 'ngdialog-theme-default',
      closeByDocument:false
    });
  };

  $scope.title = 'Welcome to the Mike Thomas Campaign!';
  $scope.title2 = 'We would love your support';

  $scope.test = 'This is a test from the controller';

}]);