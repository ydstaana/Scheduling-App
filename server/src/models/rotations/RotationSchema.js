var mongoose = require('mongoose');

var RotationSchema = mongoose.Schema({
  schedule : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule'
  },
  fieldGroup : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FieldGroup'
  },
  group : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  maxSlots : Number
})

var Rotation = mongoose.model('Rotation', RotationSchema);

module.exports = Rotation;