var mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'rotationType'
};

var RotationSchema = mongoose.Schema({
  studentCount : Number,
  schedule : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref: 'Schedule'
  },
  group : {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref: 'Group'
  },
  isActive: Boolean
}, baseOptions)

var Rotation = mongoose.model('Rotation', RotationSchema);

module.exports = Rotation;