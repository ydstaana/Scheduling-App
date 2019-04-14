var Rotation = require('./RotationSchema.js');
var mongoose = require('mongoose');

var ElectiveRotation = Rotation.discriminator('Elective', 
  new mongoose.Schema({
    fieldGroup : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FieldGroup'
    },
  })
);

module.exports = ElectiveRotation;