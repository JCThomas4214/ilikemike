'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Mission = mongoose.model('Mission'),
  _ = require('lodash');

/**
 * Create a 
 */
exports.create = function (req, res) {
  var mission = new Mission(req.body);

  mission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.status(201).json(mission);
    }
  });
};

/**
 * Show the current 
 */
exports.read = function (req, res) {
  res.json(req.category);
};

/**
 * Update a 
 */
exports.update = function (req, res) {
  var mission = req.mission;

  mission = _.extend(mission, req.body);

  mission.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mission);
    }
  });
};

/**
 * Delete an 
 */
exports.delete = function (req, res) {
  var mission = req.mission;

  mission.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(mission);
    }
  });
};

/**
 * List of 
 */
exports.list = function(req, res) {
  Mission.find().populate('title', 'body').exec(function(err, missions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missions);
    }
  });
};

exports.missionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mission is invalid'
    });
  }

  Mission.findById(id).exec(function(err, mission) {
    if (err) return next(err);
    if (!mission) {
      return res.status(404).send({
        message: 'Mission not found'
      });
    }
    req.mission = mission;
    next();
  });
};
