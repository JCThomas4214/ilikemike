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
  del = require('del');


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
  var upload = multer(config.uploads.missionUpload).single('newMissionPicture');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  upload(req, res, function (uploadError) {
    if (uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {

      var image_info = {
        src: config.uploads.missionUpload.dest + req.file.filename,
        msrc: config.uploads.missionUpload.dest + req.file.filename,
        w: width,
        h: height,
        caption: caption
      };

      if (mission.body[body_index].image.length) {
        console.log('There was another photo');
        var fileArr = [mission.body[body_index].image[0].src];
        //delete the files from directories
        del(fileArr);
        mission.body[body_index].image.splice(0, 1);
      }

      mission.body[body_index].image.push(image_info);
      mission.body[body_index].hidden_img = false;

      req.missions = mission;
      mission.save(function (saveError) {
        if (saveError) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(saveError)
          });
        } else {
          res.json(mission);
        }
      });
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

  var imageURL = mission.body[body_index].image[0].src;
  var sm_imageURL = mission.body[body_index].image[0].msrc;

  var fileArr = [imageURL];
  //delete the files from directories
  del(fileArr);

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