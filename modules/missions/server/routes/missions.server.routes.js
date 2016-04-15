'use strict';

module.exports = function(app) {
  var missions = require('../controllers/missions.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');

  app.route('/missions')
    .get(missions.list)
    .post(users.requiresLogin, missions.create);

  app.route('/missions/:missionsId')
    .get(missions.read)
    .put(users.requiresLogin, missions.update)
    .delete(users.requiresLogin, missions.delete);

  app.param('missionsId', missions.missionsByID);
};
