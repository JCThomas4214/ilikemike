
'use strict';

angular.module('core').directive('scrolly', function ($window) {
  return function(scope, element, attrs) {

    var tmp;
    var section_one;
    var section_two;
    var section_three;
    var section_four;
    var section_five;

    var full_section_two;
    var full_section_three;
    var full_section_four;
    var full_section_five;

    var offset;
    angular.element($window).bind('scroll', function() {

      tmp = angular.element(document.getElementById('section_one')).prop('clientHeight');

      if (!section_one || tmp !== section_one) {   
        section_one = angular.element(document.getElementById('section_one')).prop('clientHeight');     
        section_two = angular.element(document.getElementById('about_section')).prop('clientHeight');
        section_three = angular.element(document.getElementById('platform_section')).prop('clientHeight');
        section_four = angular.element(document.getElementById('endors_section')).prop('clientHeight');
        section_five = angular.element(document.getElementById('volunteer_section')).prop('clientHeight');

        full_section_two = section_one + section_two;
        full_section_three = full_section_two + section_three;
        full_section_four = full_section_three + section_four;
        full_section_five = full_section_four + section_five;
      }

      offset = angular.element($window).scrollTop();

      if(offset >= section_one && offset < full_section_two) {
        angular.element(document.querySelector('#meetTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#meetTb')).removeClass('active');
      }

      if (offset >= full_section_two && offset < full_section_three) {
        angular.element(document.querySelector('#missionTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#missionTb')).removeClass('active');
      }

      if (offset >= full_section_three && offset < full_section_four) {
        angular.element(document.querySelector('#endorsTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#endorsTb')).removeClass('active');
      }

      if (offset >= full_section_four && offset < full_section_five) {
        angular.element(document.querySelector('#volunteerTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#volunteerTb')).removeClass('active');
      }

      if (offset >= full_section_five) {
        angular.element(document.querySelector('#socialTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#socialTb')).removeClass('active');
      }

      scope.visible = false;
      scope.$apply();
    });
  };
});