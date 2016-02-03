//Consider deleting this file!!

'use strict';

angular.module('core').directive('scrolly', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var raw = element[0];
      var offset;
      var myEl;
      console.log('loading element');

      element.bind('scroll', function() {
        console.log(raw.scrollTop + raw.offsetHeight);
        console.log(raw.scrollHeight);

        offset = raw.scrollTop + raw.offsetHeight;

        if(offset >= 1148 && offset < 2295) {
          angular.element( document.querySelector( '#goalsTb' ) ).addClass('active');
          console.log('inside goals');
        } else {
          angular.element( document.querySelector( '#goalsTb' ) ).removeClass('active');
        }

        if (offset >= 2295 && offset < 3440) {
          angular.element( document.querySelector( '#methodsTb' ) ).addClass('active');
          console.log('inside mothods');
        } else {
          angular.element( document.querySelector( '#methodsTb' ) ).removeClass('active');
        }

        if (offset >= 3440) {
          angular.element( document.querySelector( '#aboutTb' ) ).addClass('active');
          console.log('inside about');
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