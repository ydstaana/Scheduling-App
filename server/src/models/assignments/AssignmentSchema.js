var mongoose = require('mongoose');

var AssignmentSchema = mongoose.Schema({
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

var Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;