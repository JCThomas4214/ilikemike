//Consider deleting this file!!

'use strict';

angular.module('core').directive('scrolly', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var raw = element[0];

      var mainTitleHeight = element[0].childNodes[1].childNodes[1].childNodes[1].clientHeight - 1;
      console.log(element[0].childNodes[1].childNodes[1].childNodes[1].clientHeight);
      var secOneHeight = element[0].childNodes[1].childNodes[1].childNodes[3].clientHeight - 1;
      console.log(element[0].childNodes[1].childNodes[1].childNodes[3].clientHeight);
      var secondaryTitleHeight = element[0].childNodes[1].childNodes[1].childNodes[5].clientHeight - 1;
      var secTwoHeight = element[0].childNodes[1].childNodes[1].childNodes[7].clientHeight - 1;

      var firstHeight = mainTitleHeight + secOneHeight + 100;
      var secondHeight = secondaryTitleHeight + secTwoHeight;

      var offset;
      var myEl;
      console.log(element);

      element.bind('scroll', function() {
        offset = raw.scrollTop;

        if(offset >= firstHeight && offset < secondHeight) {
          angular.element(document.querySelector('#missionTb')).addClass('active');
        } else {
          angular.element(document.querySelector('#missionTb')).removeClass('active');
        }

        if (offset >= secondHeight) {
          angular.element(document.querySelector('#methodsTb')).addClass('active');
        } else {
          angular.element(document.querySelector('#methodsTb')).removeClass('active');
        }

        // if (offset >= groupThreeHeight) {
        //   angular.element(document.querySelector('#aboutTb')).addClass('active');
        // } else {
        //   angular.element(document.querySelector('#aboutTb')).removeClass('active');
        // }

        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
          scope.$apply(attrs.scrolly);
        }
      });
    }
  };
});