'use strict';

module.exports = function(app) {

  var missions = require('../controllers/missions.server.controller');
  // var users = require('../controllers/users.server.controller');

  app.route('/missions')
    .get(missions.list)
    .post(missions.create);

  // the missionId param is added to the params object for the request
  app.route('/missions/:missionId')
    .get(missions.read)
    .put(missions.update)
    .delete(missions.delete);

  app.param('missionId', missions.missionByID);

  // app.route('/missions')
  //   .get(function (request, response) {
  //     response.json([{ name: 'Beverages' }, { name: 'Condiments' }]);
  //   });
};
