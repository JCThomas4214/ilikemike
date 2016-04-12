'use strict';

angular.module('core').directive('photowidget', ['$timeout', function($timeout) { 
  return { 
    restrict: 'EA',
    templateUrl: 'modules/core/client/directives/photowidget.html',
    scope: {
      slides: '='
    },
    link: function(scope, element, attrs) {
    }  
  };
}]);