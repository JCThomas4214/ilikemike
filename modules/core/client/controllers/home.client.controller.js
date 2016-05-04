'use strict';

angular.module('core').controller('HomeController', ['$scope', '$timeout', 'Authentication', 'PublicMissions', 'PublicAlbums', 'ngDialog',
  function ($scope, $timeout, Authentication, PublicMissions, PublicAlbums, ngDialog) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Start Page
    $scope.start = function () {
      $scope.find();

      $timeout(function () {
        ngDialog.open({
          template: '/modules/core/client/views/dialogFormat.html',
          className: 'welcome_dialog',
          closeByDocument: false
        });
      }, 1000);
    };

    // Find a list of Missions
    $scope.find = function () {
      $scope.missions = PublicMissions.query();
    };

    $scope.mmPhotoDialog = function () {
      ngDialog.open({
        template: '/modules/core/client/views/photoDialogFormat.html',
        className: 'photo_dialog',
        controller: ['$scope', 'PublicAlbums',
          function ($scope, PublicAlbums) {

            $scope.albums = PublicAlbums.query();

          }
        ]
        // controller: 'photoCtrl'
      });
    };

    $scope.mmQuotesDialog = function () {
      ngDialog.open({
        template: '/modules/core/client/views/quotesDialogFormat.html',
        className: 'quotes_dialog'
      });
    };

    $scope.solutionDialog = function (header, answerArr) {
      ngDialog.open({
        template: '/modules/core/client/views/solutionDialogFormat.html',
        className: 'solution_dialog',
        controller: ['$scope',
          function ($scope) {
            $scope.header = header;
            $scope.response = [];
            angular.copy(answerArr, $scope.response);


            // for (var i = 0; i < answerArr.length; i++) {
            //   $scope.response.push({
            //     text: answerArr[i].paragraph
            //   });
            // }

          }
        ]
      });
    };

    $scope.facebook_icon = 'https://dl.dropboxusercontent.com/s/wgi4t59djrt7fne/128-facebook.png?dl=0';
    $scope.linkedin_icon = 'https://dl.dropboxusercontent.com/s/1n8tl4qv852lwid/128-linkedin.png?dl=0';

    $scope.donation_button = 'https://dl.dropboxusercontent.com/s/pg0gc52hjwfjg21/donation.png?dl=0';
    $scope.donation_balloon = 'https://dl.dropboxusercontent.com/s/dli2iwzblyrrds9/donation_balloon.png?dl=0';
    $scope.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EDGY24BBSNVHY';

    $scope.mike_photo = 'https://dl.dropboxusercontent.com/s/k3x22n364mg7suh/mike_headshot2.jpg?dl=0';

    $scope.mike_email = 'MikeForFlaSenate@gmail.com';
    $scope.mike_phone = '(321) 258-4448';
    $scope.mike_fax = '1 (321) 248-0488';
    $scope.mike_decree = 'Paid by Mike Thomas, Republican, for State Senate';

    $scope.name = 'Mike Thomas';
    $scope.name_con = 'for';
    $scope.name_con2 = 'Florida Senate District 17';

    $scope.mike_slogen = '"I Like Mike"';
    $scope.mike_sub = 'Subscribe to Mike\'s News Letter';

    $scope.mike_about = 'Meet Mike';
    $scope.quote_one = '"People not Politics"';

    $scope.vid_header = '2015 DGF Goodwill Ambassador';

    $scope.timelines = [{
      header: 'Born August 25, 1957',
      image: 'https://dl.dropboxusercontent.com/s/o7mw0brchzll3tu/plymouth_bg.jpg?dl=0',
      position: 'center',
      topics: [{
        text: 'in Plymouth, Wisconsin'
      }]
    }, {
      header: 'Attended St. Lawrence Seminary',
      image: 'https://dl.dropboxusercontent.com/s/vhxkv5f54h0vbfq/Laurentianum.jpg?dl=0',
      position: 'center',
      topics: [{
        text: 'in Mount Calvary, Wisconsin'
      }]
    }, {
      header: 'United States NAVY Corpsman',
      image: 'https://dl.dropboxusercontent.com/s/v1sodcddmrtq2cp/navy.jpg?dl=0',
      topics: [{
        text: '1975-1979 (Active Duty)'
      }, {
        text: '1979-1983 (Reservist)'
      }]
    }, {
      header: 'University of Florida',
      image: 'https://dl.dropboxusercontent.com/s/hwpffuko2lwa06b/gator.jpg?dl=0',
      position: 'center',
      topics: [{
        text: '1984 Graduate (With Honors)'
      }, {
        text: 'Physician Assistant Program'
      }]
    }, {
      header: 'Joined Medical Practice in 1986',
      image: 'https://dl.dropboxusercontent.com/s/ka0i7sm2sjulnks/indian_river.jpg?dl=0',
      position: 'center',
      topics: [{
        text: 'in Melbourne, Florida'
      }]
    }, {
      header: 'Brevard Republican Party',
      image: 'https://dl.dropboxusercontent.com/s/e9rnjwv102qah21/republican_bg.jpg?dl=0',
      topics: [{
        text: 'Precinct Committeeman 2005 - 2008'
      }, {
        text: 'State Committeeman 2008 - Present'
      }]
    }];

    $scope.infos = [{
      text: '11th Year sitting on Brevard Republican Executive Committee'
    }, {
      text: '8th Year elected as Brevard Republican State Committeeman'
    }, {
      text: 'Co-Founder and President of Space Coast Clinicians, Inc.'
    }, {
      text: 'Member and past Board of Director of the FAPA'
    }, {
      text: 'Member of the AAPA'
    }, {
      text: 'Member of the Republican Mentors Club'
    }, {
      text: 'Associate Member of the Brevard Federated Republican Women\'s Club'
    }];


    $scope.mike_platform = 'Mike\'s Mission';

    $scope.mike_endors = 'Mike\'s Endorsements';

    $scope.endorsements = [{
      person: 'George Rego, President of Florida Academy Physician Assistants',
      text: '"The FAPA PAC proudly supports Mike Thomas for State Senate. We need Mike up in Tallahassee, he will serve all Floridians admirably."'
    }, {
      person: 'Rich Marino, Co-Founder of Space Coast Clinicians',
      text: '"I\'ve known Mike for over 30 years. He is honest and reliable. I heartily endorse Mike for Florida Senate. He will serve us all well."'
    }, {
      person: 'Joyce O\'Hara Brady, Nurse Practitioner',
      text: '"Honesty, Integrity, Compassion, and amazing Ethics are descriptors of the Mike Thomas I have known professionally for almost 20 years."'
    }];

    $scope.mike_volunteer = 'Get Involved';
    $scope.host_party_header = 'Host Party';
    $scope.party_list = [{
      info: 'It\'s easy to have a few friends over for a chat with Mike about issues that are important to you.'
    }, {
      info: 'Simply contact us to arrange a date and then bring a few (or more) people.'
    }, {
      info: 'These events are great for fundraising and getting volunteers.'
    }];

    $scope.volunteer_info_header = 'Volunteer';
    $scope.volunteer_list = [{
      info: 'There are many ways to volunteer.',
      list: [{
        note: 'Sign waving'
      }, {
        note: 'Addressing envelopes'
      }, {
        note: 'Getting petitions signed'
      }, {
        note: 'Walking your neighborhood with information cards'
      }, {
        note: 'Placing yard signs'
      }]
    }];

    $scope.donate_info_header = 'Donate';
    $scope.donate_list = [{
      info: 'Funding is the life blood of any successful campaign. Please consider donating to the cause.'
    }, {
      info: 'Make checks payable to \'Mike Thomas Campaign\' and mailed to PO BOX 410406 Melbourne, FL 32941'
    }, {
      info: 'For your convenience, please find a donation button, like below, that allows you to pay via PayPal.'
    }];

    $scope.volunteer_header = 'Sign Up for the Volunteer Newsletter';

    $scope.mike_social = 'Stay Connected';

  }
]);
