'use strict';

angular.module('missions')
  .factory('PublicMissions', ['$resource',
    function ($resource) {
      // Missions service logic
      // ...

      // Public API
      return $resource('api/missions/public', {}, {
        update: {
          method: 'GET'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('Missions', ['$resource',
    function ($resource) {
      // Missions service logic
      // ...

      // Public API
      return $resource('api/missions/:missionsId', {
        missionsId: '@_id'
      }, {
        update: {
          method: 'PUT'
        }
      });
    }
  ]);

angular.module('missions')
  .factory('DeleteParagraphPhoto', ['$resource',
    function ($resource) {
      // Missions service logic
      // ...

      // Public API
      return $resource('api/missions/:missionsId/bodies/:bodyIndex', {
        missionsId: '@_id',
        bodyIndex: '@_index'
      }, {
        update: {
          method: 'POST'
        }
      });
    }
  ]);