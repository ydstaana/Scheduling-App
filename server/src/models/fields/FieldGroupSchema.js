var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var FieldGroupSchema = new mongoose.Schema({
  name: String,
  fields : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  ],
  isActive : Boolean
}, {
  discriminatorKey : 'fieldGroupType'
});

FieldGroupSchema.plugin(deepPopulate, {
  whitelist: [
    'fields.admin'
  ]
}
)
var FieldGroup = mongoose.model('FieldGroup', FieldGroupSchema);

module.exports = FieldGroup;
