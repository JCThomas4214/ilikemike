'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Missions = mongoose.model('Missions');

/**
 * Globals
 */
var user, missions;

/**
 * Unit tests
 */
describe('Missions Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() { 
      missions = new Missions({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should save record', function(done) {
      var missions = new Missions({
        header: 'TEST: this is the header!',
        body: 'TEST: this is the body!',
        position: 'TEST: this is the position!',
        hidden: false
      });

      missions.save(function(err, saved) {
        should.not.exist(err);
        done();
      });
    });

    it('should have header', function(done) {
      var missions = new Missions({
        body: 'TEST: this is the body!',
        position: 'TEST: this is the position!',
        hidden: false
      });

      missions.save(function(err, saved) {
        should.exist(err);
        err.errors.header.message.should.equal('Mission header must be filled');
        done();
      });
    });

    it('should have body', function(done) {
      var missions = new Missions({
        header: 'TEST: this is the header!',
        position: 'TEST: this is the position!',
        hidden: false
      });

      missions.save(function(err, saved) {
        should.exist(err);
        err.errors.body.message.should.equal('Mission body must be filled');
        done();        
      });
    });

    //add more model tests as needed!
  });

  afterEach(function(done) { 
    Missions.remove().exec();
    User.remove().exec();

    done();
  });
});
