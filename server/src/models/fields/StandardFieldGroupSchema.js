var mongoose = require('mongoose');

var FieldGroup = require('./FieldGroupSchema.js');

var StandardGroup = FieldGroup.discriminator('StandardGroup',
  new mongoose.Schema()
 );

module.exports = StandardGroup;