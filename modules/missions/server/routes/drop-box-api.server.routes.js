'use strict';

module.exports = function (app) {
  var dropboxapi = require('../controllers/drop-box-api.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');
  // Routing logic
  app.route('/api/dropboxapi')
    .post(users.requiresLogin, dropboxapi.uploadToDropbox);

  app.route('/api/dropboxapi/host')
    .post(users.requiresLogin, dropboxapi.createPhotoHost);

};
