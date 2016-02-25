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
      state: 'missions.list',
      roles: ['admin']
    });

    Menus.addSubMenuItem('topbar', 'missions', {
      title: 'Create Mission',
      state: 'missions.create',
      roles: ['admin']
    });
  }
]);
