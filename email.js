var env; // configuration variables
try { // check if local env.js exists for dev server
  env = require('./env');
} catch (localEnvJsNotPresentException) {
  // otherwise use production server's config vars
  env = process.env;
}

module.exports = {
  ping: function() {
    console.log('PONG!');
  },
  send: function(name, phone, email, callback) {
    var message = {
      from: email,
      to: env.TO_EMAIL,
      subject: 'contact form submission: ' + name,
      text: 'Someone wants to get in touch! NAME: ' + name + ' PHONE: ' + phone + ' EMAIL: ' + email
    };
    // TODO email provider stuff goes here
    console.log(message, 'not actually sent to', env.TO_EMAIL);
    callback(null); // null means no error
  }
};
