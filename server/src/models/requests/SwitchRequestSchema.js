var mongoose = require('mongoose');

var Request = require('./RequestSchema')

var SwitchRequest = Request.discriminator('SwitchRequest', 
  new mongoose.Schema({
    oldRotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rotation'
    },
    newRotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rotation'
    },
    field : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Field'
    }
  })
)

module.exports = SwitchRequest;