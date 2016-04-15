'use strict';

//Setting up route
angular.module('missions').config(['$stateProvider',
  function($stateProvider) {
    // Missions state routing
    $stateProvider.
      state('listMissions', {
        url: '/missions',
        templateUrl: 'modules/missions/client/views/missions.client.view.html'
      }).
      state('createMission', {
        url: '/missions/create',
        templateUrl: 'modules/missions/client/views/create-mission.client.view.html'
      }).
      state('viewMission', {
        url: '/missions/:missionsId',
        templateUrl: 'modules/missions/client/views/view-mission.client.view.html'
      }).
      state('editMission', {
        url: '/missions/:missionsId/edit',
        templateUrl: 'modules/missions/client/views/edit-mission.client.view.html'
      });
  }
]);
