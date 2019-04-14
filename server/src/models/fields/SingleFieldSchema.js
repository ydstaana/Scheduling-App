var mongoose = require('mongoose');

var Field = require('./FieldSchema.js');

var SingleField = Field.discriminator('Single',
  new mongoose.Schema()
 );

module.exports = SingleField;