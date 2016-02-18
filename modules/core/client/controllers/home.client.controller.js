'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    $scope.donation_button = 'modules/core/client/img/icons/donation.png';

    $scope.mike_photo = 'modules/core/client/img/photos/mike_headshot2.jpg';

    $scope.mike_email = 'MikeForFlaSenate@gmail.com';
    $scope.mike_phone = '(321) 258-4448';
    $scope.mike_fax = '1 (321) 248-0488';
    $scope.mike_decree = 'Paid by Mike Thomas, Republican, for State Senate';

    $scope.name = 'Mike Thomas';
    $scope.name_con = 'for';
    $scope.name_con2 = 'Florida Senate';

    $scope.mike_slogen = '"I Like Mike"';
    $scope.mike_sub = 'Subscribe to Mike\'s News Letter';

    $scope.about_sec = 'Meet Mike';
    $scope.quote_one = '"People not Politics"';
    $scope.platform_sec = 'Mike\'s Mission';

    $scope.vid_header = '2015 DGF Goodwill Ambassador';

    $scope.born_header = 'Born August 25, 1957';
    $scope.born_topic = 'Plymouth, Wisconsin';
    $scope.service_header = 'United States NAVY Corpsman';
    $scope.service_topic_one = '1975-1979 (Active Duty)';
    $scope.service_topic_two = '1979-1983 (Reservist)';
    $scope.graduate_header = 'University of Florida';
    $scope.graduate_topic_one = '1984 Graduate (With Honors)';
    $scope.graduate_topic_two = 'Physician Assistant Program';
    $scope.medical_header = 'Joined Medical Practice in 1986';
    $scope.medical_topic = 'Melbourne, Florida';
    $scope.republican_header = 'Brevard Republican Party';
    $scope.republican_topic_one = 'Precinct Committeeman 2005 - 2008';
    $scope.republican_topic_two = 'State Committeeman 2008 - Present';

    $scope.exec_committee = '11th Year sitting on Brevard Republican Executive Committee';
    $scope.state_committeman = '8th Year elected as Brevard Republican State Committeeman';
    $scope.cofounder = 'Co-Founder and President of Space Coast Clinicians, Inc.';
    $scope.fapa = 'Menber and past Board of Director of the FAPA';
    $scope.aapa = 'Member of the AAPA';
    $scope.mentors_club = 'Member of the Republican Mentors Club';
    $scope.rwc = 'Associate Member of the Brevard Federated Republican Women\'s Club';

    $scope.education = 'Education';
    $scope.education_text = 'As a parent of three children I wholeheartedly support quality education at all levels. It is incumbent upon local school boards to be inovative in finding ways to enhance the education experience for our children. I pledge not to hobble them with more regulations and red tape that might limit their precious resources. I am supportive of local, instead of centralized, school and education management. The intrusion of "Big Government" with mandated curricula serves to allow misuse of education as a method to indoctrinate our children. An example of this occurred in Brevard County when "approved" texts had to be replaced two years ago when it was demonstrated that the content was skewed to favor certain philosophies.';
  
    $scope.amendment = '2nd Amendment';
    $scope.amendment_text = 'I completely support 2nd Amendment rights. As a home owner and gun owner I will resist any attempts to abridge my right to hunt, protect my family and fight for my country if the need arises. I am also opposed to gun registries. The "Bad Guys" certainly will not be registering their guns and registries will serve only to violate the privacy of law abiding citizens. I do, however, support screening individuals for mental illness and criminal histories in order to prevent inappropriate use of firearms in our state.';

    $scope.healthcare = 'Healthcare';
    $scope.healthcare_text = 'After over thirty years in medical practice I have seen the healthcare needs of people and also witnessed the attempts by the Government to address those needs - most recently in an over reaching and ham handed style. I support getting "Big Government" out of the health care arena and rewriting "Obamacare" to provide a true market based insurance system.  The role of government should be to provide a level playing field environment in which insurers can compete for our business. The artificial "turf" protections that are in place now only serve to stiffle healthy competition. The increased competition will bring down rates for medical care just as it does for other goods and services such as gasoline, food and transportation. ';

    $scope.environment = 'Environment';
    $scope.environment_text = 'We are blessed with a beautiful piece of the universe. As masters of that real estate it is incumbent upon us to be good stewards of the Earth and its environment. I heartily support laws that would prosecute those who would litter and deface our environment. "Climate Change" is a phrase that has become a political football in recent years. Names get thrown at each other for purposes that are more political than environmental. There is no doubt that climate change is occurring - this is a process that has been occurring since the birth of the earth. There have been substantial climatic fluctuations evident in the geological record. Recently CO2 has been blamed as causing the debatable changes that have been claimed and a whole set of carbon taxes and credits has been instituted. There is evidence that methane gas may be as much as 84 times more potent as a greenhouse gas - and that stuff has been belching from our earth (and cattle) for eons. There are multitudes of other factors that can effect climatic changes as well. It is clear that there is disagreement regarding the whole topic and that further research is warranted. For heaven\'s sake can we just drop the carbon taxes while we try to figure it out?';

    $scope.business = 'Business';
    $scope.business_text = 'A good business environment and a vibrant economy are the lifeblood of our community. High unemployment rates not only reduce our living standards but they increase crime in our neighborhoods. I especially pledge to support the success and growth of our small businesses who, too frequently, find theirselves strangled by volumes of regulatory red tape.';
  
    $scope.mike_endors = 'Mike\'s Endorsements';

    $scope.mike_social = 'Stay Connected';
  }
]);
