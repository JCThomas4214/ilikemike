'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');


/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./users/users.authentication.server.controller'),
  require('./users/users.authorization.server.controller'),
  require('./users/users.password.server.controller'),
  require('./users/users.profile.server.controller')
);

/**
	Require login routing middleware

    TODO: As of now the normal user can edit things because there is not
    distinction between user and admin

    THIS MUST CHANGE
**/
exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }
  next();
};


