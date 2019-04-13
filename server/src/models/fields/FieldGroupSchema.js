var mongoose = require('mongoose');

var FieldGroupSchema = new mongoose.Schema({
  name: String,
  fields : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  ]
});

var FieldGroup = mongoose.model('FieldGroup', FieldGroupSchema);

module.exports = FieldGroup;
