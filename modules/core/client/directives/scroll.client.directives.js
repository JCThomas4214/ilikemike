//Consider deleting this file!!

'use strict';

angular.module('core').directive('scrolly', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var raw = element[0];
      console.log('loading element');

      element.bind('scroll', function() {
        console.log('in scoll');
        console.log(raw.scrollTop + raw.offsetHeight);
        console.log(raw.scrollHeight);

        if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
          scope.$apply(attrs.scrolly);
        }
      });
    }
  };
});