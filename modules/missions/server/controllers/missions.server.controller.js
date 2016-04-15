'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),    
  errorHandler = require('../../../core/server/controllers/errors.server.controller'),
  Missions = mongoose.model('Missions'),
  _ = require('lodash');

/**
 * Create a mission
 */
exports.create = function (req, res) {
  var missions = new Missions(req.body);

  missions.save(function(err) {
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
  Missions.findById(req.params.missionsId).exec(function(err, missions) {
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

  missions.save(function(err) {
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
 * Delete a mission
 */
exports.delete = function (req, res) {
  var missions = req.missions;

  missions.remove(function(err) {
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
  Missions.find().exec(function(err, missions) {
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
	Missions middleware
**/
exports.missionsByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Mission is invalid'
    });
  }

  Missions.findById(id).exec(function(err, missions) {
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

