'use strict';

angular.module('core').directive('navigationBar', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/core/client/directives/navbar.client.directives.html'
  };
});