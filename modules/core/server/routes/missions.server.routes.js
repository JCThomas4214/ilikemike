'use strict';

module.exports = function(app) {

  var missions = require('../controllers/missions.server.controller');
  var users = require('../../../users/server/controllers/users.server.controller');

  // FOR WHEN WE HAVE LOGIN

  app.route('/missions')
    .get(missions.list)
    .post(users.requiresLogin, missions.create);

  // the missionId param is added to the params object for the request
  app.route('/missions/:missionId')
    .get(missions.read)
    .put(users.requiresLogin, missions.update)
    .delete(users.requiresLogin, missions.delete);

  // app.route('/missions')
  //   .get(missions.list)
  //   .post(missions.create);

  // // the missionId param is added to the params object for the request
  // app.route('/missions/:missionId')
  //   .get(missions.read)
  //   .put(missions.update)
  //   .delete(missions.delete);

  app.param('missionId', missions.missionByID);

};
