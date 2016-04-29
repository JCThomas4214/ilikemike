'use strict';

var http = require('http');
var request = require('request');
var validator = require('validator');
var nodemailer = require('nodemailer');
var generator = require('xoauth2').createXOAuth2Generator({
  user: 'mikeforflasenate@gmail.com',
  clientId: '446944948375-v68mcs3mmv22760ph9bkloculunp59mi.apps.googleusercontent.com',
  clientSecret: '4VTManev5OXkLGyg_yPRgk_M',
  refreshToken: '1/4ddjdt4h43zb74nrxFy1K3sZL0yk_80t3wgpKa_yFsbBactUREZofsF9C7PrpE-j'
});

//
//  Google OAuth2.0 with google contacts
//
var google = require('googleapis');
var urlshortener = google.urlshortener('v1');
var OAuth2 = google.auth.OAuth2;

var CLIENT_ID = '446944948375-v68mcs3mmv22760ph9bkloculunp59mi.apps.googleusercontent.com';
var CLIENT_SECRET = '4VTManev5OXkLGyg_yPRgk_M';
var REDIRECT_URL = 'https://developers.google.com/oauthplayground';

var AUTH_CODE = '4/uDZ7z_GJiYZaxrRGkyfeC4PZ62BD0Ma0yOwgRMeFm0c';

var news_letter_group_id = '774b7e270dd38630';
var volenteer_group_id = '8301b858babcf44';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
  'https://www.google.com/m8/feeds/'
];
// Get authentication URL for AUTH_CODE to access tokens
var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  scope: scopes // If you only need one scope you can pass it as string
});
// console.log(url);

var options = {
  host: url,
  path: '/oauth'
};

var callback = function (response) {
  var body = '';

  response.on('data', function (d) {
    body += d;
  });
  response.on('end', function () {
    var parsed = JSON.parse(body);
    console.log(parsed);
  });

};

request(url, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // console.log(response); // Show the HTML for the Google homepage.
  }
});


// var req = request.get(url);
//
// console.log(req.httpModule);
var oauth = function (auth_code) {
  oauth2Client.getToken(auth_code, function (err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if (!err) {
      oauth2Client.setCredentials(tokens);
      console.log(tokens);
    }
    // console.log(err);
  });
};


// var contact = JSON.stringify({
//   name: {
//     fullName: 'test test'
//   },
//   email: 'thisIsATest@gmail.com'
// });

// http.post('https://www.google.com/m8/feeds/contacts/mikeforflasenate@gmail.com/full', {
//   data: contact,
//   header: {
//     Authorization:
//   }
// });

// var contacts = google.drive({ version: 'v3', auth: oauth2Client });

//
//  END of Google Contacts API
//


// listen for token updates
// you probably want to store these to a db
generator.on('token', function (token) {
  console.log('New token for %s: %s', token.user, token.accessToken);
});
// login
var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
    user: 'mikeforflasenate',
    pass: 'campaign',
    xoauth2: generator
  }
}));

exports.googleOAuth = function (req, res) {
  console.log('Inside the oauth');
  console.log('Inside the oauth');
  console.log('Inside the oauth');
  console.log('Inside the oauth');
  console.log('Inside the oauth');
  console.log('Inside the oauth');
};

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {

  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: validator.escape(req.user.profileImageURL),
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName)
    };
  }

  res.render('modules/core/server/views/index', {
    user: safeUserObject
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

/**
 * Send and Email to Mike when contact form is submitted
 */
exports.recieveMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: data.contact_email,
    to: 'mikeforflasenate@gmail.com',
    subject: 'New subscriber',
    text: data.contact_name + ' has just subscribed! \nEmail: ' + data.contact_email
  });

  res.json(data);

};

/**
 * Send and Email to Sub when contact form is submitted
 */
exports.sendMail = function (req, res) {

  var data = req.body;
  var str = '<br><br>Dear ' + data.contact_name + ', <br><br>Thank you so much for subscribing to the Mike Thomas Campaign news Letter! <br><br> Sincerely, <br><br>Mike Thomas<br><br><br>';

  transporter.sendMail({
    from: '"Mike Thomas for Senate" <mikeforflasenate@gmail.com>',
    to: data.contact_email,
    subject: 'Mike Thomas for Florida Senate 2016',
    text: str,
    html: '<div><h1><b>Mike Thomas Campaign News Letter</b></h1></div><div><p>' + str + '</p></div><div> <h3><a href="https://www.facebook.com/MikeThomasForSenate/">Facebook</a> | <a href="https://www.linkedin.com/in/mike-thomas-5105681b?authType=NAME_SEARCH&authToken=SUUm&locale=en_US&trk=tyah&trkInfo=clickedVertical%3Amynetwork%2CclickedEntityId%3A70060764%2CauthType%3ANAME_SEARCH%2Cidx%3A1-1-1%2CtarId%3A1455415061273%2Ctas%3Amike%20">LinkedIn</a></h3> <h2><a href="http://www.mikethomasforsenate.com">MikeThomasForSenate.com</a></h2> </div>'
  });

  res.json(data);

};

/**
 * Send and volunteer Email to Mike when volunteer form is submitted
 */
exports.volunteer_recieveMail = function (req, res) {

  var data = req.body;

  transporter.sendMail({
    from: data.contact_email,
    to: 'mikeforflasenate@gmail.com',
    subject: 'New volunteer',
    text: data.contact_name + ' has just signed up to volunteer! \nEmail: ' + data.contact_email + '\nPhone: ' + data.contact_phone
  });

  res.json(data);

};

/**
 * Send and volunteer Email to sub when volunteer form is submitted
 */
exports.volunteer_sendMail = function (req, res) {

  var data = req.body;
  var str = '<br><br><br>Thank you so much, ' + data.contact_name + ', for signing up to volunteer for the Mike Thomas Campaign! <br>We will periodically email you when volunteer positions open.<br><br>Sincerely,<br><br>Mike Thomas<br><br><br>';

  transporter.sendMail({
    from: '"Mike Thomas for Senate" <mikeforflasenate@gmail.com>',
    to: data.contact_email,
    subject: 'Mike Thomas Campaign Volunteers',
    text: str,
    html: '<div><h1><b>Mike Thomas Campaign Volunteers</b></h1></div><div><p>' + str + '</p></div><div> <h3><a href="https://www.facebook.com/MikeThomasForSenate/">Facebook</a> | <a href="https://www.linkedin.com/in/mike-thomas-5105681b?authType=NAME_SEARCH&authToken=SUUm&locale=en_US&trk=tyah&trkInfo=clickedVertical%3Amynetwork%2CclickedEntityId%3A70060764%2CauthType%3ANAME_SEARCH%2Cidx%3A1-1-1%2CtarId%3A1455415061273%2Ctas%3Amike%20">LinkedIn</a></h3> <h2><a href="http://www.mikethomasforsenate.com">MikeThomasForSenate.com</a></h2> </div>'
  });

  res.json(data);

};


exports.oauthCode = function (req, res, next, id) {

  oauth(id);
  req.code = id;
  next();
};
