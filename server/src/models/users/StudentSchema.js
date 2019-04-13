var mongoose = require('mongoose');

var User = require('./UserSchema.js');

var Student = User.discriminator('Student',
  new mongoose.Schema({
    studentId: String,
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group'
    },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  })
 );

 module.exports = Student;