
'use strict';

angular.module('core').directive('scrolly', function ($window) {
  return function(scope, element, attrs) {
    var raw = element[0];
    console.log(element);

    var section_one;
    var section_two;
    var section_three;
    var full_section_two;
    var full_section_three;

    var offset;
    angular.element($window).bind('scroll', function() {
      section_one = element[0].childNodes[6].childNodes[1].childNodes[2].childNodes[0].childNodes[3].clientHeight;
      section_two = element[0].childNodes[6].childNodes[1].childNodes[2].childNodes[0].childNodes[5].clientHeight;
      section_three = element[0].childNodes[6].childNodes[1].childNodes[2].childNodes[0].childNodes[7].clientHeight;
      full_section_two = section_one + section_two;
      full_section_three = full_section_two + section_three;

      offset = raw.scrollTop;

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

      if (offset >= full_section_three) {
        angular.element(document.querySelector('#socialTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#socialTb')).removeClass('active');
      }

      scope.visible = false;
      scope.$apply();
    });
  };
});