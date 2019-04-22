var mongoose = require('mongoose');

var Request = require('./RequestSchema')

var ElectiveRequest = Request.discriminator('ElectiveRequest', 
  new mongoose.Schema({
    assignment : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Assignment'
    }
  })
)

module.exports = ElectiveRequest;