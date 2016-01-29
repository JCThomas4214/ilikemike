//Consider deleting this file!!

'use strict';

angular.module('core').directive('scroll', function($window) {
  return function(scope, element, attrs) {
    console.log('outside');
    angular.element($window).bind('scroll', function() {
      console.log('inside');
      if (this.pageYOffset >= 100) {
        scope.boolChangeClass = true;
        console.log('Scrolled below header.');
      } else {
        scope.boolChangeClass = false;
        console.log('Header is in view.');
      }
      scope.$apply();
    });
  };
});