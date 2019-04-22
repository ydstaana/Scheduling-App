var mongoose = require('mongoose');

var Field = require('./FieldSchema.js');

var ElectiveField = Field.discriminator('Elective',
  new mongoose.Schema({
    fieldGroup : {
      type: mongoose.Schema.Types.ObjectId,
      required : true,
      ref: 'FieldGroup'
    }
  })
 );

module.exports = ElectiveField;