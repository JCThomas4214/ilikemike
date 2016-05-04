'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  request = require('request'),
  rp = require('request-promise'),
  qs = require('querystring'),
  // dbox = require('./modules/missions/server/assets/dbox/lib/dbox.js'),
  appKandS = {
    app_key: '3kmzi6rj4ujdhfe',
    app_secret: '2pr0jb3i7n6rpsp'
  },
  oauthInfo = {
    oauth_token_secret: 'd67hmv8yrnk6y7u',
    oauth_token: 'hdvlf7jv8q0cjvw7',
    uid: '555930359'
  },
  dbroot = 'auto',
  dbscope = '';

var encode = function (data) {
  return encodeURIComponent(data || '').
  replace(/\!/g, '%21').
  replace(/\'/g, '%27').
  replace(/\(/g, '%28').
  replace(/\)/g, '%29').
  replace(/\*/g, '%2A');
};

var parseJSON = function (str) {

  var scopePath = path.join('/', dbscope);
  var rx = new RegExp('^' + scopePath + '/', 'i');
  var obj;

  try {
    obj = JSON.parse(str);

    if (dbscope) {
      // replace path on main object
      if (obj.hasOwnProperty('path')) {
        obj.path = obj.path.replace(rx, '');
      }

      // replace paths in array
      if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
          if (obj[i].hasOwnProperty('path')) {
            obj[i].path = obj[i].path.replace(rx, '');
          }
        }
      }

      // replace entries paths from delta call
      if (obj.hasOwnProperty('entries') && obj.entries.length) {
        var resultSet = [];

        for (var o = 0; o < obj.entries.length; o++) {
          // readdir
          if (obj.entries[o][0].match(rx) && obj.entries[o][0] !== scopePath) {
            var fpath = obj.entries[o][0].replace(rx, '');
            var entry = obj.entries[o][1];
            if (entry && entry.hasOwnProperty('path')) {
              entry.path = entry.path.replace(rx, '');
            }
            // console.log('pushing', fpath, entry)
            resultSet.push([fpath, entry]);
          }
        }
        // console.log('resultSet..', resultSet)
        obj.entries = resultSet;
      }

    }

  } catch (e) {
    console.log('INVALID', e);
    var obj = {};
  }

  return obj;
};

var createUrl = function (info) {
  if (!info.hostname || !info.action)
    throw 'must have proper base, version, and action';

  // calculate if fileops path
  var fileop = info.action.split('/')[0] === 'fileops';

  // fileops calls desn't want root in path
  var rootpath = fileop ? '' : dbroot;

  // fileops calls desn't want scope in path
  var scopepath = fileop ? '' : dbscope;

  // we wont always have this
  var filepath = info.path ? qs.escape(info.path) : '';

  // build full path
  var fullpath = path.join(info.hostname);
  fullpath = path.join(fullpath, info.version || '1');
  fullpath = path.join(fullpath, info.action);
  fullpath = path.join(fullpath, rootpath);
  fullpath = path.join(fullpath, scopepath);
  fullpath = path.join(fullpath, filepath);

  // add protocol
  var fullurl = 'https://' + fullpath;

  // add querystring if we have one
  if (info.hasOwnProperty('query')) fullurl += ('?' + qs.stringify(info.query));

  return fullurl;
};

var signer = function () {
  var signature = encode(appKandS.app_secret) + '&' + encode(oauthInfo.oauth_token_secret);
  var timestamp = (Math.floor((new Date()).getTime() / 1000)).toString();
  var nonce = timestamp + Math.floor(Math.random() * 100000000);

  var options = {
    oauth_token: oauthInfo.oauth_token,
    oauth_consumer_key: appKandS.app_key,
    oauth_signature: signature,
    oauth_timestamp: timestamp,
    oauth_nonce: nonce,
    oauth_signature_method: 'PLAINTEXT',
    oauth_version: '1.0'
  };

  return options;
};

var sign = function (token, args) {
  var signature = signer();

  if (args !== null) {
    for (var attr in args) {
      if (args.hasOwnProperty(attr)) signature.attr = args.attr;
    }
  }

  return signature;
};

var getOAuth2Token = function (args) {
  var signature = sign(oauthInfo, args);

  var createdUrl = createUrl({
    hostname: 'api.dropboxapi.com',
    action: 'oauth2/token_from_oauth1',
    query: signature
  });

  var new_args = {
    method: 'POST',
    url: createdUrl
  };
};

var putIntoDropBox = function (path, body, args, cb) {
  if (!cb) {
    cb = args;
    args = null;
  }

  var signature = sign(oauthInfo, args);

  var createdUrl = createUrl({
    hostname: 'api-content.dropbox.com',
    action: 'files_put',
    path: path,
    query: signature
  });

  var new_args = {
    method: 'PUT',
    headers: {
      'content-length': body.length
    },
    url: createdUrl
  };

  // do not send empty body
  if (body.length > 0) new_args.body = body;

  return request(new_args, function (e, r, b) {
    cb(e ? null : r.statusCode, e ? null : parseJSON(b));
  });
};

var dropBoxHostLink = function (path, args, cb) {
  if (!cb) {
    cb = args;
    args = null;
  }

  var signature = sign(oauthInfo, args);

  var createdUrl = createUrl({
    hostname: 'api.dropbox.com',
    action: 'shares',
    path: path
  });

  var body = qs.stringify(signature);

  var new_args = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': body.length
    },
    url: createdUrl,
    body: body
  };

  return request(new_args, function (e, r, b) {
    cb(e ? null : r.statusCode, e ? null : parseJSON(b));
  });
};

exports.removeImageFromDropBox = function (path, args, cb) {
  if (!cb) {
    cb = args;
    args = null;
  }

  var signature = sign(oauthInfo, args);

  signature.root = dbroot;
  signature.path = path;

  var createdUrl = createUrl({
    hostname: 'api.dropboxapi.com',
    action: 'fileops/delete'
  });

  var body = qs.stringify(signature);

  var new_args = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'content-length': body.length
    },
    url: createdUrl,
    body: body
  };

  return request(new_args, function (e, r, b) {
    if (cb)
      cb(e ? null : r.statusCode, e ? null : parseJSON(b));
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

  // var dboxclient = createDboxClient();

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

  putIntoDropBox(imagePath, buffer, function (status, reply) {
    // Create a shared link, get the actual link, amnipulate, and store to mongo
    dropBoxHostLink(imagePath, function (status, reply) {
      imageResponce.imageLink = reply.url;
      res.json(imageResponce);
    });
  });
  // simpleRequest();

};

var requestHostLink = function (url) {

};

exports.createPhotoHost = function (req, res) {

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

exports.deleteDropBoxPhoto = function (req, res) {
  var imagePath = req.body.photo_path;

  exports.removeImageFromDropBox(imagePath, function (status, reply) {
    res.json({
      deleted: imagePath
    });
  });
};
