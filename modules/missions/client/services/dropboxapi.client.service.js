'use strict';

angular.module('missions')
  .factory('Dropboxapi', ['$resource',

    function ($resource) {
      // Dropboxapi service logic
      // ...

      // Public API
      return $resource('api/dropboxapi', null, {
        save: {
          method: 'POST'
        }
      });
    }
  ]);
