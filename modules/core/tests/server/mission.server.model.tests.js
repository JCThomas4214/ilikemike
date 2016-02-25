'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Mission = mongoose.model('Mission');

/**
 * Globals
 */
var user, mission;

/**
 * Unit tests
 */
describe('Mission Model Unit Tests:', function() {
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
      mission = new Mission({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      var mission = new Mission({
        title: 'Bacon and Eggs',
        body: 'This is some good eatting right here!',
        order: 0
      });

      mission.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('throws validation error when title is empty', function(done) {
      var mission = new Mission({
        body: 'This is some good eatting right here!',
        order: 0
      });

      mission.save(function(err) {
        should.exist(err);
        err.errors.title.message.should.equal('title cannot be blank');
        done();
      });
    });

    it('throws validation error when body is empty', function(done) {
      var mission = new Mission({
        title: 'Bacon and Eggs',
        order: 0
      });

      mission.save(function(err) {
        should.exist(err);
        err.errors.body.message.should.equal('body cannot be blank');
        done();
      });
    });
  });

  afterEach(function(done) { 
    Mission.remove().exec();
    User.remove().exec();

    done();
  });
});
