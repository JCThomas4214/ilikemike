'use strict';

angular.module('core').controller('DialogCtrl', ['$scope', '$window', 'ngDialog',
  function ($scope, $window, ngDialog) {

    $scope.closeDialog = function () {
      ngDialog.close('closed');
    };
    $scope.openPatitionReview = function () {
      $window.open('modules/core/client/img/Candidate_Petition.pdf', '_blank');
    };

    $scope.title = 'Welcome to the Mike Thomas Campaign!';
    $scope.title2 = 'We would love your support';

    $scope.photoDialogTitle = 'Photo Gallery';
    $scope.quotesDialogTitle = 'Mike\'s Favorite Quotes';

    $scope.donation_pop = 'Donate to the Campaign!';
    $scope.petition_pop = 'Sign a Petition for Mike!';

    $scope.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EDGY24BBSNVHY';

    $scope.quotes = [{
      text: '"It will be of little avail to the people that the laws are made by men of their own choice if the laws be so voluminous that they connot be read, or so incoherent that they cannot be understood."',
      author: '- James Madison'
    }, {
      text: '"A tax cut means higher family income and higher business profits and balanced federal budget. ... As national income grows, the federal government will ultimately end up with more revenues. Prosperity is the real way to balance our budget. By lowering tax rates, by increasing jobs and income, we can expand tax revenues and finally bring our budget into balance."',
      author: '- John F. Kennedy'
    }, {
      text: '"The greatest danger to American freedom is a government that ignores the Constitution."',
      author: '- Thomas Jefferson'
    }, {
      text: '"The means of defense against foreign danger historically have become the instruments of tyranny at home."',
      author: '- James Madison'
    }];

  }
]);