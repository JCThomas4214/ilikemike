//Consider deleting this file!!

'use strict';

angular.module('core').directive('scrolly', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var raw = element[0];
      var picHeight = element[0].childNodes[3].clientHeight - 1;
      var secHeight = element[0].childNodes[5].clientHeight - 1;
      var groupTwoHeight = (2 * picHeight) + secHeight - 1;
      var groupThreeHeight = groupTwoHeight + picHeight + secHeight - 1;

      var offset;
      var myEl;

      element.bind('scroll', function() {
        offset = raw.scrollTop;

        if(offset >= picHeight && offset < groupTwoHeight) {
          angular.element( document.querySelector( '#missionTb' ) ).addClass('active');
        } else {
          angular.element( document.querySelector( '#missionTb' ) ).removeClass('active');
        }

        if (offset >= groupTwoHeight && offset < groupThreeHeight) {
          angular.element( document.querySelector( '#methodsTb' ) ).addClass('active');
        } else {
          angular.element( document.querySelector( '#methodsTb' ) ).removeClass('active');
        }

        if (offset >= groupThreeHeight) {
          angular.element( document.querySelector( '#aboutTb' ) ).addClass('active');
        } else {
          angular.element( document.querySelector( '#aboutTb' ) ).removeClass('active');
        }

        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
          scope.$apply(attrs.scrolly);
        }
      });
    }
  };
});