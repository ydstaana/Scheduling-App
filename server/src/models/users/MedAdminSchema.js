var mongoose = require('mongoose');

var User = require('./UserSchema.js');

var MedAdmin = User.discriminator('MedAdmin',
  new mongoose.Schema()
 );

module.exports = MedAdmin;