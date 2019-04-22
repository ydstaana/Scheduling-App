var Rotation = require('./RotationSchema.js');
var mongoose = require('mongoose');

var SingleRotation = Rotation.discriminator('Single', 
  new mongoose.Schema({
    field : {
      type: mongoose.Schema.Types.ObjectId,
      rqeuired : true,
      ref: 'Field'
    },
  })
);

module.exports = SingleRotation;