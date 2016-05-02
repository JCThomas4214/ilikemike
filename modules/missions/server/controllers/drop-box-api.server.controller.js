'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  request = require('request'),
  dbox = require('dbox');

var createDboxClient = function () {
  var app = dbox.app({
    'app_key': '3kmzi6rj4ujdhfe',
    'app_secret': '2pr0jb3i7n6rpsp'
  });
  return app.client({
    oauth_token_secret: 'd67hmv8yrnk6y7u',
    oauth_token: 'hdvlf7jv8q0cjvw7',
    uid: '555930359'
  });
};



/**
 * Create a Drop box api
 */
exports.create = function (req, res) {

};

/**
 * Show the current Drop box api
 */
exports.read = function (req, res) {

};

/**
 * Update a Drop box api
 */
exports.update = function (req, res) {

};

/**
 * Delete an Drop box api
 */
exports.delete = function (req, res) {

};

/**
 * List of Drop box apis
 */
exports.list = function (req, res) {

};


exports.authorization = function (req, res) {
  console.log('We are in the dropbox authorization function');

  // // Request an request_token
  // dboxapp.requesttoken(function (status, request_token) {
  //   console.log(request_token);
  // });

  // // Request an access_token
  // dboxapp.accesstoken(dboxrequest_token, function (status, access_token) {
  //   console.log(access_token);
  //   client = access_token;
  // });

  // dboxclient.account(function(status, reply) {
  //   console.log(reply);
  // });

};

exports.uploadToDropbox = function (req, res) {

  var dboxclient = createDboxClient();

  var imageResponce = {
    imageLink: '',
    width: req.body.width,
    height: req.body.height,
    imageURL: req.body.imageURL + req.body.imageName,
    caption: req.body.caption,
    albumsId: ''
  };
  var imagePath = req.body.imageURL + req.body.imageName;

  var b64 = req.body.image;
  b64 = b64.replace(/^data:image\/jpeg;base64,|^data:image\/png;base64,|^data:image\/jpg;base64,|^data:image\/bmp;base64,/, '');
  var buffer = new Buffer(b64, 'base64');

  // console.log(u);

  dboxclient.put(imagePath, buffer, function (status, reply) {
    // Create a shared link, get the actual link, amnipulate, and store to mongo
    dboxclient.shares(imagePath, function (status, reply) {
      imageResponce.imageLink = reply.url;
      res.json(imageResponce);
    });
  });
};

var requestHostLink = function (url) {

};

exports.createPhotoHost = function (req, res) {
  console.log('We are in the createPhotoHost api');

  var imageResponce = {
    width: req.body.width,
    height: req.body.height,
    imageURL: req.body.imageURL,
    caption: req.body.caption,
    albumsId: ''
  };

  request
    .get(req.body.imageLink)
    .on('response', function (response) {
      var dblink = response.request.uri.href;
      // replace https://www.dropbox.com with https://dl.dropboxusercontent.com
      imageResponce.imageLink = dblink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
      // send back to store into mongo
      res.json(imageResponce);
    });
};
