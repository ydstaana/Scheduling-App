var mongoose = require('mongoose');

var Request = require('./RequestSchema')

var SwitchRequest = Request.discriminator('SwitchRequest', 
  new mongoose.Schema({
    oldAssignments : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment'
      }
    ],
    newAssignments : [
      {
        student : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        rotation : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rotation'
        },
        group : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Group'
        },
        field : {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Field'
        }
      }
    ]
  })
)

module.exports = SwitchRequest;