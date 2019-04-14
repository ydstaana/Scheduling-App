var mongoose = require('mongoose');

var Rotation = require('../../models/rotations/RotationSchema.js');

function createRotation(req, res) {
  Rotation.create(req.body, function (err, rotation) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
    else{
      res.status(200).send(rotation);
    }
  });
}

function listRotations(req, res) {
  Rotation.find({})
  .populate('schedule')
  .populate ('group')
  .exec(function(err, rotations) {
    if(err) {
      res.status(422).json({
        message: err
      });
    }
    else {
      res.status(200).send(rotations);
    }
  })
}

module.exports = {
  createRotation : createRotation,
  listRotations : listRotations
}