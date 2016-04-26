'use strict';

module.exports = function(app) {
  var missions = require('../controllers/missions.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');

  app.route('/api/missions/public')
    .get(missions.list);

  app.route('/api/missions')
    .get(users.requiresLogin, missions.list)
    .post(users.requiresLogin, missions.create);

  app.route('/api/missions/:missionsId')
    .get(users.requiresLogin, missions.read)
    .delete(users.requiresLogin, missions.delete)
    .put(users.requiresLogin, missions.update);

  app.route('/api/missions/:missionsId/bodies/:bodyIndex')
    .post(users.requiresLogin, missions.deleteParagraphPhoto);

  app.route('/api/missions/:missionsId/:bodyIndex/:picWidth/:picHeight/:picCaption')
    .post(users.requiresLogin, missions.uploadParagraphPhoto);

  app.param('missionsId', missions.missionsByID);
  app.param('bodyIndex', missions.bodyByIndex);
  app.param('picWidth', missions.pictureWidth);
  app.param('picHeight', missions.pictureHeight);
  app.param('picCaption', missions.pictureCaption);
  app.param('imgSrc', missions.pictureSrc);
};
