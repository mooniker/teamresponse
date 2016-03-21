var mongoose = require('mongoose');

// var env; // configuration variables
// try { // check if local env.js exists for dev server
//   env = require('./env');
// } catch (localEnvJsNotPresentException) {
//   // otherwise use production server's config vars
//   env = process.env;
// }
//
// var mongoConnection = mongoose.createConnection(env.MONGO_SERVER_URI);

var Schema = mongoose.Schema;

var ContactModel = new Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String }
});

module.exports = {
  contact: mongoose.model('Contact', ContactModel)
};
