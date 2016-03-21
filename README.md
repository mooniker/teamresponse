# Overview

Team Response is little Express/Mongo app that provides a basic contact form for collecting names, email addresses, and phone numbers.

See a basic list (JSON) of all the vistors' contact information at `/admin`. Username and password are set in your server's configuration variables. If you're doing this on a development box, see the installation instructions below for an example of what goes into that.

The `/admin` view is just a mockup for functionality and is not considered secure.

# Use an email provider (recommended)

Add in code for your email provider in the stub at `email.js` to have Team Response email you whenever a visitor submits their contact information.

# Installation

1. Have your machine ready with Node/npm and MongoDB installed. MongoDB must be running.
2. Clone this repo to your machine. `git clone https://github.com/mooniker/teamresponse.git`
3. Get and install on the dependencies. `npm install`
4. Create an `env.js` for your local development box's configuration variables. Consider or copy `example_env.js` if you want to.
5. Punch it. `node index.js` or `nodemon`
