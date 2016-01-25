'use strict';

angular.module('core').directive('myScroller', ['$window', function ($window) {
  console.log('Scroll directive initialized. ');
  // return {
  //   restrict: 'A',
  //   link: function(scope,element,attrs) {
  //     angular.element($window).bind('scroll', function () {

  //       scope.$apply(attrs.myScroller);
        
  //       console.log('this is happening');
  //     });
  //   }
  // };

  return function(scope, element, attributes) {
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset >= 100) {
        console.log('Scrolled below header.');
      } else {
        console.log('Header is in view.');
      }
      scope.$apply();
    });
  };
}]);