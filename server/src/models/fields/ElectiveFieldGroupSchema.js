var mongoose = require('mongoose');

var FieldGroup = require('./FieldGroupSchema.js');

var ElectiveGroup = FieldGroup.discriminator('ElectiveGroup',
  new mongoose.Schema()
 );

module.exports = ElectiveGroup;