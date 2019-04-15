var mongoose = require('mongoose');

var Request = require('./RequestSchema')

var ElectiveRequest = Request.discriminator('ElectiveRequest', 
  new mongoose.Schema({
    electiveName : String,
    electiveAddress : String
  })
)

module.exports = ElectiveRequest;