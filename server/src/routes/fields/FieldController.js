var Field = require('../../models/fields/FieldSchema.js');
var SingleField = require('../../models/fields/SingleFieldSchema.js');
var MultipleField = require('../../models/fields/MultipleFieldSchema.js');
var ElectiveField = require('../../models/fields/ElectiveFieldSchema.js');
var FieldGroup = require('../../models/fields/FieldGroupSchema.js');

var FieldTypes = {
  SINGLE : "Single",
  MULTIPLE : "Multiple",
  ELECTIVE : "Elective"
}

function createField(req, res) {
  switch(req.body.fieldType) {
    case FieldTypes.SINGLE:
      SingleField.create(req.body, function (err, field) {
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(field);
          }
      })
      break;
    case FieldTypes.MULTIPLE:
      MultipleField.create(req.body, function (err, field) {
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(field);
          }
      })
      break;
    case FieldTypes.ELECTIVE:
      ElectiveField.create(req.body, function (err, field) {
        if (err) {
          res.status(422).json({
            message: err
          });
        }
          else{
            res.status(200).send(field);
          }
      })
      break;
  } 
}

function createFieldGroup(req, res) {
  FieldGroup.create(req.body, function (err, field) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(field);
      }
  })
}

function listFields(req, res) {
  Field.find({})
  .populate('admin')
  .exec(function(err, fields) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(fields);
      }
  })
}

function listFieldGroups(req, res) {
  FieldGroup.find({})
  .populate('admin')
  .exec(function(err, fields) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(fields);
      }
  })
}

module.exports = {
  createField : createField,
  listFields: listFields,
  listFieldGroups : listFieldGroups,
  createFieldGroup : createFieldGroup
}