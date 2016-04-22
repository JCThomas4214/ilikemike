'use strict';

// Missions module config
angular.module('missions').run(['Menus',
  function (Menus) {
    // Config logic
    Menus.addMenuItem('topbar', {
      title: 'Customize',
      state: 'missions',
      type: 'dropdown',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'missions', {
      title: 'Missions',
      state: 'listMissions',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'missions', {
      title: 'Photo Gallery',
      state: 'listAlbums',
      roles: ['admin']
    });
  }
]);
