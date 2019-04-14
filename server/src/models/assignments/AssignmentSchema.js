var mongoose = require('mongoose');

var Assignment = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rotation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rotation'
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  grade : Number,
  remarks: String,
  admin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isAccepted: Boolean,
  isCompleted: Boolean,
  isApproved: Boolean
})

module.exports = Assignment;