'use strict';

angular.module('core').controller('DialogCtrl', ['$scope', '$window', 'ngDialog', function($scope, $window, ngDialog) {

  $scope.closeDialog = function() {
    ngDialog.close('closed');
  };
  $scope.openPatitionReview = function() {
    $window.open('modules/core/client/img/Candidate_Petition.pdf', '_blank');
  };

  $scope.title = 'Welcome to the Mike Thomas Campaign!';
  $scope.title2 = 'We would love your support';

  $scope.photoDialogTitle = 'Photo Gallery';

  $scope.donation_pop = 'Donate to the Campaign!';
  $scope.petition_pop = 'Sign a Petition for Mike!';

  $scope.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EDGY24BBSNVHY';

  angular.element(document.getElementById('test_go')).css('color', 'none');

}]);