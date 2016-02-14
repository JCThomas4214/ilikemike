'use strict';

angular.module('core').controller('ContactFormController', ['$scope', '$http','$animate',
  function($scope, $http, $animate) {
  	
  	// $scope.toastPosition {
  	// 	bottom: true;
  	// 	top: false;
  	// 	right: true;
  	// 	left: false;
  	// };
  	// $scope.getToastPosition = function () {
  	// 	return Object.keys($scope.toastPosition)
  	// 	  .filter(function (pos) {
  	// 	  	return $scope.toastPosition[pos];
  	// 	  })
  	// 	  .join(' ');
  	// };

    this.sendMail = function () {
  		
      var data = ({
        contact_name : this.contact_name,
        contact_email : this.contact_email
      });

      $http.post('/contact-form', data).
        success(function(data, status, headers, config) {

        }).
        error(function(data, status, headers, config) {

        });
    };

  }
]);