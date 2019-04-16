var mongoose = require('mongoose');

var RequestSchema = mongoose.Schema({
  student : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dateCreated : { type: Date , default : new Date()},
  remarks : String,
  admin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: Boolean,
  isPending: Boolean,
  message : String,
  acknowledgementMessage : String
}, {
  discriminatorKey : "requestType"
})

var Request = mongoose.model('Request', RequestSchema);

module.exports = Request;