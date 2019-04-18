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
      break;
    case RequestTypes.ELECTIVE :
      ElectiveRequest.create(req.body, function(err, request) {
        if(err)
          res.status(422).json({code:'422',message:err});
        else
          res.status(200).send(request);
      });
      break;
  }
}

function listSwitchRequests(req, res) {
  SwitchRequest.find({})
  .populate('student')
  .populate('admin')
  .populate('oldRotation')
  .populate('newRotation')
  .exec(function(err, requests) {
    if(err)
      res.status(422).json({code:'422',message:err});
    else
      res.status(200).send(requests);
  })
}

module.exports = {
  createRequest : createRequest,
  listSwitchRequests : listSwitchRequests
}