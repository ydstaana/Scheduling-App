var mongoose = require('mongoose');

var Rotation = require('../../models/rotations/RotationSchema.js');
var SingleRotation = require('../../models/rotations/SingleRotationSchema.js');
var MultipleRotation = require('../../models/rotations/MultipleRotationSchema.js');
var SpecialRotation = require('../../models/rotations/SpecialRotationSchema.js');

var Group = require('../../models/groups/GroupSchema.js');
var Assignment = require('../../models/assignments/AssignmentSchema.js');

var RotationType = {
  SINGLE: "Single",
  MULTIPLE: "Multiple",
  SPECIAL : "Special"
}

function createRotation(req, res) {
  switch(req.body.rotationType) {
    case RotationType.SINGLE :
      SingleRotation.create(req.body, async function (err, rotation) {
        if (err) {
          res.status(422).json({
            message: err
          });
        }
        else {
          // Create default Assignments
          var group = await Group.findById(rotation.group)
          try {
            if(group.students.length != 0) {
              for(i = 0; i < group.students.length; i++) {
                new Assignment({
                  student : group.students[i],
                  rotation : rotation._id,
                  group : group._id
                })
                .save();
              }
            }
            res.status(200).send(rotation);
          }
          catch(err) {
            res.status(422).json({
              message: err
            });
          } 
        }
      });
      break;
      case RotationType.SINGLE :
        MultipleRotation.create(req.body, async function (err, rotation) {
          if (err) {
            res.status(422).json({
              message: err
            });
          }
          else {
            // Create default Assignments
            try {
              if(group.students.length != 0) {
                for(i = 0; i < group.students.length; i++) {
                  new Assignment({
                    student : group.students[i],
                    rotation : rotation._id,
                    group : group._id
                  })
                  .save();
                }
              }
              res.status(200).send(rotation);
            }
            catch(err) {
              res.status(422).json({
                message: err
              });
            }
          }
        });
        break;
      case RotationType.ELECTIVE :
        SpecialRotation.create(req.body, async function (err, rotation) {
          if (err) {
            res.status(422).json({
              message: err
            });
          }
          else {
            // Create default Assignments
            try {
              if(group.students.length != 0) {
                for(i = 0; i < group.students.length; i++) {
                  new Assignment({
                    student : group.students[i],
                    rotation : rotation._id,
                    group : group._id
                  })
                  .save();
                }
              }
              res.status(200).send(rotation);
            }
            catch(err) {
              res.status(422).json({
                message: err
              });
            }
          }
        });
        break;
  }
}

function getRotation(req, res) {
  Rotation.findById(req.params.id)
  .populate('schedule')
  .populate ('group')
  .exec(function(err, rotation) {
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

function rotationLookup(req, res) {
  Rotation.findOne({
    schedule : req.body.schedule
  })
  .populate('schedule')
  .populate ('group')
  .exec(function(err, rotation) {
    if(err) {
      res.status(422).json({
        message: err
      });
    }
    else {
      res.status(200).send(rotation);
    }
  })
}

module.exports = {
  createRotation : createRotation,
  listRotations : listRotations,
  rotationLookup : rotationLookup,
  getRotation : getRotation
}