//Consider deleting this file!!

'use strict';

angular.module('core').directive('scrolly', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var raw = element[0];
      var offset;
      console.log('loading element');

      element.bind('scroll', function() {
        console.log('in scoll');
        console.log(raw.scrollTop + raw.offsetHeight);
        console.log(raw.scrollHeight);

        offset = raw.scrollTop + raw.offsetHeight;
        if(offset >= 1148 && offset < 2295) {
          console.log('inside goals');
        }
        if (offset >= 2295 && offset < 3440) {
          console.log('inside mothods');
        }
        if (offset >= 3440) {
          console.log('inside about');
        }

        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
          scope.$apply(attrs.scrolly);
        }
      });
    }
  };
});