'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Missions Schema
 */
var MissionsSchema = new Schema({
  // Missions model fields   
  created: {
    type: Date,
    default: Date.now
  },
  header: {
    type: String,
    required: 'Mission header must be filled'
  },
  body: {
    type: String,
    required: 'Mission body must be filled'
  },
  position: {
    type: String,
    default: ''
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Missions', MissionsSchema);
