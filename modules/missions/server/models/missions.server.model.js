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
  body: [{
    paragraph: {
      type: String,
      required: 'Mission body must be filled'
    },
    hidden_img: {
      type: Boolean,
      default: true
    },
    image: [{
      src: {
        type: String,
        default: ''
      },
      msrc: {
        type: String,
        default: ''
      },
      w: {
        type: Number,
        default: 0
      },
      h: {
        type: Number,
        default: 0
      },
      caption: {
        type: String,
        default: ''
      }
    }]
  }],
  position: [{
    paragraph: {
      type: String
    },
    hidden_img: {
      type: Boolean,
      default: true
    },
    image: [{
      src: {
        type: String,
        default: ''
      },
      msrc: {
        type: String,
        default: ''
      },
      w: {
        type: Number,
        default: 0
      },
      h: {
        type: Number,
        default: 0
      },
      caption: {
        type: String,
        default: ''
      }
    }]
  }],
  hidden: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Missions', MissionsSchema);