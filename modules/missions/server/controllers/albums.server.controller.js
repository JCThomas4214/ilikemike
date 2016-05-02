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
  JSFtp = require('jsftp');
  // lwip = require('lwip');

var uploadPhotoToFTP = function (src, dest) {
  var ftp = new JSFtp({
    host: config.ftp_server.host,
    port: config.ftp_server.port,
    user: config.ftp_server.admin.user,
    pass: config.ftp_server.admin.pass
  });

  ftp.put(src, dest, function (hadError) {
    if (!hadError) {
      var fileArr = [src];
      del(fileArr);
      console.log('File transferred successfully!');
    } else {
      console.log(hadError);
    }
  });
};

var deletePhotoFromFTP = function (src) {
  var ftp = new JSFtp({
    host: config.ftp_server.host,
    port: config.ftp_server.port,
    user: config.ftp_server.admin.user,
    pass: config.ftp_server.admin.pass
  });

  ftp.raw.dele(src, function (err, data) {
    if (err) return console.error(err);
    console.log(data.text); // Show the FTP response text to the user
  });
};

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

  for (var i = 0; i < album.gallery.length; i++) {
    deletePhotoFromFTP(album.gallery[i].ftpsrc);
    deletePhotoFromFTP(album.gallery[i].mftpsrc);
  }

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


// Store photo record into Mongo
exports.storePhotoRecord = function (req, res) {
  console.log('We are in the photo store api');

  var album = req.album;
  // var width = req.body.width;
  // var height = req.body.height;
  // var caption = req.body.caption;
  // var imageLink = req.body.imageLink;
  // var imageURL = req.body.imageURL;

  // var image_info = {
  //   pic_order: album.gallery.length + 1,
  //   src: imageLink,
  //   msrc: imageLink,
  //   w: width,
  //   h: height,
  //   caption: caption,
  //   ftpsrc: imageURL,
  //   mftpsrc: imageURL
  // };

  console.log(album);

  // album.gallery.push(image_info);
  //
  // req.album = album;
  // album.save(function (saveError) {
  //   if (saveError) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(saveError)
  //     });
  //   } else {
  //     res.json(album);
  //   }
  // });
  res.json({
    done: 'yes'
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

  var message = null;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.uploads.galleryUpload.dest);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var multerUpload = multer({
    storage: storage
  });
  var upload = multerUpload.single('newAlbumPicture');

  console.log(upload.data);


  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {

      // lwip.open(req.file.destination + req.file.filename, function (err, image) {
      //   image.batch()
      //     .scale(0.2)
      //     .writeFile(req.file.destination + 'sm_' + req.file.filename, function (err) {
      //       if (err) throw err;
      //
      //       uploadPhotoToFTP(req.file.destination + req.file.filename, config.uploads.galleryUpload.ftpdest + req.file.filename);
      //       uploadPhotoToFTP(req.file.destination + 'sm_' + req.file.filename, config.uploads.galleryUpload.ftpdest + 'small_ver/' + req.file.filename);
      //
      //       if (caption.toString() === 'undefined') {
      //         caption = '';
      //       }
      //
      //       var image_info = {
      //         pic_order: album.gallery.length + 1,
      //         src: config.ftp_server.public.full + config.uploads.galleryUpload.ftpdest + req.file.filename,
      //         msrc: config.ftp_server.public.full + config.uploads.galleryUpload.ftpdest + 'small_ver/' + req.file.filename,
      //         w: width,
      //         h: height,
      //         caption: caption,
      //         ftpsrc: config.uploads.galleryUpload.ftpdest + req.file.filename,
      //         mftpsrc: config.uploads.galleryUpload.ftpdest + 'small_ver/' + req.file.filename
      //       };
      //
      //       album.gallery.push(image_info);
      //
      //       req.album = album;
      //       album.save(function (saveError) {
      //         if (saveError) {
      //           return res.status(400).send({
      //             message: errorHandler.getErrorMessage(saveError)
      //           });
      //         } else {
      //           res.json(album);
      //         }
      //       });
      //     });
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

  deletePhotoFromFTP(album.gallery[photo_index].ftpsrc);
  deletePhotoFromFTP(album.gallery[photo_index].mftpsrc);

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
exports.findAlbum = function (req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.body.albumsId)) {
    return res.status(400).send({
      message: 'Album is invalid'
    });
  }

  Album.findById(req.body.albumsId).exec(function (err, album) {
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
