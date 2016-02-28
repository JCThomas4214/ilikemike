'use strict';

angular
  .module('core')
  .config(['ngToastProvider', function(ngToast) {
    ngToast.configure({
      animation: 'fade',
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      maxNumber: 1
    });
  }]);

angular.module('core').controller('VolunteerFormController', ['$scope', '$http','$animate', 'ngToast',
  function($scope, $http, $animate, ngToast) {

    this.sendMail = function () {

      if (this.contact_name && this.contact_email) {

        ngToast.create({
          content: '<p class="toast_box">Thank you, <b>' + this.contact_name + '</b>, for your support!</p>'
        });
      
        var data = ({
          contact_name : this.contact_name,
          contact_email : this.contact_email,
          contact_phone : this.contact_phone
        });

        $http.post('/volunteer-form-to-mike', data).
          success(function(data, status, headers, config) {
            
          }).
          error(function(data, status, headers, config) {

          });

        $http.post('/volunteer-form-to-sub', data).
          success(function(data, status, headers, config) {

          }).
          error(function(data, status, headers, config) {

          });

        this.contact_name = ''; 
        this.contact_email = '';
        this.contact_phone = '';
      }    
    };
  }
]);