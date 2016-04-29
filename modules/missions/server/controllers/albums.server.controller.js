'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  path = require('path'),
  _ = require('lodash'),
  errorHandler = require('../../../core/server/controllers/errors.server.controller'),
  Album = mongoose.model('Album'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  del = require('del'),
  JSFtp = require('jsftp'),
  im = require('imagemagick');



/**
 * Create a Album
 */
exports.create = function (req, res) {
  var album = new Album(req.body);

  album.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(album);
    }
  });

};

/**
 * Show the current Album
 */
exports.read = function (req, res) {
  Album.fundById(req.params.albumId).exec(function (err, album) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found'
        });
      }
      res.json(album);
    }
  });
};

/**
 * Update a Album
 */
exports.update = function (req, res) {
  var album = req.album;

  album = _.extend(album, req.body);

  album.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(album);
    }
  });
};

/**
 * Delete an Album
 */
exports.delete = function (req, res) {
  var album = req.album;

  album.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(album);
    }
  });
};

/**
 * List of Albums
 */
exports.list = function (req, res) {
  Album.find().exec(function (err, albums) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(albums);
    }
  });
};

/**
  Album delete
**/
exports.deleteAlbum = function (req, res) {
  var album = req.album;

  var fileArr = [];

  for (var i = 0; i < album.gallery.length; i++) {
    fileArr.push(album.gallery[i].src);
    // fileArr.push(album.gallery[i].msrc);
  }
  //delete the files from directories
  del(fileArr);

  album.remove(function (saveError) {
    if (saveError) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(saveError)
      });
    } else {
      res.json(album);
    }
  });
};

/**
  Album photo upload
**/
exports.uploadAlbumPhoto = function (req, res) {
  var album = req.album;
  var width = req.width;
  var height = req.height;
  var caption = req.caption;
  var ftp = new JSFtp({
    host: config.ftp_server.host,
    port: config.ftp_server.port,
    user: config.ftp_server.admin.user,
    pass: config.ftp_server.admin.pass
  });

  var message = null;
  var upload = multer(config.uploads.galleryUpload).single('newAlbumPicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;


  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {

      // im.resize({
      //   srcPath: req.file.destination + req.file.filename,
      //   dstPath: req.file.destination + '/small_ver/' + req.file.filename,
      //   height: 400
      // }, function (err, stdout, stderr) {
      //   if (err) throw err;
      //   console.log('resized ' + req.file.filename);
      // });

      console.log(req.file);

      // ftp.put(req.file.destination + req.file.filename, config.uploads.galleryUpload.ftpdest + req.file.filename, function (hadError) {
      //   if (!hadError)
      //     console.log('File transferred successfully!');
      // });

      var imageURL = req.file.destination + req.file.filename;
      var fileArr = [imageURL];
      //delete the files from directories
      del(fileArr);

      if (caption.toString() === 'undefined') {
        caption = '';
      }

      var image_info = {
        pic_order: album.gallery.length + 1,
        src: config.ftp_server.public.full + config.uploads.galleryUpload.ftpdest + req.file.filename,
        msrc: config.ftp_server.public.full + config.uploads.galleryUpload.ftpdest + req.file.filename,
        w: width,
        h: height,
        caption: caption,
        ftpsrc: config.uploads.galleryUpload.ftpdest + req.file.filename
      };

      album.gallery.push(image_info);

      req.album = album;
      // album.save(function (saveError) {
      //   if (saveError) {
      //     return res.status(400).send({
      //       message: errorHandler.getErrorMessage(saveError)
      //     });
      //   } else {
      //     res.json(album);
      //   }
      // });
    }
  });
};

/**
  Album photo delete
**/
exports.deleteAlbumPhoto = function (req, res) {
  var album = req.album;
  var photo_index = req.photoIndex;
  var photo_order = album.gallery[photo_index].pic_order;
  var ftp = new JSFtp({
    host: config.ftp_server.host,
    port: config.ftp_server.port,
    user: config.ftp_server.admin.user,
    pass: config.ftp_server.admin.pass
  });

  var ftpURL = album.gallery[photo_index].ftpsrc;
  ftp.raw.dele(ftpURL, function (err, data) {
    if (err) return console.error(err);

    console.log(data.text); // Show the FTP response text to the user
    console.log(data.code); // Show the FTP response code to the user
  });


  album.gallery.splice(photo_index, 1);

  //decrement all orders after the delete photo
  for (var i = 0; i < album.gallery.length; i++) {
    if (album.gallery[i].pic_order > photo_order) {
      album.gallery[i].pic_order = album.gallery[i].pic_order - 1;
    }
  }

  album.save(function (saveError) {
    if (saveError) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(saveError)
      });
    } else {
      res.json(album);
    }
  });
};

/**
	Albums middleware
**/
exports.albumByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Album is invalid'
    });
  }

  Album.findById(id).exec(function (err, album) {
    if (err) return next(err);
    if (!album) {
      return res.status(404).send({
        message: 'Album not found'
      });
    }
    req.album = album;
    next();
  });
};
exports.photoByID = function (req, res, next, id) {
  req.photoIndex = id;
  next();
};
exports.pictureWidth = function (req, res, next, id) {
  req.width = id;
  next();
};
exports.pictureHeight = function (req, res, next, id) {
  req.height = id;
  next();
};
exports.pictureCaption = function (req, res, next, id) {
  req.caption = id;
  next();
};
