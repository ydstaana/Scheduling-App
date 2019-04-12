var mongoose = require('mongoose');

var User = require('./UserSchema.js');

var FieldAdmin = User.discriminator('FieldAdmin',
  new mongoose.Schema({
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  })
 );

 module.exports = Student;