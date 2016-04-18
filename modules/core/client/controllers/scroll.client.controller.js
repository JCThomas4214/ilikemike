'use strict';

var $scope, $location;

angular.module('core').service('anchorSmoothScroll', function() {

  
  this.scrollTo = function(eID) {

    var el = angular.element(document.getElementById('awesome_body'));
    var o = angular.element(document.getElementById(eID)).prop('offsetTop');

    el.animate({ scrollTop: o }, 'slow');

  };

});

angular.module('core').controller('ScrollCtrl',
  function($scope, $location, anchorSmoothScroll) {

    $scope.gotoElement = function(eID) {
      // set the location.hash to the id of
      // the element you wish to scroll to.

      // call $anchorScroll()
      anchorSmoothScroll.scrollTo(eID);

    };
  }
);