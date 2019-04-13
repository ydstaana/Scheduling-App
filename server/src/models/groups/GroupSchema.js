var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  students : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  rotation : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rotation'
  }
});


var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;