var env; // configuration variables
try { // check if local env.js exists for dev server
  env = require('./env');
} catch (localEnvJsNotPresentException) {
  // otherwise use production server's config vars
  env = process.env;
}

var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/ping', function(request, response) {
  response.status(200).send('Pong!');
});

var mongoose = require('mongoose');
var mongoConnection = mongoose.connect(env.MONGO_SERVER_URI);

var ContactModel = require('./models').contact;
var emailProvider = require('./email');

app.post('/', function(request, response) {
  var name = request.body.name;
  var phone = request.body.phone;
  var email = request.body.email;
  console.log('POST /', name, phone, email);

  ContactModel.findOne({ email: email }, function(err, doc) {
    if (err) console.error(err);
    else if (doc) {
      console.log('Already got you.');
      response.send('We already got you.');
    } else {
      console.log('Creating new contact');
      new ContactModel({
        name: name,
        phone: phone,
        email: email
      }).save(function(error, contact) {
        emailProvider.send(name, phone, email, function(err) {
          if (err) {
            console.error(err);
          } else {
            console.log('Email sent.');
            response.render('thanks', { name: contact.name });
          }
        });
      });
    }
  });
});

app.set('view engine', 'jade');

// Fake admin login page
app.get('/admin', function(request, response) {
  response.render('admin');
});

// Provide list of all contacts only the magic POST request with the right params
app.post('/admin', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username == env.ADMIN_USERNAME && password == env.ADMIN_PASSWORD) {
    ContactModel.find({}, function(err, docs) {
      if (err) console.error(err);
      else response.json(docs);
    });
  } else {
    response.json({ error: 'Access denied.' });
  }
});

// path to public
var pathToPublic = path.join(__dirname, 'public');

// serve whatever's in public as is
app.use(express.static(pathToPublic));

app.listen(env.PORT, function() {
  console.log('Team Response up and running on port ' + env.PORT + '.');
});
