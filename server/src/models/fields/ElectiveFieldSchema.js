var mongoose = require('mongoose');

var Field = require('./FieldSchema.js');

var ElectiveField = Field.discriminator('Elective',
  new mongoose.Schema()
 );

module.exports = ElectiveField;