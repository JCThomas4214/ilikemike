'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Mission Schema
 */
var MissionSchema = new mongoose.Schema ({
  // Mission model fields   
  // ...
  title: {
    type: String,
    required: 'title cannot be blank',
    unique: true
  },
  body: {
    type: String,
    required: 'body cannot be blank'
  },
  order: Number
});

mongoose.model('Mission', MissionSchema);
