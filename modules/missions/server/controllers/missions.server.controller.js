'use strict';


/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  path = require('path'),
  errorHandler = require('../../../core/server/controllers/errors.server.controller'),
  Missions = mongoose.model('Missions'),
  _ = require('lodash'),
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
 * Create a mission
 */
exports.create = function (req, res) {
  var missions = new Missions(req.body);

  missions.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(missions);
    }
  });
};
/**
 * Show the current mission
 */
exports.read = function (req, res) {
  Missions.findById(req.params.missionsId).exec(function (err, missions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!missions) {
        return res.status(404).send({
          message: 'Mission not found'
        });
      }
      res.json(missions);
    }
  });
};

/**
 * Update a mission
 */
exports.update = function (req, res) {
  var missions = req.missions;

  missions = _.extend(missions, req.body);

  missions.save(function (err) {
    if (err) {
      console.log('there was an error in mission.update');
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missions);
    }
  });
};

/**
 * Delete a mission
 */
exports.delete = function (req, res) {
  var missions = req.missions;

  for (var i = 0; i < missions.body.length; i++) {
    if (missions.body[i].image.length) {
      deletePhotoFromFTP(missions.body[i].image[0].ftpsrc);
      deletePhotoFromFTP(missions.body[i].image[0].mftpsrc);
    }
  }

  missions.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missions);
    }
  });
};

/**
 * List of missions
 */
exports.list = function (req, res) {
  Missions.find().exec(function (err, missions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missions);
    }
  });
};


/**
  Mission photo upload
**/
exports.uploadParagraphPhoto = function (req, res) {
  var mission = req.missions;
  var body_index = req.bodyindex;
  var width = req.width;
  var height = req.height;
  var caption = req.caption;

  var message = null;
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.uploads.missionUpload.dest);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var multerUpload = multer({
    storage: storage
  });
  var upload = multerUpload.single('newMissionPicture');

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
      //       uploadPhotoToFTP(req.file.destination + req.file.filename, config.uploads.missionUpload.ftpdest + req.file.filename);
      //       uploadPhotoToFTP(req.file.destination + 'sm_' + req.file.filename, config.uploads.missionUpload.ftpdest + 'small_ver/' + req.file.filename);
      //
      //       if (caption.toString() === 'undefined') {
      //         caption = '';
      //       }
      //
      //       var image_info = {
      //         src: config.ftp_server.public.full + config.uploads.missionUpload.ftpdest + req.file.filename,
      //         msrc: config.ftp_server.public.full + config.uploads.missionUpload.ftpdest + req.file.filename,
      //         w: width,
      //         h: height,
      //         caption: caption,
      //         ftpsrc: config.uploads.missionUpload.ftpdest + req.file.filename,
      //         mftpsrc: config.uploads.missionUpload.ftpdest + 'small_ver/' + req.file.filename
      //       };
      //
      //       if (mission.body[body_index].image.length) {
      //         console.log('There was another photo');
      //
      //         deletePhotoFromFTP(mission.body[body_index].image[0].ftpsrc);
      //         deletePhotoFromFTP(mission.body[body_index].image[0].mftpsrc);
      //
      //         mission.body[body_index].image.splice(0, 1);
      //       }
      //
      //       mission.body[body_index].image.push(image_info);
      //       mission.body[body_index].hidden_img = false;
      //
      //       req.missions = mission;
      //       mission.save(function (saveError) {
      //         if (saveError) {
      //           return res.status(400).send({
      //             message: errorHandler.getErrorMessage(saveError)
      //           });
      //         } else {
      //           res.json(mission);
      //         }
      //       });
      //     });
      // });
    }
  });
};

/**
  Mission photo delete
**/
exports.deleteParagraphPhoto = function (req, res) {
  console.log('inside the deleteParagraphPhoto server func');
  var mission = req.missions;
  var body_index = req.bodyindex;

  deletePhotoFromFTP(mission.body[body_index].image[0].ftpsrc);
  deletePhotoFromFTP(mission.body[body_index].image[0].mftpsrc);

  mission.body[body_index].image.pop();
  mission.body[body_index].hidden_img = true;

  mission.save(function (saveError) {
    if (saveError) {
      console.log('there was an error in uploadparagraphphoto update: ' + errorHandler.getErrorMessage(saveError));
      return res.status(400).send({
        message: errorHandler.getErrorMessage(saveError)
      });
    } else {
      res.json(mission);
    }
  });
};


/**
	Missions middleware
**/
exports.missionsByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mission is invalid'
    });
  }

  Missions.findById(id).exec(function (err, missions) {
    if (err) return next(err);
    if (!missions) {
      return res.status(404).send({
        message: 'Mission not found'
      });
    }
    req.missions = missions;
    next();
  });
};
exports.bodyByIndex = function (req, res, next, id) {
  if (id >= req.missions.body.length) {
    return res.status(400).send({
      message: 'Body index is invalid'
    });
  }
  req.bodyindex = id;
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
exports.pictureSrc = function (req, res, next, id) {
  req.imgsrc = id;
  next();
};
