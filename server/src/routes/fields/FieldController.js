var Field = require('../../models/fields/FieldSchema.js');
var StandardField = require('../../models/fields/StandardFieldSchema.js');
var MinorField = require('../../models/fields/MinorFieldSchema.js');
var ElectiveField = require('../../models/fields/ElectiveFieldSchema.js');
var FieldGroup = require('../../models/fields/FieldGroupSchema.js');

var FieldTypes = {
  SINGLE : "Standard",
  MULTIPLE : "Minor",
  ELECTIVE : "Elective"
}

function createField(req, res) {
  switch(req.body.fieldType) {
    case FieldTypes.SINGLE:
      StandardField.create(req.body, function (err, field) {
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
      MinorField.create(req.body, function (err, field) {
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