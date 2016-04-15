'use strict';

angular.module('core').directive('photodisplaywidget', ['$timeout', function($timeout) { 
  return { 
    restrict: 'EA',
    templateUrl: 'modules/core/client/directives/photodisplay.html',
    scope: {
      slides: '='
    },
    link: function(scope, element, attrs) {
      $timeout(function(){

      }, 500);
    }  
  };
}]);