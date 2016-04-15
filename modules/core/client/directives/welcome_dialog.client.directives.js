'use strict';

angular.module('core').directive('welcomedialog', ['ngDialog', '$timeout', function(ngDialog, $timeout) { 
  return { 
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function(){
        ngDialog.open({ 
          template: '/modules/core/client/views/dialogFormat.html', 
          className: 'welcome_dialog',
          closeByDocument:false
        });  
      }, 1500);
    }  
  };
}]);