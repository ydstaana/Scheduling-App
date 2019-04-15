var Request = require('../../models/requests/RequestSchema')
var SwitchRequest = require('../../models/requests/SwitchRequestSchema')
var ElectiveRequest = require('../../models/requests/ElectiveRequestSchema')

var RequestTypes = {
  SWITCH : "SwitchRequest",
  ELECTIVE: "ElectiveRequest"
}

function createRequest(req, res) {
  switch(req.body.requestType) {
    case RequestTypes.SWITCH :
      SwitchRequest.create(req.body, function(err, request) {
        if(err)
          res.status(422).json({code:'422',message:err});
        else
          res.status(200).send(request);
      })
    case RequestTypes.ELECTIVE :
      ElectiveRequest.create(req.body, function(err, request) {
        if(err)
          res.status(422).json({code:'422',message:err});
        else
          res.status(200).send(request);
      })
  }
}

module.exports = {
  createRequest : createRequest
}