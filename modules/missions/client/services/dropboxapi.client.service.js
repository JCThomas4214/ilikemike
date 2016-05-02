'use strict';

angular.module('missions')
  .factory('Dropboxapi', ['$resource',

    function ($resource) {
      // Dropboxapi service logic
      // ...

      // Public API
      return $resource('api/dropboxapi', {}, {
        save: {
          method: 'POST'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('DropboxHostapi', ['$resource',

    function ($resource) {
      // Dropboxapi service logic
      // ...

      // Public API
      return $resource('api/dropboxapi/host', {}, {
        share: {
          method: 'POST'
        }
      });
    }
  ]);
