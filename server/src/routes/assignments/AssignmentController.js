var Assignment = require('../../models/assignments/AssignmentSchema.js');
var Student = require('../../models/users/StudentSchema.js');

function createAssignment(req, res) {
  Assignment.create(req.body, function (err, assignment) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(assignment);
      }
  });
}

async function acceptAssignment(req, res) {
  var assign = await Assignment.findById(req.params.id)

  assign.isAccepted = true;

  assign.save().then(() => {
    res.status(200).send(assign);
  })
  .catch(err => {
    res.status(422).json({
      message: err
    });
  }) 
}

async function updateAssignment(req, res) {
  var assign = await Assignment.findById(req.params.id)

  assign.set(req.body); 

  assign.save().then(() => {
    res.status(200).send(assign);
  })
  .catch(err => {
    res.status(422).json({
      message: err
    });
  }) 
}

function listAssignments(req, res) {
  Assignment.find({})
  .populate('student')
  .populate('rotation')
  .populate('group')
  .populate('admin')
  .exec(function (err, assignments) {
    if (err) {
      res.status(422).json({
        message: err
      });
    }
      else{
        res.status(200).send(assignments);
      }
  })
}

module.exports = {
  createAssignment : createAssignment,
  listAssignments : listAssignments,
  acceptAssignment : acceptAssignment,
  updateAssignment : updateAssignment
}