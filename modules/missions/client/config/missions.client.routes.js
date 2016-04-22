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
      }).      
      state('listAlbums', {
        url: '/albums',
        templateUrl: 'modules/missions/client/views/albums.client.view.html'
      }).
      state('createAlbum', {
        url: '/albums/create',
        templateUrl: 'modules/missions/client/views/create-album.client.view.html'
      }).
      state('viewAlbum', {
        url: '/albums/:albumId',
        templateUrl: 'modules/missions/client/views/view-album.client.view.html'
      });
  }
]);
