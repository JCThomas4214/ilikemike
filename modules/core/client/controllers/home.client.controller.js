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

    $scope.facebook_icon = 'modules/core/client/img/icons/128-facebook.png';
    $scope.linkedin_icon = 'modules/core/client/img/icons/128-linkedin.png';

    $scope.donation_button = 'modules/core/client/img/icons/donation.png';
    $scope.donation_balloon = 'modules/core/client/img/backgrounds/donation_balloon.png';
    $scope.donate = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=EDGY24BBSNVHY';

    $scope.mike_photo = 'modules/core/client/img/photos/mike_headshot2.jpg';

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
      image: '/modules/core/client/img/backgrounds/small_ver/plymouth_bg.jpg',
      position: 'center',
      topics: [{
        text: 'in Plymouth, Wisconsin'
      }]
    }, {
      header: 'Attended St. Lawrence Seminary',
      image: '/modules/core/client/img/backgrounds/small_ver/Laurentianum.jpg',
      position: 'center',
      topics: [{
        text: 'in Mount Calvary, Wisconsin'
      }]
    }, {
      header: 'United States NAVY Corpsman',
      image: '/modules/core/client/img/backgrounds/small_ver/navy.jpg',
      topics: [{
        text: '1975-1979 (Active Duty)'
      }, {
        text: '1979-1983 (Reservist)'
      }]
    }, {
      header: 'University of Florida',
      image: '/modules/core/client/img/backgrounds/small_ver/gator.jpg',
      position: 'center',
      topics: [{
        text: '1984 Graduate (With Honors)'
      }, {
        text: 'Physician Assistant Program'
      }]
    }, {
      header: 'Joined Medical Practice in 1986',
      image: '/modules/core/client/img/backgrounds/small_ver/indian_river.jpg',
      position: 'center',
      topics: [{
        text: 'in Melbourne, Florida'
      }]
    }, {
      header: 'Brevard Republican Party',
      image: '/modules/core/client/img/backgrounds/small_ver/republican_bg.jpg',
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

    $scope.platforms = [{
      header: '2nd Amendment',
      texts: [{
        txt: 'I completely support 2nd Amendment rights. As a home owner and gun owner I will resist any attempts to abridge my right to hunt, protect my family and fight for my country if the need arises. I am also opposed to gun registries. The "Bad Guys" certainly will not be registering their guns and registries will serve only to violate the privacy of law abiding citizens. I do, however, support screening individuals for mental illness and criminal histories in order to prevent inappropriate use of firearms in our state.'
      }],
      showPos: false,
      position: 'This is the answer 1'
    }, {
      header: 'Education',
      texts: [{
        txt: 'As a parent of three children I wholeheartedly support quality education at all levels. It is incumbent upon local school boards to be inovative in finding ways to enhance the education experience for our children. I pledge not to hobble them with more regulations and red tape that might limit their precious resources. I am supportive of local, instead of centralized, school and education management. The intrusion of "Big Government" with mandated curricula serves to allow misuse of education as a method to indoctrinate our children. An example of this occurred in Brevard County when "approved" texts were criticized when it was demonstrated that the content was skewed to favor certain philosophies.'
      }],
      showPos: false,
      position: 'This is the answer 2'
    }, {
      header: 'Health Care',
      texts: [{
        txt: 'After over thirty years in medical practice I have seen the health care needs of people and also witnessed the attempts by the Government to address those needs - most recently in an over reaching and ham handed style. I support getting "Big Government" out of the health care arena and rewriting "Obamacare" to provide a true market based insurance system.  The role of government should be to provide a level playing field environment in which insurers can compete for our business. The artificial "turf" protections that are in place now only serve to stifle healthy competition. The increased competition will bring down rates for medical care just as it does for other goods and services such as gasoline, food and transportation.'
      }],
      showPos: false,
      position: 'This is the answer 3'
    }, {
      header: 'Environment',
      texts: [{
        txt: 'We are blessed with a beautiful piece of the universe. As masters of that real estate it is incumbent upon us to be good stewards of the Earth and its environment. I heartily support laws that would prosecute those who would litter and deface our environment. "Climate Change" is a phrase that has become a political football in recent years. Names get thrown at each other for purposes that are more political than environmental. There is no doubt that climate change is occurring - this is a process that has been occurring since the birth of the earth. There have been substantial climatic fluctuations evident in the geological record. Recently CO2 has been blamed as causing the debatable changes that have been claimed and a whole set of carbon taxes and credits has been instituted. There is evidence that methane gas may be as much as 84 times more potent as a greenhouse gas - and that stuff has been belching from our earth (and cattle) for eons. There are multitudes of other factors that can effect climatic changes as well. It is clear that there is disagreement regarding the whole topic and that further research is warranted. For heaven\'s sake can we just drop the carbon taxes while we try to figure it out?',
      }, {
        txt: 'We are blessed with a beautiful piece of the universe. As masters of that real estate it is incumbent upon us to be good stewards of the Earth and its environment. I heartily support laws that would prosecute those who would litter and deface our environment. "Climate Change" is a phrase that has become a political football in recent years. Names get thrown at each other for purposes that are more political than environmental. There is no doubt that climate change is occurring - this is a process that has been occurring since the birth of the earth. There have been substantial climatic fluctuations evident in the geological record. Recently CO2 has been blamed as causing the debatable changes that have been claimed and a whole set of carbon taxes and credits has been instituted. There is evidence that methane gas may be as much as 84 times more potent as a greenhouse gas - and that stuff has been belching from our earth (and cattle) for eons. There are multitudes of other factors that can effect climatic changes as well. It is clear that there is disagreement regarding the whole topic and that further research is warranted. For heaven\'s sake can we just drop the carbon taxes while we try to figure it out?',
        image: [{
          src: 'modules/core/client/img/photos/indian_river_lagoon.jpg',
          msrc: 'modules/core/client/img/photos/small_ver/indian_river_lagoon.jpg',
          w: 1555,
          h: 981,
          caption: 'Indian River Lagoon Demonstration - Florida Today Photo (March 27 2016)'
        }]
      }],
      showPos: false,
      position: 'This is the answer 4'
    }, {
      header: 'Business',
      texts: [{
        txt: 'A good business environment and a vibrant economy are the lifeblood of our community. High unemployment rates not only reduce our living standards but they increase crime in our neighborhoods. I especially pledge to support the success and growth of our small businesses who, too frequently, find theirselves strangled by volumes of regulatory red tape.'
      }],
      showPos: false,
      position: 'This is the answer 5'
    }];

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