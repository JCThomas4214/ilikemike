'use strict';

angular.module('core').directive('setsize', ['$window', '$timeout', function($window,$timeout) { 
  return { 
    restrict: 'A',
    link: function(scope, element, attrs) {

      var run = function(){
        var right = angular.element(document.getElementById('volunteer_column_right')).height();

        angular.element(document.getElementById('volunteer_column_left')).height(right);
        angular.element(document.getElementById('volunteer_column_middle')).height(right);
      };
      if($window.innerWidth > 775) {
        // console.log('greater than 775 width');
        $timeout(run, 500);
      }
      //use timeout to wait to execute directive after DOM load
      angular.element($window).bind('resize', function() {
        if($window.innerWidth > 775) {
          $timeout(run, 500);
        } else {
          angular.element(document.getElementById('volunteer_column_right')).height('auto');
          angular.element(document.getElementById('volunteer_column_left')).height('auto');
          angular.element(document.getElementById('volunteer_column_middle')).height('auto');
        }
      });
      
    }  
  };
}]);