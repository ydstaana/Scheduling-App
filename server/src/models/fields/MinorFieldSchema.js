var mongoose = require('mongoose');

var Field = require('./FieldSchema.js');

var MultipleField = Field.discriminator('Minor',
  new mongoose.Schema({
    fieldGroup : {
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref: 'FieldGroup'
    }
  })
 );

module.exports = MultipleField;