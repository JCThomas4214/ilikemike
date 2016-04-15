'use strict';

angular.module('missions').factory('Missions', ['$resource',
  function ($resource) {
    // Missions service logic
    // ...

    // Public API
    return $resource('missions/:missionsId', { 
      missionsId: '@_id'
    },{
      update: {
        method: 'PUT'
      }
    });
  }
]);
