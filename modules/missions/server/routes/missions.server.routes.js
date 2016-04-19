'use strict';

module.exports = function(app) {
  var missions = require('../controllers/missions.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');

  app.route('/missions')
    .get(missions.list)
    .post(users.requiresLogin, missions.create);

  app.route('/missions/:missionsId')
    .get(missions.read)
    .put(users.requiresLogin, missions.update);

  app.route('/missions/:missionsId/bodies/:bodyIndex')
    .post(users.requiresLogin, missions.deleteParagraphPhoto);

  app.route('/missions/:missionsId/bodies/:bodyIndex/width/:picWidth/height/:picHeight/caption/:picCaption')
    .post(users.requiresLogin, missions.uploadParagraphPhoto);

  app.param('missionsId', missions.missionsByID);
  app.param('bodyIndex', missions.bodyByIndex);
  app.param('picWidth', missions.pictureWidth);
  app.param('picHeight', missions.pictureHeight);
  app.param('picCaption', missions.pictureCaption);
};
