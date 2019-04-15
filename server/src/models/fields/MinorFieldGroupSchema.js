var mongoose = require('mongoose');

var FieldGroup = require('./FieldGroupSchema.js');

var MinorGroup = FieldGroup.discriminator('MinorGroup',
  new mongoose.Schema()
 );

module.exports = MinorGroup;