var mongoose = require('mongoose');

var Field = require('./FieldSchema.js');

var MultipleField = Field.discriminator('Minor',
  new mongoose.Schema()
 );

module.exports = MultipleField;