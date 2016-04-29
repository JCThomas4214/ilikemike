'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Album Schema
 */
var AlbumSchema = new Schema({
  // Album model fields
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: 'The album must have a name'
  },
  order: {
    type: Number,
    required: 'The album must have an order'
  },
  gallery: [{
    pic_order: {
      type: Number,
      required: 'There must be a photo order'
    },
    src: {
      type: String,
      required: 'Image must have a source path'
    },
    msrc: {
      type: String,
      required: 'Image must have a thumbnail source path'
    },
    w: {
      type: Number,
      required: 'Image must have a set width'
    },
    h: {
      type: Number,
      required: 'Image must have a set height'
    },
    caption: {
      type: String,
      default: ''
    },
    ftpsrc: {
      type: String,
      required: 'Image must have a source path'
    },
    mftpsrc: {
      type: String,
      required: 'Image must have a source path'
    }
  }]
});

mongoose.model('Album', AlbumSchema);
