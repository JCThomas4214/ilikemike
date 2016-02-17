
'use strict';

angular.module('core').directive('scrolly', function ($window) {
  return function(scope, element, attrs) {
    var raw = element[0];
    console.log(element);

    var section_one;
    var section_two;
    var full_section_two;

    var offset;
    angular.element($window).bind('scroll', function() {
      section_one = element[0].childNodes[3].childNodes[1].childNodes[2].childNodes[0].childNodes[4].clientHeight;
      section_two = element[0].childNodes[3].childNodes[1].childNodes[2].childNodes[0].childNodes[6].clientHeight;
      full_section_two = section_one + section_two;

      offset = raw.scrollTop;

      if(offset >= section_one && offset < full_section_two) {
        angular.element(document.querySelector('#missionTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#missionTb')).removeClass('active');
      }

      if (offset >= full_section_two) {
        angular.element(document.querySelector('#methodsTb')).addClass('active');
      } else {
        angular.element(document.querySelector('#methodsTb')).removeClass('active');
      }

      scope.visible = false;
      scope.$apply();
    });
  };
});