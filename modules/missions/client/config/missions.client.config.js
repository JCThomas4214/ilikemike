'use strict';

// Missions module config
angular.module('missions').run(['Menus',
  function (Menus) {
    // Config logic
    Menus.addMenuItem('topbar', {
      title: 'Missions',
      state: 'missions',
      type: 'dropdown',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'missions', {
      title: 'List Missions',
      state: 'listMissions',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'missions', {
      title: 'Create Mission',
      state: 'createMission',
      roles: ['admin']
    });
  }
]);
