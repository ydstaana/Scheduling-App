var Field = require('../../models/fields/FieldSchema.js');
var FieldGroup = require('../../models/fields/FieldGroupSchema.js');

function createField(req, res) {
  Field.create(req.body, function (err, field) {
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