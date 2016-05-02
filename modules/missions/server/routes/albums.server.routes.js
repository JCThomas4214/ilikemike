'use strict';

module.exports = function (app) {
  var albums = require('../controllers/albums.server.controller.js');
  var users = require('../../../users/server/controllers/users.server.controller.js');

  // Routing logic
  app.route('/api/albums/public')
    .get(albums.list);

  app.route('/api/albums')
    .get(users.requiresLogin, albums.list)
    .post(users.requiresLogin, albums.create);

  app.route('/api/albums/store')
    .post(users.requiresLogin, albums.findAlbum, albums.storePhotoRecord);

  app.route('/api/albums/:albumsId')
    .get(users.requiresLogin, albums.read)
    .patch(users.requiresLogin, albums.update)
    .delete(users.requiresLogin, albums.delete);

  app.route('/api/albums/:albumsId/delete')
    .delete(users.requiresLogin, albums.deleteAlbum);

  app.route('/api/albums/:albumsId/:photosIndex')
    .post(users.requiresLogin, albums.deleteAlbumPhoto);

  app.route('/api/albums/:albumsId/:picWidth/:picHeight/:picCaption')
    .post(users.requiresLogin, albums.uploadAlbumPhoto);

  app.param('albumsId', albums.albumByID);
  app.param('photosIndex', albums.photoByID);
  app.param('picWidth', albums.pictureWidth);
  app.param('picHeight', albums.pictureHeight);
  app.param('picCaption', albums.pictureCaption);
};
